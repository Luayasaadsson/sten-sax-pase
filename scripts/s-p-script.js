document.addEventListener('DOMContentLoaded', () => {
  let selectedCharacter = null;

  // Hantera klick på karaktärsbilder
  document.querySelectorAll('.img').forEach(img => {
      img.addEventListener('click', function() {
          if (selectedCharacter) {
              selectedCharacter.classList.remove('selected');
          }
          this.classList.add('selected');
          selectedCharacter = this;
      });
  });

  // Spara val och namn när användaren klickar på 'Continue'
  document.getElementById('continueButton').addEventListener('click', () => {
      const userName = document.getElementById('userNameInput').value;
      const robotName = document.getElementById('robotNameInput').value;
      const characterImage = selectedCharacter ? selectedCharacter.src : '';

      localStorage.setItem('userName', userName);
      localStorage.setItem('robotName', robotName);
      localStorage.setItem('characterImage', characterImage);

      // Här kan du lägga till kod för att navigera till nästa sida
  });
});
