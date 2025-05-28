const FormWrapper = ({ title, children }) => {
  return (
    <section className="form__wrapper--custom">
      <h3 className="form__header">{title}</h3>
      {children}
    </section>
  );
};

export default FormWrapper;
