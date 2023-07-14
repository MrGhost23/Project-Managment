import { useParams } from "react-router-dom";
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import ProjectSummary from "../components/ProjectSummary";
import ProjectComments from "../components/ProjectComments";

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const ref = doc(db, "projects", id);

  useEffect(() => {
    const fetchData = async () => {
      const unsubscribe = onSnapshot(
        ref,
        (doc) => {
          if (doc.exists()) {
            setProject({ ...doc.data(), id });
            setError(null);
          } else {
            console.log("Document does not exist");
          }
        },
        (error) => {
          console.error("Error fetching document:", error);
        }
      );
    };
    fetchData();
  }, []);

  return (
    <div>
      {error && <p className="error">{error}</p>}
      {!project && <p>Loading...</p>}
      <div className="mr-5 md:mr-0  md:grid-cols-2 grid gap-5">
        <ProjectSummary project={project} />
        <ProjectComments project={project} />
      </div>
    </div>
  );
};
export default Project;
