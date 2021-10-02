import { Button, CircularProgress, Tab, Tabs, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { RANDOMID } from '../../functions/ChatObservers';
import { getDateFromTimestamp } from '../../functions/utils';
import { useGoogleUser } from '../../services/reduxToolkit/userWithGoogle/selectors';
import Feed from './Feed';

export default function AddComment({cancel, GPref, id, ccomments}) {
    const [Error, setError] = useState(false)
    const [Loading, setLoading] = useState(false)
    const googleUser = useSelector(useGoogleUser);
    const [tabsValue, setTabsValue] = useState(0)
    const handleNewComment = (e) => {
        var commentscopy = ccomments;
        e.preventDefault();
        const form = new FormData(e.target)
        if(googleUser.currentUser[0] != null){
            setLoading(true);
            commentscopy.push({
                comment: form.get("comment"),
                timestamp: new Date().getTime(),
                sender: {
                    img: googleUser.currentUser[0].user.photoURL,
                    name: googleUser.currentUser[1].name,
                    email: googleUser.currentUser[1].id,
                }
            })
            if(form.get("comment")){
                console.log(commentscopy)    
                GPref.doc(`${id}`).update({
                    comments: commentscopy
                }).then(() => {e.target.reset(); setLoading(false);})
            }
            else{
                setLoading(false);
                setError(true);
                setTimeout(() => {
                    setError(false)
                }, 3000);
            }
        }
        else{
            const random = RANDOMID("AXBSAOWHRkahsdhqwijdajpkbko-12937251479", 15);
            setLoading(true);
            commentscopy.push({
                comment: form.get("comment"),
                timestamp: new Date().getTime(),
                sender: {
                    img: "https://firebasestorage.googleapis.com/v0/b/frontina-100-3.appspot.com/o/userX.png?alt=media&token=7cd3b4d3-1715-42dd-b39a-3f843be281fe",
                    name: `Usuario`,
                    email: `${random}`,
                }
            })
            if(form.get("comment")){
                console.log(commentscopy)    
                GPref.doc(`${id}`).update({
                    comments: commentscopy
                }).then(() => {e.target.reset(); setLoading(false);})
            }
            else{
                setLoading(false);
                setError(true);
                setTimeout(() => {
                    setError(false)
                }, 3000);
            }
        }
    }
    return (
        <div className="zoomShadow">
            <div className="addCommentdiv">
                <Tabs style={{ width: "100%", marginBottom: "20px" }} variant="scrollable" value={tabsValue} onChange={(e, newValue) => setTabsValue(newValue)} textColor="secondary" indicatorColor="secondary" scrollButtons="auto">
                    <Tab label="Enviar Comentario" value={0} />
                    <Tab label={`Ver los comentarios (${ccomments.length})`} value={1} />
                </Tabs>
                <Feed style={{ width: "100% "}} choosedContent={true} value={tabsValue} index={0}>
                    <Typography variant="h4" color="secondary">Añadir Comentario</Typography>
                    <CSSTransition
                        in={Error}
                        timeout={1000}
                        classNames="Zoom-Image"
                        unmountOnExit
                    >
                        <Typography color="secondary">No puede enviar un comentario vacio!</Typography>
                    </CSSTransition>
                    <Typography style={{ alignSelf: "flex-start", marginTop: "20px"}}>Añade un comentario y/o da tu opinion</Typography>
                    <form id="commentForm" style={{ width: "100%" }} onSubmit={handleNewComment}>
                        <TextField name="comment" style={{ margin: "10px 0" }} multiline fullWidth color="secondary"  variant="outlined" label="Comentario" size="small" />
                        <div className="commentsButtons" style={{ width: '100%', display: "flex", flexFlow: "row", alignItems: "center", justifyContent: "space-between"}}>
                            <Button color="secondary" variant="outlined" onClick={cancel}>
                                Cerrar
                            </Button>
                            <Button color="secondary" variant="contained" type="submit">
                                {Loading ? <CircularProgress /> : "Aceptar"}
                            </Button>
                        </div>
                    </form>
                </Feed>
                <Feed style={{ width: "100%" }} choosedContent={true} value={tabsValue} index={1}>
                    <div className="commentsContainer">
                        {
                            ccomments.map((comment, index) => {
                                const date = new Date(comment.timestamp);
                                return <div className="commentCard" style={{ background: `${index % 2 == 0 ? "#e7e7e7": "#fff"}`, borderRadius: "10px" }}>
                                    <div className="postHeader">
                                        <img src={comment.sender.img} className="userPostImg" style={{ background: "transparent"}} />
                                        <div style={{ display: "flex", flexFlow: "column", alignItems: "flex-start" }}>
                                            <Typography style={{ fontSize: "14px", fontWeight: "bold" }} >{comment.sender.name} | {comment.sender.email}</Typography>
                                            <Typography style={{ fontSize: "12.5px", color: "#7a7a7a" }} >{getDateFromTimestamp(comment.timestamp).date} | {getDateFromTimestamp(comment.timestamp).hour}</Typography>
                                        </div>
                                    </div>
                                    <Typography style={{ padding: "5px 20px"}}>{comment.comment}</Typography>
                                </div>
                            })
                        }
                    </div>
                    <div className="commentsButtons" style={{ width: '100%', display: "flex", flexFlow: "row", alignItems: "center", justifyContent: "space-between"}}>
                            <Button color="secondary" variant="outlined" onClick={cancel}>
                                Cerrar
                            </Button>
                        </div>
                </Feed>
            </div>
        </div>
    )
}
