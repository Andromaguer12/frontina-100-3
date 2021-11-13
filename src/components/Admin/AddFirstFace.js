import { Button, CircularProgress, IconButton, MenuItem, TextField, Typography } from '@material-ui/core'
import { AddPhotoAlternate, ErrorOutline, Image, RepeatRounded } from '@material-ui/icons'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { RANDOMID } from '../../functions/ChatObservers'
import { FullWidthImage, handleOptimizedImg, uploadImages } from '../../functions/ImagesFunctions'
import { useAdminUser } from '../../services/reduxToolkit/adminUserLogin/selectors'
import { categories } from "../../pages/HomePage"

export default function AddFirstFace({pRef, cancel, variation, FullR}) {
    const adminUser = useSelector(useAdminUser);    
    const [Categorie, setCategorie] = useState("Ultima Hora")
    const [UploadState, setUploadState] = useState(0)
    const [uploadedImgUrl, setuploadedImgUrl] = useState("")
    const [Error, setError] = useState(false)
    const [Uploading, setUploading] = useState(false)
    const [ImgSelec, setImgSelec] = useState([])
    const [uMImages, setuMImages] = useState([])
    const OptimizeImage = async (e) => {
        const imgCopy = [];
        Array.from(e.target.files).forEach(async(file) => {
            await handleOptimizedImg(file, file.naturalWidth, file.naturalHeight).then((Optimg) => {
                imgCopy.push(Optimg)
                setImgSelec(imgCopy);
            }).catch((error) => {
                console.log(error)
            })
        })
    }

    const handleNewPost = async (e, id, imageUrl) => {
            const form = new FormData(e.target);   
            await pRef.doc(`${id}`).set({
                contentType: form.get("categorie"),
                text: form.get("text"),
                title: !variation ? form.get("title") : null,
                postImg: imageUrl,
                timestamp: new Date().getTime(),
                likes: 0,
                position: form.get("position"),
                likedBy: [],
                comments: variation ? [] : null,
                creator: {
                    name: adminUser[1].name,
                    email: adminUser[1].id,
                    img: adminUser[1].img,
                    skills: adminUser[1].skills
                }
            }).then(() => {setUploading(false); cancel();})
            setTimeout(() => {
                cancel();    
            }, 3000);
    }

    const handleUploadPost = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const array = [form.get("title"), form.get("text"), form.get("position")];
        const verification = []
        const newPostID = RANDOMID('AaBbNnJjHhGgTtYyCcDd123456789', 15);
        array.forEach((input) => {
            if(input === ""){
                verification.push(true);
            }
        }) 
        if(ImgSelec.length == 0) verification.push(true); 
        if(verification.length === 0 && !FullR){
            setUploading(true);
            await uploadImages(ImgSelec, variation ? "globalPosts" : "firstFace", "Posts", newPostID, (newvalue) => setUploadState(newvalue)).then((url) => {
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
        else if(verification.length === 0 && FullR) {
            setUploading(true);
            await FullWidthImage(uMImages, variation ? "globalPosts" : "firstFace", "Posts", newPostID, (newvalue) => setUploadState(newvalue)).then((url) => {
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
    }

    return (
        <div className="addShadow" style={{ padding: "0", justifyContent: "flex-end", boxSizing: "border-box"}}>
            <div className="divAddRow"  >
                <Typography variant="h4" color="secondary">{variation ? "Publicacion Global" : "Publicacion de Primera Plana"}</Typography>
                <form style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", flexFlow: "column", height: "100%"  }} onSubmit={handleUploadPost}>
                    <div style={{ width: "100%", display: "flex", flexFlow: "row", alignItems: "center", justifyContent: "space-between"}}>
                        <div style={{ width: '50%'}}>
                            {!variation && <TextField type="number" helperText="Preferible coloque un numero que no coincida con uno ya asignado" name="position" style={{ margin: "10px 0" }} fullWidth color="secondary"  variant="outlined" label="Posicion" size="small" />}
                            {!variation && <TextField name="title" style={{ margin: "10px 0" }} fullWidth color="secondary"  variant="outlined" label="Titulo" size="small" />}
                            <TextField select name="categorie" size="small" variant="standard" color="secondary" style={{ marginBottom: "10px"}} label="Categoria" value={Categorie} onChange={(e) => setCategorie(e.target.value)} fullWidth>
                                {categories.map((categories) => <MenuItem value={categories}>{categories}</MenuItem>)}
                            </TextField>
                        </div>
                        <div style={{ backgroundImage: `url(${ImgSelec.length > 0 ? ImgSelec[0] : "" })`, margin: "10px 0", backgroundSize: "cover", backgroundColor: "#e7e7e7", width: "40%", borderRadius: "10px", display: "flex", alignItems: "center", flexFlow: "column", justifyContent: "center"}}>
                            <input type="file" hidden="hidden" id="inputImg" onChange={FullR ? (e) => {setuMImages(Array.from(e.target.files)); OptimizeImage(e)} :  (e) => OptimizeImage(e) } />
                            <IconButton style={{ color: "#7a7a7a", margin: "100px" }} onClick={() => {
                                document.getElementById("inputImg").click();
                            }}>
                                {ImgSelec.length == 0 ? <AddPhotoAlternate style={{ fontSize: "50" }} /> : <RepeatRounded style={{ fontSize: "50" }} />}    
                            </IconButton>
                        </div>
                    </div>
                    <div style={{ width: "100%", maxHeight: "30vh", overflow: "auto"}}>
                        <TextField multiline name="text" style={{ margin: "10px 0" }} fullWidth color="secondary"  variant="outlined" label="Descripcion" size="small" />
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
