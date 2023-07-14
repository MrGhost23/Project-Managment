const Avatar = ({ photo }) => {
  return (
    <div>
      <img src={photo} className="w-10 h-10 rounded-full" />
    </div>
  );
};
export default Avatar;
