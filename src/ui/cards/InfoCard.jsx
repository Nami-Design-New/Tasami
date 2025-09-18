export default function InfoCard({ title, data }) {
  return (
    <div className="exp-info-box  ">
      <h5>{title}</h5>
      <p>{data}</p>
    </div>
  );
}
