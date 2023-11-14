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



/* function sparaAvatar() {
    document.querySelectorAll('.img').forEach(function(bild) {
        bild.addEventListener('click', function() {
            let avatar = this.src;
            localStorage.setItem('sparadAvatar', avatar);
        });
    });
} */


/* const avatarIds = ['demon', 'man', 'alien', 'ape'];

function sparaAvatar() {
    avatarIds.forEach(function(id) {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', function() {
                console.log("Avatar klickad: " + this.src); // För felsökning
                localStorage.setItem('sparadAvatar', this.src);
            });
        } else {
            console.log("Elementet hittades inte: " + id); // För felsökning
        }
    });
}


// Visa sparad avatar
function visaSparadAvatar() {
    let sparadUrl = localStorage.getItem('sparadAvatar');
    if (sparadUrl) {
        let avatarBild = document.getElementById('avatarBild');
        if (avatarBild) {
            avatarBild.src = sparadUrl;
        }
    }
} */



/* window.onload = function() {
    uppdatteraVisning();
    sparaAvatar();
    visaSparadAvatar();
}; */
