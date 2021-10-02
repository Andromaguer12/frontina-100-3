import { Button, CircularProgress, Popper, Typography } from '@material-ui/core'
import { ErrorOutline, Link } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { getDateFromTimestamp } from '../../functions/utils'
import { categories } from '../../pages/HomePage'


export default function AsideSearchPopper({open, anchorEl, search, data, setTabs, cancel}) {
    const [SearchResult, setSearchResult] = useState([])
    useEffect(() => {
        const foundData = data.filter((sear) => {
            return sear.text.toLowerCase().includes(search.toLowerCase())
        })
        setSearchResult(foundData);
    }, [search])

    const hrefLink = (found) => {
        setTabs(categories.indexOf(found.contentType));
        cancel();
    }
    
    return (
        <Popper open={open} anchorEl={anchorEl} style={{ zIndex: "2"}} placement="bottom">
            <CSSTransition
                in={true}
                appear={true}
                timeout={1000}
                classNames="Content-load"
            >
                <div className="searchDiv" style={{ maxHeight: "45vh", overflow: "auto", background: "#fff", boxShadow: "2px 2px 5px #00000078", padding: "10px", borderRadius: "10px"}}>
                    <Typography color="secondary" variant="h5" style={{ borderBottom: '1px solid #C93832', width: "100%",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                        Busqueda:
                    </Typography>
                    {SearchResult.length > 0 &&  
                        SearchResult.map((found) => (
                            <div className="FoundCard">
                                <div className="FCardContent">
                                    <div className="postHeader" style={{ padding: "0" }}>
                                        <img src={found.creator.img} className="userPostImg" style={{ width: "10%", margin: "0 5px"}} />
                                        <div style={{ display: "flex", flexFlow: "column", alignItems: "flex-start" }}>
                                            <Typography style={{ fontSize: "14px", fontWeight: "bold" }} >{found.creator.name}</Typography>
                                            <Typography style={{ fontSize: "12.5px", color: "#7a7a7a" }} >{getDateFromTimestamp(found.timestamp).date} | {getDateFromTimestamp(found.timestamp).hour}</Typography>
                                        </div>
                                    </div>
                                    <Typography variant="h6">{found.conductor}</Typography>
                                    <Typography  color="secondary" style={{ fontSize: "14px"}}>Encontrado en "{found.contentType}"</Typography>
                                    <Typography >{found.text.substring(30, 0)}...</Typography>
                                </div>
                                <Button color="secondary" variant="contained" endIcon={<Link />} onClick={() => hrefLink(found)} >Ir</Button>
                            </div>
                        ))
                    }
                    {SearchResult.length == 0 && <div style={{ width: "100%", height: "50vh", boxSizing: "border-box", display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center" }}>
                        <ErrorOutline style={{ fontSize: "60", color: "#7a7a7a" }} />
                        <Typography variant="h4" style={{ color: "#7a7a7a" }}> Nada por aqui! </Typography>
                    </div>}
                </div>
            </CSSTransition>
        </Popper>
    )
}

