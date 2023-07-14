import { useCollection } from "../hooks/useCollection";
import Avatar from "./Avatar";

const OnlineUsers = () => {
  const { error, documents: users } = useCollection("users");
  return (
    <div className="md:block hidden z-40 w-[300px] h-screen p-4 transition-transform bg-white">
      <h5
        id="drawer-navigation-label"
        className="text-base font-semibold text-gray-500 uppercase"
      >
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
export default OnlineUsers;
