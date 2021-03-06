import { Button, CircularProgress, IconButton, MenuItem, TextField, Typography } from '@material-ui/core'
import { AddPhotoAlternate, ErrorOutline, Image, RepeatRounded } from '@material-ui/icons'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { RANDOMID } from '../../functions/ChatObservers'
import { handleOptimizedImg, uploadImages } from '../../functions/ImagesFunctions'
import db from '../../services/firebase'
import { useAdminUser } from '../../services/reduxToolkit/adminUserLogin/selectors'


export default function AddGalleryPost({cancel, gRef}) {
    const [UploadState, setUploadState] = useState(0)
    const [Error, setError] = useState(false)
    const [Uploading, setUploading] = useState(false)
    const [ImgSelec, setImgSelec] = useState([])
    const OptimizeImage = async (e) => {
        const imgCopy = [];
        Array.from(e.target.files).forEach(async(file) => {
            await handleOptimizedImg(file, true, true).then((Optimg) => {
                imgCopy.push(Optimg)
                setImgSelec(imgCopy);
            }).catch((error) => {
                console.log(error)
            })
        })
    }
    const handleNewPost = (e, id, imageUrl) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const array = [form.get("title"), form.get("info")];
        const verification = [];
        array.forEach((input) => {
            if(input === ""){
                verification.push(true);
            }
        })
        if(verification.length === 0){
            setUploadState(100)
            gRef.doc(`${id}`).set({
                image: imageUrl,
                info: form.get("info"),
                link: form.get("link") === "" ? null : form.get("link"),
                title: form.get("title"),
            }).then(() => {
                setUploading(false);
                cancel();
            })
        }
    }

    const handleUploadPost = async (e) => {
        e.preventDefault();
        setUploading(true);
        const newPostID = RANDOMID('AaBbNnJjHhGgTtYyCcDd123456789', 15);
        await uploadImages(ImgSelec, "Gallery", "Global", newPostID, (newvalue) => setUploadState(newvalue)).then((url) => {
            handleNewPost(e, newPostID, url)
        }).catch(() => {
            setUploading(false);
            setError(true);
            setTimeout(() => {
                setError(false)
            }, 3000);
        })
    }
    return (
        <div className="addShadow">
            <div className="divAddRow" style={{ width: "80%", height: "fit-content", borderRadius: "10px"}}>
                <Typography variant="h4" color="secondary">Publicacion en Galeria</Typography>
                <form style={{ width: "100%" }} onSubmit={handleUploadPost}>
                    <TextField name="title" style={{ margin: "10px 0" }} fullWidth color="secondary"  variant="outlined" label="Titulo" size="small" />
                    <div style={{ height: `${ImgSelec[0]?.height}px`, backgroundImage: `url(${ImgSelec.length > 0 ? ImgSelec[0] : "" })`, backgroundSize: `${ImgSelec[0]?.width}px`, marginBottom: "10px", backgroundColor: "#e7e7e7", width: "100%", borderRadius: "10px", display: "flex", alignItems: "center", flexFlow: "column", justifyContent: "center"}}>
                        <input type="file" hidden="hidden" id="inputImg" onChange={OptimizeImage} />
                        <IconButton style={{ color: "#7a7a7a", margin: "100px" }} onClick={() => {
                            document.getElementById("inputImg").click();
                        }}>
                            {ImgSelec.length == 0 ? <AddPhotoAlternate style={{ fontSize: "50" }} /> : <RepeatRounded style={{ fontSize: "50" }} />}    
                        </IconButton>
                    </div>
                    <TextField name="info" style={{ margin: "10px 0" }} fullWidth color="secondary"  variant="outlined" label="Informacion" multiline size="small" />
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
                            {Uploading ? <div style={{ width: "100%",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                                <CircularProgress />
                                {UploadState}%
                            </div> : "Aceptar"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}