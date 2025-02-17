import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddressForm = ({ networks, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        networkId: networks[0]?.id || '',
        address: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="border p-3 mb-4 rounded">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Network</Form.Label>
                    <Form.Select
                        value={formData.networkId}
                        onChange={(e) => setFormData({...formData, networkId: e.target.value})}
                        required
                    >
                        {networks.map(network => (
                            <option key={network.id} value={network.id}>
                                {network.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        required
                    />
                </Form.Group>

                <div className="d-flex gap-2">
                    <Button variant="success" type="submit">Add Wallet</Button>
                    <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                </div>
            </Form>
        </div>
    );
};

export default AddressForm;