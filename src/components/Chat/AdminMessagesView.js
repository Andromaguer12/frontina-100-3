import { IconButton, InputBase, Typography } from '@material-ui/core'
import { Clear, ReplyRounded, Send } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { RANDOMID } from '../../functions/ChatObservers'
import { rdb } from '../../services/firebase'
import { useAdminUser } from '../../services/reduxToolkit/adminUserLogin/selectors'
import { selectMsg } from '../../services/reduxToolkit/chatStates/actions'
import { currentChatList, getSelectedMessage, useCurrentChatID } from '../../services/reduxToolkit/chatStates/selectors'
import { useGoogleUser } from '../../services/reduxToolkit/userWithGoogle/selectors'
import MessageCard from './messageCard'
import chatIcon from '../../Images/chatSvgIcon.svg'


export default function AdminMessagesView({messagesList, chatUp}) {
    const dispatch = useDispatch();
    const adminUser = useSelector(useAdminUser);
    const googleUser = useSelector(useGoogleUser);
    const channel = useSelector(useCurrentChatID);
    const channels = useSelector(currentChatList);
    const SMSG = useSelector(getSelectedMessage);
    const msgSelected = SMSG == null ? SMSG : SMSG[0];
    const animationenter = Boolean(msgSelected);
    const user = adminUser[0] === null ? googleUser : adminUser;

    const currentChannel = () => {
        var index = 0;
        channels.map((chan, i) => {
            if(chan.chatToken === channel){
                index += i
            }
        })
        return index
    }
    const reference = () => {
        if(animationenter){
            return msgSelected
        }
        else{
            return false
        }
    }
    const incrementUserNewMsg = () => {
        const state = channels[currentChannel()].newMsgCounts;
        const currentCount = state.adminUser;
        const obj = {
            ...state,
            adminUser: currentCount + 1
        }
        rdb.ref(`chats/` + channel + `/newMsgCount/`).update(obj);
    }
    const handleWriteMessage = (e) => {
        if(e){
            e.preventDefault();
        }
        if(user.length >= 1 && user[0] != null){
            const form = new FormData(document.getElementById("form"));
            var ref = rdb.ref(`chats/` + channel);
            const msgId = RANDOMID('AaBbNnJjHhGgTtYyCcDd123456789', 15);
            if(form.get("message") != ""){
                ref.push({
                    timestamp: new Date().getTime(),
                    message: form.get("message"),
                    sender: user[0].email,
                    id: msgId,
                    reference: reference()
                })
                ref.update({
                    viewed: false,  
                })
                incrementUserNewMsg();
                dispatch(selectMsg(null));
                
            }
            if(e){
                e.target.reset();   
            }
            else{
                document.getElementById("form").reset();
            }
            chatUp();
            setTimeout(() => {  
                chatUp();
            }, 200);
        }
        // console.log(new FormData(document.getElementById("form")).get("message"))
    }
    useEffect(() => {
        const msgbox = document.getElementById("chatmsgboxadmin");
        if(messagesList.length >= 1){
            if(msgbox != null){
                msgbox.scrollTo({
                    top: msgbox.offsetHeight*messagesList[0].messages.length,
                    left: 0,
                    behavior: "smooth"
                });
            }
        }
    }, [messagesList])
    const enterSubmit = (e) => {
        if(e.code == 'Enter'){
            e.preventDefault();
            chatUp();
            setTimeout(() => {  
                chatUp();
            }, 200);
            handleWriteMessage();
        }
    }
    const deselect = () => {
        dispatch(selectMsg(null));
    }
    return (
        <div className="messagesinputContainer">
            {channel == "" && <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", flexFlow: "column", justifyContent: "center"}}>
                <img src={chatIcon} style={{ width: "30%" }} />
                <Typography variant="h4" style={{ color: "#7A7A7A", width: "fit-content",  }}> Elige algun chat para empezar! </Typography>    
            </div>}
            {channel != "" && <React.Fragment>
                <div className="messagesContainer" id="chatmsgboxadmin">
                    {
                        messagesList[0]?.messages?.map((msg) => (
                            <MessageCard 
                                key={msg.id}
                                timestamp={msg.timestamp}
                                sender={msg.sender}
                                message={msg.message}
                                id={msg.id}
                                reference={msg.reference}
                            />
                        ))
                    }
                </div>
                <div className="inputContainer">
                    <CSSTransition
                        in={animationenter}
                        timeout={350}
                        classNames="Reply-Msg"
                        unmountOnExit
                    >
                        <React.Fragment>
                            <div className="replyMsg">
                                {animationenter && <div className="flag" style={{ background: `${msgSelected.sender === user[0].email? '#C93832' : '#7a7a7a' }` }}></div>}
                                <div style={{ padding: "5px", width: "90%"}}>
                                    {animationenter && <Typography style={{ color: `${msgSelected.sender === user[0].email? '#C93832' : '#7a7a7a' }`, display: "flex", alignItems: "center"}}>{msgSelected.sender === user[0].email ? 'Tu' : user[0].email } <ReplyRounded /></Typography>}
                                    {animationenter && <Typography>{msgSelected.message}</Typography>}
                                </div>
                                <IconButton onClick={deselect}>
                                    <Clear />
                                </IconButton>
                            </div>
                        </React.Fragment>
                    </CSSTransition>
                    <form id="form" onSubmit={handleWriteMessage} style={{ width: "100%", display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-around" }}>
                        <InputBase name="message" placeholder="Escribe un mensaje..." onKeyPress={enterSubmit} multiline style={{ width: "75%", margin: "15px 10px", background: "#e7e7e7", borderRadius: "10px", padding: "5px 10px" }} />
                        <IconButton type="submit" color="secondary">
                            <Send />
                        </IconButton>
                    </form>
                </div>
            </React.Fragment>}
        </div>
    )
}
