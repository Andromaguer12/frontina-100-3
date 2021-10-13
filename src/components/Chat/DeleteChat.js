import { Button, CircularProgress, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { storage } from '../../services/firebase'
import { setChatsList } from '../../services/reduxToolkit/chatStates/actions'

export default function DeleteChat({dRef, data, delId, cancel}) {
    const [Loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const handleDelete = () => {
        setLoading(true)
        dRef.child(`${delId}`).remove().then(() => {
            cancel();
            if(data == 1) dispatch(setChatsList([]));
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
