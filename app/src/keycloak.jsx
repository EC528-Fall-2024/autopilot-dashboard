import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'https://keycloak-autopilot-dashboard-f3dc9e.apps.shift.nerc.mghpcc.org',
    realm: 'autopilot-dashboard',
    clientId: 'autopilot-dashboard',
});

// sets up the instance with the correct credentials

export default keycloak;
