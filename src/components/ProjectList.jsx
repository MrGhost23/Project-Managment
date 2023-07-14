import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const ProjectList = ({ projects }) => {
  return (
    <div className="grid mb-14 mr-4 md:mr-0 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.length === 0 && <p className="text-xl">No projects yet!</p>}
      {projects.map((project) => (
        <Link
          to={`/projects/${project.id}`}
          className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
          key={project.id}
        >
          <h4 className="font-bold text-xl capitalize tracking-tight text-gray-900">
            {project.name}
          </h4>
          <p className="font-normal text-gray-600 mb-5">
            <span className="font-medium">Due by </span>
            {project.dueDate.toDate().toDateString()}
          </p>
          <div>
            <ul className="flex gap-2">
              {project.assignedUsersList.map((user) => (
                <li key={user.photoURL}>
                  <Avatar photo={user.photoURL} />
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default ProjectList;
