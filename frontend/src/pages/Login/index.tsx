
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import AuthLayout from '../../components/layouts/AuthLayout';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSuccess = () => {
    navigate(redirect);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Please enter your credentials to continue"
      alternateLink="/register"
      alternateLinkText="Don't have an account? Sign up"
    >
      <LoginForm onSuccess={handleSuccess} />
    </AuthLayout>
  );
};

export default Login;