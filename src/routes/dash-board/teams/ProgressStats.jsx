const ProgressStats = ({ completed, pending }) => (
  <div className="teams__progress-stats">
    <span>{completed} : المكتمله</span>
    <span>غير المكتمله : {pending}</span>
  </div>
);

export default ProgressStats;
