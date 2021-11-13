import React, { lazy, Suspense, useState } from 'react'
import { useSelector } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'
import Feed from '../../components/HomePage/Feed'
import {currentTab} from "../../services/reduxToolkit/PublicCurrentPage/selectors"

const HomePage = lazy(() => import("../../pages/HomePage"))
const AboutUs = lazy(() => import("../../pages/AboutUsPage"))
const StaffPage = lazy(() => import("../../pages/GalleryPage"))
const ProgrammingPage = lazy(() => import("../../pages/ProgrammingPage"))
const GalleryPage = lazy(() => import("../../pages/StaffPage"))
const PostView = lazy(() => import("../../pages/PostView"))

const Pages = [
    HomePage,
    ProgrammingPage,
    AboutUs, 
    StaffPage,
    GalleryPage,
    PostView
]

export default function PublicRendering() {
    const Current = useSelector(currentTab)
    return (
        <React.Fragment index={Current} >
            {
                Pages.map((Pag, index) => {
                    return ( 
                        <Suspense fallback={<div style={{ width: "100%", height: "40vh", boxSizing: "border-box", display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center" }}></div>} >
                            <Feed choosedContent={true} value={Current} index={index}>
                                <Pag />
                            </Feed>
                        </Suspense>
                    )
                })
            }
        </React.Fragment>
    )
}
