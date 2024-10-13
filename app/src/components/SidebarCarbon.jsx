import React from 'react';
import {
    SideNav,
    SideNavItems,
    SideNavLink,
    Header,
    SkipToContent,
    HeaderName,
    SideNavDivider
} from '@carbon/react';
import '@carbon/styles/css/styles.css';

function Sidebar() {
    const customSidebarStyle = {
        width: '220px',
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
                    <SideNavLink large>
                        <span style={{ color: 'black', fontSize: '1.2rem' }}>
                            IBM Autopilot
                        </span>
                    </SideNavLink>
                    <SideNavDivider />
                    <SideNavLink href="/login" large>
                        Login
                    </SideNavLink>
                    <SideNavLink href="/monitor" large>
                        Monitor Cluster
                    </SideNavLink>
                    <SideNavLink href="/testing" large>
                        Run Tests
                    </SideNavLink>
                    <SideNavLink href="/login" large>
                        Log Out
                    </SideNavLink>
                </SideNavItems>
            </SideNav>
        </>
    );
}

export default Sidebar;
