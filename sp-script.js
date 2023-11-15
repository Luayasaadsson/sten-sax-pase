// Sparar ner namnen till huvudsidan
function sparaFormular(){ // Funktionen triggas av knappen Continue från secong page
    let humanName = document.getElementById('userNameInput').value;
    let robotName = document.getElementById('robotNameInput').value;

localStorage.setItem('mittHumanName', humanName);
localStorage.setItem('mittRobotName', robotName);

uppdatteraVisning(); //Kör i gång funktionen nedan

return false;

}

// Laddar upp namnen på huvudsidan
function uppdatteraVisning(){
    let sparatHumanName = localStorage.getItem('mittHumanName');
    let sparatRobotName = localStorage.getItem('mittRobotName');

    console.log(sparatHumanName)
    console.log(sparatRobotName)
    if (sparatHumanName + sparatRobotName){
        document.getElementById('user').innerText = sparatHumanName;
    }
    if (sparatRobotName){
        document.getElementById('robot').innerText = sparatRobotName;
    }
};


window.onload = uppdatteraVisning;









const avatarIds = ['demon', 'man', 'alien', 'ape'];

function sparaAvatar() {
    avatarIds.forEach(function(id) {
        let element = document.getElementById(id); 
            if (element) {
            element.addEventListener('click', function() {
            localStorage.setItem('sparadAvatar', this.src);
            });
        }
    });
}

function visaSparadAvatar() {
    let sparadUrl = localStorage.getItem('sparadAvatar');
    if (sparadUrl) {
        let avatarBild = document.getElementById('avatarBild');
        if (avatarBild) {
            avatarBild.src = sparadUrl;
        }
    }
}


window.onload = uppdatteraVisning;
document.addEventListener('DOMContentLoaded', (event) => {
    sparaAvatar();
    visaSparadAvatar();
});




const avatarRobotIds = ['terminator', 'r2d2', 'hal', 'kenny'];

function sparaRobotAvatar() {
    avatarRobotIds.forEach(function(id) {
        let element = document.getElementById(id); 
            if (element) {
            element.addEventListener('click', function() {
            localStorage.setItem('sparadRobotAvatar', this.src);
            });
        }
    });
}

function visaSparadRobotAvatar() {
    let sparadRobotUrl = localStorage.getItem('sparadRobotAvatar');
    if (sparadRobotUrl) {
        let avatarRobotBild = document.getElementById('avatarRobotBild');
        if (avatarRobotBild) {
            avatarRobotBild.src = sparadRobotUrl;
        }
    }
}




window.onload = uppdatteraVisning;
document.addEventListener('DOMContentLoaded', (event) => {
    sparaAvatar();
    visaSparadAvatar();
    sparaRobotAvatar();
    visaSparadRobotAvatar();

});




