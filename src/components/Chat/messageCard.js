import { Popper, makeStyles, Typography } from '@material-ui/core'
import { ReplyRounded } from '@material-ui/icons'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useAdminUser } from '../../services/reduxToolkit/adminUserLogin/selectors'
import { useGoogleUser } from '../../services/reduxToolkit/userWithGoogle/selectors'
import MessageOptions from './MessageOptions'
import '../../Styles/AdminChat.css'
import { getDateFromTimestamp } from '../../functions/utils'



const MessageCard = ({timestamp, sender, senderimg, message, id, reference, img}) => {
    const [anchorEl, setanchorEl] = useState(null)
    const adminUser = useSelector(useAdminUser);
    const googleUser = useSelector(useGoogleUser);
    const user = adminUser[0] === null ? googleUser.currentUser : adminUser;
    const open = Boolean(anchorEl);
    const handleRightClick = (e) => {
        setanchorEl(open ? null : e.target);
    }
        if(sender){
            return (
                <React.Fragment>
                    <Popper open={open} anchorEl={anchorEl} placement={sender == user[1]?.id ? "left-start" : "right-start"}>
                        <MessageOptions toggleLayout={() => setanchorEl(null)} msgId={id} />
                    </Popper>
                    <div className="messagecard" style={{ alignSelf: `${sender == user[1]?.id ? "flex-end" : "flex-start"}`, boxShadow: "none", margin: "0", maxWidth: "75%", flexFlow: "row", alignItems: "baseline"}}>
                        {sender != user[1]?.id && <img src={senderimg} style={{ width: "20px", borderRadius: "50%", height: "20px", marginRight: "5px" }} />}
                        <div className="messagecard" onClick={handleRightClick} style={{ 
                            padding: `${img ? "0" : "5px 10px"}`,
                            background: `${sender == user[1]?.id ? "#C93832" : "#e7e7e7"}`,        
                            borderRadius: `15px 15px ${sender == user[1]?.id ? "3px" : "15px" } ${sender != user[1]?.id ? "3px" : "15px" }`
                        }}> 

                            {reference && <div className="replyMsg" style={{ width: "100%" }}>
                                <div className="flag" style={{ background: `${reference.sender === user[1]?.id? '#C93832' : '#ffffff' }` }}></div>
                                <div style={{ padding: "5px", width: "100%"}}>
                                    <Typography style={{ color: `${reference.sender === user[1]?.id? '#C93832' : '#ffffff' }`, display: "flex", alignItems: "center"}}>{reference.sender === user[1]?.id ? 'Tu' : user[1]?.id } <ReplyRounded /></Typography>
                                    <Typography style={{ color: `${reference.sender === user[1]?.id? '#C93832' : '#ffffff' }`, }}>{reference.message}</Typography>
                                </div>
                            </div>}
                            {img && <img src={img} className="messageImage" />}
                            {message != "" && <Typography className="message" style={{ color: `${sender == user[1]?.id ? "#fff" : "#7a7a7a"}`, padding: `${img ? "5px 10px" : "0"}` }}>{message}</Typography>}
                            <Typography className="msgmetadata" style={{ color: `${sender == user[1]?.id ? "#fff" : "#7a7a7a"}`, padding: `${img ? "2.5px 10px" : "0"}`, justifyContent: `${sender == user[1]?.id ? "flex-end" : "flex-start"}`}}>
                                {getDateFromTimestamp(timestamp).date} | {getDateFromTimestamp(timestamp).hour}
                            </Typography>
                        </div>
                    </div>
                </React.Fragment>
            ) 
        }
        else{
            return (
                <div className="alertmessagecard"> 
                    <Typography className="alertmessage">{message}, Reiniciado: {getDateFromTimestamp(timestamp).date} | {getDateFromTimestamp(timestamp).hour}</Typography>
                </div>
            )
        }
        return <p>Nothing</p>
}

export default React.memo(MessageCard)