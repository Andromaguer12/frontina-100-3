import { Button, CircularProgress, Popper, Typography } from '@material-ui/core'
import { ErrorOutline, Link } from '@material-ui/icons'
import { Link as LinkButton } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { infoRef } from '../../pages/AdminAppInfo'
import db, { rdb } from '../../services/firebase'
import { AllRoutes } from '../../constants/routes/AllRoutes'

const pRef = db.collection("Programacion")

export default function SearchPopper({open, anchorEl, search}) {
    const [SearchResult, setSearchResult] = useState([])
    const [Loading, setLoading] = useState(true)
    const [Data, setData] = useState([])
    useEffect(() => {
        const docs = [];
        pRef.onSnapshot((state) => {
            state.forEach((doc) => docs.push({...doc.data(), id: doc.id, from: "PROGRAMACION", toLink: AllRoutes.programming}))
            infoRef.doc("gallery").collection("cont").onSnapshot((state) => {
                state.forEach((doc) => docs.push({...doc.data(), id: doc.id, from: "GALERIA", toLink: AllRoutes.gallery}))
                infoRef.doc("aboutUs").collection("cont").get().then((state) => {
                    state.forEach((doc) => docs.push({...doc.data(), id: doc.id, from: "SOBRE NOSOTROS", toLink: AllRoutes.aboutUs}))
                    infoRef.doc("staff").collection("cont").onSnapshot((state) => {
                        state.forEach((doc) => docs.push({...doc.data(), id: doc.id, from: "STAFF", toLink: AllRoutes.staff}))
                        setData(docs);
                        setLoading(false);
                    })
                })
            })
        })
    }, [])
    useEffect(() => {
        const foundData = Data.filter((sear) => {
            if(sear.from == "PROGRAMACION"){
                return sear.conductor.toLowerCase().includes(search.toLowerCase());
            }
            if(sear.from == "STAFF"){
                return sear.title.toLowerCase().includes(search.toLowerCase());
            }
            if(sear.from == "GALERIA"){
                return sear.title.toLowerCase().includes(search.toLowerCase());
            }
            if(sear.from == "SOBRE NOSOTROS"){
                return sear.id.toLowerCase().includes(search.toLowerCase());
            }
        })
        setSearchResult(foundData);
    }, [search])
    const hrefLink = (data) => {
        if(data.from == "PROGRAMACION"){
            return data.toLink
        }
        if(data.from == "STAFF"){
            return data.toLink
        }
        if(data.from == "GALERIA"){
            return data.toLink
        }
        if(data.from == "SOBRE NOSOTROS"){
            return data.toLink
        }
    }
    
    return (
        <Popper open={open} anchorEl={anchorEl} style={{ zIndex: "1300"}} placement="bottom">
            <CSSTransition
                in={true}
                appear={true}
                timeout={1000}
                classNames="Content-load"
            >
                <div className="searchDiv">
                    <Typography color="secondary" variant="h5" style={{ borderBottom: '1px solid #C93832', width: "100%",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                        Busqueda:
                    </Typography>
                    {SearchResult.length == 0 && Loading ? <div style={{ width: "100%", height: "40vh", boxSizing: "border-box", display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center" }}>
                        <CircularProgress color="secondary" />
                    </div> : 
                        SearchResult.map((found) => (
                            <div className="FoundCard">
                                <div className="FCardContent">
                                    {found.from == "PROGRAMACION" && <React.Fragment>
                                        <Typography variant="h6">{found.conductor}</Typography>
                                        <Typography  color="secondary" style={{ fontSize: "14px"}}>Encontrado en "{found.from}"</Typography>
                                        <Typography >{found.programName} | {found.synopsis}</Typography>
                                    </React.Fragment>}
                                    {found.from == "STAFF" && <React.Fragment>
                                        <Typography variant="h6">{found.title}</Typography>
                                        <Typography  color="secondary" style={{ fontSize: "14px"}}>Encontrado en "{found.from}"</Typography>
                                        <Typography >{found.info.substring(30, 0)}...</Typography>
                                    </React.Fragment>}
                                    {found.from == "GALERIA" && <React.Fragment>
                                        <Typography variant="h6">{found.title.substring(30, 0)}</Typography>
                                        <Typography  color="secondary" style={{ fontSize: "14px"}}>Encontrado en "{found.from}"</Typography>
                                        <Typography >{found.info.substring(30, 0)}...</Typography>
                                    </React.Fragment>}
                                    {found.from == "SOBRE NOSOTROS" && <React.Fragment>
                                        <Typography variant="h6">{found.id}</Typography>
                                        <Typography color="secondary" style={{ fontSize: "14px"}} >Encontrado en "{found.from}"</Typography>
                                        <Typography >{found.info.substring(30, 0)}...</Typography>
                                    </React.Fragment>}
                                </div>
                                <LinkButton style={{ textDecoration: "none"}} to={hrefLink(found)}>
                                    <Button color="secondary" variant="contained" endIcon={<Link />} >Ir</Button>
                                </LinkButton>
                            </div>
                        ))
                    }
                    {!Loading && SearchResult.length == 0 && <div style={{ width: "100%", height: "50vh", boxSizing: "border-box", display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center" }}>
                        <ErrorOutline style={{ fontSize: "60", color: "#7a7a7a" }} />
                        <Typography variant="h4" style={{ color: "#7a7a7a" }}> Nada por aqui! </Typography>
                    </div>}
                </div>
            </CSSTransition>
        </Popper>
    )
}
