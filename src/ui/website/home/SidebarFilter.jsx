import InputField from "../../forms/InputField";
export default function SidebarFilter({
  tabs = [],
  activeTab,
  onTabChange,
  placeholder = "ابحث هنا",
  searchValue = "",
  onFilterClick,
}) {
  return (
    <section className="section-header">
      {
        <div className="filters">
          <div className="filter-row">
            <InputField
              type="text"
              placeholder={placeholder}
              value={searchValue}
            />
            <button type="button" onClick={onFilterClick}>
              <img src="icons/filter-icon.svg" />
            </button>
          </div>
        </div>
      }

      {tabs.length > 0 && (
        <div className="tags-row">
          {tabs.map((tab) => (
            <span
              key={tab}
              className={`tag ${activeTab === tab ? "active" : ""}`}
              onClick={() => onTabChange(tab)}
            >
              {tab}
            </span>
          ))}
        </div>
      )}

  
    </section>
  );
}
