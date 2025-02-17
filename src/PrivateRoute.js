import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return auth?.token ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;