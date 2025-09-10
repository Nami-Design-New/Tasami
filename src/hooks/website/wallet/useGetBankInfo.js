import { useQuery } from "@tanstack/react-query";

export default function useGetBankInfo() {
  const { data: bankInfo, isLoading } = useQuery({
    queryKey: ["my-bank-info"],
    queryFn: async () => {},
  });
  return { bankInfo, isLoading };
}
