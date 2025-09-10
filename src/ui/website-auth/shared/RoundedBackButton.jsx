export default function RoundedBackButton({ children, ...props }) {
  return (
    <button className="rouded-back-button" {...props}>
      {children}
    </button>
  );
}
