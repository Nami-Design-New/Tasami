import useGetOfferDetials from "../../hooks/website/my-assistances/useGetOfferDetials";
import Loading from "../../ui/loading/Loading";
import OptionsMenu from "../../ui/website/OptionsMenu";
import SectionHeader from "../../ui/website/SectionHeader";
import OfferInfoGrid from "../../ui/website/offers/OfferInfoGrid";
import TopInfo from "../../ui/website/offers/TopInfo";
export default function OfferDetails() {
  const { offerDetails, isLoading } = useGetOfferDetials();

  if (isLoading) return <Loading />;

  return (
    <section className="page offer-details-section ">
      <div className="container">
        <div className="col-12 p-2">
          <div className="header">
            <SectionHeader title="تفاصيل العرض" />
            <OptionsMenu
              options={[
                { label: "تعديل", onClick: () => console.log("edit") },
                {
                  label: "ارشفه",
                  onClick: () => console.log("Archive"),
                },
                {
                  label: "حذف",
                  onClick: () => console.log("Delete"),
                  className: "text-danger",
                },
              ]}
            />
          </div>
        </div>

        <div className="goal-details-card mt-3 row">
          <div className="col-12 col-lg-4 p-2">
            <TopInfo offer={offerDetails} />
          </div>
          <div className="col-lg-8 col-12 p-2 ">
            <div className="hed">
              <img src="/icons/triangle.svg" />
              <h6>المساعدة</h6>
            </div>
            <p className="desc">{offerDetails?.title}</p>
            <OfferInfoGrid
              offer={offerDetails}
              onShowHelpModal={() => setShowHelpModal(true)}
            />{" "}
            <div className="extra-terms">
              <h2>بنود إضافية</h2>
              <p>{offerDetails?.help_service?.notes}</p>
            </div>{" "}
            <div className="extra-terms">
              <h2>آليات المساعدة المناسبة</h2>
              <ul className="mechanisms-list  ">
                {offerDetails.mechanisms.map((item) => (
                  <li key={item.id} className="mech-item">
                    {" "}
                    {item.title}{" "}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
