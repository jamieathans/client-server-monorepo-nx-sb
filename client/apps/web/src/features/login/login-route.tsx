import { useReturnUrlContext } from '@org/shared-ui';

function LoginRoute() {
  const returnUrlContext = useReturnUrlContext();
  
  return (
    <div>The Login Page: returnUrl = {returnUrlContext.getReturnUrl()}</div>
  );
}

export default LoginRoute;
