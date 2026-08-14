import { Button, Group, PasswordInput, Stack, TextInput } from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { UserDto } from '@org/shared-types';
import { UsersQueryFactory, useTitleContext } from '@org/shared-ui';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useEffectEvent } from 'react';
import { useParams } from 'react-router';
import classes from './user-route.module.css';

function UserRoute() {
  const titleContext = useTitleContext();
  const params = useParams();
  const userQuery = useQuery(
    UsersQueryFactory.getUserByIdQueryOptions({ id: params.userId ?? '' }),
  );

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      firstName: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      username: isNotEmpty('Username is required'),
      firstName: isNotEmpty('First Name is required'),
      surname: isNotEmpty('Surname is required'),
      email: isEmail('Invalid email'),
      password: (value) => {
        if (value.length === 0) {
          return null;
        }

        if (value.trim().length < 8) {
          return 'Password must be at least 8 characters'
        }

        return null;
      },
      confirmPassword: (value, values) => {
        return value !== values.password ? 'Passwords did not match' : null;
      },
    },
  });

  const onQueryData = useEffectEvent((data: UserDto) => {
    const formValues = {
      username: data.username,
      firstName: data.firstName,
      surname: data.surname,
      email: data.email,
      password: '',
      confirmPassword: '',
    };

    form.setInitialValues(formValues);
    form.setValues(formValues);
  });

  useEffect(
    function initialiseFormFromQueryData() {
      if (userQuery.data) {
        onQueryData(userQuery.data);
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

  function handleSubmit(values: {
    username: string;
    firstName: string;
    surname: string;
    email: string;
    password: string;
  }) {}

  return (
    <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          {...form.getInputProps('username')}
          key={form.key('username')}
          label="Username"
          placeholder="Username"
          withAsterisk
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
        <Group justify="center">
          <Button type="submit">Submit</Button>
        </Group>
      </Stack>
    </form>
  );
}

export default UserRoute;
