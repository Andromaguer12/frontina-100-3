import { Button, Popper, Typography } from '@material-ui/core'
import { ChatOutlined, ErrorOutline, RateReviewOutlined, ThumbUpOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useGoogleUser } from '../../services/reduxToolkit/userWithGoogle/selectors'
import '../../Styles/Posts.css'
import { CSSTransition } from "react-transition-group"
import { getDateFromTimestamp } from '../../functions/utils'

export default function Post({addCommentF, id, GPref, likedBy, imgData, likes, comments, timestamp, comment, creator}) {
    const googleUser = useSelector(useGoogleUser);
    const isLiked = likedBy.filter((user) => user.email == googleUser.currentUser[1].id)
    const [anchorEl, setanchorEl] = useState(null)
    const [fullComment, setfullComment] = useState(false)
    const [PopperMSG, setPopperMSG] = useState("")
    const open = Boolean(anchorEl);
    const handleAddLike = (e) => {
        const likedByCopy = likedBy

        if(isLiked.length == 0 && googleUser.currentUser[0] != null){
            if(!googleUser.currentUser[1].muted){
                likedByCopy.push({
                    email: googleUser.currentUser[1].id,
                    timestamp: new Date().getTime(),
                    image: googleUser.currentUser[0].user.photoURL,
                    name: googleUser.currentUser[0].user.displayName
                });
                GPref.doc(`${id}`).update({
                    likes: likes+1,
                    likedBy: likedByCopy
                })
            }
            else{
                setPopperMSG("Su usuario esta silenciado!")
                setanchorEl(open ? null : e.target);
                setTimeout(() => {
                    setanchorEl(null);
                }, 3500);    
            }
        }
        else if(googleUser.currentUser[0] == null){
            setPopperMSG("Necesita iniciar sesion para reaccionar!")
            setanchorEl(open ? null : e.target);
            setTimeout(() => {
                setanchorEl(null);
            }, 3500);
        }
    }
    const handleComments = (e) => {
        if(!googleUser.currentUser[1].muted){
            addCommentF(id, comments)
        }
        else{
            setPopperMSG("Su usuario esta silenciado!")
            setanchorEl(open ? null : e.target);
            setTimeout(() => {
                setanchorEl(null);
            }, 3500);
        }
    }
    const handleChatear = (e) => {
        document.getElementById("chatpopupinput")?.focus()
        if(googleUser.currentUser[0] == null) {
            setanchorEl(open ? null : e.target);
            setTimeout(() => {
                setanchorEl(null);
            }, 3500);
        }
    }
    return (
        <div className="postDiv">
            <div className="postHeader">
                <img src={creator.img} className="userPostImg" />
                <div style={{ display: "flex", flexFlow: "column", alignItems: "flex-start" }}>
                    <Typography style={{ fontSize: "14px", fontWeight: "bold" }} >{creator.name} | {creator.email}</Typography>
                    <div style={{ display: "flex", flexFlow: "row", alignItems: "flex-start" }}>
                        {creator.skills.map(skill => <Typography style={{ fontSize: "12.5px", marginRight: "10px", background: "#e7e7e7", borderRadius: "5px", padding: "2px" }}>{skill}</Typography>)}
                    </div>
                    <Typography style={{ fontSize: "12.5px", color: "#7a7a7a" }} >{getDateFromTimestamp(timestamp).date} | {getDateFromTimestamp(timestamp).hour}</Typography>
                </div>
            </div>
            <Typography style={{ padding: "5px 10px" }} >{fullComment ? comment : comment.substring(300, 0)}{comment.length > 300 && <Button variant="outlined" color="secondary" onClick={() => setfullComment(!fullComment)}>{fullComment ? "Leer Menos" : "Leer Mas"}</Button>}</Typography>
            <img src={imgData} className="postImage" loading="lazy" />
            <div className="postActions">
                <Popper open={open} anchorEl={anchorEl} placement="top">
                    <CSSTransition
                        in={true}
                        appear={true}
                        timeout={1000}
                        classNames="Content-load"
                    >
                        <div style={{ width: "fit-content", background: "#fff", boxShadow: "2px 2px 5px #7a7a7a", padding: "10px", borderRadius: "10px"}}>
                            <Typography color="secondary" style={{ width: "100%",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                                    {PopperMSG}
                                <ErrorOutline />
                            </Typography>
                        </div>
                    </CSSTransition>
                </Popper>
                <Button color={isLiked.length == 0 ? "" : "secondary"} startIcon={<ThumbUpOutlined />} style={{ width: "30%"}} onClick={handleAddLike} >Me Gusta: {likes}</Button>
                <Button startIcon={<RateReviewOutlined />} style={{ width: "30%"}} onClick={handleComments}>Comentar: {comments.length}</Button>
                <Button startIcon={<ChatOutlined />} style={{ width: "30%"}} onClick={handleChatear}>Chatear</Button>
            </div>
        </div>
    )
}
