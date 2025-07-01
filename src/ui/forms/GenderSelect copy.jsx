export default function GenderSelect() {
  return (
    <div className="gender_select">
      <label>Gender</label>
      <div>
        <label htmlFor="female" className="gender_card">
          <input type="radio" name="gender" id="female" />
          <img src="/icons/female.svg" alt="female" /> Female
        </label>
        <label htmlFor="male" className="gender_card">
          <input type="radio" name="gender" id="male" value={"male"} checked />
          <img src="/icons/male.svg" alt="male" /> Male
        </label>
      </div>
    </div>
  );
}
