export default function DetailContainer({ title, children }) {
  return (
    <div className="">
      <h4 className="text-xl font-bold">{title}</h4>
      {children}
    </div>
  );
}
