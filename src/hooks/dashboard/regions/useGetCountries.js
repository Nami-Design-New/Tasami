import { useQuery } from "@tanstack/react-query";

export default function useGetCountries() {
  const { data: countries, isLoading } = useQuery({});
  return { countries, isLoading };
}
