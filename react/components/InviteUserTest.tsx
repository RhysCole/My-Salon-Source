
import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useSelector } from 'react-redux';
import { type RootState } from '@/contexts/store'; // Corrected path

const InviteUserForm = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const userProfile = useSelector((state: RootState) => state.user.profile);

    const handleInvite = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setMessage('');

        const placeholderData = {
            firstName: "New",
            lastName: "User",
            roleId: "e1b459a9-29d6-4544-8610-e4a8e60be7a1",
            salonId: userProfile?.salonId,
            companyId: userProfile?.companyId,
        };

        try {
            // CORRECT: Get the current session to access the token.
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                throw new Error("You must be logged in to invite users.");
            }

            // You are still calling the debug function here. Remember to change
            // 'debug-auth' back to 'invite-user' to test the full flow.
            const { data, error } = await supabase.functions.invoke("invite-user", {
            body: JSON.stringify({
                email,
                ...placeholderData,
            }),
            headers: {
                Authorization: `Bearer ${session.access_token}`,
                "Content-Type": "application/json",
            },
            });

            if (error) {
                throw error;
            }

            setMessage(data.message);

        } catch (err: unknown) {
            if (err instanceof Error) {
                setMessage(`Error: ${err.message}`);
            } else {
                setMessage('An unknown error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ padding: '2rem', border: '1px solid #333', borderRadius: '8px' }}>
            <h2>Invite a New User</h2>
            <p>Enter the email address of the new staff member to send them a setup invitation.</p>
            <form onSubmit={handleInvite} style={{ marginTop: '1rem' }}>
                <label htmlFor="email-input">Email Address</label>
                <br />
                <input
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="new.staff@example.com"
                    required
                    style={{ padding: '8px', minWidth: '300px' }}
                />
                <br />
                <button type="submit" disabled={isLoading} style={{ marginTop: '1rem' }}>
                    {isLoading ? 'Sending...' : 'Send Invitation Email'}
                </button>
            </form>
            {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
        </div>
    );
};

export default InviteUserForm;