import { CircularProgress, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import AdminDrawer from '../components/Admin/AdminDrawer'
import StreamId from '../components/Admin/StreamId'
import fondo from "../Images/fondo.png"
import "../Styles/AdminDashboard.css"
import { ApartmentOutlined, ChatOutlined, DescriptionOutlined, HomeOutlined, Info, InfoOutlined, PersonOutlined, QueryBuilder } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import { useAdminUser } from '../services/reduxToolkit/adminUserLogin/selectors'
import { rdb } from '../services/firebase'
import { AllRoutes } from '../constants/routes/AllRoutes'
import AppCustomization from '../components/Admin/AppCustomization'


export const Functions = [
    {
        label: "Inicio",
        icon: <HomeOutlined />,
        link: AllRoutes.adminDashboard
    },
    {
        label: "Chat",
        icon: <ChatOutlined />,
        link: AllRoutes.adminChat
    },
    {
        label: "Publicar",
        icon: <DescriptionOutlined />,
        link: AllRoutes.adminPublish
    },
    {
        label: "Usuarios",
        icon: <PersonOutlined />,
        link: AllRoutes.adminUsers
    },
    {
        label: "Patrocinadores",
        icon: <ApartmentOutlined />,
        link: AllRoutes.adminSponsors
    },
    {
        label: "Programacion",
        icon: <QueryBuilder />,
        link: AllRoutes.adminProgramming
    },
    {
        label: "Informacion",
        icon: <InfoOutlined />,
        link: AllRoutes.adminInfo
    },
]

export default function AdminDashboardPage() {
    const user = useSelector(useAdminUser)
    const [Loading, setLoading] = useState(true);
    const [StreamID, setStreamID] = useState({});
    const [PagesCounters, setPagesCounters] = useState({})
    const [logo, setlogo] = useState(null)
    const [Timeout, setTimeoutCount] = useState(0)
    const [IsOn, setIsOn] = useState(false);
    const audioVer = new Audio(StreamID.id);
    useEffect(() => {
        rdb.ref().child('/streamID').on("value", (id) => {
            setStreamID(id.val())
        })
        rdb.ref().child('/pagesVisitedByUsers').on("value", (id) => {
            setPagesCounters(id.val())
        })
        
    }, [])
    useEffect(() => {
        if(Loading) audioVer.onloadeddata = () => {
            setIsOn(true)
            setLoading(false)
        }
    }, [audioVer])
    useEffect(() => {
        if(Loading && Timeout < 40){
            setTimeout(() => {
                setTimeoutCount(Timeout+1);
            }, 1000);
        }
    }, [Timeout])
    const logoImage = (img) => {
        setlogo(img)
    }
    return (
        <div className="admindashcontent">
            <AdminDrawer Functions={Functions} />
            <div className="layoutdisplay">
                <div className="dashboardHeader" style={{ backgroundImage: `url(${fondo})`, justifyContent: "space-between", width: "100%"}}>
                    {!logo ? <CircularProgress color="secondary" /> : <img src={logo} className="dashboardHeaderimg" />}
                    <div className="header" style={{ width: "85%", flexFlow: "column"}}>
                        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "flex-end", flexFlow: "row"}}>
                            <Typography style={{ fontSize: "14px", margin: "15px 5px"  }}>
                                Usuario Logueado como: {user[1].name} 
                            </Typography>
                            <img src={user[1].img} style={{width: "5%", borderRadius: "50%"}} />
                        </div>
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-end", flexFlow: "row"}}>
                            {/* <div style={{ margin: "0 30px"}}>
                                <Typography style={{ fontSize: "14px", margin: "15px 5px", display: "flex", alignItems: "center", justifyContent: "flex-end", flexFlow: "row"  }}>
                                    Numero de oyentes: {StreamID.listeners}
                                </Typography>
                            </div> */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", flexFlow: "row" }}>
                                <Typography style={{ fontSize: "14px", margin: "15px 5px", display: "flex", alignItems: "center", justifyContent: "flex-end", flexFlow: "row"  }}>
                                    Estado de la transmision:     
                                    <div style={{ background: `${IsOn ? "green" : 'red'}`, margin: "0 5px", width: "10px", height: "10px", borderRadius: "50%"}}></div>
                                    {IsOn && Timeout < 40 && "Al Aire"}
                                    {!IsOn && Timeout < 40 &&  "Fuera de Linea"}
                                    {Timeout == 40 &&  "Error conectando con el servidor."}
                                </Typography>
                                {Loading && Timeout < 40 && <CircularProgress size={20} color="secondary" />}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="controlpanel" style={{ alignItems: "flex-start "}}>
                    <StreamId currentListeners={StreamID.listeners} currentId={StreamID.id}  />
                    <AppCustomization setImage={logoImage} />
                    <div >
                        <Typography style={{ fontSize: "14px", margin: "15px 5px", display: "flex", alignItems: "center", flexFlow: "row"  }}>
                            Veces visitadas cada pagina:
                        </Typography>
                        <div className="pagesCountContainer">
                            <Typography color="secondary" className="pageCountCard">
                                Inicio: <Typography variant="h5">{PagesCounters.inicio}</Typography>
                            </Typography>
                            <Typography color="secondary" className="pageCountCard">
                                Programacion: <Typography variant="h5">{PagesCounters.programacion}</Typography>
                            </Typography>
                            <Typography color="secondary" className="pageCountCard">
                                Sobre Nosotros: <Typography variant="h5">{PagesCounters.sobreNosotros}</Typography>
                            </Typography>
                            <Typography color="secondary" className="pageCountCard">
                                Galeria: <Typography variant="h5">{PagesCounters.galeria}</Typography>
                            </Typography>
                            <Typography color="secondary" className="pageCountCard">
                                Staff: <Typography variant="h5">{PagesCounters.staff}</Typography>
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
