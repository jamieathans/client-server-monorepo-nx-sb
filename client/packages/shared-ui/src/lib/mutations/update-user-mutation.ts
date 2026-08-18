import { UserDto } from '@org/shared-types';
import { UsersApi } from '@org/shared-utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryMeta } from '../utils/query-utils';
import { UsersQueryFactory } from '../query-factories/users-query-factory';

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userDto: UserDto) => {
      return new UsersApi().updateUser({
        userDto,
      });
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: UsersQueryFactory.usersKey(),
      });
    },
    meta: queryMeta({
      errorMessage:
        'There was a problem updating the user details, please try again.',
    }),
  });
}
