import { type ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/contexts/store";
import { initializeAppState } from "@/utils/appInit";

import { Footer } from "./(layout)/components/Footer";
import { Rightbar } from "./(layout)/components/Rightbar";
import { Sidebar } from "./(layout)/components/Sidebar";
import { Topbar } from "./(layout)/components/Topbar";
import { adminMenuItems } from "./(layout)/helpers";
import { useNavigate } from "react-router";



const AdminLayout = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector((state: RootState) => state.user.profile);
    const navigate = useNavigate();

    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

    useEffect(() => {
       if (profile) {
            initializeAppState(dispatch, {
                startDate: startOfDay.toISOString(),
                endDate: endOfDay.toISOString(),
                salonId: profile.salonId
        });
        }
        else{
            navigate('/auth/login')
        }
    }, [dispatch, profile, navigate])

    

    return (
        <div className="size-full">
            <div className="flex">
                <Sidebar menuItems={adminMenuItems} />
                <div className="flex h-screen min-w-0 grow flex-col overflow-auto">
                    <Topbar />
                    <div id="layout-content">{children}</div>
                    <Footer />
                </div>
            </div>
            <Rightbar />
        </div>
    );
};

export default AdminLayout;
