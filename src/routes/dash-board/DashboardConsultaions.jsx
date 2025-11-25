import { useParams } from "react-router";
import ConsultationCard from "../../ui/website/communities/consultations/ConsultationCard";
import { useState } from "react";
import { PAGE_SIZE } from "../../utils/constants";
import useGetCommunityConsultations from "../../hooks/dashboard/subscription/useGetCommunityConsultations";

export default function DashboardConsultaions() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const { communityConsultations, currentPage, lastPage, isLoading } =
    useGetCommunityConsultations("", page, pageSize, id);
  console.log("communityConsultations ::", communityConsultations);

  return (
    <div className="consultations-section">
      <div className="row">
        {communityConsultations?.map((item, idx) => (
          <div className="col-12 p-2" key={idx}>
            <ConsultationCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
