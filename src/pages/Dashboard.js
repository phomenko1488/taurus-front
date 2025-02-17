import {useEffect, useState} from 'react';
import {Button, ListGroup, Alert, Modal} from 'react-bootstrap';
import AddressForm from '../components/AddressForm';
import EditWalletForm from '../components/EditWalletForm';
import {getNetworks, getWallets, createWallet, editWallet, getUserById} from '../services/api';
import {useAuth} from '../context/AuthContext';

const Dashboard = () => {
    const {auth, logout} = useAuth();
    const [wallets, setWallets] = useState([]);
    const [networks, setNetworks] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [error, setError] = useState('');
// Dashboard.jsx (дополнение)
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const loadUserDetails = async () => {
            if (auth?.user?.id) {
                const response = await getUserById(auth.user.id);
                setUserDetails(response.data);
            }
        };
        loadUserDetails();
    }, [auth]);
    useEffect(() => {
        const loadData = async () => {
            try {
                const networksResponse = await getNetworks();
                const walletsResponse = await getWallets();
                setNetworks(networksResponse.data);
                setWallets(walletsResponse.data);
            } catch (err) {
                setError('Failed to load data');
            }
        };
        loadData();
    }, []);

    const handleAddWallet = async (walletData) => {
        try {
            const {data} = await createWallet(walletData);
            setWallets([...wallets, data]);
            setShowAddForm(false);
        } catch (err) {
            setError('Failed to add wallet');
        }
    };

    const handleEditWallet = async (id, newAddress) => {
        try {
            const {data} = await editWallet(id, {newAddress});
            setWallets(wallets.map(w => w.id === id ? data : w));
            setSelectedWallet(null);
        } catch (err) {
            setError('Failed to update wallet');
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Welcome, {auth?.user?.username}</h2>
                <Button onClick={logout} variant="danger">Logout</Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <div className="mb-3">
                <Button onClick={() => setShowAddForm(!showAddForm)}>
                    {showAddForm ? 'Cancel' : 'Add New Wallet'}
                </Button>
            </div>

            {showAddForm && (
                <AddressForm
                    networks={networks}
                    onSubmit={handleAddWallet}
                    onCancel={() => setShowAddForm(false)}
                />
            )}

            <ListGroup>
                {wallets.map(wallet => (
                    <ListGroup.Item key={wallet.id} className="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{wallet.network.name}</strong>: {wallet.address}
                        </div>
                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => setSelectedWallet(wallet)}
                        >
                            Edit
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <Modal show={!!selectedWallet} onHide={() => setSelectedWallet(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Wallet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedWallet && (
                        <EditWalletForm
                            wallet={selectedWallet}
                            onSubmit={handleEditWallet}
                        />
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};
export default Dashboard