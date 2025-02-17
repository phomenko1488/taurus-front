import {useState} from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import {useAuth} from '../context/AuthContext';
import {Link, useNavigate} from 'react-router-dom';

const Login = () => {
    const {login} = useAuth();
    const [formData, setFormData] = useState({email: '', password: ''});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(formData);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="container mt-5" style={{maxWidth: '400px'}}>
            <h2>Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                </Form.Group>
                <div className="d-inline-flex w-100">
                    <Button className={'w-50'} variant="primary" type="submit">Login</Button>
                    <Link  to={'/register'} className={'btn btn-outline-dark w-50'}>Sign up</Link>
                </div>
            </Form>
        </div>
    );
};

export default Login;