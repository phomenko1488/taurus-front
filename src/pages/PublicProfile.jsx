import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, ListGroup, Spinner } from 'react-bootstrap';
import { getUserPublicProfile } from '../services/api';

const PublicProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const { data } = await getUserPublicProfile(userId);
                setUser(data);
            } catch (err) {
                setError('Failed to load profile');
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, [userId]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" />
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger" className="mt-3">{error}</Alert>;
    }

    return (
        <div className="container mt-4">
            <h2>{user.username}'s Profile</h2>
            <div className="mt-3">
                <h4>Public Wallets</h4>
                <ListGroup>
                    {user.wallets?.map(wallet => (
                        <ListGroup.Item key={wallet.id}>
                            <strong>{wallet.network.name}</strong>: {wallet.address}
                        </ListGroup.Item>
                    ))}
                    {user.wallets?.length === 0 && (
                        <ListGroup.Item>No public wallets found</ListGroup.Item>
                    )}
                </ListGroup>
            </div>
        </div>
    );
};

export default PublicProfile;