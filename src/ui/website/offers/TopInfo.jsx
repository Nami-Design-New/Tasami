import medalIcon from "../../../assets/icons/medal.svg";
export default function TopInfo({ offer }) {
  return (
    // <div className="top-info">
    //   <div style={{ position: "relative" }}>
    //     <img
    //       src={offer?.user?.image}
    //       alt={offer?.user?.name}
    //       className="avatar"
    //     />
    //     {offer?.user?.is_online && <span className="status-dot"></span>}
    //   </div>

    //   <div className="details p-2">
    //     <div className="d-flex flex-1 justify-content-between ">
    //       <div className="personal-info">
    //         <h5>{offer?.user?.name}</h5>
    //         <div className="country">
    //           <img src={flagIcon} />
    //           {offer?.user?.country?.title}
    //         </div>
    //       </div>
    //       <div className="rating">
    //         <img src={medalIcon} />
    //         <span>{offer?.user?.experience_level}</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="goal-details-card">
      <div className="user-profile">
        <img
          src={offer?.user?.image}
          alt={offer?.user?.name}
          className="avatar"
        />
        <div className="content">
          <div className="name-rating">
            <h6>{offer?.user?.name}</h6>
            <div className="rating">
              <img src={medalIcon} />
              <span>{offer?.user?.experience_level}</span>
            </div>
          </div>
          <div className="d-flex gap-2 align-items-center">
            {offer?.user?.country?.title && (
              <div className="country">
                <img src={offer?.user?.country?.image} />
                <span>{offer?.user?.country?.title}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
