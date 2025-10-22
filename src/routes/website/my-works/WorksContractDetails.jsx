import { useTranslation } from "react-i18next";
import useGetContractDetails from "../../../hooks/website/MyWorks/assistants/useGetContractDetails";
import HelperCard from "../../../ui/cards/HelperCard";
import CustomLink from "../../../ui/CustomLink";
import Loading from "../../../ui/loading/Loading";
import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";

export default function WorksContractDetails() {
  const { t } = useTranslation();
  const { contractDetails, isLoading } = useGetContractDetails();
  console.log(isLoading);

  if (isLoading) return <Loading />;
  console.log(contractDetails);
  return (
    <section className="work-contract-details page">
      <div className="container">
        <div className="row">
          .
          <div className="col-12 p-2">
            <header>
              <RoundedBackButton></RoundedBackButton>
              <div className="work-actions">
                <button>
                  <img src="/icons/work-star.svg" />
                </button>
                <button>
                  <img src="/icons/work-chat.svg" />
                </button>
                <button>
                  <img src="/icons/contract-flag.svg" />
                </button>
              </div>
            </header>
          </div>
          <div className="col-4 p-2">
            <d-flex className="d-flex flex-column gap-3">
              <HelperCard helper={contractDetails?.helper} />
              <CustomLink
                type="outlined"
                fullWidth
                size="large"
                to={`/helper/${contractDetails.helper.id}`}
              >
                السيرة الذاتية
              </CustomLink>
            </d-flex>
          </div>
          <div className="col-8 p-2">
            <div className="contract-data">
              <h2>المدفوعات</h2>{" "}
              <div className="goal-info">
                <div className="info-grid">
                  <div className="info-box">
                    <div className="label">قيمة العقد</div>
                    {/* <div className="value">{workDetails.category_title}</div> */}
                  </div>
                  <div className="info-box">
                    <div className="label">مدة العقد</div>
                    {/* <div className="value">{workDetails.category_title}</div> */}
                  </div>
                  <div className="info-box">
                    <div className="label">
                      قيمة الاستحقاق اليومي للمساعد الشخصي
                    </div>
                    {/* <div className="value">{workDetails.category_title}</div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
