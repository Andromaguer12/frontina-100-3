import { Button, Popper, Typography } from '@material-ui/core'
import { ChatOutlined, ErrorOutline, RateReviewOutlined, Share, ThumbUpOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useGoogleUser } from '../../services/reduxToolkit/userWithGoogle/selectors'
import '../../Styles/Posts.css'
import "../../Styles/Gallery.css"
import { CSSTransition } from "react-transition-group"
import { getDateFromTimestamp } from '../../functions/utils'
import ShareDiv from './ShareDiv'
import ZoomImage from '../Gallery/ZoomImage'

export default function Post({addCommentF, functionIMG, biggestDisplay, id, GPref, likedBy, imgData, likes, comments, timestamp, comment, creator}) {
    const googleUser = useSelector(useGoogleUser);
    const isLiked = likedBy.filter((user) => user.email == googleUser.currentUser[1].id)
    const [anchorEl, setanchorEl] = useState(null)
    const [fullComment, setfullComment] = useState(false)
    const [PopperMSG, setPopperMSG] = useState("")
    const open = Boolean(anchorEl);

    const [SharePopper, setSharePopper] = useState(false)
    const open1 = Boolean(SharePopper);

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
    
    if(biggestDisplay){
        return (
            <div className="postDiv" style={{ width: "80%", height: '70vh', justifyContent: "space-between", flexFlow: "row"}}>
                <div className="imggallery" style={{ width: "70%", position: "relative", boxSizing: "border-box", background: "#e7e7e7", borderRadius: "10px 0 0 10px", height: "100%", display: "flex", flexFlow: "row", alignItems: "center", justifyContent: "center" }}>
                    <img src={imgData} loading="lazy" className="fileCardStyle" style={{ width: "70%"}} />
                    <div className="imagesShadow" onClick={functionIMG}>
                        <Typography color="primary" variant="h4">
                            Ampliar Imagen
                        </Typography>
                    </div>
                </div>
                <div className="postHeaderRight">
                    <div className="postHeader" style={{ justifyContent: "space-between"}}>
                            <img src={creator.img} className="userPostImg" style={{ width: "20%"}} />
                            <div style={{ display: "flex", flexFlow: "column", alignItems: "flex-start", width: "80%" }}>
                                <Typography style={{ fontSize: "14px", fontWeight: "bold" }} >Frontina FM</Typography>
                                <div style={{ display: "flex", flexFlow: "row", alignItems: "flex-start" }}>
                                    {creator.skills.map(skill => <Typography style={{ fontSize: "12.5px", marginRight: "10px", background: "#e7e7e7", borderRadius: "5px", padding: "2px" }}>{skill}</Typography>)}
                                </div>
                                <Typography style={{ fontSize: "12.5px", color: "#7a7a7a" }} >{getDateFromTimestamp(timestamp).date} | {getDateFromTimestamp(timestamp).hour}</Typography>
                            </div>
                    </div>
                    <div style={{ maxHeight: "47.5vh", overflow: "auto" }}>
                        <Typography style={{ padding: "5px 10px" }} >{comment}</Typography>            
                    </div>
                    <div className="postActions">
                        <Popper open={open} anchorEl={anchorEl} placement="top" style={{ zIndex: "3"}}>
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
                        <Popper open={open1} anchorEl={SharePopper} placement="top" style={{ zIndex: "3"}}>
                            <ShareDiv url={id} subject={comment} close={(e) => setSharePopper(open1 ? null : e.target)} />
                        </Popper>
                        <Button color={isLiked.length == 0 ? "" : "secondary"} startIcon={<ThumbUpOutlined />} style={{ width: "30%"}} onClick={handleAddLike} >Me Gusta: {likes}</Button>
                        <Button startIcon={<RateReviewOutlined />} style={{ width: "30%"}} onClick={handleComments}>Comentar: {comments.length}</Button>
                        <Button startIcon={<Share />} style={{ width: "30%"}} onClick={(e) => setSharePopper(open1 ? null : e.target)}>Compartir</Button>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="postDiv">
            <div className="postHeader">
                <img src={creator.img} className="userPostImg" />
                <div style={{ display: "flex", flexFlow: "column", alignItems: "flex-start" }}>
                    <Typography style={{ fontSize: "14px", fontWeight: "bold" }} >Frontina FM</Typography>
                    <div style={{ display: "flex", flexFlow: "row", alignItems: "flex-start" }}>
                        {creator.skills.map(skill => <Typography style={{ fontSize: "12.5px", marginRight: "10px", background: "#e7e7e7", borderRadius: "5px", padding: "2px" }}>{skill}</Typography>)}
                    </div>
                    <Typography style={{ fontSize: "12.5px", color: "#7a7a7a" }} >{getDateFromTimestamp(timestamp).date} | {getDateFromTimestamp(timestamp).hour}</Typography>
                </div>
            </div>
            <Typography style={{ padding: "5px 10px" }} >{fullComment ? comment : comment.substring(300, 0)}{comment.length > 300 && <Button variant="outlined" color="secondary" onClick={() => setfullComment(!fullComment)}>{fullComment ? "Leer Menos" : "Leer Mas"}</Button>}</Typography>
            <img src={imgData} className="postImage" loading="lazy" />
            <div className="postActions">
                <Popper open={open} anchorEl={anchorEl} placement="top" style={{ zIndex: "3"}}>
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
                <Popper open={open1} anchorEl={SharePopper} placement="top" style={{ zIndex: "3"}}>
                    <ShareDiv url={id} subject={comment} close={(e) => setSharePopper(open1 ? null : e.target)} />
                </Popper>
                <Button color={isLiked.length == 0 ? "" : "secondary"} startIcon={<ThumbUpOutlined />} style={{ width: "30%"}} onClick={handleAddLike} >Me Gusta: {likes}</Button>
                <Button startIcon={<RateReviewOutlined />} style={{ width: "30%"}} onClick={handleComments}>Comentar: {comments.length}</Button>
                <Button startIcon={<Share />} style={{ width: "30%"}} onClick={(e) => setSharePopper(open1 ? null : e.target)}>Compartir</Button>
            </div>
        </div>
    )
}
