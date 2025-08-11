export default function UserDataCard({ name, country, image, flag }) {
  return (
    <div className="user">
      <img className="user-image" src={image} alt={name} />
      <div className="user-data">
        <h3>{name}</h3>
        <div className="user-country">
          <img src={flag} alt={country} />
          <p>{country}</p>
        </div>
      </div>
    </div>
  );
}
