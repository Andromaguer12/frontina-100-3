import { Button, CircularProgress, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { rdb } from '../../services/firebase';

export default function StreamId({currentId, currentListeners}) {
    const [Loading, setLoading] = useState(false)
    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const form = new FormData(e.target).get("streamid");
        rdb.ref().child('/').update({ streamID: { id: form, listeners: currentListeners } }).then(() => {
            e.target.reset();
            setLoading(false);
        });
    }
    return (
        <div style={{ width: "100%", display: "flex", alignItems: "flex-start", flexFlow: "column", paddingBottom: "20px", marginBottom: "20px", borderBottom: "1px solid #b8b8b8" }}>
            <Typography color="secondary" variant="h4"> Stream-ID </Typography>
            <Typography style={{ fontSize: "14px", margin: "15px 0", width: "50%"  }}>La direccion diaria de la transmision de radio consiguela <a href="https://zeno.fm/radio-frontina/">aqui</a></Typography>
            <form id="streamid" style={{ width: "50%"}} onSubmit={handleSubmit}>
                <TextField name="streamid" color="secondary" label="Direccion URL" variant="outlined" size="small" style={{ width: "100%"}} />
                <Typography style={{ fontSize: "12.5px", margin: "15px 0", width: "100%", color: "#7a7a7a" }}>Es necesario, que cada vez que se inicia la transmision desde ZenoRadio, copiar la direccion y pegarla aqui.</Typography>
                <div style={{ width: "100%", display: "flex", alignItems: "center", flexFlow: "row"}}>
                    <Button type="submit" color="secondary"  variant="contained"> Actualizar </Button>
                    {Loading && <CircularProgress />}
                    <Typography style={{ fontSize: "12.5px", margin: "15px 5px", width: "100%", color: "#7a7a7a" }}>La direccion configurada actualmente es: {currentId}</Typography>
                </div>
            </form>
        </div>
    )
}
