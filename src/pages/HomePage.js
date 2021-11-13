import React, { lazy, Suspense, useEffect, useState } from 'react'
import FirstFace from '../components/HomePage/firstFace'
import HomeHeader from '../components/HomePage/HomeHeader'
import fondo from '../Images/fondo.png'
import Feed from '../components/HomePage/Feed'
import "../Styles/Gallery.css"
import { ErrorOutline, PersonOutline } from '@material-ui/icons'
import { CircularProgress, Tab, Tabs, Typography } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import PostsAside from '../components/HomePage/PostsAside'
import AudioComponent from '../components/Audio/AudioComponent'
import { CSSTransition } from 'react-transition-group'
import db, { rdb } from '../services/firebase'
import AddComment from '../components/HomePage/AddComment'
import Footer from '../components/HomePage/Footer'
import Particles from 'react-particles-js'
import {particlesChristmasStyles, particlesAnniversaryStyles} from '../Styles/particlesStyles'
import { yellow } from '@material-ui/core/colors'
import SeeMore from '../components/HomePage/SeeMore'

export const categories = ["Ultima Hora", "Politica", "Economia", "Tecnologia", "Internacional", "Espectaculo", "Deportes", "Gastronomia"]
export const GPref = db.collection("Publicaciones").doc('global').collection("cont");

export default function HomePage() {
    const [hheight, sethheight] = useState(0)
    const [tabsValue, setTabsValue] = useState(0)
    const [PostsDinamic, setPostsDinamic] = useState(false)
    const Post = lazy(() => import("../components/HomePage/Post"));
    const [StreamID, setStreamID] = useState({});
    const streamRef = rdb.ref().child('/streamID');
    const [Posts, setPosts] = useState([]);
    const [GPosts, setGPosts] = useState([]);
    const pRef = db.collection("Publicaciones").doc('firstFace').collection("cont");
    const [addComment, setaddComment] = useState(false)
    const [PostKey, setPostKey] = useState("")
    const [CurrentComments, setCurrentComments] = useState([])
    const [visualModes, setvisualModes] = useState({})

    const headerHeight = (height) => sethheight(height);

    window.addEventListener("scroll", () => {
        if(window.scrollY >= 110) {
            setPostsDinamic(true)
        }
        else if(window.scrollY < 110) setPostsDinamic(false)
    })
    useEffect(() => {
        streamRef.on("value", (id) => {
            setStreamID(id.val())
        })
    }, [])

    
    useEffect(() => {
        pRef.onSnapshot((state) => {
            const docs = [];
            state.forEach((doc) => docs.push({...doc.data(), id: doc.id}))
            setPosts(docs)
        })
    }, [])
    useEffect(() => {
        GPref.onSnapshot((state) => {
            const docs = [];
            state.forEach((doc) => docs.push({...doc.data(), id: doc.id}))
            setGPosts(docs)
        })
    }, [])
    useEffect(() => {
        rdb.ref().child('/pagesVisitedByUsers').get().then((state) => {
            const value = state.val();
            rdb.ref().child('/pagesVisitedByUsers').update({
                inicio: value.inicio+1
            })
        })
        rdb.ref().child('/visualModes').on("value", (id) => {
            setvisualModes(id.val())
        })
    }, [])

    return (
        <div style={{ width: "100%", height: "100vh", backgroundImage: `url(${visualModes.navidad ? "" : fondo})`, backgroundColor: `${!visualModes.aniversario ? "#b8b8b8" : "yellow"}`, backgroundBlendMode: `${visualModes.aniversario ? "hard-light" : ""}` }}>
            {visualModes.navidad && <Particles params={particlesChristmasStyles} style={{ position: "absolute"}}></Particles>}
            {visualModes.aniversario && <Particles params={particlesAnniversaryStyles} style={{ position: "absolute"}}></Particles>}
            <HomeHeader logo={visualModes.logo} pagePosition={0} hHeight={headerHeight} />
            <div className="homePageContainer" style={{ paddingTop: hheight+10 }}>
                {Posts.length > 0 ? <CSSTransition
                    in={true}
                    appear={true}
                    timeout={1000}
                    classNames="Content-load"
                >
                    <FirstFace data={Posts} />
                </CSSTransition> : <div style={{ width: "100%", height: "50vh", boxSizing: "border-box", display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center" }}>
                        <ErrorOutline style={{ fontSize: "60", color: "#7a7a7a" }} />
                        <Typography variant="h4" style={{ color: "#7a7a7a" }}> Nada por aqui! </Typography>
                    </div>}
                <Feed>
                    <div className="postsContainer">
                            <Tabs style={{ width: "100%", boxSizing: "border-box" }} variant="scrollable" value={tabsValue} onChange={(e, newValue) => setTabsValue(newValue)} textColor="secondary" indicatorColor="secondary" scrollButtons="auto" >
                                {
                                    categories.map((c, index) => (
                                        <Tab label={c} value={index} />
                                    ))
                                }
                            </Tabs>
                                <React.Fragment>
                                    <div style={{ width: "100%" }}>
                                        <SwipeableViews index={tabsValue} enableMouseEvents onChangeIndex={(value) => setTabsValue(value)}>
                                            {
                                                categories.map((cate, index) => (
                                                    <CSSTransition
                                                        in={PostsDinamic}
                                                        timeout={1000}
                                                        classNames="Post-Load"
                                                        unmountOnExit
                                                    >
                                                    <Feed choosedContent={true} value={tabsValue} index={index}>
                                                        {GPosts.filter((post) => post.contentType === cate).length >= 1 ? 
                                                            <React.Fragment>
                                                                {GPosts.filter((post) => post.contentType === cate).sort((p, n) => {
                                                                    return p.timestamp - n.timestamp
                                                                }).reverse().map((postdata) => {
                                                                    return (
                                                                            <Suspense fallback={<div style={{ width: "100%", height: "40vh", boxSizing: "border-box", display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center" }}>
                                                                                <CircularProgress color="secondary" />
                                                                            </div>}>
                                                                                    <Post
                                                                                        addCommentF={(key, comments) => {setaddComment(!addComment); setPostKey(key); setCurrentComments(comments)}}
                                                                                        id={postdata.id}
                                                                                        GPref={GPref} 
                                                                                        position={postdata.position}
                                                                                        likedBy={postdata.likedBy}
                                                                                        imgData={postdata.postImg}
                                                                                        likes={postdata.likes}
                                                                                        comments={postdata.comments}
                                                                                        timestamp={postdata.timestamp}
                                                                                        comment={postdata.text} 
                                                                                        creator={postdata.creator}    
                                                                                    />
                                                                            </Suspense>
                                                                    )
                                                                })}
                                                            </React.Fragment> : <div style={{ width: "100%", height: "50vh", boxSizing: "border-box", display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center" }}>
                                                                <ErrorOutline style={{ fontSize: "60", color: "#7a7a7a" }} />
                                                                <Typography variant="h4" style={{ color: "#7a7a7a" }}> Nada por aqui! </Typography>
                                                            </div>

                                                        }
                                                    </Feed>
                                                    </CSSTransition>
                                                ))
                                            }
                                        </SwipeableViews>
                                    </div>
                                    </React.Fragment>
                        </div>
                    <div className="asideContainer">
                        <div style={{ width: "100%" }}>
                            <PostsAside tabsF={(value) => setTabsValue(value)} postData={GPosts} chatDinamic={PostsDinamic} />
                        </div>
                    </div>
                </Feed>
            </div>
            {/* <CSSTransition
                in={true}
                appear={true}
                timeout={1000}
                classNames="Audio-Comp"
            >
                <AudioComponent StreamID={StreamID} />
            </CSSTransition> */}
            <CSSTransition
                in={addComment}
                timeout={1000}
                classNames="Zoom-Image"
                unmountOnExit
            >
                <AddComment GPref={GPref} id={PostKey} ccomments={CurrentComments} cancel={() => setaddComment(false)}  />
            </CSSTransition>
            <Footer />
        </div>
    )
}
