import axios from 'axios';

const kubernetesEndpoint = import.meta.env.VITE_KUBERNETES_ENDPOINT;

async function listNodesWithStatus() {
    try {
        // Fetch node information from Kubernetes
        const response = await axios.get(`${kubernetesEndpoint}/api/v1/nodes`);
        const nodes = response.data.items;

        // Mapping node data to extract relevant info
        const nodeData = nodes.map(node => {
            const nodeName = node.metadata.name;
            const role = node.metadata.labels['kubernetes.io/role'] || 'Unknown';
            const statusCondition = node.status.conditions.find(cond => cond.type === 'Ready') || {};
            const status = statusCondition.status || 'Unknown';
            const version = node.status.nodeInfo.kubeletVersion || 'Unknown';
            const hardware = node.status.nodeInfo.machineID || 'Unknown';
            const containerRuntimeVersion = node.status.nodeInfo.containerRuntimeVersion || 'Unknown';
            const operatingSystem = node.status.nodeInfo.operatingSystem || 'Unknown';

            const capacity = node.status.capacity || {};
            const allocatable = node.status.allocatable || {};

            return {
                name: nodeName,
                role: role,
                status: status,
                version: version,
                hardware: hardware,
                containerRuntimeVersion: containerRuntimeVersion,
                operatingSystem: operatingSystem,
                capacity: {
                    cpu: capacity.cpu || 'Unknown',
                    memory: capacity.memory || 'Unknown',
                },
                allocatable: {
                    cpu: allocatable.cpu || 'Unknown',
                    memory: allocatable.memory || 'Unknown',
                },
                healthChecks: [], // Initialize health check to an empty array
                };
        });

        return nodeData;

    } catch (error) {
        console.error('Failed to fetch nodes:', error);
        throw new Error('Failed to fetch node status');
    }
}

export default listNodesWithStatus;
