import { AuthContextType } from '../../../Contexts/AuthContext/AuthContextType';
import { ProtectedRouteProps } from './IProtectedRouteProps';
import { HOME } from '../../../Utils/Constants/constants';
import { useAuth } from '../../../Hooks/useAuth';
import { Navigate } from 'react-router-dom';

function ProtectedAuthRoute({ children }: ProtectedRouteProps) {
    const { activeUser } = useAuth() as AuthContextType;
    return !activeUser.userId ? <Navigate to={HOME} replace /> : <>{children}</>;
}

export default ProtectedAuthRoute;
