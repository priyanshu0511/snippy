import { getAuthUser } from "@/lib/api/auth";
import { useQuery } from "@tanstack/react-query";

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });

  return {
    isLoading: authUser.isLoading,
    authData: authUser.data,
    error: authUser.error,
  };
};

export default useAuthUser;
