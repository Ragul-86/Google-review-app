const RatingStars = ({
  rating,
  setRating,
}) => {
  return (
    <div className="flex justify-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setRating(star)}
          className={`text-5xl ${
            rating >= star
              ? "text-yellow-400"
              : "text-gray-300"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default RatingStars;