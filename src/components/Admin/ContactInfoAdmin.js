import { IconButton, InputBase, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import { Call, Chat, Check, Clear, Create, Facebook, Instagram, Mail, Telegram, Twitter, WhatsApp } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { rdb } from '../../services/firebase'

export default function ContactInfoAdmin() {
    const [Contact, setContact] = useState({})
    const [Edit, setEdit] = useState(false)
    const [updateState, setUpdate] = useState(null);
    const handleInputs = (e) => {
        setUpdate({
            ...updateState,
            [e.target.name]: e.target.value
        })
    }
    const handleUpdate = () => {
        rdb.ref().child('/contacts').update(updateState).then(() => {
            setEdit(!Edit); 
            setUpdate(null);
        })
    }
    useEffect(() => {
        rdb.ref().child('/contacts').on("value", (id) => {
            setContact(id.val())
        })
    }, [])
    return (
        <div className="SobreNosotrosContainer">
            <Typography color="secondary" variant="h4" style={{ width: "100%",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                Informacion de contacto
                <IconButton color="secondary" onClick={() => setEdit(!Edit)}>
                    <Create />
                </IconButton>
            </Typography>
            <Typography style={{ width: "100%",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "flex-start" }}>
                Edita la informacion que se visualizara dentro de este apartado!
            </Typography>
            <div className="footerContents" style={{ flexFlow: "column", paddingTop: "10px"}}>
                <Typography variant="h6" color="secondary" style={{ margin: "5px 0", display: "flex", alignItems: "center", flexFlow: "row" }}>
                    Informacion (Links de los perfiles preferiblemente)
                    {Boolean(updateState) && Edit && <IconButton color="secondary" onClick={handleUpdate}>
                        <Check />
                    </IconButton>}
                    {Edit && <IconButton color="secondary" onClick={() => {setEdit(!Edit); setUpdate(null)}}>
                        <Clear />
                    </IconButton>}
                </Typography>
                <List className="footerList" style={{ padding: "0"}}>
                    <ListItem color="primary" style={{ width: "100%"}}>
                        <ListItemIcon ><Mail color="secondary" /></ListItemIcon>
                        <ListItemText style={{ color: "#7a7a7a"}}>
                            {Edit ? <InputBase color="secondary" name="contactEmail"  onChange={handleInputs} variant="outlined" label="Opcion" placeholder={Contact.contactEmail} size="small" />
                                : Contact.contactEmail}
                        </ListItemText>
                    </ListItem>
                    <ListItem color="primary" style={{ width: "100%"}}>
                        <ListItemIcon ><WhatsApp color="secondary" /></ListItemIcon>
                        <ListItemText style={{ color: "#7a7a7a"}}>
                            {Edit ? <InputBase color="secondary" name="phoneNumber"  onChange={handleInputs} variant="outlined" label="Opcion" placeholder={Contact.phoneNumber} size="small" />
                             : Contact.phoneNumber}
                        </ListItemText>
                    </ListItem>
                    <ListItem color="primary" style={{ width: "100%"}}>
                        <ListItemIcon ><Facebook color="secondary" /></ListItemIcon>
                        <ListItemText style={{ color: "#7a7a7a"}}>
                            {Edit ? <InputBase color="secondary" name="facebook"  onChange={handleInputs} variant="outlined" label="Opcion" placeholder={Contact.facebook} size="small" />
                             : Contact.facebook}
                        </ListItemText>
                    </ListItem>
                    <ListItem color="primary" style={{ width: "100%"}}>
                        <ListItemIcon ><Instagram color="secondary" /></ListItemIcon>
                        <ListItemText style={{ color: "#7a7a7a"}}>
                            {Edit ? <InputBase color="secondary" name="instagram"  onChange={handleInputs} variant="outlined" label="Opcion" placeholder={Contact.instagram} size="small" />
                             : Contact.instagram}
                        </ListItemText>
                    </ListItem>
                    <ListItem color="primary" style={{ width: "100%"}}>
                        <ListItemIcon ><Twitter color="secondary" /></ListItemIcon>
                        <ListItemText style={{ color: "#7a7a7a"}}>
                            {Edit ? <InputBase color="secondary" name="twitter"  onChange={handleInputs} variant="outlined" label="Opcion" placeholder={Contact.twitter} size="small" />
                             : Contact.twitter}
                        </ListItemText>
                    </ListItem>
                    <ListItem color="primary" style={{ width: "100%"}}>
                        <ListItemIcon ><Telegram color="secondary" /></ListItemIcon>
                        <ListItemText style={{ color: "#7a7a7a"}}>
                            {Edit ? <InputBase color="secondary" name="telegram"  onChange={handleInputs} variant="outlined" label="Opcion" placeholder={Contact.telegram} size="small" />
                             : Contact.telegram}
                        </ListItemText>
                    </ListItem>
                </List>
            </div>
        </div>
    )
}
