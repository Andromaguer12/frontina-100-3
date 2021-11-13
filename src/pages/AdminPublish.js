import React, { useState } from 'react'
import { ApartmentOutlined, ChatOutlined, DescriptionOutlined, HomeOutlined, PersonOutlined, QueryBuilder } from '@material-ui/icons'
import AdminDrawer from '../components/Admin/AdminDrawer'
import { AllRoutes } from '../constants/routes/AllRoutes'
import "../Styles/AdminDashboard.css"
import AdminFirstFace from '../components/Admin/AdminFirstFace'
import { Typography } from '@material-ui/core'
import db from '../services/firebase'
import { CSSTransition } from 'react-transition-group'
import '../Styles/AdminPosts.css'
import AddFirstFace from '../components/Admin/AddFirstFace'
import EditPost from '../components/Admin/EditPost'
import DeletePostFF from '../components/Admin/DeletePostFF'
import GlobalPosts from '../components/Admin/GlobalPosts'
import { Functions } from './AdminDashboardPage'
import PostCLAdmin from '../components/Admin/PostCLAdmin'
import FirstFacePositions from '../components/Admin/FirstFacePosition'



const pRef = db.collection("Publicaciones").doc('firstFace').collection("cont");
const GPRef = db.collection("Publicaciones").doc('global').collection("cont");

export default function AdminPublish() {
    const [Posts, setPosts] = useState([])
    const [Key, setKey] = useState("")
    const [FFedit, setFFedit] = useState(false)
    const [FFPedit, setFFPedit] = useState(false)
    const [FFdel, setFFdel] = useState(false)
    const [FFadd, setFFadd] = useState(false)
    const [GPadd, setGPadd] = useState(false)
    const [GPedit, setGPedit] = useState(false)
    const [GPdel, setGPdel] = useState(false)

    const [SeeReviews, setSeeReviews] = useState({
        in: false,
        likes: [],
        comments: [],
        postID: ""
    })

    return (
        <div className="admindashcontent">
            <AdminDrawer Functions={Functions} />
            <div className="layoutdisplay" style={{ padding: "20px", overflowY: "auto" }}>
                <Typography color="secondary" variant="h4" style={{ width: "100%",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                    Administracion de Publicaciones
                </Typography>
                <Typography style={{ fontSize: "14px", margin: "15px 0", width: "100%",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between"  }}>
                    Adminitra las Publicaciones, edita, agrega, y elimina, publicaciones de todo tipo!
                </Typography>
                <AdminFirstFace pRef={pRef} add={() => setFFadd(!FFadd)} edit={(key) => {setFFedit(!FFedit); setKey(key)}} editP={(key) => {setFFPedit(!FFPedit); setKey(key);}}  del={(key) => {setFFdel(!FFdel); setKey(key)}} />
                <GlobalPosts seeReviews={(data) => setSeeReviews(data)} pRef={GPRef} add={() => setGPadd(!GPadd)} edit={(key) => {setGPedit(!GPedit); setKey(key)}} del={(key) => {setGPdel(!GPdel); setKey(key)}} />
            </div>
            <CSSTransition
                in={FFadd}
                timeout={500}
                classNames="Zoom-Image2"
                unmountOnExit
            >
                <AddFirstFace FullR={true} pRef={pRef} cancel={() => setFFadd(!FFadd)} />
            </CSSTransition>
            <CSSTransition
                in={GPadd}
                timeout={500}
                classNames="Zoom-Image"
                unmountOnExit
            >
                <AddFirstFace pRef={GPRef} variation={GPadd} cancel={() => setGPadd(!GPadd)} />
            </CSSTransition>
            <CSSTransition
                in={FFedit}
                timeout={500}
                classNames="Zoom-Image"
                unmountOnExit
            >
                <EditPost pRef={pRef} updateId={Key} cancel={() => setFFedit(!FFedit)} />
            </CSSTransition>
            <CSSTransition
                in={FFPedit}
                timeout={500}
                classNames="Zoom-Image"
                unmountOnExit
            >
                <FirstFacePositions pRef={pRef} id={Key} cancel={() => setFFPedit(!FFPedit)} />
            </CSSTransition>
            <CSSTransition
                in={GPedit}
                timeout={500}
                classNames="Zoom-Image"
                unmountOnExit
            >
                <EditPost pRef={GPedit ? GPRef : pRef} variation={GPedit} updateId={Key} cancel={() => setGPedit(!GPedit)} />
            </CSSTransition>
            <CSSTransition
                in={FFdel}
                timeout={500}
                classNames="Zoom-Image"
                unmountOnExit
            >
                <DeletePostFF pRef={pRef} delId={Key} cancel={() => setFFdel(!FFdel)} />
            </CSSTransition>
            <CSSTransition
                in={GPdel}
                timeout={500}
                classNames="Zoom-Image"
                unmountOnExit
            >
                <DeletePostFF pRef={GPdel ? GPRef : pRef} delId={Key} cancel={() => setGPdel(!GPdel)} />
            </CSSTransition>
            <CSSTransition
                in={SeeReviews.in}
                timeout={500}
                classNames="Zoom-Image"
                unmountOnExit
            >
                <PostCLAdmin id={SeeReviews.postID} GPref={GPRef} pLikes={SeeReviews.likes} ccomments={SeeReviews.comments} cancel={() => setSeeReviews({
                    likes: [],
                    comments: [],
                    in: false
                })} />
            </CSSTransition>
        </div>
    )
}
