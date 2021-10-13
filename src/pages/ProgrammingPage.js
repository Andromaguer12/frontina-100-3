import React, { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import ProgrammingTable from '../components/Admin/ProgrammingTable';
import HomeHeader from '../components/HomePage/HomeHeader'
import fondo from '../Images/fondo.png'
import AudioComponent from "../components/Audio/AudioComponent"
import { rdb } from '../services/firebase';
import { Hidden, Typography } from '@material-ui/core';
import Particles from 'react-particles-js';
import { particlesAnniversaryStyles, particlesChristmasStyles } from '../Styles/particlesStyles';
import { History, Timelapse, TimelapseOutlined, Timeline, TimelineOutlined } from '@material-ui/icons';
import { usableIcons } from '../components/Admin/AboutUsAdmin';


export default function ProgrammingPage() {
    const [hheight, sethheight] = useState(0)
    const headerHeight = (height) => sethheight(height);
    const [StreamID, setStreamID] = useState({});
    const [visualModes, setvisualModes] = useState({})
    const streamRef = rdb.ref().child('/streamID');

    useEffect(() => {
        streamRef.on("value", (id) => {
            setStreamID(id.val())
        })
    }, [])
    useEffect(() => {
        rdb.ref().child('/pagesVisitedByUsers').get().then((state) => {
            const value = state.val();
            rdb.ref().child('/pagesVisitedByUsers').update({
                programacion: value.programacion+1
            })
        })
        rdb.ref().child('/visualModes').on("value", (id) => {
            setvisualModes(id.val())
        })
    }, [])
    return (
        <div style={{ display: "flex", flexFlow: "column", alignItems: "center", width: "100%", height: "100vh", backgroundImage: `url(${visualModes.navidad ? "" : fondo})`, backgroundColor: `${visualModes.navidad ? "#b8b8b8" : "yellow"}`, backgroundBlendMode: `${visualModes.aniversario ? "hard-light" : ""}` }}>
            <HomeHeader logo={visualModes.logo} pagePosition={1} hHeight={headerHeight} />
            {visualModes.navidad && <Particles params={particlesChristmasStyles} style={{ position: "absolute", left: "0", zIndex: "0"}}></Particles>}
            {visualModes.aniversario && <Particles params={particlesAnniversaryStyles} style={{ position: "absolute", left: "0", zIndex: "0"}}></Particles>}
            <div className="Programming" style={{ marginTop: hheight+20, boxSizing: "border-box", zIndex: "1", display: "flex", flexFlow: "column", alignItems: "center", boxShadow: '0 0 10px #00000078', padding: "10px", overflow: "auto", background: "#0000007a", borderRadius: "10px" }}>
                <Typography align="center" color="primary" variant="h4" style={{ marginTop: "20px", display: "flex", alignItems: "center", flexFlow: "row"}}>Programacion de la semana <History style={{ margin: "0 10px"}} fontSize="large" /></Typography>
                <Typography align="center" color="primary" style={{ width: "100%", fontSize: "14px", margin: "20px 0"  }}>Para que nunca te pierdas la tu programa favorito, Frontina 100.3 FM tu mejor compañia!</Typography>
                <div style={{ width: "100%", maxWidth: "100%", overflow: "auto"}}>
                    <ProgrammingTable hideConfig={true} style={{ paddingTop: hheight+20, marginBottom: "30px", width: "100%", overflowX: "auto" }} />
                </div>
            </div>
            <Hidden xsDown>
                <CSSTransition
                    in={true}
                    appear={true}
                    timeout={1000}
                    classNames="Audio-Comp"
                >
                    <AudioComponent StreamID={StreamID} />
                </CSSTransition>
            </Hidden>
        </div>
    )
}
