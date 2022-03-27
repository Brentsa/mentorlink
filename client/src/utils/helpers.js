import Auth from "./AuthService";

//capitalize the first letter of a string
export function capFirstLetter(string){
    if(!string) return '';
    
    return string.trim()[0].toUpperCase() + string.trim().slice(1);
}

//format date strings
export function formatDateTime(date){
    var dateObj = new Date(parseInt(date));
    var month = dateObj.getMonth()+1;
    var day = dateObj.getDate();
    var year = dateObj.getFullYear();
    var hours = dateObj.getHours()>12 ? dateObj.getHours() - 12 : dateObj.getHours();
    var minutes = dateObj.getMinutes() < 10 ? '0' + dateObj.getMinutes().toString() : dateObj.getMinutes();
    var ampm = dateObj.getUTCHours() > 12 ? "am" : "pm";

    //returns date in format of 12/01/2022 @ 4:15pm
    return `${month}/${day}/${year} @ ${hours}:${minutes}${ampm}`;
}

//check if the supplied username or id are the current user
export function isUserProfile(usernameOrId){
    return Auth.getProfile()?.username === usernameOrId || Auth.getProfile()?._id === usernameOrId;
}

//return a random number between a specified min and max
export function randNumBetween(min, max){
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

//take an object array and return a shuffled copy of it
export function shuffleObjArray(array){
    var objArray = [...array];

    for(let i = objArray.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * i);
        let k = objArray[i];
        objArray[i] = objArray[j];
        objArray[j] = k;
    }

    return objArray;
}

//return true if the supplied username is in an array of mentees (in the mentor group)
export function isMenteeInGroup(username, menteeArray){
    if(!username || !menteeArray) return false;

    for(var i = 0; i < menteeArray.length; i++){
        if(menteeArray[i].username === username){
            return true;
        }
    }
    
    return false;
}