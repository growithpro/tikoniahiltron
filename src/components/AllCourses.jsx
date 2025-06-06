import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 py-15 px-6 md:px-12">
      <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-12">
        🚀 Explore Our Premium Courses
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading courses...</p>
      ) : courses.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No courses available yet.</p>
      ) : (
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              {/* Card Header with Gradient */}
              <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 text-white">
                <h2 className="text-2xl font-bold">{course.title}</h2>
                <p className="text-sm opacity-90 mt-1">{course.category || "Web Development"}</p>
              </div>

              {/* Image if exists */}
              {course.image && (
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-6 space-y-4">
                <p className="text-gray-700 text-base">{course.description}</p>

                <div className="flex justify-between text-sm text-gray-600 font-medium">
                  <span>💰 Fee: ₹{course.fee}</span>
                  <span>⏱ {course.duration}</span>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition"
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    View Details
                  </button>
                  <button
                    className="border border-indigo-600 text-indigo-600 px-5 py-2 rounded-xl hover:bg-indigo-100 transition"
                    onClick={() => navigate(`/enroll/${course.id}`)}
                  >
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCourses;
