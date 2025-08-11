export default function ExperienceList({ experiences }) {
  return (
    <div className="experiences">
      <h3>الخبرات العملية</h3>
      <ul className="experiences-list">
        {experiences.map((exp, index) => (
          <li key={index}>{exp}</li>
        ))}
      </ul>
    </div>
  );
}
