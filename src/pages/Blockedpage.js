import { Typography } from '@material-ui/core'
import { ErrorOutline } from '@material-ui/icons';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setAdminUser } from '../services/reduxToolkit/adminUserLogin/actions'

export default function Blockedpage() {
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(setAdminUser([null, {
    //         email: null,
    //         auth: "user",
    //         secondaryAuth: "any"
    //     }, false]))
    // })
    return (
        <div style={{ width: "100%", height: "100vh", display: "flex", flexFlow: "column", alignItems: "center"}}>
            <Typography variant="h4" color="secondary" style={{ margin: "20px"}} >Lo siento estas Bloqueado</Typography>
            <ErrorOutline style={{ fontSize: "100"}} color="secondary" />
            <Typography variant="h4" color="secondary" style={{ margin: "20px"}} >:(</Typography>
            <Typography style={{ margin: "20px"}} >Intenta contactar al servicio por telefono, o correo electronico para saber la causa</Typography>
        </div>
    )
}
