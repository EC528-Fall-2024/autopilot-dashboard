import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import keycloak from './keycloak';

function KeycloakProvider({ children }) {
    const [initialized, setInitialized] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        keycloak
            .init({ onLoad: 'login-required' })
            .then((authenticated) => {
                const userEmail = keycloak.tokenParsed?.email;

                const users = import.meta.env.VITE_USERS?.split(',') || [];

                if (!userEmail || !users.includes(userEmail)) {
                    keycloak.logout();
                    return;
                }
                setInitialized(true);
            })
            .catch(() => setInitialized(false));
    }, [navigate]);

    if (!initialized) {
        // quick buffer before it goes to the monitor
        return (
            <div>
                Loading...
            </div>
        );
    }

    return <>{children}</>;
}

export default KeycloakProvider;
