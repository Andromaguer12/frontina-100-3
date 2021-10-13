import { CircularProgress, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Popper, Typography } from '@material-ui/core'
import { Delete, ErrorOutline, Settings } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group';
import { getDateFromTimestamp } from '../../functions/utils';
import { rdb } from '../../services/firebase';
import { useAdminUser } from '../../services/reduxToolkit/adminUserLogin/selectors';
import { setCurrentChatID } from '../../services/reduxToolkit/chatStates/actions';
import { useGoogleUser } from '../../services/reduxToolkit/userWithGoogle/selectors';

const OptionsStyle = makeStyles({
    root: {
        background: "#ffffff",
        borderRadius: "5px",
        boxShadow: "2px 2px 5px #cccccc",
    }
})

export default function AdminChatList({data, delChat, updateChatMessages}) {
    const adminUser = useSelector(useAdminUser);
    const googleUser = useSelector(useGoogleUser);
    const user = adminUser[0] === null ? googleUser : adminUser;
    const [anchorEl, setanchorEl] = useState(null)
    const [ModeDel, setModeDel] = useState(false)
    const open = Boolean(anchorEl);
    const styledOptions = OptionsStyle();
    const [Timeout, setTimeoutCount] = useState(0)

    
    const dispatch = useDispatch();
    const handleSetCurrentChat = (token, newMsgCounts) => {
        var ref = rdb.ref(`chats/` + token);
        ref.update({
            viewed: true
        })
        rdb.ref(`chats/` + token + `/newMsgCount/`).update({
            ...newMsgCounts,
            customer: 0
        });
        dispatch(setCurrentChatID(token));
        updateChatMessages();
    }
    useEffect(() => {
        if(data.length == 0 && Timeout < 10){
            setTimeout(() => {
                setTimeoutCount(Timeout+1);
            }, 1000);
        }
    }, [Timeout])

    return (
        <div className="chatListDiv" style={{ overflowY: "none"}}>
            <div style={{ display: "flex", flexFlow: "row", alignItems: "center", width: "100%", padding: "10px", boxSizing: "border-box"}}>
                <img src={user[1].img} style={{ width: "12.5%", borderRadius: "50%", marginRight: "10px" }} />
                <Typography style={{ color: "#7a7a7a" }} >Administrador: {user[1].name}</Typography>
                <Popper open={open} anchorEl={anchorEl} placement="right-end" style={{ zIndex: "100"}}>
                    <CSSTransition
                        in={true}
                        appear={true}
                        timeout={350}
                        classNames="Message-Opt"
                        unmountOnExit
                    >
                        <List classes={{ root: styledOptions.root }}>
                            <ListItem button style={{ width: "100%", color: "#7a7a7a"}} onClick={() => {setModeDel(!ModeDel); setanchorEl(null)}}>
                                <ListItemIcon><Delete /></ListItemIcon>
                                <ListItemText>{ModeDel ? "Desactivar Modo Eliminar" : "Eliminar Chat"}</ListItemText>
                            </ListItem>
                        </List>
                    </CSSTransition>
                </Popper>
                <IconButton onClick={(e) => setanchorEl(open ? null : e.target)}>
                    <Settings />
                </IconButton>
            </div>
            {data.length > 0 && <div className="chatListDiv" style={{ width: "100%" }}>
                <List style={{ width: "100%" }}>
                    {
                        data.map((card) => (
                            <ListItem style={{ width: "100%", display: "flex", flexFlow: "column", justifyContent: "flex-start" }} onClick={() => handleSetCurrentChat(card.chatToken, card.newMsgCounts)} button>
                                <Typography color="secondary" variant="h6" style={{ width: "100%", display: "flex", flexFlow: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    {card.chatUsers.creator.name}
                                    <Typography style={{ color: "#7a7a7a", fontSize: "14px"}} align="right">
                                        {ModeDel ? <IconButton color="secondary" onClick={() => delChat(card.chatToken)}><Delete /></IconButton>: `${getDateFromTimestamp(card.lastMessage[0].timestamp).date} ${getDateFromTimestamp(card.lastMessage[0].timestamp).hour}`}
                                    </Typography>
                                </Typography>
                                <Typography style={{ width: "100%", display: "flex", flexFlow: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    {card.lastMessage[0].message}
                                    {card.newMsgCounts.customer > 0 && card.viewed == false && <div className="notificationDot">
                                        {card.newMsgCounts.customer}
                                    </div>}
                                </Typography>
                            </ListItem>    
                        ))
                    }
                </List>
            </div>}
            {data.length == 0 && Timeout < 10 && <div style={{ width: "100%", height: "100%", boxSizing: "border-box", display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center" }}><CircularProgress color="secondary" /></div>}
            {data.length == 0 && Timeout == 10 && <div style={{ color: "#7a7a7a", fontSize: "14px", width: "100%", height: "100%", boxSizing: "border-box", display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center" }} align="right">
                    <ErrorOutline style={{ fontSize: "60", color: "#7a7a7a" }} />
                    <Typography variant="h4" style={{ color: "#7a7a7a" }}> Sin chats! </Typography>
                </div>}
        </div>
    )
}
