import { Button } from '@mantine/core';
import {
  AuthenticationQueryFactory,
  useLoginMutation,
  useReturnUrlContext,
} from '@org/shared-ui';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function LoginRoute() {
  const returnUrlContext = useReturnUrlContext();
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();
  const { data: isAuthenticatedData } = useQuery(
    AuthenticationQueryFactory.isAuthenticatedQueryOptions(),
  );

  function handleLogin() {
    loginMutation.mutate(
      {
        username: 'jamie',
        password: 'password',
      },
      {
        onSuccess: () => {
          navigate(returnUrlContext.getReturnUrl() || '/');
          returnUrlContext.setReturnUrl('');
        },
      },
    );
  }

  useEffect(
    function navigateToDefaultRouteIfAuthenticated() {
      if (isAuthenticatedData) {
        navigate('/', { replace: true });
      }
    },
    [isAuthenticatedData, navigate],
  );

  return (
    <div>
      <div>The Login Page: returnUrl = {returnUrlContext.getReturnUrl()}</div>
      <Button onClick={handleLogin}>Login</Button>
      {loginMutation.isError && <div>Login Failed</div>}
    </div>
  );
}

export default LoginRoute;
