import { InputBase, Typography, IconButton, TextField, FormControlLabel, Switch, CircularProgress } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import db, { auth, usersRef } from '../../services/firebase'
import { Done, Settings, Delete, EcoTwoTone } from "@material-ui/icons"
import '../../Styles/AdminDashboard.css'
import { getDateFromTimestamp } from '../../functions/utils'

const CustomTr = ({edit, ...props}) => {
    const [updateState, setUpdate] = useState({});
    const handleSilenciar = (e) => {
        usersRef.doc(`${props.id}`).update({
            [e.target.name]: e.target.checked
        })
    }
    const handleBloquear = (e) => {
        usersRef.doc(`${props.id}`).update({
            muted: e.target.checked,
            blocked: e.target.checked
        })
    }
    const handleSubmit = () => {
        if(updateState != {}){
            usersRef.doc(`${props.id}`).update(updateState).then(() => {
                props.close();
            })
        }
    }
    return (
        <tr style={{ background: `${props.index % 2 == 0 ? "#e7e7e7": "#fff"}`}}>
            <td>
                {!edit && <Typography style={{ width: "fit-content", color:"#7a7a7a", fontSize: "14px" }}>{props.name}</Typography>}
            </td>
            <td>
                {!edit && <Typography style={{ width: "fit-content", color:"#7a7a7a", fontSize: "14px", maxWidth: "100%", overflow: "hidden" }}>{props.email}</Typography>}
            </td>
            <td>
                {!edit && <Typography style={{ width: "fit-content", color:"#7a7a7a", fontSize: "14px" }}>{getDateFromTimestamp(props.created).date} {getDateFromTimestamp(props.created).hour}</Typography>}
            </td>
            <td>
                {!edit && <Typography style={{ width: "fit-content", color:"#7a7a7a", fontSize: "14px" }}>{getDateFromTimestamp(props.last).date} {getDateFromTimestamp(props.last).hour}</Typography>}
            </td>
            <td>
                {!edit && <Typography style={{ width: "fit-content", color:"#7a7a7a", fontSize: "14px" }}>{props.auth === "admin" ? "Admin" : "Usuario"}</Typography>}
            </td>
            <td>
                {!edit && <FormControlLabel control={<Switch name="muted" onClick={handleSilenciar} checked={props.muted} />} />}
            </td>
            <td>
                {!edit && <FormControlLabel control={<Switch name="muted" onClick={handleBloquear} checked={props.blocked} />} />}
            </td>
            {/* {!props.hideC && <td>
                {edit ? <IconButton color="secondary" onClick={handleSubmit}>
                    <Done />
                </IconButton> : <IconButton color="secondary">
                    <Delete />
                </IconButton>}
            </td>} */}
        </tr>
    )
}

export default function UsersTable({editMode, closeEditMode, shadow, hideConfig, Users}) {
    
    return (
        <table style={{ boxShadow: `${shadow ? "2px 2px 5px #00000078" : ""}`, borderRadius: "10px", width: "100%"}} className="programmingtable">
            <thead>
                <tr style={{ background: "#fff", borderRadius: "10px 10px 0 0", width: "100%" }}>
                    <td><Typography style={{ width: "fit-content" }}>Nombre</Typography></td>
                    <td><Typography style={{ width: "fit-content" }}>E-mail</Typography></td>
                    <td><Typography style={{ width: "fit-content" }}>Fecha de Creacion</Typography></td>
                    <td><Typography style={{ width: "fit-content" }}>Ultima Conexion</Typography></td>
                    <td><Typography style={{ width: "fit-content" }}>Rango</Typography></td>
                    <td><Typography style={{ width: "fit-content" }}>Silenciar</Typography></td>
                    <td><Typography style={{ width: "fit-content" }}>Bloquear</Typography></td>
                    {/* {!hideConfig && <td><Settings /></td>} */}
                </tr>
            </thead>
            <tbody>
                {Users.length > 0 ?
                    Users.map((td, index) => <CustomTr 
                        id={td.id}
                        key={td.id}
                        email={td.id}
                        name={td.name}
                        auth={td.auth}
                        last={td.lastConnection}
                        created={td.createDate}       
                        muted={td.muted}
                        blocked={td.blocked}                
                        edit={editMode}
                        hideC={hideConfig}
                        close={closeEditMode}
                        index={index}
                    />) :  <div style={{ width: "100%", height: "40vh", boxSizing: "border-box", display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center" }}>
                        <CircularProgress color="secondary" />
                    </div>
                }
            </tbody>
        </table>
    )
}
