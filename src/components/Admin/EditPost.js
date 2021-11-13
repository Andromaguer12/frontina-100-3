import { Button, CircularProgress, IconButton, MenuItem, TextField, Typography } from '@material-ui/core'
import { AddPhotoAlternate, Edit, ErrorOutline, Image, RepeatRounded } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { RANDOMID } from '../../functions/ChatObservers'
import { handleOptimizedImg, uploadImages } from '../../functions/ImagesFunctions'
import { useAdminUser } from '../../services/reduxToolkit/adminUserLogin/selectors'
import { categories } from "../../pages/HomePage"


export default function EditPost({cancel, pRef, updateId, variation}) {
    const adminUser = useSelector(useAdminUser);    
    const [UploadState, setUploadState] = useState(0)
    const [uploadedImgUrl, setuploadedImgUrl] = useState("")
    const [Error, setError] = useState(false)
    const [Uploading, setUploading] = useState(false)
    const [Update, setUpdate] = useState({})
    const [EditState, setEditState] = useState(false)
    const [Categorie, setCategorie] = useState(EditState ? "Ultima Hora" : EditState.contentType)

    const handleUpdateObj = (e) => {
        setUpdate({
            ...Update,
            [e.target.name]: e.target.value
        })
    }

    const handleNewPost = async (e, id) => {
        setUploading(true)
        e.preventDefault();
        const form = new FormData(e.target);
        const array = [form.get("title"), form.get("categorie"), form.get("text")];
        const verification = []
        array.forEach((input) => {
            if(input === ""){
                verification.push(true);
            }
        })        
        if(verification.length < 3){
            await pRef.doc(`${id}`).update(Update).then(() => {setUploading(false); cancel();})
            setTimeout(() => {
                cancel();    
            }, 3000);
        }
    }

    useEffect(() => {
        pRef.doc(`${updateId}`).get().then((e) => {
            setEditState(e.data())
        })
    }, [])
    return (
        <div className="addShadow">
            <div className="divAddRow" style={{ width: "80%", height: "fit-content", borderRadius: "10px"}}>
                <Typography variant="h4" color="secondary">Editar Publicacion</Typography>
                {EditState ? <form style={{ width: "100%" }} onSubmit={(e) => handleNewPost(e, updateId)}>
                    <div style={{ width: "100%", display: "flex", flexFlow: "row", alignItems: "center", justifyContent: "space-between"}}>
                        {!variation && <TextField helperText="Preferible coloque un numero que no coincida con uno ya asignado" name="position" style={{ margin: "10px 0" }} defaultValue={EditState.position} color="secondary" onChange={(e) => handleUpdateObj(e)}  variant="outlined" label="Posicion" size="small" />}
                        <TextField select name="contentType" size="small" variant="standard" color="secondary" defaultValue={EditState.contentType} style={{ marginBottom: "10px", width: "50%"}} label="Categoria" value={Categorie} onChange={(e) => {handleUpdateObj(e); setCategorie(e.target.value)}} >
                            {categories.map((categories) => <MenuItem value={categories}>{categories}</MenuItem>)}
                        </TextField>
                    </div>
                        {!variation && <TextField name="title" style={{ margin: "10px 0" }} defaultValue={EditState.title} fullWidth color="secondary" onChange={handleUpdateObj}  variant="outlined" label="Titulo" size="small" />}
                    <div style={{ width: "100%", maxHeight: "40vh", overflow: "auto"}}>
                        <TextField multiline name="text" style={{ margin: "10px 0" }} onChange={handleUpdateObj} defaultValue={EditState.text} fullWidth color="secondary"  variant="outlined" label="Descripcion" size="small" />
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
                            {Uploading ? <div style={{ width: "100%",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                                <CircularProgress />
                            </div> : "Aceptar"}
                        </Button>
                    </div>
                </form> : <div style={{ width: "100%", height: "40vh", boxSizing: "border-box", display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center" }}>
                    <CircularProgress color="secondary" />
                </div>}
            </div>
        </div>
    )
}
