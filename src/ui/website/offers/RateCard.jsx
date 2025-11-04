import StarRate from "../../ModelComponent/common/StarRate";

export default function RateCard({ rate }) {
  return (
    <article className="rate-card" aria-label={`Review by ${rate.user.name}`}>
      <header className="rate-card__header">
        <h3 className="rate-card__user" aria-label="Reviewer name">
          {rate.user.name}
        </h3>
        <div
          className="rate-card__rating"
          aria-label={`Rated ${rate.avg_rate} out of 5 stars`}
          role="img"
        >
          <StarRate rating={rate.avg_rate} />
        </div>
      </header>

      <time className="rate-card__date">{rate.created_at}</time>

      {rate.notes && (
        <p className="rate-card__notes" aria-label="Review notes">
          {rate.notes}
        </p>
      )}
    </article>
  );
}
