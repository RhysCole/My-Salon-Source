import { Suspense } from "react";
import { Route, Routes } from "react-router";

import AdminLayout from "@/pages/admin/layout";
import AuthLayout from "@/pages/auth/layout";
import ProtectedRoute from "@/components/ProtectedRoute";

import { registerRoutes } from "./register";

export const Router = () => {
    return (
        <Routes>
            <Route element={<ProtectedRoute/>}>
                {registerRoutes.admin.map((route, index) => (
                    <Route
                        key={"admin-" + index}
                        path={route.path}
                        element={
                            <AdminLayout>
                                <Suspense>{route.element}</Suspense>
                            </AdminLayout>
                        }
                    />
                ))}
            </Route>
            <Route>
                {registerRoutes.auth.map((route, index) => (
                    <Route
                        key={"auth-" + index}
                        path={route.path}
                        element={
                            <AuthLayout >
                                <Suspense>{route.element}</Suspense>
                            </AuthLayout>
                        }
                    />
                ))}
            </Route>

            <Route>
                {registerRoutes.other.map((route, index) => (
                    <Route key={"other-" + index} path={route.path} element={<Suspense>{route.element}</Suspense>} />
                ))}
            </Route>
        </Routes>
    );
};
