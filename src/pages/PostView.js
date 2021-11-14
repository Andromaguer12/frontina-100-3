import AudioComponent from '../components/Audio/AudioComponent'
import HomeHeader from '../components/HomePage/HomeHeader'
import fondo from '../Images/fondo.png'
import "../Styles/HomePage.css"
import "../Styles/Gallery.css"
import SwipeableViews from 'react-swipeable-views'
import { Button, Fab, Hidden, Typography } from '@material-ui/core'
import { ArrowBackIosOutlined, ArrowForwardIosOutlined, ErrorOutline, LinkOutlined } from '@material-ui/icons'
import NewsDots from '../components/HomePage/NewsDots'
import { CSSTransition } from 'react-transition-group'
import ZoomImage from '../components/Gallery/ZoomImage'
import { rdb } from '../services/firebase'
import { infoRef } from './AdminAppInfo'
import { particlesAnniversaryStyles, particlesChristmasStyles } from '../Styles/particlesStyles'
import Particles from 'react-particles-js'
import LoadingLazySpinner from '../components/HomePage/loadingLazySpinner'
import { useEffect, useState } from 'react'
import { GPref } from './HomePage'
import Post from '../components/HomePage/Post'
import AddComment from '../components/HomePage/AddComment'

export default function PostView() {
    const [hheight, sethheight] = useState(0)
    const headerHeight = (height) => sethheight(height);
    const [visualModes, setvisualModes] = useState({})
    const [PostID, setPostID] = useState("")
    const [PostData, setPostData] = useState(false)
    const [addComment, setaddComment] = useState(false)
    const [CurrentComments, setCurrentComments] = useState([])
    const [ImageIndex, setImageIndex] = useState(false)

    const [PostKey, setPostKey] = useState("")
    const [Error, setError] = useState(false)

    useEffect(() => {
        const href = window.location.href.substring(
            window.location.href.lastIndexOf("/")+1,
            window.location.href.length+1
        )
        setPostID(href)
    }, [])

    useEffect(() => {
        if(PostID.length > 0){
            GPref.doc(PostID).onSnapshot((state) => {
                if(state.exists){
                    setPostData({...state.data(), id: state.id})
                }
                else{
                    setError()
                }
            })
        }
    }, [PostID])

    useEffect(() => {
        rdb.ref().child('/visualModes').on("value", (id) => {
            setvisualModes(id.val())
        })
    }, [])

    const handleZoomImage = (index) => {
        setImageIndex(PostData.postImg);
    }
    return (
        <div style={{ display: "flex", flexFlow: "column", alignItems: "center", width: "100%", height: "100vh", backgroundImage: `url(${visualModes.navidad ? "" : fondo})`, backgroundColor: `${visualModes.navidad ? "#b8b8b8" : "yellow"}`, backgroundBlendMode: `${visualModes.aniversario ? "hard-light" : ""}` }}>
            <HomeHeader logo={visualModes.logo} pagePosition={null} hHeight={headerHeight} />
            {visualModes.navidad && <Particles params={particlesChristmasStyles} style={{ position: "absolute", left: "0", zIndex: "0"}}></Particles>}
            {visualModes.aniversario && <Particles params={particlesAnniversaryStyles} style={{ position: "absolute", left: "0", zIndex: "0"}}></Particles>}
            <div style={{ paddingTop: hheight+10, paddingBottom: hheight+10, width: "95%", display: "flex", flexFlow: "column", alignItems: "center", }}>
                <Hidden mdUp>
                    {PostData && <Post
                        addCommentF={(key, comments) => {setaddComment(!addComment); setPostKey(key); setCurrentComments(comments)}}
                        id={PostData.id}
                        GPref={GPref} 
                        position={PostData.position}
                        likedBy={PostData.likedBy}
                        imgData={PostData.postImg}
                        likes={PostData.likes}
                        comments={PostData.comments}
                        timestamp={PostData.timestamp}
                        comment={PostData.text} 
                        creator={PostData.creator}    
                        />}
                </Hidden>
                <Hidden smDown>
                    {PostData && <Post
                        biggestDisplay={true}
                        functionIMG={handleZoomImage}
                        addCommentF={(key, comments) => {setaddComment(!addComment); setPostKey(key); setCurrentComments(comments)}}
                        id={PostData.id}
                        GPref={GPref} 
                        position={PostData.position}
                        likedBy={PostData.likedBy}
                        imgData={PostData.postImg}
                        likes={PostData.likes}
                        comments={PostData.comments}
                        timestamp={PostData.timestamp}
                        comment={PostData.text} 
                        creator={PostData.creator}    
                    />}
                </Hidden>
                {Error && <div style={{ width: "100%", height: "100vh", display: "flex", flexFlow: "column", alignItems: "center"}}>
                    <Typography align="center" variant="h4" color="secondary" style={{ margin: "20px"}} >Publicacion No Encontrada.</Typography>
                    <ErrorOutline style={{ fontSize: "100"}} color="secondary" />
                    <Typography variant="h4" color="secondary" style={{ margin: "20px"}} >:(</Typography>
                    <Typography align="center" style={{ margin: "20px"}} >La publicacion que estas intentando ver, se ha borrado o no existio, por favor busca otra publicacion.</Typography>
                </div>}
            </div>
            <CSSTransition
                in={addComment}
                timeout={1000}
                classNames="Zoom-Image"
                unmountOnExit
            >
                <AddComment GPref={GPref} id={PostKey} ccomments={CurrentComments} cancel={() => setaddComment(false)}  />
            </CSSTransition>
            <CSSTransition
                in={ImageIndex}
                timeout={500}
                classNames="Zoom-Image"
                unmountOnExit
            >
                <ZoomImage image={ImageIndex} close={() => setImageIndex(false)} />    
            </CSSTransition>
        </div>
    )
}

