document.addEventListener('DOMContentLoaded', () => {
  let selectedCharacter = null;

  // Handle clicks on character images
  document.querySelectorAll('.img').forEach(img => {
    img.addEventListener('click', function() {
      if (selectedCharacter) {
        selectedCharacter.classList.remove('selected');
      }
      this.classList.add('selected');
      selectedCharacter = this;
    });
  });

  // Save choice and name when user clicks 'Continue'
  document.getElementById('continueButton').addEventListener('click', () => {
    const userName = document.getElementById('userNameInput').value;
    const robotName = document.getElementById('robotNameInput').value;
    const characterImage = selectedCharacter ? selectedCharacter.src : '';

    // Create a data object with user input
    const data = {
      userName: userName,
      robotName: robotName,
      characterImage: characterImage
    };

    // Send the data object to the server
    
    fetch('http://localhost:3000/data.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseData => {
      // Handle response data
      console.log(responseData);
      // Redirect to index.html after successful POST request
    
      window.location.href = 'index.html';
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);

    });
    window.location.href = 'index.html';
  }); // Close of the 'continueButton' click event listener
}); // Close of the 'DOMContentLoaded' event listener