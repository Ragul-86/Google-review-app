import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import RatingStars from "../components/RatingStars";
import PositiveOptions from "../components/PositiveOptions";
import NegativeForm from "../components/NegativeForm";

function ReviewPage() {
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState("success");

  const googleReviewUrl =
    "https://g.page/r/CRG4aQVQU_ySEAE/review";

  const handleSubmit = async () => {
    try {
      setMessage("");

      if (!rating) {
        setMessageType("error");
        setMessage("Please select a rating");
        return;
      }

      if (rating >= 4 && !feedback) {
        setMessageType("error");
        setMessage(
          "Please select a review option"
        );
        return;
      }

      if (rating <= 3 && !feedback.trim()) {
        setMessageType("error");
        setMessage(
          "Please enter your feedback"
        );
        return;
      }

      setLoading(true);

      // Save Review
      await axios.post(
        "https://google-review-app-wi5e.onrender.com/api/reviews",
        {
          rating,
          feedback,
          customerName: name,
          customerEmail: email,
        }
      );

      // Positive Reviews
      if (rating >= 4) {
        try {
          const aiResponse =
            await axios.post(
              "https://google-review-app-wi5e.onrender.com/api/ai/generate",
              {
                feedback,
              }
            );

          const aiReview =
            aiResponse.data.review;

          await navigator.clipboard.writeText(
            aiReview
          );

          setMessageType("success");
          setMessage(
            "Review copied successfully. Paste it into Google Review."
          );

        } catch (error) {
          console.log(error);

          await navigator.clipboard.writeText(
            feedback
          );

          setMessageType("success");
          setMessage(
            "Review copied successfully."
          );
        }

        setTimeout(() => {
          window.open(
            googleReviewUrl,
            "_blank"
          );
        }, 1500);

      } else {
        navigate("/thank-you");
      }

    } catch (error) {
      console.log(error);

      setMessageType("error");

      setMessage(
        error?.response?.data?.message ||
          "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-center text-3xl font-bold mb-6">
          How was your experience?
        </h2>

        <RatingStars
          rating={rating}
          setRating={setRating}
        />

        {/* Positive Reviews */}
        {rating >= 4 && (
          <div className="mt-6">

            <h3 className="font-semibold text-lg mb-4">
              What did you like?
            </h3>

            <PositiveOptions
              feedback={feedback}
              setFeedback={setFeedback}
            />

          </div>
        )}

        {/* Negative Reviews */}
        {rating > 0 && rating <= 3 && (
          <div className="mt-6">

            <h3 className="font-semibold text-lg mb-2">
              Tell us what went wrong
            </h3>

            <p className="text-gray-500 text-sm mb-4">
              Your feedback stays private.
            </p>

            <NegativeForm
              feedback={feedback}
              setFeedback={setFeedback}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
            />

          </div>
        )}

        {/* Message Box */}
        {message && (
          <div
            className={`mt-4 p-3 rounded-lg text-center font-medium ${
              messageType === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {message}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 bg-indigo-950 hover:bg-indigo-900 text-white py-3 rounded-lg text-lg font-semibold disabled:opacity-50"
        >
          {loading
            ? "Please Wait..."
            : "Submit"}
        </button>

      </div>
    </div>
  );
}

export default ReviewPage;


