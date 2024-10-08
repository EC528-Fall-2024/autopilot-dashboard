import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// Referenced from https://mui.com/material-ui/react-table/#collapsible-table

const lightGreen = "#90EE90"
const lightRed = "#FAA0A0"

const ResponsiveTableContainer = styled(TableContainer)`
    width: 100%;
    overflow-x: auto;
    padding: 0;
    margin: 0;

    @media (max-width: 768px) {
        width: 100%;
        padding: 0;
        margin: 0;
    } 
`;

// !important is used to ensure specificity and prevent overwriting
const StyledTableCell = styled(TableCell)`
  font-weight: bold !important; 
  font-size: 1.1rem !important;
  background-color: #f5f5f5 !important;
`;

const StyledTableRow = styled(TableRow).withConfig({
    shouldForwardProp: (prop) => prop !== 'pass',
})`
    background-color: ${(props) => (props.pass ? lightGreen : lightRed)};
`;

const Row = ({ node }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <StyledTableRow pass={node.gpuHealth === 'PASS'}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                {/*Main table: name, status, role, version, hardware, containerRuntimeVersion, and OS*/}
                <TableCell component="th" scope="row">{node.name}</TableCell>
                <TableCell align="left">{node.status === 'True' ? 'Ready' : 'Not Ready'}</TableCell>
                <TableCell align="left">{node.role}</TableCell>
                <TableCell align="left">{node.version}</TableCell>
                <TableCell align="left">{node.architecture}</TableCell>
                <TableCell align="left">{node.containerRuntimeVersion}</TableCell>
                <TableCell align="left">{node.operatingSystem}</TableCell>
                <TableCell align="left">{node.gpuPresent}</TableCell>
                <TableCell align="left">{node.gpuHealth}</TableCell>
            </StyledTableRow>

            <TableRow>
                {/*Expandable table: capacity/allocatable resources, and health checks*/}
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom>
                                Capacity / Allocatable Resources:
                            </Typography>
                            <Table size="small" aria-label="resources">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Resource</StyledTableCell>
                                        <StyledTableCell>Capacity</StyledTableCell>
                                        <StyledTableCell>Allocatable</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>CPU</TableCell>
                                        <TableCell>{node.capacity.cpu}</TableCell>
                                        <TableCell>{node.allocatable.cpu}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Memory</TableCell>
                                        <TableCell>{node.capacity.memory}</TableCell>
                                        <TableCell>{node.allocatable.memory}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};


function CollapsibleTable({ nodes }) {
    return (
        <ResponsiveTableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <StyledTableCell>Node Name</StyledTableCell>
                        <StyledTableCell>Status</StyledTableCell>
                        <StyledTableCell>Role</StyledTableCell>
                        <StyledTableCell>Version</StyledTableCell>
                        <StyledTableCell>Architecture</StyledTableCell>
                        <StyledTableCell>Container Runtime Version</StyledTableCell>
                        <StyledTableCell>Operating System</StyledTableCell>
                        <StyledTableCell>GPU Present</StyledTableCell>
                        <StyledTableCell>GPU Health</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {nodes.map((node) => (
                        <Row key={node.name} node={node} />
                    ))}
                </TableBody>
            </Table>
        </ResponsiveTableContainer>
    );
}


Row.propTypes = {
    node: PropTypes.shape({
        name: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        version: PropTypes.string.isRequired,
        architecture: PropTypes.string.isRequired,
        containerRuntimeVersion: PropTypes.string.isRequired,
        operatingSystem: PropTypes.string.isRequired,
        gpuHealth: PropTypes.string.isRequired,
        gpuPresent: PropTypes.string.isRequired,
        capacity: PropTypes.shape({
            cpu: PropTypes.string.isRequired,
            memory: PropTypes.string.isRequired,
        }).isRequired,
        allocatable: PropTypes.shape({
            cpu: PropTypes.string.isRequired,
            memory: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

CollapsibleTable.propTypes = {
    nodes: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            role: PropTypes.string.isRequired,
            version: PropTypes.string.isRequired,
            architecture: PropTypes.string.isRequired,
            containerRuntimeVersion: PropTypes.string.isRequired,
            operatingSystem: PropTypes.string.isRequired,
            capacity: PropTypes.shape({
                cpu: PropTypes.string.isRequired,
                memory: PropTypes.string.isRequired,
            }).isRequired,
            allocatable: PropTypes.shape({
                cpu: PropTypes.string.isRequired,
                memory: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired
    ).isRequired,
};

export default CollapsibleTable;