import { Link } from "react-router";

export default function QuickChatBreadcrumb({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav className="quick-chat-breadcrumb" aria-label="chat path">
      {items.map((item, index) => (
        <span key={`${item.to}-${index}`} className="quick-chat-breadcrumb__item">
          {index > 0 && <span className="quick-chat-breadcrumb__separator">&lt;</span>}
          {index === items.length - 1 ? (
            <span>{item.label}</span>
          ) : (
            <Link to={item.to}>{item.label}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}
