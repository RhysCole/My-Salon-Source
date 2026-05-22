import { MetaData } from "@/components/MetaData";
<MetaData title="Dashboard" />
import { useSelector } from 'react-redux';
import { type RootState } from '@/contexts/store'; 
import InviteUserForm from "@/components/InviteUserTest";

const CRMDashboardPage = () => {

    const userProfile = useSelector((state: RootState) => state.user.profile);

    return (
        <>
            <div style={{ border: '1px solid grey', padding: '1rem', marginTop: '2rem' }}>
                <h2>User Profile from Redux Store</h2>
                <p><strong>staffid:</strong> {userProfile?.staffId}</p>
                <p><strong>First Name:</strong> {userProfile?.firstName}</p>
                <p><strong>Role:</strong> {userProfile?.role}</p>
                <p><strong>Company ID:</strong> {userProfile?.companyId}</p>
                <p><strong>Salon ID:</strong> {userProfile?.salonId}</p>
            </div>

            <InviteUserForm/>

        </>
    );
};

export default CRMDashboardPage;
