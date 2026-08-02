import {
  Button,
  Center,
  Group,
  TextInput,
  Text,
  PasswordInput,
  Stack,
} from '@mantine/core';
import { useLoginMutation, useReturnUrlContext } from '@org/shared-ui';
import { useNavigate } from 'react-router';
import classes from './login-route.module.css';
import { useForm } from '@mantine/form';

function LoginRoute() {
  const returnUrlContext = useReturnUrlContext();
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
    },
    onValuesChange: () => {
      loginMutation.reset();
    },
    validate: {
      username: (value) => {
        if (value.trim().length > 0) {
          return null;
        }

        return 'Invalid username';
      },
      password: (value) => {
        if (value.trim().length > 0) {
          return null;
        }

        return 'Invalid password';
      },
    },
  });

  function handleLogin({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    loginMutation.mutate(
      {
        username,
        password,
      },
      {
        onSuccess: async (loginSuccess) => {
          if (loginSuccess) {
            await navigate(returnUrlContext.getReturnUrl() || '/', {
              replace: true,
            });
            returnUrlContext.setReturnUrl('');
          }
        },
      },
    );
  }

  return (
    <Center className={classes.root}>
      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => {
          handleLogin(values);
        })}
      >
        <Stack>
          <TextInput
            {...form.getInputProps('username')}
            key={form.key('username')}
            label="Username"
            placeholder="Username"
            withAsterisk
          />
          <PasswordInput
            {...form.getInputProps('password')}
            key={form.key('password')}
            label="Password"
            placeholder="Password"
            withAsterisk
          />
          <Group justify="flex-end">
            {loginMutation.data === false && (
              <Text className={classes.loginFailedText}>login failed</Text>
            )}
            <Button type="submit">Submit</Button>
          </Group>
        </Stack>
      </form>
    </Center>
  );
}

export default LoginRoute;
