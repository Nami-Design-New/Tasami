import { Link } from "react-router";
import CustomButton from "../../../CustomButton";
import { useTranslation } from "react-i18next";
import useBlockAssistant from "../../../../hooks/website/my-clients/useBlockAssistant";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function ClientsCard({ helper }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { blockAssistant, isPending } = useBlockAssistant();
  const handleBlock = (e) => {
    e.preventDefault();
    e.stopPropagation();
    blockAssistant(helper?.id, {
      onSuccess: (res) => {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: ["clients"] });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };
  return (
    <Link to={`/helper/${helper.id}`} className="helper-card">
      <figure className="image-wrapper">
        <img
          src={helper.image}
          alt={helper.name}
          className="avatar"
          loading="lazy"
        />
        <span className="status-dot" aria-hidden="true"></span>
      </figure>

      <section className="info">
        <header className="info-header">
          <h3>{helper.name}</h3>
          <div className="rating">
            <img
              src="/icons/medal.svg"
              alt="Medal icon"
              className="rating-icon"
              loading="lazy"
            />
            <span>{helper.contract_numbers}</span>
          </div>
        </header>

        <footer className="meta">
          {helper.country && (
            <span className="country">
              <img
                src="/icons/flag.svg"
                alt={`${helper.country.title} flag`}
                className="flag-icon"
                loading="lazy"
              />
              <span>{helper.country.title}</span>
            </span>
          )}

          <CustomButton
            onClick={handleBlock}
            variant={helper.blocked ? "outlined" : "default"}
            color="fire"
            loading={isPending}
          >
            {helper.blocked ? t("unblock") : t("block")}
          </CustomButton>
        </footer>
      </section>
    </Link>
  );
}
