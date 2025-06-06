import React, { useEffect, useState } from "react";
import { db } from "../../firebase"; // adjust path
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const querySnapshot = await getDocs(collection(db, "courses"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCourses(data);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirm) return;
    try {
      await deleteDoc(doc(db, "courses", id));
      toast.success("Course deleted");
      fetchCourses(); // Refresh list
    } catch (err) {
      console.error(err);
      toast.error("Error deleting course");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="p-6">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-6">Manage Courses</h2>
      {courses.length === 0 ? (
        <p className="text-gray-600">No courses found.</p>
      ) : (
        <div className="grid gap-4">
          {courses.map((course) => (
            <div key={course.id} className="p-4 bg-white shadow rounded">
              <h3 className="text-lg font-bold text-blue-700">
                {course.title}
              </h3>
              <p>{course.description}</p>
              <div className="text-sm text-gray-600 my-2">
                Fee: ₹{course.fee} | Duration: {course.duration}
              </div>
              <div className="flex gap-2 mt-2">
                {/* Edit Button Placeholder */}
                <button className="bg-yellow-400 px-3 py-1 text-sm rounded hover:bg-yellow-500 text-white">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="bg-red-500 px-3 py-1 text-sm rounded hover:bg-red-600 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCourses;
