import { IconButton, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import AddProgrammingRow from '../components/Admin/AddProgrammingRow';
import AdminDrawer from '../components/Admin/AdminDrawer';
import { ApartmentOutlined, ChatOutlined, DescriptionOutlined, HomeOutlined, PersonOutlined, QueryBuilder } from '@material-ui/icons'
import { AllRoutes } from '../constants/routes/AllRoutes';
import AddSponsorsDiv from '../components/Admin/AddSponsorsDiv';
import DeletePostFF from '../components/Admin/DeletePostFF';
import db from '../services/firebase';
import Sponsors from '../components/Admin/Sponsors';
import { Functions } from './AdminDashboardPage';


export default function AdminSponsors() {
    const [AddMode, setAddMode] = useState(false)
    const handleAddMode = () => setAddMode(!AddMode);
    const [AddSponsor, setAddSponsor] = useState(false)
    const [DeleteId, setDeleteId] = useState({})
    const [DeleteS, setDeleteS] = useState(false)

    return (
        <div className="admindashcontent">
            <AdminDrawer Functions={Functions} />
            <div className="layoutdisplay" style={{ padding: "20px", overflowY: "auto" }}>                
                <Sponsors toggleAdd={() => setAddSponsor(true)} toggleDelete={(e) => {setDeleteS(true); setDeleteId(e)}} />
            </div>
            {AddSponsor && <AddSponsorsDiv cancel={() => setAddSponsor(false)} />}
            {DeleteS && <DeletePostFF pRef={db.collection("Sponsors")} delId={DeleteId} cancel={() => setDeleteS(false)} />}
        </div>
    )
}
