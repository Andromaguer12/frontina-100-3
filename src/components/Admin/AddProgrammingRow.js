import { Button, MenuItem, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import db from '../../services/firebase'
import SelectFromOnce from './SelectFromOnce'

export const days = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo", "lunes a viernes", "fines de semana"]

export default function AddProgrammingRow({cancel}) {
    const pRef = db.collection("Programacion")
    const [anchorEl, setanchorEl] = useState(null)
    const [time, settime] = useState(null)
    const open = Boolean(anchorEl);
    const [streamDay, setstreamDay] = useState("lunes")

    const handleNewRow = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const array = [form.get("programName"), form.get("synopsis"), form.get("conductor"), form.get("timeDuration")];
        const verification = []
        array.forEach((input) => {
            if(input === ""){
                verification.push(true);
            }
        })        
        if(verification.length === 0 && time != null){
            await pRef.add({
                programName: form.get("programName"),
                synopsis: form.get("synopsis"),
                conductor: form.get("conductor"),
                streamDay,
                time: time,
                timeDuration: form.get("timeDuration")
            }).then(() => {
                cancel();    
            })
        }
    }
    return (
        <div className="addShadow">
            <div className="divAddRow">
                <Typography variant="h4" color="secondary">Agregar Fila</Typography>
                <form style={{ width: "100%" }} onSubmit={handleNewRow}>
                    <TextField name="programName" style={{ margin: "10px 0" }} fullWidth color="secondary"  variant="outlined" label="Nombre del programa" size="small" />
                    <TextField name="synopsis" style={{ margin: "10px 0" }} fullWidth color="secondary"  variant="outlined" label="Sinopsis" multiline size="small" />
                    <TextField name="conductor" style={{ margin: "10px 0" }} fullWidth color="secondary"  variant="outlined" label="Conductor" size="small" />
                    <TextField select name="streamDay" size="small" variant="standard" color="secondary" style={{ marginBottom: "10px"}} label="Dia de transmision" value={streamDay} onChange={(e) => setstreamDay(e.target.value)} fullWidth>
                        {days.map((day) => <MenuItem value={day}>{day}</MenuItem>)}
                    </TextField>
                    <SelectFromOnce close={() => setanchorEl(null)} open={open} anchorEl={anchorEl} handleChange={(e) => settime(e.target.value)} />
                    <Button color={Boolean(time) ? "secondary" : ""} variant="outlined" onClick={(e) => setanchorEl(open ? null: e.target)}>Seleccionar Horas</Button>
                    <TextField name="timeDuration" style={{ margin: "10px 0" }} fullWidth color="secondary"  variant="outlined" label="Duracion" size="small" />
                    <div style={{ width: '100%', display: "flex", flexFlow: "row", alignItems: "center", justifyContent: "space-between"}}>
                        <Button color="secondary" variant="outlined" onClick={cancel}>
                            Cancelar
                        </Button>
                        <Button color="secondary" variant="contained" type="submit">
                            Aceptar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
