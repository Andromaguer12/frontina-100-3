import { Button, CircularProgress, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { storage } from '../../services/firebase'

export default function DeleteChat({dRef, delId, cancel}) {
    const [Loading, setLoading] = useState(false)
    const handleDelete = () => {
        setLoading(true)
        dRef.child(`${delId}`).remove().then(() => {
            cancel();
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <div className="addShadow">
            <div className="divAddRow">
                <Typography variant="h4" color="secondary">Eliminar Chat</Typography>
                <div style={{ width: '100%', display: "flex", flexFlow: "row", alignItems: "center", justifyContent: "space-between"}}>
                    <Button color="secondary" variant="outlined" onClick={cancel}>
                        Cancelar
                    </Button>
                    <Button color="secondary" variant="contained" onClick={handleDelete}>
                        {Loading ? <CircularProgress /> : "Continuar"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
