import { Button, CircularProgress, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { pRef } from './ProgrammingTable'

export default function ProgrammingPositions({cancel, index, id}) {
    const [NewIndex, setNewIndex] = useState(index)
    const [Error, setError] = useState(false)
    const [Loading, setLoading] = useState(false)
    const UpdatePosition = (e) => {
        setLoading(true)
        e.preventDefault();
        if(index == NewIndex){
            setLoading(false)
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 3000);
        }
        else{
            pRef.where("position", "==", NewIndex).get().then((snapshot) => {
                snapshot.forEach((docu) => {
                    pRef.doc(docu.id).update({ position: parseInt(index) }).then(() => {
                        pRef.doc(`${id}`).update({
                            position: NewIndex
                        }).then(() => {
                            document.getElementById("closeposition").click();
                        }).catch(() => {
                            setLoading(false)
                            setError(true)
                            setTimeout(() => {
                                setError(false)
                            }, 3000);
                        })
                    }).catch(() => {
                        setLoading(false)
                        setError(true)
                        setTimeout(() => {
                            setError(false)
                        }, 3000);
                    })
                })
            }).catch((error) => console.log(error))
        }
    }
    return (
        <div className="addShadow">
            <div className="divAddRow">
                <Typography variant="h4" color="secondary">Cambiar posicion : {index} a {NewIndex}</Typography>
                <form style={{ width: "100%" }} onSubmit={UpdatePosition}>
                    <TextField error={Error} onChange={(e) => setNewIndex(parseInt(e.target.value))} defaultValue={index} type="number" helperText="Asigne una nueva posicion" name="position" style={{ margin: "10px 0" }} fullWidth color="secondary"  variant="outlined" label="Posicion en la tabla" size="small" />
                    <div style={{ width: '100%', display: "flex", flexFlow: "row", alignItems: "center", justifyContent: "space-between"}}>
                        <Button id="closeposition" color="secondary" variant="outlined" onClick={cancel}>
                            Cancelar
                        </Button>
                        <Button color="secondary" variant="contained" type="submit">
                            {Loading ? <CircularProgress color="primary" /> : "Aceptar"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
