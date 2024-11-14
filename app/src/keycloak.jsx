import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'autopilot-dashboard',
    clientId: 'autopilot-dashboard',
});

// sets up the instance with the correct credentials

export default keycloak;