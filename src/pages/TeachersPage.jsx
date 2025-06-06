import React from "react";
import Header from "../components/Header";

const teachers = [
  {
    id: 1,
    name: "Alice Johnson",
    title: "Full Stack Developer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Alice has 10+ years in web development with expertise in React, Node.js, and DevOps.",
  },
  {
    id: 2,
    name: "David Kim",
    title: "Data Scientist",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "David is a data expert specializing in machine learning, AI, and Python programming.",
  },
  {
    id: 3,
    name: "Sara Lee",
    title: "Cybersecurity Analyst",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Sara teaches ethical hacking, penetration testing, and cloud security essentials.",
  },
  {
    id: 4,
    name: "John Smith",
    title: "AWS Certified Instructor",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
    bio: "John helps students master cloud infrastructure and prepares them for AWS certifications.",
  },
];

const TeachersPage = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 p-8 py-20">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Meet Our Instructors
        </h1>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-center">
                {teacher.name}
              </h2>
              <p className="text-center text-blue-600 mb-2">{teacher.title}</p>
              <p className="text-gray-600 text-sm text-center">{teacher.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TeachersPage;
