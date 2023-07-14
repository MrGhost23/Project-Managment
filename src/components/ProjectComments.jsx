import { useState } from "react";
import { useAuthContext } from "../context/useAuthContext";
import { Timestamp } from "firebase/firestore";
import { useFirestore } from "../hooks/useFirestore";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ProjectComments = ({ project }) => {
  const { updateDocument, response } = useFirestore("projects");
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: Timestamp.fromDate(new Date()),
      id: Math.random() * 200,
    };
    updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    });
    if (!response.error) {
      setNewComment("");
    }
  };
  return (
    <>
      <div className="p-4 md:p-0 md:mb-0 mb-12">
        <h4 className="font-bold text-xl mb-10">Project Comments</h4>
        {project?.comments.length > 0 &&
          project?.comments.map((comment) => (
            <div
              key={comment.id}
              className="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg"
            >
              <div className="relative flex gap-4">
                <img
                  src={comment.photoURL}
                  className="relative rounded-lg -top-8 -mb-4 bg-white border h-16 w-16"
                  alt=""
                  loading="lazy"
                />
                <div className="flex flex-col w-full relative bottom-2">
                  <div className="flex flex-row justify-between">
                    <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
                      {comment.displayName}
                    </p>
                    <a className="text-gray-500 text-xl" href="#">
                      <i className="fa-solid fa-trash"></i>
                    </a>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {formatDistanceToNow(comment.createdAt.toDate(), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
              <p className="-mt-4 text-gray-900 ml-2 font-semibold">
                {comment.content}
              </p>
            </div>
          ))}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Add new Comment
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 resize-none w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Leave a comment..."
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          />
          <button
            type="submit"
            className="py-2.5 mt-3 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 "
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};
export default ProjectComments;
