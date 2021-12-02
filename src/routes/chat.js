import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, useDispatch } from 'react-redux';
import { io } from "socket.io-client"
import { fetchData, emailSignIn } from "../api/api"
import { useState, useEffect, useRef } from "react"
import { v4 as uuidv4 } from 'uuid';
import "../styles/chat.css"
import { Sidebar } from '../components/sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chatbody } from '../components/chatbody';
var meassageId, uId, fId;
function Chat() {
    const dispatch = useDispatch()
    const rf = useRef()
    const [toggle, setToggle] = useState(true)
    const [count, setCount] = useState(0)
    const [currentID, setCurrentID] = useState("hello")
    const [canDelMeassage, SetCanDelMeassage] = useState(false)
    const [meassageID, setMeassageID] = useState(" ")
    const [flag, setFlag] = useState(true)
    var users = useSelector(state => { return state.users })
    const [newUsers, setNewUsers] = useState([])
    const meassages = useSelector(state => state.oldMeassages)
    const [discription, setDiscription] = useState(" ")
    const userId = useSelector(state => state.userId)
    const handleusers = (username, id) => {
        setDiscription(username)
        setCurrentID(id)
        setFlag(false)
    }
    var socket = undefined
    const getSocket = () => {
        uId = userId
        fId = currentID
        if (localStorage.getItem('token') !== undefined) {
            const token = localStorage.getItem('token');
            if (token === null) return;

            if (socket === undefined) {
                socket = io("http://localhost:4000", {
                    query: {
                        token
                    }
                })
                return socket;
            }
            return socket;
        }
    }
    const sendmeassage = (meassage) => {
        meassageId = uuidv4()
        meassages.push({ chatId: userId, friendId: currentID, meassage: meassage, meassageId })
        getSocket()?.emit("send-Meassage", userId, currentID, meassageId, meassage)
    }
    const handleChange = (e) => {
        var expression = `${e.target.value}`
        var re = new RegExp(expression, 'g')
        users = users.filter(user => re.test(user.name) && user._id !== userId)
        setNewUsers(users)
    }
    useEffect(() => {
        console.log(meassages)
        if (canDelMeassage) {
            console.log("i")
            getSocket()?.emit("delete-meassage", meassageID)
            SetCanDelMeassage(!canDelMeassage)
        }
        if (!flag) {
            try {
                console.log("gopi")
                dispatch(fetchData(userId, currentID))
                setFlag(true)
            }
            catch (err) {
                console.log(err)
            }
        }

        console.log(users)
        if (users.length === 0) {
            try {
                dispatch(emailSignIn({ email: localStorage.getItem("email"), password: localStorage.getItem("password") }, false))
            }
            catch (err) {
            }

            setCount(count + 1)
        }
        if (discription === " ") {
            users = users.filter(user => {
                console.log(user._id !== userId)
                return user._id !== userId
            })
            setNewUsers(users)
            getSocket()?.emit("join-room", userId, () => {
            })
        }
        getSocket()?.on("new-meassage", data => {

            try {
                dispatch(fetchData(uId, fId))
            }
            catch (err) {
                console.log("error", err)
            }
            setCount(count + 1)
        })
    }, [currentID, meassageID, meassages])
    return (
        <div className="grid-container">
            <div className={toggle ? `sidebar` : "openclosedrawer"}>
                <div className="flex">
                    <Sidebar users={users} handleusers={handleusers} userId={userId} handleChange={handleChange} />
                    <CloseIcon fontSize="large" className="closeicon" onClick={() => { setToggle(!toggle) }} />
                </div>
            </div>
            <div className="header"><MenuIcon fontSize="large" className="menu" onClick={() => { setToggle(!toggle) }} /><h4 className="discription">{discription}</h4></div>
            <div className="body">
                <Chatbody meassages={meassages} discription={discription} userId={userId} sendmeassage={sendmeassage} />
            </div>
        </div>
    )
}

export default Chat