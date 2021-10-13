import { AppBar, Button, IconButton, InputBase, Tab, Tabs, Typography, Toolbar, Popper, CircularProgress, Hidden, Drawer, ListItem, ListItemText, List, Divider } from '@material-ui/core'
import { AccountCircleOutlined, Clear, ErrorOutline, ExitToApp, Image, Menu, Search } from '@material-ui/icons'
import { Link } from "react-router-dom"
import React, { useState } from 'react'
import { Redirect } from  "react-router-dom"
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import image from '../../Images/Logo.jpg'
import { AllRoutes } from '../../constants/routes/AllRoutes'
import '../../Styles/HomePage.css'
import { useGoogleUser } from '../../services/reduxToolkit/userWithGoogle/selectors'
import { signInWithGoogle } from '../../functions/authFunctions'
import { setCurrentUser } from '../../services/reduxToolkit/userWithGoogle/actions'
import db, { auth } from '../../services/firebase'
import { CSSTransition } from 'react-transition-group'
import SearchPopper from './SearchPopper'
import LoadingLazySpinner from './loadingLazySpinner'

const Links = [
    {
        label: "Inicio",
        link: AllRoutes.home
    },
    {
        label: "Programacion",
        link: AllRoutes.programming
    },
    {
        label: "Sobre Nosotros",
        link: AllRoutes.aboutUs
    },
    {
        label: "Galeria",
        link: AllRoutes.gallery
    },
    {
        label: "Staff",
        link: AllRoutes.staff
    },
]

export default function HomeHeader({logo, hHeight, pagePosition, shadow}) {
    const [Scroll, setScroll] = useState(0);
    const [OpenDrawer, setOpenDrawer] = useState(false)
    const scroll = () => setScroll(window.scrollY);
    const Colors = Scroll === 0 ? "#7a7a7a" : "#fff"
    const googleUser = useSelector(useGoogleUser);
    const dispatch = useDispatch();
    const [InputSearch, setInputSearch] = useState("");
    const [SanchorEl, setSanchorEl] = useState(null)
    const openS = Boolean(SanchorEl);
    const [tabsValue, settabsValue] = useState(pagePosition)
    const spaceIndex = googleUser?.currentUser[1]?.name?.indexOf(" ", 0);
    const [anchorEl, setanchorEl] = useState(null)
    const open = Boolean(anchorEl);
    const handleSearch = (e) => {
        setInputSearch(e.target.value)
        if(e.target.value) setSanchorEl(e.target)
        else  setSanchorEl(null)
    }
    useEffect(() => {
        hHeight(document.getElementById("homeheader")?.offsetHeight)
    })
    const setAnchorElFor = (e) => {
        setanchorEl(open ? null : e.target);
        setTimeout(() => {
            setanchorEl(null);
        }, 10000);
    }
    const handleLogIn = async (e) => {
        //execute the login
        await signInWithGoogle().then((result) => {
            if(result[1].blocked){
                dispatch(setCurrentUser([null, {
                    blocked: true,
                    email: null,
                    auth: "user",
                    secondaryAuth: "any"
                }, false]))
                setAnchorElFor(e);
                auth.signOut();
            }
            else{
                dispatch(setCurrentUser(result));
                db.collection("UsuariosData").doc(auth.currentUser.email).update({
                    lastConnection: new Date().getTime()
                })
            }
        }).catch((error) => {
            console.log(error)   
        })
    }
    window.addEventListener("scroll", () => {if(Scroll == 0 || Scroll == 1) setScroll(window.scrollY)})
    const handleSignOut = () => {
        dispatch(setCurrentUser([null, {
            email: null,
            auth: "user",
            secondaryAuth: "any"
        }, false]))
        auth.signOut();
    }
    return (
        <div className="headerContainer" id="homeheader" style={{ position: 'fixed', top: 0, zIndex: 2, backgroundImage: `linear-gradient(to bottom, ${shadow ? "#fff" : "transparent"}, transparent)`, display: "flex" }}>
            <AppBar position="sticky" className="header" style={{ background: `${Scroll === 0 ? 'transparent' : '#C93832'}`, boxShadow: `${Scroll === 0 ? "0 0 0 transparent" : "0px 2px 10px #00000078"}`}}>
                    <div className="toolbar">
                        <Hidden mdUp>
                            <IconButton onClick={() => setOpenDrawer(!OpenDrawer)}>
                                <Menu style={{ color: Colors }} />
                            </IconButton>
                        </Hidden>
                        <SearchPopper search={InputSearch} open={openS} anchorEl={SanchorEl} />
                        {!logo ? <LoadingLazySpinner style={{ width: "40px", height: "40px", borderRadius: "2.5px", background: "#b8b8b8"}} /> : <img src={logo} className="logoimage" />}
                        <Hidden smDown>
                        <div className="inputSearch" style={{ background: `${Scroll === 0 ? "#e7e7e7" : "#e7e7e73a"}`}}>
                            <Search style={{ color: Colors }} />
                            <InputBase inputMode="none" placeholder="Buscar Secciones..." id="inputHeaderS" onChange={handleSearch} style={{ width: "100%", marginLeft: "10px", color: Colors }} />
                            {InputSearch.length > 0 && <IconButton size="small" onClick={() => {
                                document.getElementById("inputHeaderS").value = "";
                                setInputSearch("");
                                setSanchorEl(null)
                            }}>
                                <Clear style={{ color: Colors }} />
                            </IconButton>}
                        </div>
                        </Hidden>
                    </div>
                    <Hidden xsDown>
                        <div className="toolbar" style={{ width: "50%"}}>
                            <Tabs variant='scrollable' style={{ width: "100%"}} scrollButtons="auto" onChange={(e, value) => settabsValue(value)} value={tabsValue} textColor={Scroll === 0 ? "secondary" : "primary"} indicatorColor={Scroll === 0 ? "secondary" : "primary"} >
                                {
                                    Links.map((link, index) => (
                                        <Link to={link.link} style={{ textDecoration: "none", color: `${tabsValue === index ? `${Scroll === 0 ? "#C93832" : "#fff"}` : `${Scroll === 0 ? "#7a7a7a" : "#fff"}`}` }}>
                                            <Tab label={link.label} value={index} style={{ padding: "25px 0"}} />
                                        </Link>
                                    ))
                                }
                            </Tabs>
                        </div>
                    </Hidden>
                    {/* <Hidden smUp> */}
                        <div className="usertoolbar">
                            {googleUser.currentUser[0] == null ? <React.Fragment>
                                <AccountCircleOutlined style={{ color: Colors, fontSize: "30" }} />
                                <Popper open={open} anchorEl={anchorEl} placement="top">
                                    <CSSTransition
                                        in={true}
                                        appear={true}
                                        timeout={1000}
                                        classNames="Content-load"
                                    >
                                        <div style={{ width: "fit-content", zIndex: "3", background: "#fff", boxShadow: "2px 2px 5px #7a7a7a", padding: "10px", borderRadius: "10px"}}>
                                            <Typography color="secondary" style={{ width: "100%",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                                                    Su usuario se encuentra bloqueado!
                                                <ErrorOutline />
                                            </Typography>
                                        </div>
                                    </CSSTransition>
                                </Popper>
                                <Button variant="outlined" style={{ color: Colors, borderColor: Colors, margin: "0 20px" }} onClick={handleLogIn}>Acceder</Button>
                            </React.Fragment> : <React.Fragment>
                                <img src={googleUser.currentUser[0].user.photoURL} style={{ width: "20%", borderRadius: "50%", margin: "0 5px" }} onClick={() => console.log()} />
                                <Typography style={{ color: `${Scroll === 0 ? "#7a7a7a" : "#fff"}`}}>{googleUser.currentUser[1].name.substring(0, spaceIndex)}</Typography>
                                <IconButton style={{ color: `${Scroll === 0 ? "#7a7a7a" : "#fff"}`}} onClick={handleSignOut}>
                                    <ExitToApp />
                                </IconButton>   
                            </React.Fragment>}
                        </div>
                    {/* </Hidden> */}
            </AppBar>
            <Drawer open={OpenDrawer} variant="temporary" >
                <div style={{ padding: "5px", width: "100%", boxSizing: "border-box" }}>
                    <Typography color="secondary" variant="h6" style={{ width: "100%",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                        Navegacion
                        <IconButton color="secondary" onClick={() => setOpenDrawer(!OpenDrawer)}>
                            <Clear />
                        </IconButton>
                    </Typography>
                    <div className="inputSearch" style={{ background: "#fff", margin: "10px 0", border: "1px solid #b8b8b8", width: "100%", boxSizing: "border-box" }}>
                        <Search style={{ color: "#7a7a7a" }} />
                        <InputBase inputMode="none" placeholder="Buscar Secciones..." id="inputHeaderS" onChange={handleSearch} style={{ width: "100%", marginLeft: "10px", color: "#7a7a7a" }} />
                        {InputSearch.length > 0 && <IconButton size="small" onClick={() => {
                            document.getElementById("inputHeaderS").value = "";
                            setInputSearch("");
                            setSanchorEl(null)
                        }}>
                            <Clear style={{ color: "#7a7a7a" }} />
                        </IconButton>}
                    </div>
                    <Divider color="secondary" />
                    <List style={{ width: "100%"}}>
                        {
                            Links.map((link, index) => (
                                <Link to={link.link} style={{ textDecoration: "none", width: "100%", color: `${tabsValue === index ? `${Scroll === 0 ? "#C93832" : "#7a7a7a"}` : "#7a7a7a"}` }}>
                                    <ListItem style={{ width: "100%"}}>
                                        <ListItemText style={{ padding: "25px 0"}}>{link.label}</ListItemText>
                                    </ListItem>
                                </Link>
                            ))
                        }
                    </List>
                </div>
            </Drawer>
        </div>
    )
}
