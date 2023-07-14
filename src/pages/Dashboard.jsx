import { useState } from "react";
import ProjectFilter from "../components/ProjectFilter";
import ProjectList from "../components/ProjectList";
import { useCollection } from "../hooks/useCollection";
import { useAuthContext } from "../context/useAuthContext";

const Dashboard = () => {
  const { user } = useAuthContext();
  const { documents: projects, error } = useCollection("projects");
  const [filter, setFilter] = useState("all");

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const newProjects = projects
    ? projects.filter((document) => {
        switch (filter) {
          case "all":
            return true;
          case "mine":
            let assignedToMe = false;
            document.assignedUsersList.forEach((u) => {
              if (u.id === user.uid) {
                assignedToMe = true;
              }
            });
            return assignedToMe;
          case "development":
          case "design":
          case "sales":
          case "marketing":
            return document.category === filter;
          default:
            return true;
        }
      })
    : null;

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Dashboard</h1>
      {error && <p className="error">{error}</p>}
      {projects && (
        <ProjectFilter currentFilter={filter} changeFilter={changeFilter} />
      )}
      {projects && <ProjectList projects={newProjects} />}
    </div>
  );
};
export default Dashboard;
