import { Button, CircularProgress, IconButton, MenuItem, TextField, Typography } from '@material-ui/core'
import { AddPhotoAlternate, Chat, ErrorOutline, ForumTwoTone, Image, RepeatRounded } from '@material-ui/icons'
import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { infoRef } from '../../pages/AdminAppInfo'
import { usableIcons } from './AboutUsAdmin'


export default function AddAboutDepartment({cancel}) {
    const [Error, setError] = useState(false);
    const [icons, seticons] = useState("history")

    const handleDepartment = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const array = [form.get("departName"), form.get("info"), form.get("link")];
        const verification = [];
        array.forEach((input) => {
            if(input === ""){
                verification.push(true);
            }
        })        
        if(verification.length === 0){
            await infoRef.doc('aboutUs').collection("cont").doc(`${form.get("departName")}`).set({
                icon: form.get("icon"),
                info: form.get('info'),
                link: form.get('link') === "" ? null : form.get('link') 
            }).then(() => {
                cancel();    
            }).catch(() => setError(!Error))
        }
    }
    return (
        <div className="addShadow">
            <div className="divAddRow">
                <Typography variant="h4" color="secondary">Añadir nuevo departamento de informacion</Typography>
                <form style={{ width: "100%" }} onSubmit={handleDepartment}>
                    <TextField name="departName" style={{ margin: "10px 0" }} fullWidth color="secondary"  variant="outlined" label="Nombre del departamento" size="small" />
                    <TextField InputProps={{ startAdornment: usableIcons.filter((icon) => icon.id === icons)[0].icon }} select name="icon" size="small" variant="standard" color="secondary" style={{ marginBottom: "10px", flexFlow: "row", alignItems: "center", display: "flex"}} label="Icono" value={icons} onChange={(e) => seticons(e.target.value)} fullWidth>
                        {usableIcons.map((icon) => <MenuItem value={icon.id}>{icon.id}</MenuItem>)}
                    </TextField>
                    <TextField name="info" style={{ margin: "10px 0" }} fullWidth color="secondary" multiline variant="outlined" label="Informacion a comunicar" size="small" />
                    <TextField name="link" style={{ margin: "10px 0" }} fullWidth color="secondary"  variant="filled" label="Link(opcional)" size="small" />
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
