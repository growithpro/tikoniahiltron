import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"; // Assuming you have a Header component
const ITCoursesPage = () => {
  const [courses, setCourses] = useState([]);
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
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 py-18 px-6 md:px-12">
        <h1 className= "text-3xl font-bold text-center text-indigo-700 mb-8 text-primary">
          Explore Our Courses
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white shadow-xl rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-indigo-800">
                  {course.title}
                </h2>
                <p className="text-gray-600 mt-2">{course.description}</p>
                <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
                  <span>💰 Fee: ₹{course.fee}</span>
                  <span>🕒 {course.duration}</span>
                </div>
                <div className="mt-6 flex justify-between">
                  <button
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    View Details
                  </button>
                  <button
                    className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded hover:bg-indigo-50"
                    onClick={() => navigate(`/enroll/${course.id}`)}
                  >
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {courses.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No courses available yet.
          </p>
        )}
      </div>
    </>
  );
};

export default ITCoursesPage;
