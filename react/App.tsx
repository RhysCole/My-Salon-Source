// src/react/App.tsx

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { supabase } from '@/lib/supabaseClient';
import { loginSuccess, logout, setSessionChecked, setSessionInitializing } from '@/contexts/slices/userSlice';
import { type AppDispatch } from '@/contexts/store';
import { Router } from '@/router';

function App() {
    const dispatch = useDispatch<AppDispatch>();
    // This useEffect hook runs at the highest level of your app.
    useEffect(() => {
        const checkSession = async () => {
            dispatch(setSessionInitializing())
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                const { data: profile } = await supabase
                    .from('staff')
                    .select('first_name, id,company_id, salon_id, roles(role_name)')
                    .eq('user_id', session.user.id)
                    .single();

                if (profile) {
                    dispatch(loginSuccess({
                        firstName: profile.first_name,
                        role: profile.roles.role_name,
                        staffId: profile.id,
                        companyId: profile.company_id,
                        salonId: profile.salon_id,
                    }));
                }
            }
            // Tell Redux the session check is complete.
            dispatch(setSessionChecked());
        };

        checkSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_OUT') {
                dispatch(logout());
            }
        });

        return () => subscription.unsubscribe();
    }, [dispatch]);
    
      return <Router />;
    
    
}

export default App;