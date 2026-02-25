import { getCurrentUser, signIn, signOut } from "@/actions/Auth.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProfile = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await getCurrentUser();
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
  });
};

export const useProfileMutations = () => {
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await signOut();
    },
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (params: { email: string; password: string }) => {
      return await signIn(params);
    },
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
  });

  return {
    logout: logoutMutation.mutateAsync,
    login: loginMutation.mutateAsync,
    isLogin: loginMutation.isPending,
    islogout: logoutMutation.isPending,
  };
};
