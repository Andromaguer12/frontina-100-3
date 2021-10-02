import { Hidden, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import { ApartmentOutlined, Call, Chat, Mail, WhatsApp } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import image from '../../Images/Logo.jpg'
import db, { rdb } from '../../services/firebase'
import SeeMore from './SeeMore'


export default function Footer() {
    const [SponsorsData, setSponsorsData] = useState([])
    const [Contact, setContact] = useState({})

    useEffect(async () => {
        await db.collection("Sponsors").onSnapshot((state) => {
            const docs = [];
            state.forEach((doc) => docs.push({...doc.data(), id: doc.id}))
            setSponsorsData(docs);
        })
        rdb.ref().child('/contacts').on("value", (id) => {
            setContact(id.val())
        })
    }, [])
    return (
        <div className="FooterContainer">
            <div className="footerContents" style={{ borderBottom: "1px solid #fff", padding: "20px 0"}}>
                <img src={image} className="footerLogo" />
                <div style={{ width: "80%", marginLeft: "10px"}}>
                    <Typography variant="h6" color="primary" className="footerText">Copyright 2021 Frontina 100.3 FM | Radio Comunitaria</Typography>
                    <Typography variant="h6" color="primary" className="footerText">Powered by Andromaguer121</Typography>
                    <Hidden xsDown>
                        <div className="sponsorsFooterDiv">
                            <Typography  color="primary" style={{ margin: "5px 0", display: "flex", alignItems: "center", flexFlow: "row" }}>Patrocinadores <ApartmentOutlined /> </Typography>
                            <div className="sponsorsCardsContainer">
                                {
                                    SponsorsData.map((sponsor) => {
                                        return <div className="postCard" key={sponsor.id} style={{ width: "15%", margin: "0 10px"}}>
                                            <div className="postData" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexFlow: "column", width: "100%"}}>
                                                <img src={sponsor.sponsorImg} className="footerLogo" style={{ width: "100%"}} />                                        
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </Hidden>
                </div>
                <Hidden smUp>
                        <div className="sponsorsFooterDiv">
                            <Typography  color="primary" style={{ margin: "5px 0", display: "flex", alignItems: "center", flexFlow: "row" }}>Patrocinadores <ApartmentOutlined /> </Typography>
                            <div className="sponsorsCardsContainer">
                                {
                                    SponsorsData.map((sponsor) => {
                                        return <div className="postCard" key={sponsor.id} style={{ margin: "0 10px"}}>
                                            <div className="postData" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexFlow: "column", width: "100%"}}>
                                                <img src={sponsor.sponsorImg} className="footerLogo" style={{ width: "100%"}} />                                        
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </Hidden>
            </div>
            <div className="footerContents" style={{ flexFlow: "column", paddingTop: "10px"}}>
                <Typography variant="h6" color="primary" color="primary" style={{ margin: "5px 0", display: "flex", alignItems: "center", flexFlow: "row" }}>Contacto   <Call /></Typography>
                <List className="footerList" style={{ padding: "0"}}>
                    <ListItem color="primary" style={{ width: "100%"}}>
                        <ListItemIcon ><Chat color="primary" /></ListItemIcon>
                        <ListItemText style={{ color: "#fff"}}>Chat a traves de nuestra pagina web</ListItemText>
                    </ListItem>
                    <ListItem color="primary" style={{ width: "100%"}}>
                        <ListItemIcon ><Mail color="primary" /></ListItemIcon>
                        <ListItemText style={{ color: "#fff"}}>{Contact.contactEmail}</ListItemText>
                    </ListItem>
                    <ListItem color="primary" style={{ width: "100%"}}>
                        <ListItemIcon ><WhatsApp color="primary" /></ListItemIcon>
                        <ListItemText style={{ color: "#fff"}}>{Contact.phoneNumber}</ListItemText>
                    </ListItem>
                </List>
            </div>
            <SeeMore links={Contact} />

        </div>
    )
}
