import { type JSX, type LazyExoticComponent, lazy } from "react";
import { type ReactNode } from "react"; 


export type IRoutesProps = {
    path: string;
    element: ReactNode;
};

const cw = (Component: LazyExoticComponent<() => JSX.Element>) => {
    return <Component />;
};

const dashboardRoutes: IRoutesProps[] = [
    {
        path: "/",
        element: cw(lazy(() => import("@/pages/admin/dashboards/crm"))),
    },
    {
        path: "/dashboards/sunbeds",
        element: cw(lazy(() => import("@/pages/admin/dashboards/sunbedViewer"))),
    }
];

const authRoutes: IRoutesProps[] = [
    {
        path: "/auth/login",
        element: cw(lazy(() => import("@/pages/auth/login"))),
    },
    {
        path: "/auth/register",
        element: cw(lazy(() => import("@/pages/auth/register"))),
    },
    {
        path: "/auth/forgot-password",
        element: cw(lazy(() => import("@/pages/auth/forgot-password"))),
    },
    {
        path: "/auth/reset-password",
        element: cw(lazy(() => import("@/pages/auth/reset-password"))),
    },
];

const pagesRoutes: IRoutesProps[] = [
    {
        path: "/pages/settings",
        element: cw(lazy(() => import("@/pages/admin/pages/settings"))),
    },
    {
        path: "/pages/get-help",
        element: cw(lazy(() => import("@/pages/admin/pages/get-help"))),
    },
];

const otherRoutes: IRoutesProps[] = [

];

export const registerRoutes = {
    admin: [...dashboardRoutes,  ...pagesRoutes],
    auth: authRoutes,
    other: otherRoutes,
};
