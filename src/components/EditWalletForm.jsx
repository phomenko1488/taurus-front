import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const EditWalletForm = ({ wallet, onSubmit }) => {
    const [address, setAddress] = useState(wallet.address);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(wallet.id, address);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>New Address</Form.Label>
                <Form.Control
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">Save Changes</Button>
        </Form>
    );
};

export default EditWalletForm;