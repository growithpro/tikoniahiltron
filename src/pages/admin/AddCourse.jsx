import React, { useState } from "react";
import { db } from "../../firebase.js"; // adjust the path
import { collection, addDoc, Timestamp } from "firebase/firestore";

const AddCourse = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    fee: "",
    duration: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "courses"), {
        ...form,
        fee: Number(form.fee),
        createdAt: Timestamp.now(),
      });
      alert("Course added successfully!");
      setForm({ title: "", description: "", fee: "", duration: "" });
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Error adding course.");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Course Title"
          required
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Course Description"
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          name="fee"
          type="number"
          value={form.fee}
          onChange={handleChange}
          placeholder="Fee (e.g. 499)"
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="Duration (e.g. 4 weeks)"
          required
          className="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add Course"}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
