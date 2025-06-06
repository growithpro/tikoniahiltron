import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { FaPlus, FaUsers, FaBook, FaSignOutAlt } from "react-icons/fa";
import Header from "../components/Header";
import { getAuth, signOut } from "firebase/auth";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const auth = getAuth();
  const { currentUser } = useAuth();
  const [availableCourses, setAvailableCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const navigate = useNavigate();
  // Fetch public courses
  useEffect(() => {
    const fetchCourses = async () => {
      const courseSnapshot = await getDocs(collection(db, "courses"));
      const courseList = courseSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAvailableCourses(courseList);
    };
    fetchCourses();
  }, []);

  // Listen to enrolled courses for current user
  useEffect(() => {
    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);
    const unsubscribe = onSnapshot(userRef, (snap) => {
      if (snap.exists()) {
        setEnrolledIds(snap.data().enrolledCourses || []);
      }
    });

    return unsubscribe;
  }, [currentUser]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // Add course to user's enrolled list
  const handleEnroll = async (courseId) => {
    const userRef = doc(db, "users", currentUser.uid);
    const snap = await getDoc(userRef);
    const existing = snap.data().enrolledCourses || [];

    if (!existing.includes(courseId)) {
      await updateDoc(userRef, {
        enrolledCourses: [...existing, courseId],
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2"
        >
          <FaSignOutAlt /> Logout
        </button>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Available Courses
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {availableCourses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-50 p-4 rounded-lg border shadow-sm"
            >
              <h2 className="text-lg font-semibold text-gray-700">
                {course.title}
              </h2>
              <p className="text-sm text-gray-600">{course.description}</p>
              <button
                className={`mt-2 px-4 py-2 text-white rounded ${
                  enrolledIds.includes(course.id)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
                onClick={() => handleEnroll(course.id)}
                disabled={enrolledIds.includes(course.id)}
              >
                {enrolledIds.includes(course.id) ? "Enrolled" : "Add Course"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
