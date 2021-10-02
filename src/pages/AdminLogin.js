import React, { useState } from 'react'
import { TextField, Button, Typography, CircularProgress } from '@material-ui/core'
import { Home, ExitToApp, ErrorOutline } from "@material-ui/icons"
import fondo from '../Images/fondo.png'
import logo from '../Images/logohorizontal.png'
import { logIn } from '../functions/authFunctions'
import { useDispatch } from 'react-redux'
import { setAdminUser } from '../services/reduxToolkit/adminUserLogin/actions'
import "../Styles/AdminLogin.css"
import { CSSTransition } from 'react-transition-group'
import db, { auth } from '../services/firebase'

export default function AdminLogin() {
    const [Loading, setLoading] = useState(false);
    const [Wpass, setWpass] = useState(false);
    const [Wemail, setWemail] = useState(false)
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        setLoading(true);
        e.preventDefault();
        const passerror = (error) => (error === "auth/wrong-password");
        const invaliduser = (error) => (error === "auth/user-not-found");
        const loginform = new FormData(e.target);
        if(loginform.get("email") != "" || loginform.get("password") != ""){
            logIn(loginform.get("email"), loginform.get("password")).then((result) => {
                dispatch(setAdminUser(result));
                const Date = new Date().getTime();
                db.collection("UsuariosData").doc(auth.currentUser.email).update({
                    lastConnection: Date
                }).catch((error) => console.log(error))
            }).catch((error) => {
                setLoading(false);
                if(passerror(error.code)){
                    setWpass(true);
                    setTimeout(() => {
                        setWpass(false);
                    }, 3000);
                }
                if(invaliduser(error.code)){
                    setWemail(true);
                    setTimeout(() => {
                        setWemail(false);
                    }, 3000);
                }
            })
        }
    }
    return (
        <div className="adminLoginPage" style={{ backgroundImage: `url(${fondo})`}}>
            <div className="loginContainer">
                <div className="logodiv">
                    {/* <div style={{ backgroundImage: `url(${logo})` }} className="loginLogo">
                    </div> */}
                    <img src={logo}  className="loginLogo" />
                    <CSSTransition
                        in={Wpass}
                        timeout={500}
                        classNames="login-alert"
                        unmountOnExit
                    >
                        <Typography variant="h6" color='secondary' className="logodiv" style={{ width: "fit-content"}}>
                            Contraseña incorrecta 
                            <ErrorOutline /> 
                        </Typography>
                    </CSSTransition>
                    <CSSTransition
                        in={Wemail}
                        timeout={500}
                        classNames="login-alert"
                        unmountOnExit
                    >
                        <Typography variant="h6" color='secondary' className="logodiv" style={{ width: "fit-content"}}>
                            Usuario inexistente 
                            <ErrorOutline /> 
                        </Typography>
                    </CSSTransition>
                </div>
                    <form id="loginform" onSubmit={handleLogin} style={{ width: "100%"}}>
                        <TextField name="email" variant="outlined" color="primary" label="E-mail" style={{width: "100%", margin: "10px 0"}} />
                        <TextField type="password" name="password" variant="outlined" color="primary" label="Contraseña" style={{width: "100%", margin: "10px 0"}} />  
                        <div style={{ width: "100%", display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "center"}}>
                            <Button href="/home" variant="contained" color="primary" fullWidth style={{ margin: "0 10px"}} endIcon={<Home />}>
                                Volver al inicio
                            </Button>
                            <Button type="submit" variant="contained" color="secondary" fullWidth style={{ margin: "0 10px"}} endIcon={<ExitToApp />}>
                                {Loading ? <CircularProgress /> : "Iniciar sesion Admin" }
                            </Button>
                        </div>
                    </form>
            </div>
        </div>
    )
}
