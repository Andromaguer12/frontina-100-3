import React, { useEffect, useState } from 'react'
import AudioComponent from '../components/Audio/AudioComponent'
import HomeHeader from '../components/HomePage/HomeHeader'
import "../Styles/HomePage.css"
import "../Styles/AboutUs.css"
import fondo from '../Images/santodomingo.jpg'
import { Button, CircularProgress, Hidden, List, ListItem, ListItemIcon, ListItemText, Tab, Tabs, Typography } from '@material-ui/core'
import { ErrorOutline, Link } from "@material-ui/icons"
import { ApartmentOutlined, FlagOutlined, History } from '@material-ui/icons'
import { rdb } from '../services/firebase'
import Feed from '../components/HomePage/Feed'
import { infoRef } from './AdminAppInfo'
import { usableIcons } from '../components/Admin/AboutUsAdmin'
import { particlesAnniversaryStyles, particlesChristmasStyles } from '../Styles/particlesStyles'
import Particles from 'react-particles-js'
import SwipeableViews from 'react-swipeable-views'
import { CSSTransition } from 'react-transition-group'


export default function AboutUsPage() {
    const [hheight, sethheight] = useState(0)
    const [StreamID, setStreamID] = useState({});
    const streamRef = rdb.ref().child('/streamID');
    const [infoIndex, setinfoIndex] = useState(0)
    const [Departments, setDepartments] = useState([])
    const [visualModes, setvisualModes] = useState({})
    const [tabsValue, settabsValue] = useState(0)


    const headerHeight = (height) => sethheight(height);
    useEffect(() => {
        streamRef.on("value", (id) => {
            setStreamID(id.val())
        })
    }, [])
    useEffect(() => {
        rdb.ref().child('/pagesVisitedByUsers').get().then((state) => {
            const value = state.val();
            rdb.ref().child('/pagesVisitedByUsers').update({
                sobreNosotros: value.sobreNosotros+1
            })
        })
    }, [])
    useEffect(() => {
        infoRef.doc("aboutUs").collection("cont").get().then((state) => {
            const docs = [];
            state.forEach((doc) => docs.push({...doc.data(), id: doc.id}))
            setDepartments(docs)
        })
        rdb.ref().child('/visualModes').on("value", (id) => {
            setvisualModes(id.val())
        })
    }, [])
    return (
        <div>
            <HomeHeader logo={visualModes.logo} shadow={true} pagePosition={2} hHeight={headerHeight} />
            {visualModes.navidad && <Particles params={particlesChristmasStyles} style={{ position: "absolute", left: "0", zIndex: "0"}}></Particles>}
            {visualModes.aniversario && <Particles params={particlesAnniversaryStyles} style={{ position: "absolute", left: "0", zIndex: "0"}}></Particles>}
            <div style={{ 
                backgroundImage: `url(${fondo})`,
                width: "100%",
                height: "100vh",
                backgroundSize: "cover",
                display: "flex",
                flexFlow: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: "0"
            }}>
            
                <div className="InfoDivA" style={{ zIndex: "0", boxShadow: '0 0 10px #00000078'}}>
                    <Hidden xsDown>
                        <React.Fragment>
                            <div className="infoList">
                                <Typography color="primary" variant="h5">
                                    Sobre Nosotros
                                </Typography>
                                <List style={{ width: "100%" }}>
                                    {
                                        Departments.map((item, index) => (
                                            <ListItem style={{ width: "100%" }} button onClick={() => setinfoIndex(index)}>
                                                <ListItemIcon style={{ color: "#fff"}}>
                                                    {usableIcons.filter((icon) => icon.id == item.icon)[0].icon}
                                                </ListItemIcon>
                                                <ListItemText style={{ color: "#fff" }}>{item.id}</ListItemText>
                                            </ListItem>
                                        ))
                                    }
                                </List>
                            </div>
                            <div className="infoContainer" >
                            {Departments.length > 0 ?
                                Departments.map((depart, index) => (
                                        <Feed style={{ width: "100%" }} choosedContent={true} value={infoIndex} index={index}>
                                                <Typography variant="h4" color="primary" style={{ width: "100%" }}>
                                                    {depart.id}
                                                </Typography>
                                                <Typography color="primary" style={{ width: "100%" }}>
                                                    {depart.info}
                                                </Typography>
                                                <Button color="primary" variant="outlined" endIcon={<Link />} href={depart.link}>
                                                    Saber mas
                                                </Button>
                                        </Feed> 
                                )) :
                                <div style={{ width: "100%", height: "100vh", boxSizing: "border-box", display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center" }}>
                                    <CircularProgress color="primary" />
                                </div>
                            }
                            </div>
                        </React.Fragment>
                    </Hidden>
                    <Hidden smUp>
                        <div className="toolbar" style={{ width: "100%", boxSizing: "border-box"}}>
                            <Tabs variant='scrollable' style={{ width: "100%"}} scrollButtons="auto" onChange={(e, value) => settabsValue(value)} value={tabsValue} textColor="primary" indicatorColor="primary" >
                                {
                                    Departments.map((item, index) => (
                                        <Tab label={item.id} icon={usableIcons.filter((icon) => icon.id == item.icon)[0].icon} value={index} style={{ padding: "25px 0"}} />
                                    ))
                                }
                            </Tabs>
                        </div>
                        <SwipeableViews style={{ padding: "10px"}} index={tabsValue}>
                            {
                                Departments.map((depart, index) => (
                                    <Feed choosedContent={true} value={tabsValue} index={index}>
                                        <Typography variant="h4" color="primary" style={{ width: "100%" }}>
                                            {depart.id}
                                        </Typography>
                                        <Typography color="primary" style={{ width: "100%" }}>
                                            {depart.info}
                                        </Typography>
                                        <Button color="primary" variant="outlined" endIcon={<Link />} href={depart.link}>
                                            Saber mas
                                        </Button>
                                    </Feed>
                                ))
                            }
                            {Departments.length == 0 && <div style={{ width: "100%", height: "100vh", boxSizing: "border-box", display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center" }}>
                                <CircularProgress color="primary" />
                            </div>}
                        </SwipeableViews>
                    </Hidden>
                </div>
            </div>
            <AudioComponent StreamID={StreamID} />
        </div>
    )
}
