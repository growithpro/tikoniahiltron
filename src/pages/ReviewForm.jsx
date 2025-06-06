import React, { useState } from "react";
import { updateDoc, arrayUnion, doc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext"; // assume you have a hook
import { db } from "../firebase";

const ReviewForm = ({ courseId }) => {
  const { currentUser } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setLoading(true);
    const review = {
      name: currentUser.displayName || "Anonymous",
      uid: currentUser.uid,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };

    try {
      const courseRef = doc(db, "courses", courseId);
      await updateDoc(courseRef, {
        reviews: arrayUnion(review),
      });

      setComment("");
      setRating(5);
      alert("Review submitted!");
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Error submitting review.");
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) return null;

  return (
    <form onSubmit={handleReviewSubmit} className="mt-6 bg-gray-50 p-4 rounded-xl shadow">
      <h3 className="font-semibold text-indigo-600 mb-2">Leave a Review</h3>

      <label className="block mb-2 text-sm text-gray-600">Rating</label>
      <select
        value={rating}
        onChange={(e) => setRating(parseInt(e.target.value))}
        className="mb-4 border p-2 rounded w-full"
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>{r} Star{r !== 1 ? "s" : ""}</option>
        ))}
      </select>

      <label className="block mb-2 text-sm text-gray-600">Comment</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        className="w-full p-2 border rounded"
        placeholder="Write your feedback..."
        required
      ></textarea>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
