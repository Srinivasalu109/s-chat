import SendIcon from '@material-ui/icons/Send'
import { Button } from '@material-ui/core/'
import { useState, useRef,useEffect } from 'react'
import "../styles/chatbody.css"
export const Chatbody = ({ meassages, discription, userId, sendmeassage }) => {

    const [newmeassage, setnewmeassage] = useState(" ")
    const messagesEnd = useRef()
    const handleclick = () => {
        sendmeassage(newmeassage)
        setnewmeassage(" ")
    }
    const scrollToBottom = () => {
        // messagesEnd.current.scrollIntoView({ behavior: "smooth" });
      }
    
      useEffect(scrollToBottom, [meassages]);
    
    return <div className="chathere">
        {discription !== " " ? <div className="chatbody" >
            <div className="meassages">
                {
                    meassages.map(msg => {
                        if (msg.chatId === userId)
                            return (<div className="alignright" >{msg.meassage}</div>)
                        else
                            return (<div  className="alignleft">{msg.meassage}</div>)
                    })
                }
                 {/* <div ref={messagesEnd}></div> */}
            </div>
            <div className="send">

                <input placeholder="type meassage ..." className="sendmeassage" value={newmeassage} onChange={(e) => { setnewmeassage(e.target.value) }} className="typemeasage" />
                <Button variant="contained" color="primary" className="sendbutton" onClick={handleclick} >
                    <SendIcon />
                </Button>
            </div>

        </div> : null
        }
    </div>
}