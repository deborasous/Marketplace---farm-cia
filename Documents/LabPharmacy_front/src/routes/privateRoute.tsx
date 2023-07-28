import React, { ReactNode, useEffect, useState } from 'react';
import { validateToken } from '@/auth/validateToken';
import { useRouter } from 'next/router';

interface PrivateRouteProps {
  children: ReactNode;
  redirectRoute: string; // Rota de redirecionamento após o login
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  redirectRoute,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se estamos no lado do cliente antes de usar o localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');

      // Verifica se o token existe e é válido
      if (!token || !validateToken(token)) {
        router.push(redirectRoute);
      }
      setIsLoading(false);
    }
  }, [router, redirectRoute]);

  if (isLoading) {
    // Render a loading state, spinner, or skeleton component while checking authentication status
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default PrivateRoute;
