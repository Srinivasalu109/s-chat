import { CompassCalibrationOutlined } from "@material-ui/icons"
import axios from "axios"
const API = axios.create({ baseURL: "http://localhost:4000" })
// API.interceptors.request.use((req) => {
//     if (localStorage.getItem("profile")) {
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile").token)}`
//     }
//     return req;
// })
// const getnewmeassages=({userId,currentID,dispatch})=>{
//     axios.get(`http://localhost:4000/getmeassages/${userId}/${currentID}`).then(res => {
//         dispatch({ type: "FETCHDATA", meassages: res.data.meassages })
//     })
// }
const emailSignIn = ({ email, password }, isAlreadySign, history) => async (dispatch) => {
    try {

        // const token = API.post("/authenticate/signin", { email, password })
        axios.post("http://localhost:4000/authenticate/signin", { email, password }).then(res => {
            console.log(res.data)

            if (isAlreadySign) {
                localStorage.setItem('email', email)
                localStorage.setItem('password', password)
            }
            localStorage.setItem('token', res.data.token)
            dispatch({ type: "SIGNIN", AllUsers: res.data.users, id: res.data.userID })
            if (isAlreadySign) {
                history?.push("/chat")
            }
        }).catch(err => {
            console.log(err)
        })
    }
    catch (err) {
        console.log("err")
    }
}
const emailSignUp = ({ name, email, password }, history) => async (dispatch) => {
    try {
        console.log({ name, email, password })

        // const data = API.post("/authenticate/signup", { name, email, password })
        axios.post("http://localhost:4000/authenticate/signup", { name, email, password }).then(res => {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('email', email)
            localStorage.setItem('password', password)
            dispatch({ type: "SIGNUP", users: res.data.users, id: res.data.id })
            console.log(history)
            history?.push("/chat")
        }).catch(err => {
            console.log("not available ", err)
        })
    }
    catch (err) {
        console.log(err)
    }
}
const getUsers = (email, name, history) => async (dispatch) => {
    try {
        axios.post("http://localhost:4000/authenticate/googleSignin", { name, email }).then(res => {
            localStorage.setItem('token', res.token)
            dispatch({ type: "LOGIN", users: res.users, userId: res.userID })
            history.push("/chat")

        }).catch(err => {
            console.log("not available ")
        })
    }
    catch (err) {
        console.log(err)
    }
}
const newtoken = ({ refreshtoken, id }) => async (dispatch) => {
    axios.post("http://localhost:4000/authenticate/createtoken", { refreshtoken, id }).then(res => {
        dispatch({ type: "NEWTOKEN", token: res?.token })
    })
}
const fetchData = (userId, currentID) => async (dispatch) => {
    const token = localStorage.getItem("token")

    try {
        axios.post("http://localhost:4000/getmeassages/fetch", { userId, currentID }, {
            headers: {
                'authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log("meassages")
            console.log(res.data.meassages)
            console.log("meassages")
            dispatch({ type: "FETCHDATA", meassages: res.data.meassages })
        }).catch(err => {
            console.log("not available ")
        })
    }
    catch (err) {

    }

}


export { getUsers, fetchData, emailSignIn, emailSignUp, newtoken }