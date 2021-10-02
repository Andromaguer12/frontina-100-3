import { Button, CircularProgress, IconButton, MenuItem, TextField, Typography } from '@material-ui/core'
import { AddPhotoAlternate, Chat, ErrorOutline, ForumTwoTone, Image, RepeatRounded } from '@material-ui/icons'
import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { infoRef } from '../../pages/AdminAppInfo'

export default function EditAboutDepartment({cancel, cRef, editId}) {
    const [Error, setError] = useState(false);
    const [UpdateState, setUpdateState] = useState({})
    const handleInputs = (e) => {
        setUpdateState({
            ...UpdateState,
            [e.target.name]: e.target.value
        })
    }

    const handleDepartment = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const array = [form.get("info"), form.get("link")];
        const verification = [];
        array.forEach((input) => {
            if(input === ""){
                verification.push(true);
            }
        })        
        if(verification.length < 2){
            await cRef.doc(`${editId}`).update(UpdateState).then(() => {
                cancel();    
            }).catch(() => setError(!Error))
        }
    }
    return (
        <div className="addShadow">
            <div className="divAddRow">
                <Typography variant="h4" color="secondary">Editar departamento de informacion</Typography>
                <form style={{ width: "100%" }} onSubmit={handleDepartment}>
                    <TextField name="info" style={{ margin: "10px 0" }} fullWidth color="secondary" multiline variant="outlined" onChange={handleInputs} label="Informacion a comunicar" size="small" />
                    <TextField name="link" style={{ margin: "10px 0" }} fullWidth color="secondary"  variant="filled" label="Link(opcional)" onChange={handleInputs} size="small" />
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
