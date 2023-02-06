export const baseUrl = "http://localhost:5000/api"

export const getUserfromLocalStorage = localStorage.getItem("user")
? JSON.parse(localStorage.getItem("user")) : null

export const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);