import { useQuery } from '@tanstack/react-query';
import { GitRepoPropertiesQueryFactory } from '../query-factories/git-repo-properties-query-factory';
import { useEffect, useRef, useState } from 'react';

export function useApplicationNeedsRefresh() {
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const commitIdRef = useRef('');

  const gitRepoPropertiesQuery = useQuery({
    ...GitRepoPropertiesQueryFactory.propertiesQueryOptions(),
    refetchInterval: () => {
      if (needsRefresh) {
        return false;
      }

      return 5_000;
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
