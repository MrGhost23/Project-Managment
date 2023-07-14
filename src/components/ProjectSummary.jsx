import Avatar from "./Avatar";
import { useFirestore } from "../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/useAuthContext";

const ProjectSummary = ({ project }) => {
  const { user } = useAuthContext();
  const { deleteDocument } = useFirestore("projects");
  const navigate = useNavigate();
  return (
    <div className="p-4">
      <div className="p-5 rounded-lg bg-gray-50 drop-shadow-lg">
        <div className="flex items-center mb-5">
          <Avatar photo={project?.createdBy?.photoURL} />{" "}
          <p className="ml-2 font-semibold">
            {project?.createdBy?.displayName}
          </p>
        </div>
        <h2 className="text-xl capitalize font-bold text-gray-800">
          {project?.name}
        </h2>

        <p className="my-2 text-lg">
          {project?.dueDate.toDate().toDateString()}
        </p>
        <p className="my-4 leading-relaxed text-xl">{project?.details}</p>
        <h4 className="text-lg font-semibold text-gray-600">
          Project is assigned to:
        </h4>
        <div className="flex mt-5">
          {project?.assignedUsersList?.map((user) => (
            <div key={user.id} className="mr-2">
              <Avatar photo={user?.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === project?.createdBy.id && (
        <button
          onClick={() => {
            deleteDocument(project?.id);
            navigate("/");
          }}
          type="submit"
          className="py-2.5 mt-3 px-5 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-red-600 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 "
        >
          Delete
        </button>
      )}
    </div>
  );
};
export default ProjectSummary;
