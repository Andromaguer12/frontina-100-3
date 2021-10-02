import { CircularProgress, IconButton, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import "../../Styles/AdminPosts.css"
import db from '../../services/firebase'
import { AddCircleOutline, Delete } from '@material-ui/icons'

export default function Sponsors({toggleAdd, toggleDelete}) {
    const [SponsorsData, setSponsorsData] = useState([])
    useEffect(async () => {
        await db.collection("Sponsors").onSnapshot((state) => {
            const docs = [];
            state.forEach((doc) => docs.push({...doc.data(), id: doc.id}))
            setSponsorsData(docs);
        })
    }, []) 
    return (
        <div style={{ width: "100%", display: "flex", alignItems: "flex-start", flexFlow: "column", marginBottom: "20px" }}>
            <Typography color="secondary" variant="h4" style={{ width: "100%",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                Patrocinadores y socios
                <div>
                    <IconButton color="secondary" onClick={() => toggleAdd()}>
                        <AddCircleOutline />
                    </IconButton>
                </div>
            </Typography>
            <Typography style={{ width: "100%",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                Administra los patrocinadores y socios que se mostraran en el pie de pagina (Agregue solamente logotipos preferiblemente)
            </Typography>
            <div className="sponsorsDiv">
                {SponsorsData.length > 0 ?
                    SponsorsData.map((sponsor) => {
                        return <div className="postCard" key={sponsor.id} style={{ backgroundImage: `url(${sponsor.sponsorImg})`, backgroundSize: "cover" }}>
                            <div className="postData" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexFlow: "row"}}>
                                <Typography className="postTags" >{sponsor.name}</Typography>
                                <IconButton color="primary" onClick={() => toggleDelete({ image: sponsor.sponsorImg, id: sponsor.id })}>
                                    <Delete />
                                </IconButton>
                            </div>
                        </div>
                    }) :  <div style={{ width: "100%", height: "40vh", boxSizing: "border-box", display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center" }}>
                        <CircularProgress color="secondary" />
                    </div>
                }
            </div>
        </div>
    )
}
