import { CircularProgress, IconButton, List, ListItem, ListItemIcon, ListItemText, Tab, Tabs, Typography } from '@material-ui/core'
import { AddCircleOutline, ApartmentOutlined, Chat, Call, Delete, FlagOutlined, History, Edit, SingleBed, Timeline, Facebook, Instagram, WhatsApp, ErrorOutline } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { infoRef } from '../../pages/AdminAppInfo'
import Feed from '../HomePage/Feed'
import { usableIcons } from './AboutUsAdmin'

export default function StaffAdmin({toggleAdd, toggleEdit, toggleDelete}) {
    const [tabsValue, setTabsValue] = useState(0)
    const [loading, setloading] = useState(true)    
    const [Timeout, setTimeoutCount] = useState(0)
    const [Departments, setDepartments] = useState([])
    useEffect(() => {
        infoRef.doc("staff").collection("cont").onSnapshot((state) => {
            const docs = [];
            state.forEach((doc) => docs.push({...doc.data(), id: doc.id}))
            setDepartments(docs)
        })
    }, [])
    useEffect(() => {
        if(Departments.length == 0 && loading && Timeout < 20){
            setTimeout(() => {
                setTimeoutCount(Timeout+1);
            }, 1000);
        }
        if(Timeout == 20){
            setloading(false)
        }
    }, [Timeout])
    return (
        <div className="SobreNosotrosContainer">
            <Typography color="secondary" variant="h4" style={{ width: "100%",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                Staff
                <IconButton color="secondary" onClick={toggleAdd}>
                    <AddCircleOutline />
                </IconButton>
            </Typography>
            <Typography style={{ width: "100%",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                Edita la informacion que se visualizara dentro de este apartado!
            </Typography>
            {Departments.length > 0 && <React.Fragment>
                <div className="sponsorsDiv" style={{ alignItems: "center" }}>
                    <Tabs style={{ maxWidth: "100%" }} variant="scrollable" value={tabsValue} onChange={(e, newValue) => setTabsValue(newValue)} textColor="secondary" indicatorColor="secondary" scrollButtons="auto" >
                        { 
                            Departments.map((depart, index) => (
                                <Tab label={depart.title} value={index} key={index} style={{ padding: "25px 0"}} />
                            ))
                        }
                    </Tabs>
                </div>
                <div>
                    {
                        Departments.map((depart, index) => (
                            <Feed key={depart.id} choosedContent={true} value={tabsValue} index={index}>
                                <div style={{ background: "#e7e7e7", padding: "10px", borderRadius: "20px", marginTop: "20px", display: "flex", flexFlow: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
                                    <div style={{ width: "85%", maxWidth: "85%"}}>
                                        <Typography variant="h6" style={{ maxWidth: "100%", boxSizing: "border-box"}}>
                                            {depart.info}
                                        </Typography>
                                        <Typography variant="h4" color="secondary" style={{ maxWidth: "100%", boxSizing: "border-box"}}>
                                            Imagen agregada: 
                                        </Typography>
                                        <img src={depart.image} style={{ height: "auto", width: "50%", borderRadius: "10px", margin: "0 auto"}} />
                                        <List style={{ width: "100%", padding: "0", borderTop: "1px solid #b8b8b8"}}>
                                            <ListItem color="primary" style={{ width: "100%"}}>
                                                <ListItemIcon ><Facebook  /></ListItemIcon>
                                                <ListItemText >{depart.link.facebook}</ListItemText>
                                            </ListItem>
                                            <ListItem color="primary" style={{ width: "100%"}}>
                                                <ListItemIcon ><Instagram  /></ListItemIcon>
                                                <ListItemText >{depart.link.instagram}</ListItemText>
                                            </ListItem>
                                            <ListItem color="primary" style={{ width: "100%"}}>
                                                <ListItemIcon ><WhatsApp  /></ListItemIcon>
                                                <ListItemText >{depart.link.whatsapp}</ListItemText>
                                            </ListItem>
                                        </List>
                                    </div>
                                    <div>
                                        <IconButton color="secondary" onClick={() => toggleEdit({id: depart.id, image: depart.image})}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="secondary" onClick={() => toggleDelete({id: depart.id, image: depart.image})}>
                                            <Delete />
                                        </IconButton>
                                    </div>
                                </div>
                            </Feed>
                        )) 
                    }
                </div>
            </React.Fragment>}
            {Departments.length == 0 && loading && Timeout < 20 && <div style={{ width: "100%", height: "40vh", boxSizing: "border-box", display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress color="secondary" />
            </div>}
            {Departments.length == 0 && !loading && Timeout == 20 && <div style={{ width: "100%", height: "50vh", boxSizing: "border-box", display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center" }}>
                <ErrorOutline style={{ fontSize: "60", color: "#7a7a7a" }} />
                <Typography variant="h4" style={{ color: "#7a7a7a" }}> Nada por aqui! </Typography>
            </div>}
        </div>
    )
}