const options = [
  "Excellent Service",
  "Friendly Staff",
  "Quick Response",
  "Clean Environment",
  "Good Quality",
  "Highly Recommended",
];

function PositiveOptions({
  feedback,
  setFeedback,
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((item) => (
        <button
          key={item}
          onClick={() =>
            setFeedback(item)
          }
          className={`border p-2 rounded-lg ${
            feedback === item
              ? "bg-green-500 text-white"
              : ""
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default PositiveOptions;