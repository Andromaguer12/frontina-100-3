import React, { useEffect, useState } from 'react'
import AudioComponent from '../components/Audio/AudioComponent'
import HomeHeader from '../components/HomePage/HomeHeader'
import fondo from '../Images/fondo.png'
import "../Styles/HomePage.css"
import "../Styles/Gallery.css"
import "../Styles/StaffPage.css"
import NewsDots from '../components/HomePage/NewsDots'
import { CSSTransition } from 'react-transition-group'
import ZoomImage from '../components/Gallery/ZoomImage'
import { rdb } from '../services/firebase'
import { infoRef } from './AdminAppInfo'
import { CircularProgress, Typography } from '@material-ui/core'
import Particles from 'react-particles-js'
import { particlesAnniversaryStyles, particlesChristmasStyles } from '../Styles/particlesStyles'

export default function StaffPage() {
    const [Info, setInfo] = useState([])
    const [hheight, sethheight] = useState(0)
    const headerHeight = (height) => sethheight(height);
    const [ImageIndex, setImageIndex] = useState(false)
    const [visualModes, setvisualModes] = useState({})
    const [StreamID, setStreamID] = useState({});
    const streamRef = rdb.ref().child('/streamID');

    useEffect(() => {
        rdb.ref().child('/pagesVisitedByUsers').get().then((state) => {
            const value = state.val();
            rdb.ref().child('/pagesVisitedByUsers').update({
                staff: value.staff+1
            })
        })
    }, [])
    useEffect(() => {
        infoRef.doc("staff").collection("cont").onSnapshot((state) => {
            const docs = [];
            state.forEach((doc) => docs.push({...doc.data(), id: doc.id}))
            setInfo(docs)
        })
        rdb.ref().child('/visualModes').on("value", (id) => {
            setvisualModes(id.val())
        })
    }, [])
    return (
        <div style={{ display: "flex", flexFlow: "column", alignItems: "center", width: "100%", height: "100vh", backgroundImage: `url(${visualModes.navidad ? "" : fondo})`, backgroundColor: `${visualModes.navidad ? "#b8b8b8" : "yellow"}`, backgroundBlendMode: `${visualModes.aniversario ? "hard-light" : ""}` }}>
            <HomeHeader logo={visualModes.logo} pagePosition={4} hHeight={headerHeight} />
            {visualModes.navidad && <Particles params={particlesChristmasStyles} style={{ position: "absolute", left: "0", zIndex: "0"}}></Particles>}
            {visualModes.aniversario && <Particles params={particlesAnniversaryStyles} style={{ position: "absolute", left: "0", zIndex: "0"}}></Particles>}
            <CSSTransition
                in={Info.length > 0}
                appear={true}
                timeout={700}
                classNames="Content-load"
            >
                <React.Fragment>
                    <div className="maxStaffContainer" style={{ marginTop: hheight+20, overflow: "none", marginBottom: "30px", zIndex: "0", boxShadow: '0 0 10px #00000078' }}>
                        <div>
                            <Typography color="primary" variant="h4" style={{ width: "100%", marginBottom: "10px",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                                Nuestro Staff
                            </Typography>
                            <Typography color="primary" style={{ width: "100%", marginBottom: "10px",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                                Nuestro personal de cabina, productores y directivos trabajan arduamente para presentarles un producto de alta gama
                            </Typography>
                        </div>
                        <div className="staffContainer" style={{ overflow: "auto", maxHeight: "100%", background: "transparent", width: "100%"}}>
                            {
                                Info.map((person) => (
                                    <div className="personCard" onClick={() => setImageIndex(person)}>
                                        <img src={person.image} style={{ width: "100%", borderRadius: "10px" }} />
                                        <Typography align="center" style={{ width: "100%" }}>
                                            {person.title}
                                        </Typography>
                                    </div>
                                ))
                            }
                        </div>
                        {Info.length === 0 && <div style={{ width: "100%", height: "40vh", boxSizing: "border-box", display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center" }}>
                            <CircularProgress color="primary" />
                        </div>}
                    </div>
                </React.Fragment>
            </CSSTransition>
            
            <AudioComponent StreamID={StreamID} />
            <CSSTransition
                in={ImageIndex}
                timeout={500}
                classNames="Zoom-Image"
                unmountOnExit
            >
                <ZoomImage object={ImageIndex} close={() => setImageIndex(false)} />    
            </CSSTransition>
        </div>
    )
}
