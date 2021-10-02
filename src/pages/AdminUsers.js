import React, { useEffect, useState } from 'react'
import AdminDrawer from '../components/Admin/AdminDrawer'
import { ApartmentOutlined, ChatOutlined, DescriptionOutlined, FilterListOutlined, HomeOutlined, PersonOutlined, QueryBuilder } from '@material-ui/icons'
import { AllRoutes } from '../constants/routes/AllRoutes'
import "../Styles/AdminDashboard.css"
import UsersTable from '../components/Admin/UsersTable'
import { IconButton, TextField, Typography } from '@material-ui/core'
import { usersRef } from '../services/firebase'
import { Functions } from './AdminDashboardPage'




export default function AdminUsers() {
    const [Users, setUsers] = useState([]);
    const [Search, setSearch] = useState([]);
    useEffect(() => {
        usersRef.onSnapshot((state) => {
            const docs = [];
            state.forEach((doc) => docs.push({...doc.data(), id: doc.id}))
            setUsers(docs)
        })
    }, [])

    const processSearch = (e) => {
        const dataCopy = Users;
        var foundData = dataCopy.filter((user) => user.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setSearch(foundData);
    }
    return (
        <div className="admindashcontent">
            <AdminDrawer Functions={Functions} />
            <div className="layoutdisplay" style={{ padding: "20px", overflowY: "auto" }}>
                <Typography color="secondary" variant="h4" style={{ width: "100%",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                    Administracion de Usuarios 
                </Typography>
                <Typography style={{ width: "100%", margin: "20px 0",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                    Administra, silencia y bloquea usuarios de la aplicacion! 
                </Typography>
                <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", flexFlow: "row"}}>
                    <TextField onChange={processSearch} variant="outlined" style={{ width: "50%", margin: "10px 0", alignSelf: "flex-start"}} label="Buscar Usuario" color="secondary" size="small" />
                    <Typography style={{ margin: "20px 0",  display: "flex", alignItems: "center", flexFlow: "row", justifyContent: "space-between" }}>
                        Usuarios registrados: {Users.length} 
                    </Typography>
                    <IconButton >
                        <FilterListOutlined />
                    </IconButton>
                </div>
                <UsersTable Users={Search.length > 1 ? Search : Users} /> 
            </div>
        </div>
    )
}
