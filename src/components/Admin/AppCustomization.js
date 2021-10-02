import { Button, Checkbox, CircularProgress, FormControlLabel, IconButton, Select, Switch, TextField, Typography } from '@material-ui/core'
import SwitchBase from '@material-ui/core/internal/SwitchBase';
import { AddPhotoAlternate, CloudUploadOutlined, RepeatRounded } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { RANDOMID } from '../../functions/ChatObservers';
import { handleOptimizedImg, uploadImages } from '../../functions/ImagesFunctions';
import { rdb } from '../../services/firebase';

export default function AppCustomization({ setImage }) {
    const [visualModes, setvisualModes] = useState(null)
    const open = Boolean(visualModes)
    const [Loading, setLoading] = useState(false)
    const [Categorie, setCategorie] = useState("Ultima Hora")
    const [UploadState, setUploadState] = useState(0)
    const [uploadedImgUrl, setuploadedImgUrl] = useState("")
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
    useEffect(() => {
        rdb.ref().child('/visualModes').on("value", (id) => {
            setvisualModes(id.val())
            setImage(id.val().logo)
        })
    }, [])
    const handleAni = (e) => {
        rdb.ref().child("visualModes").update({
            [e.target.name]: e.target.checked
        })
    }
    const handleNewLogo = (url) => {
        rdb.ref().child("visualModes").update({
            logo: url
        }).then(() => {
            setUploading(false);
            setImgSelec([]);
        })
    }
    const handleUploadPost = async () => {
        setUploading(true);
        const newPostID = RANDOMID('AaBbNnJjHhGgTtYyCcDd123456789', 15);
        await uploadImages(ImgSelec, "currentLogo", "Global", newPostID, (newvalue) => setUploadState(newvalue)).then((url) => {
            setUploadState(100)
            handleNewLogo(url)
        }).catch(() => {
            setUploading(false);
            setError(true);
            setTimeout(() => {
                setError(false)
            }, 3000);
        })
    }
    return (
        <div style={{ width: "100%", display: "flex", alignItems: "flex-start", flexFlow: "column", paddingBottom: "20px", marginBottom: "20px", borderBottom: "1px solid #b8b8b8" }}>
            <Typography color="secondary" variant="h4">Personalizacion de la app</Typography>
            <Typography style={{ fontSize: "14px", margin: "15px 0", width: "50%"  }}>Configure algunos aspectos visuales de la aplicacion</Typography>
            {open ? <React.Fragment>
                <Typography color="secondary" variant="h5">Logotipo de la radio a mostrar:</Typography>
                <Typography style={{ fontSize: "14px", margin: "15px 0", width: "50%"  }}>Recomendable que sea una imagen cuadrada! de proporciones iguales, ej.(1000x1000)</Typography>
                <div style={{ backgroundImage: `url(${ImgSelec.length > 0 ? ImgSelec[0] : "" })`, marginBottom: "10px", backgroundSize: "cover", backgroundColor: "#e7e7e7", width: "30%", borderRadius: "10px", display: "flex", alignItems: "center", flexFlow: "column", justifyContent: "center"}}>
                    <input type="file" hidden="hidden" id="inputImg" onChange={OptimizeImage} />
                    <IconButton style={{ color: "#7a7a7a", margin: "100px" }} onClick={() => {
                        document.getElementById("inputImg").click();
                    }}>
                        {ImgSelec.length == 0 ? <AddPhotoAlternate style={{ fontSize: "50" }} /> : <RepeatRounded style={{ fontSize: "50" }} />}    
                    </IconButton>
                </div>
                <Button onClick={handleUploadPost} color="secondary" variant="contained" style={{ width: '30%', margin: "10px 0" }} disabled={ImgSelec.length == 0 ? true : false} endIcon={<CloudUploadOutlined />}>
                        {Uploading ? <div style={{ width: "100%",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                            <CircularProgress />
                            {UploadState}%
                        </div> : "Subir"}
                </Button>
                <FormControlLabel label="Modo de aniversario" control={<Switch  name="aniversario" onChange={handleAni} checked={visualModes.aniversario}/>} />
                <FormControlLabel label="Modo de Navidad" control={<Switch name="navidad" onChange={handleAni} checked={visualModes.navidad} />} />
            </React.Fragment> : <div style={{ width: "100%", boxSizing: "border-box", display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress color="secondary" />
            </div>
            }
        </div>
    )
}
