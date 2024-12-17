export default function ShowForm({ title, children, show, setShow }) {
  return (
    <>
      <button
        onClick={() => setShow(!show)}
        className="hover:underline hover:underline-offset-4 px-3 transition-all duration-300 ease-linear"
      >
        {title}
      </button>
      {show && children}
    </>
  );
}
