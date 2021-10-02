import { Button, CircularProgress, IconButton, MenuItem, TextField, Typography } from '@material-ui/core'
import { AddPhotoAlternate, ErrorOutline, Facebook, Image, Instagram, RepeatRounded, WhatsApp } from '@material-ui/icons'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { RANDOMID } from '../../functions/ChatObservers'
import { handleOptimizedImg, uploadImages } from '../../functions/ImagesFunctions'
import { useAdminUser } from '../../services/reduxToolkit/adminUserLogin/selectors'


export default function AddStaffPost({cancel, gRef}) {
    const [UploadState, setUploadState] = useState(0)
    const [Error, setError] = useState(false)
    const [Uploading, setUploading] = useState(false)
    const [ImgSelec, setImgSelec] = useState([])
    const OptimizeImage = async (e) => {
        const imgCopy = [];
        Array.from(e.target.files).forEach(async(file) => {
            await handleOptimizedImg(file).then((Optimg) => {
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
        const array = [form.get("title"), form.get("info"), form.get("link")];
        const verification = []
        array.forEach((input) => {
            if(input === ""){
                verification.push(true);
            }
        })        
        if(verification.length === 0){
            gRef.doc(`${id}`).set({
                image: imageUrl,
                info: form.get("info"),
                link: {
                    whatsapp: form.get("whatsapp") === "" ? null : form.get("whatsapp"),
                    instagram: form.get("instagram") === "" ? null : form.get("instagram"),
                    facebook: form.get("facebook") === "" ? null : form.get("facebook"),
                },
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
        await uploadImages(ImgSelec, "Staff", "Global", newPostID, (newvalue) => setUploadState(newvalue)).then((url) => {
            setUploadState(100)
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
            <div className="divAddRow" style={{ width: "80%" }}>
                <Typography variant="h4" color="secondary">Publicacion en Staff</Typography>
                <form style={{ width: "100%",  alignItems: "center", justifyContent: "space-between", display: "flex", flexFlow: "column" }} onSubmit={handleUploadPost}>
                    <TextField name="title" style={{ margin: "10px 0" }} fullWidth color="secondary"  variant="outlined" label="Nombre y Apellido" size="small" />
                    <div style={{ backgroundImage: `url(${ImgSelec.length > 0 ? ImgSelec[0] : "" })`, marginBottom: "10px", backgroundSize: "cover", backgroundColor: "#e7e7e7", width: "40%", borderRadius: "10px", display: "flex", alignItems: "center", flexFlow: "column", justifyContent: "center"}}>
                        <input type="file" hidden="hidden" id="inputImg" onChange={OptimizeImage} />
                        <IconButton style={{ color: "#7a7a7a", margin: "100px" }} onClick={() => {
                            document.getElementById("inputImg").click();
                        }}>
                            {ImgSelec.length == 0 ? <AddPhotoAlternate style={{ fontSize: "50" }} /> : <RepeatRounded style={{ fontSize: "50" }} />}    
                        </IconButton>
                    </div>
                    <TextField name="info" style={{ margin: "10px 0" }} fullWidth color="secondary"  variant="outlined" label="Biografia o informacion" multiline size="small" />
                    <div style={{ width: "100%", display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                        <TextField name="facebook" InputProps={{ endAdornment: <Facebook />}} style={{ margin: "10px 0", width: "30%" }}  color="secondary"  variant="outlined" label="Facebook" multiline size="small" />
                        <TextField name="instagram" InputProps={{ endAdornment: <Instagram />}} style={{ margin: "10px 0", width: "30%" }}  color="secondary"  variant="outlined" label="Instagram" multiline size="small" />
                        <TextField name="whatsapp" InputProps={{ endAdornment: <WhatsApp />}} style={{ margin: "10px 0", width: "30%" }}  color="secondary"  variant="outlined" label="Whatsapp" multiline size="small" />
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
                                {UploadState}%
                            </div> : "Aceptar"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}