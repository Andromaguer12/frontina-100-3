import { Button, CircularProgress, IconButton, MenuItem, TextField, Typography } from '@material-ui/core'
import { AddPhotoAlternate, ErrorOutline, Image, RepeatRounded } from '@material-ui/icons'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { RANDOMID } from '../../functions/ChatObservers'
import { handleOptimizedImg, uploadImages } from '../../functions/ImagesFunctions'
import { useAdminUser } from '../../services/reduxToolkit/adminUserLogin/selectors'

export default function EditPost({cancel, pRef, updateId, variation}) {
    const adminUser = useSelector(useAdminUser);    
    const [Categorie, setCategorie] = useState("Ultima Hora")
    const [UploadState, setUploadState] = useState(0)
    const [uploadedImgUrl, setuploadedImgUrl] = useState("")
    const [Error, setError] = useState(false)
    const [Uploading, setUploading] = useState(false)
    const [Update, setUpdate] = useState({})
    const categories = ["Ultima Hora", "Deportes", "Politica", "Economia", "Gastronomia", "Musica", "Tecnologia"]

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
    return (
        <div className="addShadow">
            <div className="divAddRow">
                <Typography variant="h4" color="secondary">Editar Publicacion</Typography>
                <form style={{ width: "100%" }} onSubmit={(e) => handleNewPost(e, updateId)}>
                    {!variation && <TextField name="title" style={{ margin: "10px 0" }} fullWidth color="secondary" onChange={handleUpdateObj}  variant="outlined" label="Titulo" size="small" />}
                    <TextField select name="contentType" size="small" variant="standard" color="secondary" style={{ marginBottom: "10px"}} label="Categoria" value={Categorie} onChange={(e) => {handleUpdateObj(e); setCategorie(e.target.value)}} fullWidth>
                        {categories.map((categories) => <MenuItem value={categories}>{categories}</MenuItem>)}
                    </TextField>
                    <TextField multiline name="text" style={{ margin: "10px 0" }} onChange={handleUpdateObj} fullWidth color="secondary"  variant="outlined" label="Descripcion" size="small" />
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
                </form>
            </div>
        </div>
    )
}
