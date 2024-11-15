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
                setInitialized(true);
                if (authenticated) {
                    navigate('/monitor'); // Redirect to /monitor after successful login
                }
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
