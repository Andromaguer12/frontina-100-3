import { Button, CircularProgress, IconButton, Popper, Tab, Tabs, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { getDateFromTimestamp } from '../../functions/utils';
import { useGoogleUser } from '../../services/reduxToolkit/userWithGoogle/selectors';
import Feed from "../../components/HomePage/Feed"
import "../../Styles/HomePage.css"
import "../../Styles/Gallery.css"
import "../../Styles/Posts.css"
import { Delete, ErrorOutline } from '@material-ui/icons';

export default function PostCLAdmin({cancel, GPref, id, pLikes, ccomments}) {
    const [Error, setError] = useState(false)
    const [Loading, setLoading] = useState(false)
    const googleUser = useSelector(useGoogleUser);
    const [tabsValue, setTabsValue] = useState(0)
    const [PopperMSG, setPopperMSG] = useState("")
    const [anchorEl, setanchorEl] = useState(null);
    const [DelId, setDelId] = useState(null)
    const open = Boolean(anchorEl);
   
    const handleDeleteComment = (index) => {
        var ccopy = ccomments;
        ccopy.splice(index, 1);
        GPref.doc(`${id}`).update({comments: ccopy}).then(() => {
            setanchorEl(null)
        })
    }

    return (
        <div className="zoomShadow">
            <div className="addCommentdiv">
                <Tabs style={{ width: "100%", marginBottom: "20px" }} variant="scrollable" value={tabsValue} onChange={(e, newValue) => setTabsValue(newValue)} textColor="secondary" indicatorColor="secondary" scrollButtons="auto">
                    <Tab label="Likes" value={0} />
                    <Tab label={`Ver los comentarios (${ccomments.length})`} value={1} />
                </Tabs>
                <Feed style={{ width: "100% "}} choosedContent={true} value={tabsValue} index={0}>
                <div className="commentsContainer">
                        <Typography color="secondary" variant="h5" style={{ alignSelf: "flex-start"}} >Personas que le dieron Like:</Typography>
                        {
                            pLikes.map((like, index) => {
                                return <div className="commentCard">
                                    <div className="postHeader" style={{ background: `${index % 2 == 0 ? "#e7e7e7": "#fff"}`, borderRadius: "10px" }}>
                                        <img src={like.image} className="userPostImg" style={{ background: "transparent"}} />
                                        <div style={{ display: "flex", flexFlow: "column", alignItems: "flex-start" }}>
                                            <Typography style={{ fontSize: "14px", fontWeight: "bold" }} >{like.name} | {like.email}</Typography>
                                            <Typography style={{ fontSize: "12.5px", color: "#7a7a7a" }} >Likeo el dia: {getDateFromTimestamp(like.timestamp).date}|{getDateFromTimestamp(like.timestamp).hour}</Typography>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div style={{ width: '100%', display: "flex", flexFlow: "row", alignItems: "center", justifyContent: "space-between"}}>
                            <Button color="secondary" variant="outlined" onClick={cancel}>
                                Cerrar
                            </Button>
                        </div>
                </Feed>
                <Feed style={{ width: "100%" }} choosedContent={true} value={tabsValue} index={1}>
                    <div className="commentsContainer">
                        <Popper open={open} anchorEl={anchorEl} placement="top" style={{ zIndex: "2" }}>
                            <CSSTransition
                                in={true}
                                appear={true}
                                timeout={1000}
                                classNames="Content-load"
                            >
                                <div style={{ width: "fit-content", background: "#fff", boxShadow: "2px 2px 5px #7a7a7a", padding: "10px", borderRadius: "10px"}}>
                                    <Typography color="secondary" style={{ width: "100%",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                                            ¿Esta seguro de eliminar este comentario?
                                        <ErrorOutline />
                                    </Typography>
                                    <div style={{ width: "100%", marginTop: "10px", display: "flex", flexFlow: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <Button color="secondary" variant="outlined" onClick={(e) => setanchorEl(open ? null : e.target)}>
                                            Cerrar
                                        </Button>
                                        <Button color="secondary" variant="contained" onClick={() => handleDeleteComment(DelId)}>
                                            Aceptar
                                        </Button>
                                    </div>
                                </div>
                            </CSSTransition>
                        </Popper>
                        {
                            ccomments.map((comment, commentindex) => {
                                const date = new Date(comment.timestamp);
                                return <div className="commentCard" style={{ background: `${commentindex % 2 == 0 ? "#e7e7e7": "#fff"}`, borderRadius: "10px" }}>
                                    <div className="postHeader" style={{ justifyContent: "space-between"}}>
                                        <div className="commentCard" style={{ flexFlow: "row", justifyContent: "flex-start", alignItems: "center"}}>
                                            <img src={comment.sender.img} className="userPostImg" style={{ background: "transparent"}} />
                                            <div style={{ display: "flex", flexFlow: "column", alignItems: "flex-start" }}>
                                                <Typography style={{ fontSize: "14px", fontWeight: "bold" }} >{comment.sender.name} | {comment.sender.email}</Typography>
                                                <Typography style={{ fontSize: "12.5px", color: "#7a7a7a" }} >Comento el dia: {getDateFromTimestamp(comment.timestamp).date} | {getDateFromTimestamp(comment.timestamp).hour}</Typography>
                                            </div>
                                        </div>
                                        <IconButton color="secondary" onClick={(e) => {setanchorEl(open ? null : e.target); setDelId(commentindex)}}>
                                            <Delete />
                                        </IconButton>
                                    </div>
                                    <Typography style={{ padding: "5px 20px"}}>{comment.comment}</Typography>
                                </div>
                            })
                        }
                    </div>
                    <div style={{ width: '100%', display: "flex", flexFlow: "row", alignItems: "center", justifyContent: "space-between"}}>
                            <Button color="secondary" variant="outlined" onClick={cancel}>
                                Cerrar
                            </Button>
                        </div>
                </Feed>
            </div>
        </div>
    )
}
