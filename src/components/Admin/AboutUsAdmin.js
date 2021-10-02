import { CircularProgress, IconButton, Tab, Tabs, Typography } from '@material-ui/core'
import { AddCircleOutline, ApartmentOutlined, Chat, Call, Delete, FlagOutlined, History, Edit, SingleBed, Timeline, Public, ErrorOutline } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { infoRef } from '../../pages/AdminAppInfo'
import Feed from '../HomePage/Feed'

export const usableIcons = [
    {
        id: "history",
        icon: <History />
    },
    {
        id: "flag-outlined",
        icon: <FlagOutlined />
    },
    {
        id: "apartment",
        icon: <ApartmentOutlined />
    },
    {
        id: "timeline",
        icon: <Timeline />
    },
    {
        id: "bed",
        icon: <SingleBed />
    },
    {
        id: "call",
        icon: <Call />
    },
    {
        id: "chat",
        icon: <Chat />
    },
    {
        id: "world",
        icon: <Public />
    },
]


export default function AboutUsAdmin({toggleAdd, toggleEdit, toggleDelete}) {
    const [tabsValue, setTabsValue] = useState(0)
    const [loading, setloading] = useState(true)

    const [Timeout, setTimeoutCount] = useState(0)
    const [Departments, setDepartments] = useState([])
    useEffect(() => {
        infoRef.doc("aboutUs").collection("cont").onSnapshot((state) => {
            const docs = [];
            state.forEach((doc) => docs.push({...doc.data(), id: doc.id}))
            console.log("hola")
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
                Sobre Nosotros
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
                                <Tab label={depart.id} icon={usableIcons.filter((icon) => icon.id == depart.icon)[0].icon} value={index} key={index} style={{ padding: "25px 0"}} />
                            ))
                        }
                    </Tabs>
                </div>
                <div>
                    {
                        Departments.map((depart, index) => (
                            <Feed key={depart.id} choosedContent={true} value={tabsValue} index={index}>
                                <div style={{ background: "#e7e7e7", padding: "10px", borderRadius: "20px", marginTop: "20px", display: "flex", flexFlow: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
                                    <div style={{ maxWidth: "85%"}}>
                                        <Typography variant="h6" style={{ maxWidth: "100%", boxSizing: "border-box"}}>
                                            {depart.info}
                                        </Typography>
                                        <Typography style={{ maxWidth: "100%", boxSizing: "border-box"}}>
                                            Link agregado: {depart.link}
                                        </Typography>
                                    </div>
                                    <div>
                                        <IconButton color="secondary" onClick={() => toggleEdit(depart.id)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="secondary" onClick={() => toggleDelete(depart.id)}>
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
