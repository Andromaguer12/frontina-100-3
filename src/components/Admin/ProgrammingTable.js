import { InputBase, Typography, IconButton, CircularProgress } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import db from '../../services/firebase'
import { Done, Settings, Delete, Create } from "@material-ui/icons"
import '../../Styles/AdminDashboard.css'
import SelectFromOnce from './SelectFromOnce'

const pRef = db.collection("Programacion")

const CustomTr = ({edit, ...props}) => {
    const [updateState, setUpdate] = useState({});
    const [anchorEl, setanchorEl] = useState(null)
    const open = Boolean(anchorEl);
    const [loading, setloading] = useState(false)

    const handleInputs = (e) => {
        setUpdate({
            ...updateState,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = () => {
        setloading(true);
        if(updateState != {}){
            pRef.doc(`${props.id}`).update(updateState).then(() => {
                props.close();
            }).then(() => {
                setUpdate({})
                setloading(false)
            })
        }
    }
    const deleteRow = () => {
        pRef.doc(`${props.id}`).delete()
    }
    return (
        <tr style={{ background: `${props.index % 2 == 0 ? "#e7e7e7": "#fff"}`}}>
            <SelectFromOnce close={() => setanchorEl(null)} open={open} anchorEl={anchorEl} handleChange={(e) => handleInputs(e)} />
            <td>
                {!edit && <Typography style={{ width: "fit-content", color:"#7a7a7a", fontSize: "14px" }}>{props.programName}</Typography>}
                {edit && <InputBase className color="secondary" name="programName"  onChange={handleInputs} variant="outlined" label="Opcion" placeholder={props.programName} size="small" />}
            </td>
            <td>
                {!edit && <Typography style={{ width: "fit-content", color:"#7a7a7a", fontSize: "14px" }}>{props.synopsis}</Typography>}
                {edit && <InputBase color="secondary" name="synopsis"  onChange={handleInputs} variant="outlined" label="Opcion" placeholder={props.synopsis} size="small" />}
            </td>
            <td>
                {!edit && <Typography style={{ width: "fit-content", color:"#7a7a7a", fontSize: "14px" }}>{props.conductor}</Typography>}
                {edit && <InputBase  color="secondary" name="conductor" onChange={handleInputs} variant="outlined" label="Opcion" placeholder={props.conductor} size="small" />}
            </td>
            <td>
                {!edit && <Typography style={{ width: "fit-content", color:"#7a7a7a", fontSize: "14px" }}>{props.streamDay}</Typography>}
                {edit && <InputBase color="secondary" name="streamDay"  onChange={handleInputs} variant="outlined" label="Opcion" placeholder={props.streamDay} size="small" />}
            </td>
            <td>
                {!edit && <Typography style={{ width: "fit-content", color:"#7a7a7a", fontSize: "14px" }}>De {props.time.from.time} a {props.time.once.time}</Typography>}
                {edit && <IconButton color={updateState.time ? "secondary" : ""} onClick={(e) => setanchorEl(open ? null : e.target)}><Create /></IconButton>}
            </td>
            <td>
                {!edit && <Typography style={{ width: "fit-content", color:"#7a7a7a", fontSize: "14px" }}>{props.timeDuration}</Typography>}
                {edit && <InputBase  color="secondary" name="timeDuration" onChange={handleInputs} variant="outlined" label="Opcion" placeholder={props.timeDuration} size="small" />}
            </td>
            {!props.hideC && <td>
                {edit ? 
                    loading ? <CircularProgress color="secondary" /> : <IconButton color="secondary" onClick={handleSubmit}><Done /></IconButton>
                 : <IconButton color="secondary" onClick={deleteRow}>
                    <Delete />
                </IconButton>}
            </td>}
        </tr>
    )
}

export default function ProgrammingTable({editMode, closeEditMode, shadow, hideConfig, style}) {
    const [Programming, setProgramming] = useState([])
    useEffect(() => {
        pRef.onSnapshot((state) => {
            const docs = [];
            state.forEach((doc) => docs.push({...doc.data(), id: doc.id}))
            setProgramming(docs)
        })
    }, [])
    return (
        <table style={{ boxShadow: `${shadow ? "2px 2px 5px #00000078" : ""}`, borderRadius: "10px", ...style}} className="programmingtable">
            <thead>
                <tr style={{ background: "#fff", borderRadius: "10px 10px 0 0", width: "100%" }}>
                    <td><Typography style={{ width: "fit-content" }}>Nombre</Typography></td>
                    <td><Typography style={{ width: "fit-content" }}>Sinopsis</Typography></td>
                    <td><Typography style={{ width: "fit-content" }}>Conductor(a)</Typography></td>
                    <td><Typography style={{ width: "fit-content" }}>Dia de transmision</Typography></td>
                    <td><Typography style={{ width: "fit-content" }}>Hora</Typography></td>
                    <td><Typography style={{ width: "fit-content" }}>Duracion</Typography></td>
                    {!hideConfig && <td><Settings /></td>}
                </tr>
            </thead>
            <tbody>
                {Programming.length > 0 ? 
                    Programming.sort((prev, next) => {
                        return prev.time.from.value - next.time.from.value
                    }).map((td, index) => <CustomTr
                        programName={td.programName} 
                        synopsis={td.synopsis} 
                        conductor={td.conductor} 
                        streamDay={td.streamDay}
                        time={td.time}
                        timeDuration={td.timeDuration}
                        edit={editMode}
                        id={td.id}
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
