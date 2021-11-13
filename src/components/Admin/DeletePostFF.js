import { Button, CircularProgress, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { storage } from '../../services/firebase'

export default function DeletePostFF({pRef, delId, info, cancel}) {
    const [Loading, setLoading] = useState(false)
    const handleDeleteInfo = () => {
        setLoading(true)
        pRef.doc(`${delId}`).delete().then(() => cancel());
    }
    const handleDelete = () => {
        setLoading(true)
        storage.refFromURL(`${delId.image}`).delete().then(() => {
            pRef.doc(`${delId.id}`).delete().then(() => cancel());
        })
    }
    return (
        <div className="addShadow">
            <div className="divAddRow" style={{ width: "80%", height: "fit-content", borderRadius: "10px"}}>
                <Typography variant="h4" color="secondary">Eliminar Publicacion</Typography>
                <div style={{ width: '100%', display: "flex", flexFlow: "row", alignItems: "center", justifyContent: "space-between"}}>
                    <Button color="secondary" variant="outlined" onClick={cancel}>
                        Cancelar
                    </Button>
                    <Button color="secondary" variant="contained" onClick={info ? handleDeleteInfo : handleDelete}>
                        {Loading ? <CircularProgress /> : "Continuar"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
