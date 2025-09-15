import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation';
import React from 'react'

const useLogout = () => {

    const queryClient=useQueryClient();
    const router=useRouter();

    const logout=()=>{
        localStorage.removeItem("token");
        queryClient.removeQueries({queryKey:["authUser"]});
        router.push("/login");
    }
  return logout;
}

export default useLogout