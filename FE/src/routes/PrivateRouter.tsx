import { Navigate } from 'react-router-dom';
import { useLocalStorage } from '../hook/useStorage';

const PrivateRoute = ({ element }: any) => {
    const [user] = useLocalStorage('user', {});
    if (!user || !user.user) {
        // Nếu chưa đăng nhập, chuyển hướng người dùng đến trang login
        return <Navigate to="/auth" />;
      }
    
      return element;
}

export default PrivateRoute
