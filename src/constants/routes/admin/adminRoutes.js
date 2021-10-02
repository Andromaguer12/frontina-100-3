import { lazy } from "react";
import { AllRoutes } from "../AllRoutes";

export const adminRoutes = [
    {
        component: lazy(() => import('../../../pages/AdminDashboardPage')),
        path: AllRoutes.adminDashboard,
        redirect: true,
        exact: true,
        to: AllRoutes.admin
    },
    {
        component: lazy(() => import('../../../pages/AdminChat')),
        path: AllRoutes.adminChat,
        redirect: true,
        exact: true,
        to: AllRoutes.admin
    },
    {
        component: lazy(() => import('../../../pages/AdminUsers')),
        path: AllRoutes.adminUsers,
        redirect: true,
        exact: true,
        to: AllRoutes.admin
    },
    {
        component: lazy(() => import('../../../pages/AdminPublish')),
        path: AllRoutes.adminPublish,
        redirect: true,
        exact: true,
        to: AllRoutes.admin
    },
    {
        component: lazy(() => import('../../../pages/AdminProgrammingPage')),
        path: AllRoutes.adminProgramming,
        redirect: true,
        exact: true,
        to: AllRoutes.admin
    },
    {
        component: lazy(() => import('../../../pages/AdminSponsors')),
        path: AllRoutes.adminSponsors,
        redirect: true,
        exact: true,
        to: AllRoutes.admin
    },
    {
        component: lazy(() => import('../../../pages/AdminAppInfo')),
        path: AllRoutes.adminInfo,
        redirect: true,
        exact: true,
        to: AllRoutes.admin
    }
]