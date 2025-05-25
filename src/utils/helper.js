export const handleChange = (e, setFormData) => {
  setFormData((prv) => ({
    ...prv,
    [e.target.name]: e.target.value,
  }));
};

export function capitalizeWord(word) {
  return word[0].toUpperCase() + word.slice(1);
}
