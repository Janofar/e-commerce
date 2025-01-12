
import { useNavigate } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import AuthLayout from '../../components/layouts/AuthLayout';

const Register = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/');
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Join us to start shopping"
      alternateLink="/login"
      alternateLinkText="Already have an account? Sign in"
    >
      <RegisterForm onSuccess={handleSuccess} />
    </AuthLayout>
  );
};

export default Register;