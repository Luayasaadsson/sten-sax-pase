function sparaFormular(){
    let humanName = document.getElementById('userNameInput').value;
    let robotName = document.getElementById('robotNameInput').value;

localStorage.setItem('mittHumanName', humanName);
localStorage.setItem('mittRobotName', robotName);

uppdatteraVisning();

return false;

}

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

