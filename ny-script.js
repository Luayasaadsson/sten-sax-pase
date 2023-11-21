

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





function visaUfoFunktion(){
    const visaUfo = true;
    

    if(visaUfo){
        document.querySelector('.ufo').style.display = 'block';
    }
    console.log(visaUfo)
};

document.addEventListener('DOMContentLoaded', (event) => {
document.querySelector('.ufo').addEventListener('click', onUfoClick);
});

function onUfoClick() {
        /* resetGame(); */
        console.log("UFO clicked!")
}
