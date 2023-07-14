import { useEffect, useState } from "react";
import Select from "react-select";
import { useCollection } from "../hooks/useCollection";
import { useAuthContext } from "../context/useAuthContext";
import { Timestamp } from "firebase/firestore";
import { useFirestore } from "../hooks/useFirestore";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const { addDocument, response } = useFirestore("projects");
  const { documents } = useCollection("users");
  const [users, setUsers] = useState([]);
  const { user } = useAuthContext();

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState([]);

  const categories = [
    { value: "development", label: "Development" },
    { value: "design", label: "Design" },
    { value: "sales", label: "Sales" },
    { value: "marketing", label: "Marketing" },
  ];

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError("Please select a category");
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError("Please select one user at least");
      return;
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });

    const project = {
      name,
      details,
      category: category.value,
      dueDate: Timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
    };

    await addDocument(project);
    if (!response.error) {
      navigate("/");
    }
  };

  return (
    <div className="w-3/4 md:p-0 md:mb-0 p-4 mb-10">
      <h2 className="text-lg font-bold mb-10 mt-5">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label className="create-label">
          <span className="mb-4">Project name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="create-input"
          />
        </label>
        <label className="create-label">
          <span className="mb-4">Project Details:</span>
          <textarea
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
            className="create-input"
          />
        </label>
        <label className="create-label">
          <span className="mb-4">Set due date:</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
            className="create-input"
          />
        </label>
        <label className="create-label">
          <span>Project category:</span>
          <Select
            options={categories}
            onChange={(option) => setCategory(option)}
          />
        </label>
        <label className="create-label">
          <span>Assign to:</span>
          <Select
            options={users}
            onChange={(option) => setAssignedUsers(option)}
            isMulti
          />
        </label>

        {formError && <p className="error">{formError}</p>}

        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 my-6 px-4 border border-gray-400 rounded shadow">
          Add Project
        </button>
      </form>
    </div>
  );
};
export default Create;
