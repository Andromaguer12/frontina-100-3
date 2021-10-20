import { IconButton, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import AddProgrammingRow from '../components/Admin/AddProgrammingRow';
import AdminDrawer from '../components/Admin/AdminDrawer';
import { ApartmentOutlined, ChatOutlined, DescriptionOutlined, HomeOutlined, PersonOutlined, QueryBuilder } from '@material-ui/icons'
import { AllRoutes } from '../constants/routes/AllRoutes';
import Programming from '../components/Admin/Programming';
import { Functions } from './AdminDashboardPage';
import ProgrammingPositions from '../components/Admin/ProgrammingPositions';


export default function AdminProgrammingPage() {
    const [AddMode, setAddMode] = useState(false)
    const [EditMode, setEditMode] = useState({in: false, id: 0})
    const [EditIndex, setEditIndex] = useState(null)
    const handleAddMode = () => setAddMode(!AddMode);
    const handleEditMode = (number) => {
        setEditMode({
            in: !EditMode.in,
            id: number.id
        })
        setEditIndex(number.position)
    };

    return (
        <div className="admindashcontent">
            <AdminDrawer Functions={Functions} />
            <div className="layoutdisplay" style={{ padding: "20px", overflowY: "auto" }}>                
                <Programming toggleAdd={handleAddMode} togglePP={(num) => handleEditMode(num)} /> 
            </div>
            {AddMode && <AddProgrammingRow cancel={handleAddMode} />}
            {EditMode.in && <ProgrammingPositions id={EditMode.id} index={EditIndex} cancel={handleEditMode} />}
        </div>
    )
}
