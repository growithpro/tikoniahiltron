import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { db } from "../firebase";
import { Star } from "lucide-react"; // install lucide-react if not already
import ReviewForm from "./ReviewForm";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";

const CourseDetail = () => {
  const auth = getAuth();
  const db = getFirestore();

  const { id } = useParams();
  const [course, setCourse] = useState(null);
  
  const navigate = useNavigate();

  const handleBack = async() => {
    const role =await getUserRole();
    console.log("User role:", role);
    if (role === true) {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  async function getUserRole() {
    const user = auth.currentUser;

    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const role = userData.isAdmin; // or userData.isAdmin, etc.

        return role;
      } else {
        console.log("No such document!");
      }
    } else {
      console.log("No user is logged in.");
    }
  }

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const docRef = doc(db, "courses", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCourse(docSnap.data());
        } else {
          console.error("Course not found");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) return <p className="text-center mt-20">Loading course...</p>;

  return (
    <div className="max-w-5xl mx-auto p-8 mt-10 bg-white shadow-2xl rounded-2xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-indigo-700 mb-2">
          {course.title}
        </h1>
        <p className="text-lg text-gray-600">{course.description}</p>
        <div className="mt-4 flex gap-4 text-sm text-gray-700">
          <span className="px-3 py-1 bg-indigo-100 rounded-full">
            💰 Fee: ₹{course.fee}
          </span>
          <span className="px-3 py-1 bg-indigo-100 rounded-full">
            🕒 Duration: {course.duration}
          </span>
        </div>
      </div>

      <div className="border-t pt-6 mt-6">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-3">
          📚 Modules
        </h2>
        <ul className="list-decimal list-inside space-y-2 text-gray-800">
          {course.modules?.length > 0 ? (
            course.modules.map((mod, i) => <li key={i}>{mod}</li>)
          ) : (
            <li>No modules listed.</li>
          )}
        </ul>
      </div>

      <div className="border-t pt-6 mt-10">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-3">
          🌟 Reviews & Ratings
        </h2>

        <ReviewForm courseId={id} />
        {course.reviews?.length > 0 ? (
          course.reviews.map((rev, i) => (
            <div
              key={i}
              className="bg-gray-50 p-4 rounded-xl shadow-inner mb-4 border-l-4 border-indigo-300"
            >
              <div className="flex justify-between items-center">
                <p className="font-medium text-indigo-800">{rev.name}</p>
                <div className="flex text-yellow-500">
                  {Array.from({ length: rev.rating }, (_, idx) => (
                    <Star key={idx} size={18} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mt-2">{rev.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews yet.</p>
        )}
      </div>
      <button
        onClick={handleBack}
        className="mt-6 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default CourseDetail;
