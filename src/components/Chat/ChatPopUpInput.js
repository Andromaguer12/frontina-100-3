import { IconButton, InputBase, Popper, Typography } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RANDOMID } from '../../functions/ChatObservers';
import { rdb } from '../../services/firebase';
import { selectMsg } from '../../services/reduxToolkit/chatStates/actions';
import { currentChatList, getSelectedMessage, useCurrentChatID } from '../../services/reduxToolkit/chatStates/selectors';
import { useGoogleUser } from '../../services/reduxToolkit/userWithGoogle/selectors';
import { ErrorOutline, Send } from "@material-ui/icons"
import { CSSTransition } from 'react-transition-group';

export default function ChatPopUpInput({messagesList, errorMsg, userChatToken, popperOpen, popperAnchor, chatUp, anchorFunction}) {
    const dispatch = useDispatch();
    const googleUser = useSelector(useGoogleUser);
    const channel = userChatToken;
    const channels = useSelector(currentChatList);
    const SMSG = useSelector(getSelectedMessage);
    const msgSelected = SMSG == null ? SMSG : SMSG[0];
    const animationenter = Boolean(msgSelected);
    const user =  googleUser.currentUser;

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
        const currentCount = state.customer;
        const obj = {
            ...state,
            customer: currentCount + 1
        }
        rdb.ref(`chats/` + channel + `/newMsgCount/`).update(obj);
    }
    const handleWriteMessage = (e) => {
        if(e){
            e.preventDefault();
        }
        const form = new FormData(document.getElementById("form"));
        var ref = rdb.ref(`chats/` + userChatToken);
        const msgId = RANDOMID('AaBbNnJjHhGgTtYyCcDd123456789', 15);
        if(form.get("message") != "" && !googleUser.currentUser[1].muted){
            ref.push({
                timestamp: new Date().getTime(),
                message: form.get("message"),
                sender: user[0].user.email,
                senderImg: user[0].user.photoURL,
                id: msgId,
                reference: reference()
            })
            ref.update({
                viewed: false,  
            })
            incrementUserNewMsg();
            dispatch(selectMsg(null));
            
        }
        else{
            anchorFunction(e);
        }
        document.getElementById("form").reset();
        chatUp();
        setTimeout(() => {  
            chatUp();
        }, 200);
    }
    
    const enterSubmit = (e) => {
        if(e.code == 'Enter'){
            e.preventDefault();
            chatUp();
            setTimeout(() => {  
                chatUp();
            }, 200);
            handleWriteMessage(e);
        }
    }
    const deselect = () => {
        dispatch(selectMsg(null));
    }
    return (
        <form id="form" onSubmit={handleWriteMessage} style={{ width: "100%", display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-around" }}>
            <Popper open={popperOpen} anchorEl={popperAnchor} placement="top">
                    <CSSTransition
                        in={true}
                        appear={true}
                        timeout={1000}
                        classNames="Content-load"
                    >
                        <div style={{ width: "fit-content", background: "#fff", boxShadow: "2px 2px 5px #7a7a7a", padding: "10px", borderRadius: "10px"}}>
                            <Typography color="secondary" style={{ zIndex: "2", width: "100%",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                                    Su usuario se encuentra {errorMsg}!
                                <ErrorOutline />
                            </Typography>
                        </div>
                    </CSSTransition>
                </Popper>
            <InputBase id="chatpopupinput" name="message" placeholder="Escribe un mensaje..." onKeyPress={enterSubmit} multiline style={{ width: "75%", margin: "0 10px", background: "#e7e7e7", borderRadius: "10px", padding: "5px 10px" }} />
            <IconButton type="submit" color="secondary" onClick={handleWriteMessage}>
                <Send />
            </IconButton>
        </form>
    )
}
