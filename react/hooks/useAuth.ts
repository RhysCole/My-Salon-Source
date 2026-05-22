import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { supabase } from '@/lib/supabaseClient';
import { loginSuccess, setLoginLoading, setLoginFailed, logout as logoutAction } from '@/contexts/slices/userSlice';

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
      setError(null);
      setIsLoading(true);
      dispatch(setLoginLoading());

      try {
        const {
          data: { session },
          error: authError,
        } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) throw authError;

        if (session) {
          // Step 2: Fetch the user's staff profile
          const { data: profile, error: profileError } = await supabase
            .from("staff")
            .select('first_name, id , company_id, salon_id, roles ( role_name )')
            .eq("user_id", session.user.id)
            .single();
          if (profileError) throw profileError;

          if (profile) {
            // Step 3: Dispatch profile to Redux store
            dispatch(
              loginSuccess({
                firstName: profile.first_name,
                role: profile.roles.role_name,
                staffId: profile.id,
                companyId: profile.company_id,
                salonId: profile.salon_id,
              })
            );
            

            // Step 4: Navigate to the main dashboard on success
            navigate("/");
          } else {
            throw new Error(
              "Authentication successful, but no staff profile was found for this user."
            );
          }
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
        dispatch(setLoginFailed());
      } finally {
        setIsLoading(false);
      }
    };

    /**
     * Handles the user logout process.
     */
    const logout = async () => {
        setIsLoading(true);
        await supabase.auth.signOut();
        dispatch(logoutAction());
        navigate('/auth/login');
        setIsLoading(false);
    };

    // The hook returns an object containing the functions and state
    // that UI components will need.
    return { login, logout, isLoading, error };
}