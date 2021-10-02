import React, { useState } from 'react'
import AdminDrawer from '../components/Admin/AdminDrawer';
import { Functions } from './AdminDashboardPage';
import '../Styles/AdminInfo.css'
import db from '../services/firebase';
import AboutUsAdmin from '../components/Admin/AboutUsAdmin';
import AddAboutDepartment from '../components/Admin/AddAboutDepartment';
import EditAboutDepartment from '../components/Admin/editAboutDepartment';
import DeletePostFF from '../components/Admin/DeletePostFF';
import GalleryAdmin from '../components/Admin/GalleryAdmin';
import AddGalleryPost from '../components/Admin/AddGalleryPost';
import AddStaffPost from '../components/Admin/AddStaffPost';
import EditStaffPost from '../components/Admin/EditStaffPost';
import StaffAdmin from '../components/Admin/StaffAdmin';
import ContactInfoAdmin from '../components/Admin/ContactInfoAdmin';

export const infoRef = db.collection('Information')

export default function AdminAppInfo() {
    const [GalleryMode, setGalleryMode] = useState(false)
    const [StaffMode, setStaffMode] = useState(false)

    const [AddInfo, setAddInfo] = useState(false)
    const [Edit, setEdit] = useState(false);
    const [EditId, setEditId] = useState("")
    const [DeleteId, setDeleteId] = useState("")
    const [Delete, setDelete] = useState(false)

    return (
        <div className="admindashcontent">
            <AdminDrawer Functions={Functions} />
            <div className="layoutdisplay" style={{ padding: "20px", overflowY: "auto" }}>    
                <AboutUsAdmin toggleAdd={() => setAddInfo(true)} toggleEdit={(id) => {setEdit(true); setEditId(id)}} toggleDelete={(id) => {setDelete(true); setDeleteId(id)}} />            
                <GalleryAdmin toggleAdd={() => {setAddInfo(true); setGalleryMode(true);}} toggleDelete={(id) => {setDelete(true); setDeleteId(id); setGalleryMode(true);}} />            
                <StaffAdmin toggleAdd={() => {setAddInfo(true); setStaffMode(true);}} toggleEdit={(id) => {setEdit(true); setStaffMode(true); setEditId(id)}} toggleDelete={(id) => {setDelete(true); setStaffMode(true); setDeleteId(id)}} /> 
                <ContactInfoAdmin  />            
            </div>
            {AddInfo && !GalleryMode && !StaffMode && <AddAboutDepartment cancel={() => setAddInfo(false)} />}
            {Edit && !GalleryMode && !StaffMode && <EditAboutDepartment cRef={infoRef.doc("aboutUs").collection("cont")} editId={EditId} cancel={() => setEdit(false)} />}
            {Delete && !GalleryMode && !StaffMode && <DeletePostFF info={true} pRef={infoRef.doc("aboutUs").collection("cont")} delId={DeleteId} cancel={() => setDelete(false)} />}
            
            {AddInfo && GalleryMode && !StaffMode && <AddGalleryPost gRef={infoRef.doc("gallery").collection("cont")} cancel={() => {setAddInfo(false); setGalleryMode(false)}} />}
            {Delete && GalleryMode && !StaffMode && <DeletePostFF pRef={infoRef.doc("gallery").collection("cont")} delId={DeleteId} cancel={() => {setDelete(false); setGalleryMode(false);}} />}

            {AddInfo && !GalleryMode && StaffMode &&  <AddStaffPost gRef={infoRef.doc("staff").collection("cont")} cancel={() => {setAddInfo(false); setStaffMode(false);}}  />}
            {Edit && !GalleryMode && StaffMode &&  <EditStaffPost cRef={infoRef.doc("staff").collection("cont")} editId={EditId} cancel={() => {setEdit(false); setStaffMode(false);}}  />}
            {Delete && !GalleryMode && StaffMode &&  <DeletePostFF pRef={infoRef.doc("staff").collection("cont")} delId={DeleteId} cancel={() => {setDelete(false); setStaffMode(false);}}  />}
        </div>
    )
}