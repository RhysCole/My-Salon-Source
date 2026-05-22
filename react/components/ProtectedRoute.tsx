import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { type RootState } from '@/contexts/store';




const ProtectedRoute = () => {


    const status = useSelector((state: RootState) => state.user.status);
    const profile = useSelector((state: RootState) => state.user.profile);

    if(status === 'initializing'){
        return <h1>Loading</h1>
    }
    if (status === 'idle') {
        return <Outlet />;
    }

    return <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;