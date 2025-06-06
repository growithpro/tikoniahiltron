import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import Header from "../../components/Header";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  addDoc,
  Timestamp,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import { FaPlus, FaUsers, FaBook, FaSignOutAlt } from "react-icons/fa";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [courseCount, setCourseCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [courses, setCourses] = useState([]);

  const [editingCourse, setEditingCourse] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    fee: "",
    duration: "",
  });

  const handleEdit = (course) => {
    setEditingCourse(course);
    setForm(course); // Load data into form
    setShowForm(true);
  };

  const handleDeleteCourse = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "courses", id));
      toast.success("Course deleted!");
      fetchCourses(); // Refresh list
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Failed to delete course.");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const fetchCourses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "courses"));
      const courseList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCourses(courseList);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        // update
        const docRef = doc(db, "courses", editingCourse.id);
        await updateDoc(docRef, {
          ...form,
          fee: parseFloat(form.fee),
          duration: form.duration,
        });
        toast.success("Course updated!");
        setEditingCourse(null);
      } else {
        // create
        await addDoc(collection(db, "courses"), {
          ...form,
          fee: parseFloat(form.fee),
          createdAt: Timestamp.now(),
        });
        toast.success("Course added!");
      }

      setForm({ title: "", description: "", fee: "", duration: "" });
      setShowForm(false);
      setCourseCount((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add course.");
    }
    fetchCourses();
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        console.log("User Data:", auth.currentUser);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }

      const courseSnap = await getDocs(collection(db, "courses"));
      setCourseCount(courseSnap.size);

      const userSnap = await getDocs(collection(db, "users"));
      setUserCount(userSnap.size);
    };

    fetchData();
    fetchCourses();
  }, [auth.currentUser]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {/* <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-blue-600 mb-6">Admin Panel</h2>
          {userData && (
            <div className="mb-4 text-sm text-gray-600">
              <p>
                Hello, <span className="font-medium">{userData.name}</span>
              </p>
              <p className="text-xs text-green-600">Admin Access</p>
            </div>
          )}
          <nav className="space-y-2">
            <Link
              to="/admin/dashboard"
              className="block px-4 py-2 hover:bg-blue-100 rounded"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/add-course"
              className="block px-4 py-2 hover:bg-blue-100 rounded"
            >
              Add Course
            </Link>
            <Link
              to="/admin/courses"
              className="block px-4 py-2 hover:bg-blue-100 rounded"
            >
              View Courses
            </Link>
            <Link
              to="/admin/users"
              className="block px-4 py-2 hover:bg-blue-100 rounded"
            >
              View Users
            </Link>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside> */}

      {/* Main Content */}

      <main className="flex-1 p-10">
        <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  onClick={() => navigate("/")}
                >
                  Back To Home
                </button>
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {userData && (
          <div className="mb-4 text-sm text-gray-600">
            <p>
              Hello, <span className="font-medium">{userData.displayName}</span>
            </p>
            <p className="text-xs text-green-600">Admin Access</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        )}
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow rounded p-6 text-center">
            <FaBook className="text-3xl text-blue-500 mx-auto mb-2" />
            <p className="text-lg font-semibold">{courseCount}</p>
            <p className="text-sm text-gray-500">Courses</p>
          </div>
          <div className="bg-white shadow rounded p-6 text-center">
            <FaUsers className="text-3xl text-green-500 mx-auto mb-2" />
            <p className="text-lg font-semibold">{userCount}</p>
            <p className="text-sm text-gray-500">Users</p>
          </div>
        </div>

        {/* Quick Actions */}
        {/* <div className="grid md:grid-cols-3 gap-6">
          <Link
            to="/admin/add-course"
            className="p-6 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-3 hover:opacity-90"
          >
            <FaPlus /> Add Course
          </Link>
          <Link
            to="/admin/courses"
            className="p-6 bg-green-600 text-white rounded-lg flex items-center justify-center gap-3 hover:opacity-90"
          >
            <FaBook /> View Courses
          </Link>
          <Link
            to="/admin/users"
            className="p-6 bg-yellow-500 text-white rounded-lg flex items-center justify-center gap-3 hover:opacity-90"
          >
            <FaUsers /> View Users
          </Link>
        </div> */}

        <ToastContainer />

        {/* Toggle Button */}
        <div className="mt-12 mb-4">
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {showForm ? "Hide Add Course Form" : "+ Add Course"}
          </button>
        </div>

        {/* Course Form */}
        {showForm && (
          <form
            onSubmit={handleAddCourse}
            className="bg-white p-6 shadow rounded space-y-4 max-w-xl"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleFormChange}
                className="w-full mt-1 border border-gray-300 px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleFormChange}
                className="w-full mt-1 border border-gray-300 px-3 py-2 rounded"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fee (₹)
                </label>
                <input
                  name="fee"
                  type="number"
                  value={form.fee}
                  onChange={handleFormChange}
                  className="w-full mt-1 border border-gray-300 px-3 py-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Duration (e.g. 4 weeks)
                </label>
                <input
                  name="duration"
                  value={form.duration}
                  onChange={handleFormChange}
                  className="w-full mt-1 border border-gray-300 px-3 py-2 rounded"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Submit
            </button>
          </form>
        )}
        <h2 className="text-xl font-bold mt-10 mb-4">Existing Courses</h2>

        {courses.length === 0 ? (
          <p className="text-gray-500">No courses available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white p-4 shadow rounded relative"
              >
                <h3 className="text-lg font-semibold text-blue-700">
                  {course.title}
                </h3>
                <p className="text-gray-600 mt-1">{course.description}</p>
                <p className="text-sm mt-2">
                  <strong>Fee:</strong> ₹{course.fee}
                </p>
                <p className="text-sm">
                  <strong>Duration:</strong> {course.duration}
                </p>

                {/* Buttons */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleEdit(course)} // coming in next step
                    className="text-yellow-600 border border-yellow-600 px-3 py-1 rounded hover:bg-yellow-50 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
