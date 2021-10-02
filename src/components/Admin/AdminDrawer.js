import { Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminDrawer({Functions}) {
    return (
        <div style={{ width: "20%", display: "flex", flexFlow: "column", justifyContent: "flex-start", background: "#e7e7e7", zIndex: 0, borderRight: "1px solid #b8b8b8" }}>
            <div className="drawerHeader">
                <Typography color="secondary" style={{ margin: "10px 5px"}}>
                    Configuracion y Administracion
                </Typography>
            </div>
            <Divider style={{ width: '100%' }} />
            <List style={{ width: "100%" }}>
                {
                    Functions.map((item) => {
                        return (
                            <Link color="secondary" to={item.link} style={{ width: "100%", textDecoration: "none", color: "#000"}}>
                                <ListItem button style={{ width: "100%" }}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText>{item.label}</ListItemText>
                                </ListItem>
                            </Link>
                        )
                    })
                }
            </List>
            {/* <Divider /> */}
        </div >
    )
}
