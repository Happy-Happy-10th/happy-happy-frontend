import { getHealth } from '@/api/fragments';
import { useQuery } from '@tanstack/react-query';

const useHealth = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: async () => (await getHealth()).json(),
  });
};
export { useHealth };
