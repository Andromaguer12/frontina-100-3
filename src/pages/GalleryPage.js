import React, { useEffect, useState } from 'react'
import AudioComponent from '../components/Audio/AudioComponent'
import HomeHeader from '../components/HomePage/HomeHeader'
import fondo from '../Images/fondo.png'
import "../Styles/HomePage.css"
import "../Styles/Gallery.css"
import SwipeableViews from 'react-swipeable-views'
import { Button, Fab, Hidden, Typography } from '@material-ui/core'
import { ArrowBackIosOutlined, ArrowForwardIosOutlined, LinkOutlined } from '@material-ui/icons'
import NewsDots from '../components/HomePage/NewsDots'
import { CSSTransition } from 'react-transition-group'
import ZoomImage from '../components/Gallery/ZoomImage'
import { rdb } from '../services/firebase'
import { infoRef } from './AdminAppInfo'
import { particlesAnniversaryStyles, particlesChristmasStyles } from '../Styles/particlesStyles'
import Particles from 'react-particles-js'

export default function GalleryPage() {
    const [hheight, sethheight] = useState(0)
    const [NavigationIndex, setNavigationIndex] = useState(0)
    const [ImageIndex, setImageIndex] = useState(false)
    const [StreamID, setStreamID] = useState({});
    const headerHeight = (height) => sethheight(height);
    const streamRef = rdb.ref().child('/streamID');
    const [Departments, setDepartments] = useState([])
    const [visualModes, setvisualModes] = useState({})




    const handleZoomImage = (index) => {
        setImageIndex(Departments[index].image);
    }
    useEffect(() => {
        streamRef.on("value", (id) => {
            setStreamID(id.val())
        })
    }, [])
    useEffect(() => {
        rdb.ref().child('/pagesVisitedByUsers').get().then((state) => {
            const value = state.val();
            rdb.ref().child('/pagesVisitedByUsers').update({
                galeria: value.galeria+1
            })
        })
    }, [])
    useEffect(() => {
        infoRef.doc("gallery").collection("cont").onSnapshot((state) => {
            const docs = [];
            state.forEach((doc) => docs.push({...doc.data(), id: doc.id}))
            setDepartments(docs)
        })
        rdb.ref().child('/visualModes').on("value", (id) => {
            setvisualModes(id.val())
        })
    }, [])

    return (
        <div style={{ display: "flex", flexFlow: "column", alignItems: "center", width: "100%", height: "100vh", backgroundImage: `url(${visualModes.navidad ? "" : fondo})`, backgroundColor: `${visualModes.navidad ? "#b8b8b8" : "yellow"}`, backgroundBlendMode: `${visualModes.aniversario ? "hard-light" : ""}` }}>
            <HomeHeader logo={visualModes.logo}  pagePosition={3} hHeight={headerHeight} />
            {visualModes.navidad && <Particles params={particlesChristmasStyles} style={{ position: "absolute", left: "0", zIndex: "0"}}></Particles>}
            {visualModes.aniversario && <Particles params={particlesAnniversaryStyles} style={{ position: "absolute", left: "0", zIndex: "0"}}></Particles>}
            <CSSTransition
                in={true}
                appear={true}
                timeout={700}
                classNames="Content-load"
            >
                <React.Fragment>
                    <div className="galleryContent" style={{ paddingTop: hheight+20, marginBottom: "30px", zIndex: "0" }}>
                        <Hidden xsDown>
                            <Fab onClick={() => setNavigationIndex(NavigationIndex == 0 ? 0 : NavigationIndex-1)}>
                                <ArrowBackIosOutlined color="secondary" />
                            </Fab>
                        </Hidden>
                        <div className="swiper" id="galleryswiper">
                            <SwipeableViews index={NavigationIndex} enableMouseEvents>
                                {
                                    Departments.map((file, index) => (
                                        <div className="fileCard">
                                            <div className="imggallery" style={{ position: "relative", boxSizing: "border-box", background: "#e7e7e7", borderRadius: "10px 0 0 10px", height: "100%", display: "flex", flexFlow: "row", alignItems: "center", justifyContent: "center" }}>
                                                <img src={file.image} className="fileCardStyle" />
                                                <div className="imagesShadow" onClick={() => handleZoomImage(index)}>
                                                    <Typography color="primary" variant="h4">
                                                        Ampliar Imagen
                                                    </Typography>
                                                </div>
                                            </div>
                                            <div className="imggallery" style={{ boxSizing: "border-box",  maxHeight: "30vh", overflow: "auto", boxShadow: "-2px 0 10px #7a7a7a", padding: "20px", height: "70vh", display: "flex", flexFlow: "column", alignItems: "center" }}>
                                                <Hidden xsDown>
                                                    <Typography color="secondary" variant="h4">
                                                        {file.title}
                                                    </Typography>
                                                </Hidden>
                                                <Hidden smUp>
                                                    <Typography color="secondary">
                                                        {file.title}
                                                    </Typography>
                                                </Hidden>
                                                <Typography style={{ fontSize: "15px", marginTop: "20px", color: "#7a7a7a"  }}>
                                                    {file.info}
                                                </Typography>
                                                {file.link && <Button href={file.link} color="secondary" endIcon={<LinkOutlined />}>
                                                    Leer mas...
                                                </Button>}
                                            </div>
                                        </div>
                                    ))
                                }
                            </SwipeableViews>
                        </div>

                        <Hidden xsDown>
                            <Fab onClick={() => setNavigationIndex(NavigationIndex == Departments.length-1 ? Departments.length-1 : NavigationIndex+1)}>
                                <ArrowForwardIosOutlined color="secondary" />
                            </Fab>
                        </Hidden>
                    </div>
                    <NewsDots length={Departments} index={NavigationIndex} />
                </React.Fragment>
            </CSSTransition>
            <AudioComponent StreamID={StreamID} />
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
