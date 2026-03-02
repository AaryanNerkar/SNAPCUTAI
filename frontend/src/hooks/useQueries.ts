import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useGetTotalProcessed() {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['totalProcessed'],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getTotalProcessed();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000,
  });
}

export function useRecordProcessed() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.recordProcessed();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['totalProcessed'] });
    },
  });
}
