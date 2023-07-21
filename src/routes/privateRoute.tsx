import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { validateToken } from '@/auth/validateToken';

interface PrivateRouteProps {
  children: ReactNode;
  redirectRoute: string; // Rota de redirecionamento após o login
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  redirectRoute,
}) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    //verifica se o token existe
    if (!token || !validateToken(token)) {
      router.push(redirectRoute);
    }
  }, [router, redirectRoute]);

  return <>{children}</>;
};

export default PrivateRoute;
