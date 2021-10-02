import { lazy } from "react";
import { AllRoutes } from "../AllRoutes"

export const publicRoutes = [
    {
        component: lazy(() => import('../../../pages/HomePage.js')),
        path: AllRoutes.home,
        redirect: false,
        exact: true,
        to: AllRoutes.any
    },
    {
        component: lazy(() => import('../../../pages/AboutUsPage.js')),
        path: AllRoutes.aboutUs,
        redirect: false,
        exact: true,
        to: AllRoutes.home
    },
    {
        component: lazy(() => import('../../../pages/GalleryPage.js')),
        path: AllRoutes.gallery,
        redirect: false,
        exact: true,
        to: AllRoutes.home
    },
    {
        component: lazy(() => import('../../../pages/ProgrammingPage.js')),
        path: AllRoutes.programming,
        redirect: false,
        exact: true,
        to: AllRoutes.home
    },
    {
        component: lazy(() => import('../../../pages/StaffPage.js')),
        path: AllRoutes.staff,
        redirect: false,
        exact: true,
        to: AllRoutes.home
    },
    {
        component: lazy(() => import('../../../pages/Blockedpage.js')),
        path: AllRoutes.blocked,
        redirect: false,
        exact: true,
        to: AllRoutes.home
    },
    {
        component: lazy(() => import('../../../pages/AdminLogin.js')),
        path: AllRoutes.admin,
        redirect: false,
        exact: true,
        to: AllRoutes.adminDashboard
    },
]