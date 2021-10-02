import React, { useEffect, useRef, useState } from 'react'
import "../../Styles/Gallery.css"

import "../../Styles/AboutUs.css"
import { Button, Hidden, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { Chat, Facebook, Instagram, Mail, More, WhatsApp } from '@material-ui/icons';


export default function ZoomImage({object,image, close}) {
    const [MoreWidth, setMoreWidth] = useState(false)
    const zoomimage = useRef();
    useEffect(() => {
        if(zoomimage.current?.offsetWidth < zoomimage.current?.offsetHeight){
            setMoreWidth(true)
        }
        if(zoomimage.current?.offsetWidth == zoomimage.current?.offsetHeight){
            setMoreWidth(true)
        }
    }, [zoomimage])
    return (
        <div className="zoomShadow" onClick={close} >
            <Hidden xsDown>
                {!object && <img src={image} className="zoomimage" style={{ width: `${MoreWidth ? "30%" : "55%" }` }} ref={zoomimage} />}
            </Hidden>
            <Hidden smUp>
                {!object && <img src={image} className="zoomimageResponsive" />}
            </Hidden>
            {object && <div className="InfoDivA" style={{ background: "transparent", height: "80vh", width: "95%"}}>
                <div className="StaffInfoList" style={{ borderRight: "0 solid transparent", justifyContent: "center"}}>
                    <img src={object.image} className="zoomimage" style={{ width: `${MoreWidth ? "50%" : "100%" }`, borderRadius: "20px" }} ref={zoomimage} />
                </div>
                <div className="StaffInfoContainer" style={{  maxHeight: "70%", overflow: "auto" }} >
                    <Typography variant="h4" color="primary" style={{ width: "100%" }}>
                        {object.title}
                    </Typography>
                    <Typography color="primary" style={{ width: "100%", padding: "10px 0" }}>
                        {object.info}
                    </Typography>
                    <List style={{ width: "100%", padding: "0", borderTop: "1px solid #b8b8b8"}}>
                        <ListItem color="primary" style={{ width: "100%"}}>
                            <ListItemIcon ><Facebook color="primary" /></ListItemIcon>
                            <ListItemText style={{ color: "#fff"}}>{object.link.facebook}</ListItemText>
                        </ListItem>
                        <ListItem color="primary" style={{ width: "100%"}}>
                            <ListItemIcon ><Instagram color="primary" /></ListItemIcon>
                            <ListItemText style={{ color: "#fff"}}>{object.link.instagram}</ListItemText>
                        </ListItem>
                        <ListItem color="primary" style={{ width: "100%"}}>
                            <ListItemIcon ><WhatsApp color="primary" /></ListItemIcon>
                            <ListItemText style={{ color: "#fff"}}>{object.link.whatsapp}</ListItemText>
                        </ListItem>
                    </List>
                </div>
            </div>}
        </div>
    )
}
