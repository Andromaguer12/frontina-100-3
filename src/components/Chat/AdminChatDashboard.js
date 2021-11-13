import { Button, CircularProgress, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Popper, Typography } from '@material-ui/core'
import { Delete, ErrorOutline, Settings } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group';
import { createNewChannel } from '../../functions/authFunctions';
import { getDateFromTimestamp } from '../../functions/utils';
import { rdb } from '../../services/firebase';
import { useAdminUser } from '../../services/reduxToolkit/adminUserLogin/selectors';
import { setCurrentChatID } from '../../services/reduxToolkit/chatStates/actions';
import { useGoogleUser } from '../../services/reduxToolkit/userWithGoogle/selectors';


export default function AdminChatDashboard({data, delChat, updateChatMessages}) {
    const [Loading, setLoading] = useState(false)
    const [Success, setSuccess] = useState(false)

    const NewChat = () => {
        setLoading(true)
        rdb.ref("chats/dRjaS5X-qqjo9SX").remove().then(() => {
            createNewChannel("dRjaS5X-qqjo9SX").then(() => {
                setLoading(false)
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                }, 3000);
            })
        })
    }

    return (
        <div style={{ width: "100%", display: "flex", flexFlow: "column", marginBottom: "20px" }}>
             <Typography variant="h4" color="secondary" style={{ width: "100%" }}>
                Administracion del chat
            </Typography>
            <Typography variant="h6" style={{ width: "100%", marginTop: "20px" }}>
                Reiniciar chat 
                <Button onClick={NewChat} color="secondary" variant="contained" style={{ margin: "0 20px"}}>
                    {Loading ? <CircularProgress /> : "Aceptar" }
                </Button>
                {Success && <Typography style={{ width: "40%", color: "green", fontSize: "14px", marginTop: "2.5px" }}>
                    Chat Reiniciado
                </Typography>}
            </Typography>
            <Typography style={{ width: "40%", color: "#7a7a7a", fontSize: "14px", marginTop: "2.5px" }}>
                Reinicie el chat para eliminar todos los mensajes que tiene y que ya no sean de relevancia, para liberar espacio.
            </Typography>
        </div>
    )
}
