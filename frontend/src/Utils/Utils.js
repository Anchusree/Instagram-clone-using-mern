export const baseUrl = "http://localhost:5000/api"

export const getUserfromLocalStorage = localStorage.getItem("user")
? JSON.parse(localStorage.getItem("user")) : null


export const getTokenfromLocalStorage = localStorage.getItem("token")
? JSON.parse(localStorage.getItem("token")) : null

export const config ={
    headers:{
        Authorization:`Bearer ${getTokenfromLocalStorage !== null ? getTokenfromLocalStorage : ""}`,
        "Content-Type":"application/json"
    }
}





export const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);


export const timeSince=(date)=>{
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " YEAR";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " MONTHS";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " DAY";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " HOURS";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " MINUTES";
    }
    return Math.floor(seconds) + " SECONDS";

}