import { IconButton, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import AddProgrammingRow from '../components/Admin/AddProgrammingRow';
import AdminDrawer from '../components/Admin/AdminDrawer';
import { ApartmentOutlined, ChatOutlined, DescriptionOutlined, HomeOutlined, PersonOutlined, QueryBuilder } from '@material-ui/icons'
import { AllRoutes } from '../constants/routes/AllRoutes';
import Programming from '../components/Admin/Programming';
import { Functions } from './AdminDashboardPage';


export default function AdminProgrammingPage() {
    const [AddMode, setAddMode] = useState(false)
    const handleAddMode = () => setAddMode(!AddMode);

    return (
        <div className="admindashcontent">
            <AdminDrawer Functions={Functions} />
            <div className="layoutdisplay" style={{ padding: "20px", overflowY: "auto" }}>                
                <Programming toggleAdd={handleAddMode} /> 
            </div>
            {AddMode && <AddProgrammingRow cancel={handleAddMode} />}
        </div>
    )
}
