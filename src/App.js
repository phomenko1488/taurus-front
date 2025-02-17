import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './PrivateRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import PublicProfile from './pages/PublicProfile';

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/:userId" element={<PublicProfile />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;