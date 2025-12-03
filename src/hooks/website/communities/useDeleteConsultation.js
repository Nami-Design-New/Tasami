import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function useDeleteConsultation() {
    const { mutate: deleteConsultation, isPending: isDeletingConsultation } = useMutation({
        mutationFn: async (id) => {
            const res = await axiosInstance.delete(`consultations-update/${id}`);
            if (res.data.code !== 200) {
                throw new Error(res.data.message || "Something went wrong");
            }
            return res.data;
        },
    });
    return { deleteConsultation, isDeletingConsultation };
}
