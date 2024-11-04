import React from 'react';
import {
    SideNav,
    SideNavItems,
    SideNavLink,
    SideNavDivider
} from '@carbon/react';

import keycloak from '../keycloak';

function Sidebar() {
    const customSidebarStyle = {
        width: '220px',
    };

    const handleLogout = () => {
        keycloak.logout({redirectUri: window.location.origin});
    };
    return (
        <>
            <SideNav
                isFixedNav
                expanded={true}
                isChildOfHeader={false}
                aria-label="Side navigation"
                style={customSidebarStyle}
            >
                <SideNavItems>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2vh 0' }}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
                            alt="IBM Logo"
                            style={{ width: '5vw', maxWidth: '75px', marginRight: '1vw' }}
                        />
                        <span style={{ color: 'black', fontSize: '1.5vw' }}>
                            Autopilot
                        </span>
                    </div>
                    <SideNavDivider />
                    <SideNavLink href="/monitor" large>
                        Monitor Cluster
                    </SideNavLink>
                    <SideNavLink href="/testing" large>
                        Run Tests
                    </SideNavLink>
                    <SideNavLink onClick={handleLogout} large>
                        Log Out
                    </SideNavLink>
                </SideNavItems>
            </SideNav>
        </>
    );
}

export default Sidebar;