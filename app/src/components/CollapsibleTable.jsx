import * as React from 'react';
import { useState } from 'react';
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

const Row = ({ node }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow style={{ background: node.gpuHealth === 'PASS' ? lightGreen : lightRed }}>
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
            </TableRow>

            <TableRow>
                {/*Expandable table: capacity/allocatable resources, and health checks*/}
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom>
                                Capacity / Allocatable Resources:
                            </Typography>
                            <ul>
                                <li>CPU (Capacity): {node.capacity.cpu}</li>
                                <li>Memory (Capacity): {node.capacity.memory}</li>
                                <li>CPU (Allocatable): {node.allocatable.cpu}</li>
                                <li>Memory (Allocatable): {node.allocatable.memory}</li>
                            </ul>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};


function CollapsibleTable({ nodes }) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Node Name</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Version</TableCell>
                        <TableCell>Architecture</TableCell>
                        <TableCell>Container Runtime Version</TableCell>
                        <TableCell>Operating System</TableCell>
                        <TableCell>GPU Present</TableCell>
                        <TableCell>GPU Health</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {nodes.map((node) => (
                        <Row key={node.name} node={node} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
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