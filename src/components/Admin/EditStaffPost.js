import { Button, CircularProgress, IconButton, MenuItem, TextField, Typography } from '@material-ui/core'
import { AddPhotoAlternate, Chat, ErrorOutline, Facebook, ForumTwoTone, Image, Instagram, RepeatRounded, WhatsApp } from '@material-ui/icons'
import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { infoRef } from '../../pages/AdminAppInfo'

export default function EditStaffPost({cancel, cRef, editId}) {
    const [Error, setError] = useState(false);
    const [UpdateState, setUpdateState] = useState({ link: {} })
    const [loading, setloading] = useState(false)
    const handleInputs = (e) => {
        if(e.target.name == "facebook" || e.target.name ==  "instagram" || e.target.name ==  "whatsapp"){
            setUpdateState({
                ...UpdateState,
                link: {
                    ...UpdateState.link,
                    [e.target.name]: e.target.value
                }
            })
        }
        else{
            setUpdateState({
                ...UpdateState,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleDepartment = async (e) => {
        setloading(true)
        e.preventDefault();
        const form = new FormData(e.target);
        const array = [form.get("info"), form.get("facebook"), form.get("instagram"), form.get("whatsapp")];
        const verification = [];
        array.forEach((input) => {
            if(input === ""){
                verification.push(true);
            }
        })        
        if(verification.length < 4){
            await cRef.doc(`${editId.id}`).update(UpdateState).then(() => {
                cancel();    
            }).catch((error) => {
                setError(!Error)
                setloading(false)
                console.log(error)

                setTimeout(() => {
                    setError(!Error)
                }, 2000);
            })
        }
    }
    return (
        <div className="addShadow">
            <div className="divAddRow">
                <Typography variant="h4" color="secondary">Editar departamento de informacion</Typography>
                <form style={{ width: "100%" }} onSubmit={handleDepartment}>
                    <TextField name="info" style={{ margin: "10px 0" }} fullWidth color="secondary" multiline variant="outlined" onChange={handleInputs} label="Informacion a comunicar" size="small" />
                    <div style={{ width: "100%", display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                        <TextField name="facebook" InputProps={{ endAdornment: <Facebook />}} style={{ margin: "10px 0", width: "30%" }}  onChange={handleInputs} color="secondary"  variant="outlined" label="Facebook" multiline size="small" />
                        <TextField name="instagram" InputProps={{ endAdornment: <Instagram />}} style={{ margin: "10px 0", width: "30%" }} onChange={handleInputs}  color="secondary"  variant="outlined" label="Instagram" multiline size="small" />
                        <TextField name="whatsapp" InputProps={{ endAdornment: <WhatsApp />}} style={{ margin: "10px 0", width: "30%" }} onChange={handleInputs} color="secondary"  variant="outlined" label="Whatsapp" multiline size="small" />
                    </div>
                    <CSSTransition
                        in={Error}
                        timeout={500}
                        classNames="login-alert"
                        unmountOnExit
                    >
                        <Typography color="secondary" style={{ width: "100%",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                                Error Subiendo el Archivo
                            <ErrorOutline />
                        </Typography>
                    </CSSTransition>
                    <div style={{ width: '100%', display: "flex", flexFlow: "row", alignItems: "center", justifyContent: "space-between"}}>
                        <Button color="secondary" variant="outlined" onClick={cancel}>
                            Cancelar
                        </Button>
                        <Button color="secondary" variant="contained" type="submit">
                            Aceptar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
