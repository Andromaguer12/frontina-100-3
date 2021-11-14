import { lazy } from "react";
import { AllRoutes } from "../AllRoutes"

export const publicRoutes = [
    {
        component: lazy(() => import("../PublicRendering")),
        path: AllRoutes.home,
        redirect: false,
        exact: true,
        to: AllRoutes.any
    },
    {
        component: lazy(() => import("../PublicRendering")),
        path: AllRoutes.aboutUs,
        redirect: false,
        exact: true,
        to: AllRoutes.home
    },
    {
        component: lazy(() => import("../PublicRendering")),
        path: AllRoutes.gallery,
        redirect: false,
        exact: true,
        to: AllRoutes.home
    },
    {
        component: lazy(() => import("../PublicRendering")),
        path: AllRoutes.programming,
        redirect: false,
        exact: true,
        to: AllRoutes.home
    },
    {
        component: lazy(() => import("../PublicRendering")),
        path: AllRoutes.staff,
        redirect: false,
        exact: true,
        to: AllRoutes.home
    },
    {
        component: lazy(() => import("../PublicRendering")),
        path: AllRoutes.posts,
        redirect: false,
        exact: false,
        to: AllRoutes.home
    },
    {
        component: lazy(() => import("../PublicRendering")),
        path: AllRoutes.blocked,
        redirect: false,
        exact: true,
        to: AllRoutes.home
    },
    {
        component: lazy(() => import("../../../pages/AdminLogin")),
        path: AllRoutes.admin,
        redirect: false,
        exact: true,
        to: AllRoutes.adminDashboard
    },
]