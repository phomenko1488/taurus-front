import { Link } from 'react-router-dom';
import { ListGroup, Button } from 'react-bootstrap';

const AddressList = ({ wallets, onEdit }) => {
    return (
        <ListGroup>
            {wallets.map(wallet => (
                <ListGroup.Item key={wallet.id}>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{wallet.network.name}</strong>: {wallet.address}
                        </div>
                        <div className="d-flex gap-2">
                            <Link
                                to={`/user/${wallet.id}`}
                                className="btn btn-sm btn-outline-info"
                            >
                                View Profile
                            </Link>
                            <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => onEdit(wallet)}
                            >
                                Edit
                            </Button>
                        </div>
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default AddressList;