function markeraHuman(selectedImage){
    document.querySelectorAll('.character-container img').forEach(img => {
        img.classList.remove('eldEffektHuman');
    });

selectedImage.classList.add('eldEffektHuman');
}


function markeraRobot(selectedImage){
    document.querySelectorAll('.robot-container img').forEach(img => {
        img.classList.remove('eldEffektRobot');
    });

selectedImage.classList.add('eldEffektRobot');
}