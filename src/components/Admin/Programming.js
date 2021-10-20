import { IconButton, Typography } from '@material-ui/core'
import { AddCircleOutline, Edit, List } from '@material-ui/icons'
import React, { useState } from 'react'
import ProgrammingTable from './ProgrammingTable'

export default function Programming({toggleAdd, togglePP}) {
    const [EditMode, setEditMode] = useState(false)
    

    return (
        <div style={{ width: "100%", display: "flex", alignItems: "flex-start", flexFlow: "column", marginBottom: "20px" }}>
            <Typography color="secondary" variant="h4" style={{ width: "100%",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                Programacion
                <div>
                    <IconButton color="secondary" onClick={() => toggleAdd()}>
                        <AddCircleOutline />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => setEditMode(!EditMode)}>
                        <Edit />
                    </IconButton>
                </div>
            </Typography>
            <Typography style={{ fontSize: "14px", margin: "15px 0", width: "50%"  }}>Modifique la programacion de la radio, esta se mostrara en la pagina de Programacion</Typography>
            <ProgrammingTable togglePP={(num) => togglePP(num)} closeEditMode={() => setEditMode(false)} editMode={EditMode} />
        </div>
    )
}
