import { getHealth, getMyInfo } from '@/api/fragments';
import { useQuery } from '@tanstack/react-query';

const useHealth = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: async () => (await getHealth()).json(),
  });
};

const useMyInfo = () => {
  return useQuery({
    queryKey: ['my-info'],
    queryFn: async () => (await getMyInfo()).json(),
    enabled: false,
  });
};

export { useHealth, useMyInfo };
