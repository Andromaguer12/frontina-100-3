import { lazy } from "react";
import { adminRoutes } from "./admin/adminRoutes";
import { publicRoutes } from "./public/publicRoutes";

const commonTemplate = lazy(() => import('./commonLayout'))

export const RoutesTemplate = [
    {
        routes: adminRoutes,
        template: commonTemplate,
        auth: "admin",
        secondaryAuth: "user"
    },
    {
        routes: publicRoutes,
        template: commonTemplate,
        auth: "user",
        secondaryAuth: "any"
    }
] 