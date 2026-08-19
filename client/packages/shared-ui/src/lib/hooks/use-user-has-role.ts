import { Role } from '@org/shared-types';
import { useQuery } from '@tanstack/react-query';
import { MeQueryFactory } from '../query-factories/me-query-factory';

export function useUserHasRole() {
  const meQuery = useQuery(MeQueryFactory.meQueryOptions());

  function userHasRole(role: Role) {
    if (meQuery.data === undefined) {
      return undefined;
    }

    const hasRole = meQuery.data.roles.find((value) => value === role);

    return !!hasRole;
  }

  const userIsAdmin = userHasRole('ADMIN');

  return { userHasRole, userIsAdmin } as const;
}
