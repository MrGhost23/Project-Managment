const filterList = [
  "all",
  "mine",
  "development",
  "design",
  "marketing",
  "sales",
];

const ProjectFilter = ({ currentFilter, changeFilter }) => {
  const handleClick = (newFilter) => {
    changeFilter(newFilter);
  };
  return (
    <div className="project-filter mb-4 font-semibold">
      <nav className="flex gap-3 flex-wrap">
        <p>Filter by: </p>
        {filterList.map((f) => (
          <button
            key={f}
            onClick={() => handleClick(f)}
            className={
              currentFilter === f ? "text-blue-600 capitalize" : "capitalize"
            }
          >
            {f}
          </button>
        ))}
      </nav>
    </div>
  );
};
export default ProjectFilter;
