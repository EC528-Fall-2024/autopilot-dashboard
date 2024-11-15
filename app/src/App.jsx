import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Monitor from './Monitor';
import Testing from './Testing';
import Sidebar from './components/SidebarCarbon';
import styled from 'styled-components';
import '@carbon/styles/css/styles.css';
import KeycloakProvider from './keycloakProvider';

const MainContent = styled.div`
  margin-left: 220px; /* Adjust according to sidebar width */
  padding: 20px;
  width: calc(100% - 220px); /* Ensure the content fills the remaining space */

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%; /* Full width on smaller screens */
  }
`;

function App() {
  return (
    <KeycloakProvider>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <MainContent>
          <Routes>
            <Route path="/monitor" element={<Monitor />} />
            <Route path="/testing" element={<Testing />} />
          </Routes>
        </MainContent>
      </div>
    </KeycloakProvider>
  );
}

export default App;
