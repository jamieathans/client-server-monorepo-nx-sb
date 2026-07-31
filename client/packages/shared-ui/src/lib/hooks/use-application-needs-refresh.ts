import { useQuery } from '@tanstack/react-query';
import { GitRepoQueryFactory } from '../query-factories/git-repo-query-factory';
import { useEffect, useRef, useState } from 'react';

export function useApplicationNeedsRefresh() {
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const commitIdRef = useRef('');

  const gitRepoPropertiesQuery = useQuery({
    ...GitRepoQueryFactory.propertiesQueryOptions(),
    refetchInterval: () => {
      if (needsRefresh) {
        return false;
      }

      return 30_000;
    },
  });

  useEffect(
    function checkIfApplicationNeedsRefresh() {
      if (!gitRepoPropertiesQuery.data?.commitId) {
        return;
      }

      if (!commitIdRef.current) {
        commitIdRef.current = gitRepoPropertiesQuery.data.commitId;

        return;
      }

      if (commitIdRef.current !== gitRepoPropertiesQuery.data.commitId) {
        setNeedsRefresh(true);
      }
    },
    [gitRepoPropertiesQuery.data?.commitId],
  );

  return {
    needsRefresh,
  } as const;
}
