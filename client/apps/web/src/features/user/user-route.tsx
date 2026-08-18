import {
  Button,
  Group,
  Loader,
  MultiSelect,
  PasswordInput,
  Stack,
  TextInput,
} from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { Role, UserDto } from '@org/shared-types';
import {
  showSuccessNotification,
  UsersQueryFactory,
  useTitleContext,
  useUpdateUserMutation,
  useUserHasRole,
} from '@org/shared-ui';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useEffectEvent } from 'react';
import { useParams } from 'react-router';
import classes from './user-route.module.css';
import { UsersApi } from '@org/shared-utils';

function UserRoute() {
  const titleContext = useTitleContext();
  const params = useParams();

  const userId = params.userId ?? '';

  const userQuery = useQuery(
    UsersQueryFactory.getUserByIdQueryOptions({ id: userId }),
  );

  const rolesQuery = useQuery(UsersQueryFactory.rolesQueryOptions());

  const { userIsAdmin } = useUserHasRole();

  const updateUserMutation = useUpdateUserMutation();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      firstName: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
      roles: [] as Role[],
    },
    // Debounce async validation by 500ms – prevents firing an API call on every keystroke.
    validateDebounce: 500,
    validateInputOnChange: ['username'],
    validate: {
      username: async (value, _values, _path, signal) => {
        if (value.trim().length < 3) {
          return 'Username must be at least 3 characters';
        }

        const usernameIsAvailable =
          await new UsersApi().checkUsernameAvailability({
            userId,
            username: value,
            fetchInit: {
              signal,
            },
          });

        return usernameIsAvailable ? null : 'Username is already taken';
      },
      firstName: isNotEmpty('First Name is required'),
      surname: isNotEmpty('Surname is required'),
      email: isEmail('Invalid email'),
      password: (value) => {
        if (value.length === 0) {
          return null;
        }

        if (value.trim().length < 8) {
          return 'Password must be at least 8 characters';
        }

        return null;
      },
      confirmPassword: (value, values) => {
        return value !== values.password ? 'Passwords did not match' : null;
      },
    },
  });

  const onQueryDataChange = useEffectEvent((data: UserDto) => {
    const formValues = {
      username: data.username,
      firstName: data.firstName,
      surname: data.surname,
      email: data.email,
      password: '',
      confirmPassword: '',
      roles: data.roles,
    };

    form.setInitialValues(formValues);
    form.setValues(formValues);
  });

  useEffect(
    function initialiseFormFromQueryData() {
      if (userQuery.data) {
        onQueryDataChange(userQuery.data);
      }
    },
    [userQuery.data],
  );

  useEffect(
    function setTitle() {
      titleContext.setTitle('User Data');
    },
    [titleContext],
  );

  function handleSubmit(values: Omit<UserDto, 'id'>) {
    updateUserMutation.mutate(
      {
        id: userId,
        username: values.username,
        firstName: values.firstName,
        surname: values.surname,
        email: values.email,
        roles: values.roles,
        password: values.password || null,
      },
      {
        onSuccess: () =>
          showSuccessNotification({
            message: 'User details updated.',
          }),
      },
    );
  }

  return (
    <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          {...form.getInputProps('username')}
          key={form.key('username')}
          label="Username"
          placeholder="Username"
          withAsterisk
          disabled={form.submitting}
          rightSection={
            form.isValidating('username') ? <Loader size={16} /> : null
          }
          classNames={{
            input: classes.usernameInput,
          }}
        />
        <TextInput
          {...form.getInputProps('firstName')}
          key={form.key('firstName')}
          label="First Name"
          placeholder="First Name"
          withAsterisk
        />
        <TextInput
          {...form.getInputProps('surname')}
          key={form.key('surname')}
          label="Surname"
          placeholder="Surname"
          withAsterisk
        />
        <TextInput
          {...form.getInputProps('email')}
          key={form.key('email')}
          label="Email"
          placeholder="Email"
          withAsterisk
          classNames={{
            input: classes.emailInput,
          }}
        />
        <PasswordInput
          {...form.getInputProps('password')}
          key={form.key('password')}
          label="Password"
          placeholder="Password"
          withAsterisk
        />
        <PasswordInput
          {...form.getInputProps('confirmPassword')}
          key={form.key('confirmPassword')}
          label="Confirm Password"
          placeholder="Confirm Password"
          withAsterisk
        />
        {userIsAdmin && (
          <MultiSelect
            label="Pick Roles"
            placeholder="Pick Roles"
            data={rolesQuery.data}
            key={form.key('roles')}
            {...form.getInputProps('roles')}
          />
        )}
        <Group justify="center">
          <Button type="submit" disabled={updateUserMutation.isPending}>
            Submit
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export default UserRoute;
