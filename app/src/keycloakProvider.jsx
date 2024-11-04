import React, {useState, useEffect } from 'react';
import keycloak from './keycloak'; 

function KeycloakProvider( {children}) {
    const [initialized, setInitialized] = useState(false); 

    useEffect( () => {
            keycloak
                .init({onLoad: 'login-required'})
                .then((authenticated) => setInitialized(true))
                .catch( () => setInitialized(false));
        }, []
    );

    if(!initialized) {
        return 
            // quick buffer before it goes to the monitor
            <div>
                Loading...
            </div>
    }

    return <>{ children }</>;
}

export default KeycloakProvider;