import Avatar from "../components/Avatar";
import { useCollection } from "../hooks/useCollection";

const Users = () => {
  const { error, documents: users } = useCollection("users");
  return (
    <div className="z-40 w-full h-screen p-4 transition-transform bg-white dark:bg-gray-800">
      <h5 className="text-lg font-semibold text-gray-500 uppercase">
        All Users
      </h5>
      <div className="py-4">
        <ul className="space-y-2 font-medium">
          {error && <div className="error">{error}</div>}
          {users &&
            users.map((user) => (
              <li className="flex relative" key={user.id}>
                <Avatar photo={user.photoURL} />
                {user.online && (
                  <div className="absolute w-4 h-4 text-xs font-bold bg-green-500 border-2 border-white rounded-full -left-2 -top-1"></div>
                )}
                <span className="ml-3 items-center flex">
                  {user.displayName}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
export default Users;
