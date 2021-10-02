import { Button, CircularProgress, Divider, IconButton, InputBase, Popper, Typography } from '@material-ui/core'
import { ChatOutlined, ErrorOutline, ExitToApp } from '@material-ui/icons'
import { Send } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { createNewChannel, signInWithGoogle } from '../../functions/authFunctions'
import { getChatMessages, RANDOMID, setChatsObs } from '../../functions/ChatObservers'
import chatIcon from '../../Images/chatSvgIcon.svg'
import db, { auth } from '../../services/firebase'
import { setAllMessages, setChatsList } from '../../services/reduxToolkit/chatStates/actions'
import { currentMessagesList } from '../../services/reduxToolkit/chatStates/selectors'
import { setCurrentUser } from '../../services/reduxToolkit/userWithGoogle/actions'
import { useGoogleUser } from '../../services/reduxToolkit/userWithGoogle/selectors'
import '../../Styles/ChatPopUp.css'
import ChatPopUpInput from './ChatPopUpInput'
import MessageCard from './messageCard'

export default function ChatPopUp() {
    const googleUser = useSelector(useGoogleUser);
    const dispatch = useDispatch();
    const ChatsMessages = useSelector(currentMessagesList);
    const CurrentMessagesList = () => ChatsMessages.filter(chat => chat.chatToken === googleUser.currentUser[1]?.chatToken);
    const [anchorEl, setanchorEl] = useState(null)
    const [anchorElMsg, setanchorElMsg] = useState("")
    const [CreatedChat, setCreatedChat] = useState(false)
    const [Loading, setLoading] = useState(false)
    const open = Boolean(anchorEl);

    const setAnchorElFor = (e) => {
        if(e.target.id === "chatpopupinput"){
            setanchorElMsg("silenciado")
            setanchorEl(open ? null : e.target);
            setTimeout(() => {
                setanchorEl(null);
            }, 10000);
        }
        else{
            setanchorElMsg("bloqueado")
            setanchorEl(open ? null : e.target);
            setTimeout(() => {
                setanchorEl(null);
            }, 10000);
        }
    }

    const updateChatList = (result) => {
        dispatch(setChatsList(result));
    }
    const updateChatMessages = () => {
        getChatMessages((result) => {
            dispatch(setAllMessages(result));
        })
    }

    const handleNewChat = async () => {
        const chatToken = RANDOMID("AXBSAOWHRkahsdhqwijdajpkbko-12937251479", 15);
        setLoading(true)
        await createNewChannel(chatToken, `Usuario ${chatToken}`, `Usuario ${chatToken}`).then(() => {
            setLoading(false)
            dispatch(setCurrentUser([
                {
                    user: {
                        email: `Usuario ${chatToken}`,
                        name: `Usuario ${chatToken}`,
                        photoURL: "https://firebasestorage.googleapis.com/v0/b/frontina-100-3.appspot.com/o/userX.png?alt=media&token=7cd3b4d3-1715-42dd-b39a-3f843be281fe"
                    }
                },
                {
                    chatToken: chatToken,
                    name: `Usuario ${chatToken}`

                }
            ]))
            setCreatedChat(true)
        });
    }
    const handleLogIn = async (e) => {
        //execute the login
        await signInWithGoogle().then((result) => {
            if(result[1].blocked){
                dispatch(setCurrentUser([null, {
                    blocked: true,
                    email: null,
                    auth: "user",
                    secondaryAuth: "any",
                }, false]))
                setAnchorElFor(e);
                auth.signOut();
            }
            else{
                dispatch(setCurrentUser(result));
                db.collection("UsuariosData").doc(auth.currentUser.email).update({
                    lastConnection: new Date().getTime()
                })
            }
        }).catch((error) => {
            console.log(error)   
        })
    }
    useEffect(() => {
        if(googleUser.currentUser[1].chatToken){
            updateChatMessages();
        }
    }, [googleUser])

    useEffect(() => {
        setChatsObs(updateChatList);
    }, [])

    const messagesList = CurrentMessagesList();
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

    return (
        <div className="ChatPdiv" >
            {googleUser.currentUser[0] == null ? <React.Fragment>
                <Typography variant="h4" style={{ width: "95%", borderBottom: "1px dotted #7a7a7a", boxSizing: "border-box", color: "#7a7a7a", display: 'flex', flexFlow: "row", alignItems: "center", justifyContent: "space-between"}}>
                    Chat Directo
                </Typography>
                <img src={chatIcon} style={{ width: "30%" }} />
                <Popper open={open} anchorEl={anchorEl} placement="top">
                    <CSSTransition
                        in={true}
                        appear={true}
                        timeout={1000}
                        classNames="Content-load"
                    >
                        <div style={{ width: "fit-content", background: "#fff", boxShadow: "2px 2px 5px #7a7a7a", padding: "10px", borderRadius: "10px"}}>
                            <Typography color="secondary" style={{ zIndex: "2", width: "100%",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                                    Su usuario se encuentra bloqueado!
                                <ErrorOutline />
                            </Typography>
                        </div>
                    </CSSTransition>
                </Popper>
                <Button variant="outlined" color="secondary" startIcon={<ChatOutlined />} onClick={handleNewChat}>
                    {Loading ? <CircularProgress /> : "INICIAR UN NUEVO CHAT"}
                </Button>
                <Button variant="contained" color="secondary" startIcon={<ExitToApp />} onClick={handleNewChat}>
                    {Loading ? <CircularProgress /> : "INICIAR SESION CON GOOGLE"}
                </Button>
            </React.Fragment> : <React.Fragment>
                <Typography style={{ width: "100%", boxSizing:"border-box", height: '15%', padding: "5px 10px", borderBottom: "1px solid #b8b8b8", boxSizing: "border-box", color: "#7a7a7a", display: 'flex', flexFlow: "row", alignItems: "center", justifyContent: "flex-start"}}>
                    <img src={googleUser.currentUser[0].user.photoURL} style={{ width: "10%", marginRight: "10PX", borderRadius: "50%" }} /> 
                    <Typography>
                        {googleUser.currentUser[1].name}
                    </Typography>
                </Typography>
                <div style={{ width: "100%", height: "70%", maxHeight: "70%"}} id="chatmsgboxadmin" className="messagesContainer">
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
                <div style={{ width: "100%", height: "15%", borderTop: "1px solid #e7e7e7"}} className="inputContainer">
                    <ChatPopUpInput popperOpen={open} errorMsg={anchorElMsg} popperAnchor={anchorEl} anchorFunction={(e) => setAnchorElFor(e)} userChatToken={googleUser.currentUser[1].chatToken} chatUp={updateChatMessages} messagesList={CurrentMessagesList()} />             
                </div>
            </React.Fragment>}
        </div>
    )
}
