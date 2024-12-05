import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: 'autopilot-dashboard',
    clientId: 'autopilot-dashboard',
});

// sets up the instance with the correct credentials

export default keycloak;