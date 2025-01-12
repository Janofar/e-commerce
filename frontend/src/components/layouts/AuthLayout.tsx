
import { Link } from 'react-router-dom';
import { Store } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  alternateLink: string;
  alternateLinkText: string;
}

const AuthLayout = ({ children, title, subtitle, alternateLink, alternateLinkText }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Store className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {subtitle}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
          
          <div className="mt-6">
            <Link
              to={alternateLink}
              className="block text-center text-sm text-indigo-600 hover:text-indigo-500"
            >
              {alternateLinkText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;