import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "Full Stack Web Development",
    description:
      "Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB to build complete web applications.",
    image:
      "https://images.unsplash.com/photo-1581093588401-6c80fa3f1e33?auto=format&fit=crop&w=800&q=80",
    details:
      "This course takes you from zero to hero in web development. You'll build real-world applications, manage back-end servers, and deploy your projects using modern DevOps practices.",
  },
  {
    id: 2,
    title: "Data Science & Machine Learning",
    description:
      "Master Python, data analysis, visualization, and ML with real-world datasets and projects.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    details:
      "Explore Python libraries such as Pandas, Matplotlib, and Scikit-learn. Work on case studies and understand supervised and unsupervised learning algorithms.",
  },
  {
    id: 3,
    title: "Cybersecurity Fundamentals",
    description:
      "Understand network security, ethical hacking, risk management, and cybersecurity tools.",
    image:
      "https://images.unsplash.com/photo-1620115115404-4f1d33f6a1f4?auto=format&fit=crop&w=800&q=80",
    details:
      "Gain practical skills in identifying vulnerabilities, penetration testing, and securing networks using real-life scenarios.",
  },
  {
    id: 4,
    title: "Cloud Computing with AWS",
    description:
      "Learn cloud concepts, AWS services, serverless computing, and deploy cloud-based apps.",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e8eab6c1688?auto=format&fit=crop&w=800&q=80",
    details:
      "Hands-on labs for launching EC2, working with S3 buckets, Lambda functions, and configuring VPCs. Ideal for preparing AWS certifications.",
  },
  {
    id: 5,
    title: "Mobile App Development with React Native",
    description:
      "Build cross-platform mobile apps using React Native, integrating APIs and native features.",
    image:
      "https://images.unsplash.com/photo-1593642532973-d31b2c4d1f4b?auto=format&fit=crop&w=800&q=80",
    details:
      "Learn to create responsive mobile applications for both iOS and Android platforms, utilizing the power of React Native.",
  },
  {
    id: 6,
    title: "DevOps Essentials",
    description:
      "Understand CI/CD pipelines, containerization with Docker, and orchestration with Kubernetes.",
    image:
      "https://images.unsplash.com/photo-1581093588401-6c80fa3f1e33?auto=format&fit=crop&w=800&q=80",
    details:
      "This course covers the tools and practices that enable teams to deliver software faster and more reliably.",
  },
  {
    id: 7,
    title: "UI/UX Design Principles",
    description:
      "Learn design thinking, user research, wireframing, and prototyping to create user-friendly interfaces.",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e8eab6c1688?auto=format&fit=crop&w=800&q=80",
    details:
      "Focus on creating intuitive and engaging user experiences through practical design projects.",
  },
  {
    id: 8,
    title: "Blockchain Development",
    description:
      "Explore blockchain technology, smart contracts, and decentralized applications (dApps).",
    image:
      "https://images.unsplash.com/photo-1581093588401-6c80fa3f1e33?auto=format&fit=crop&w=800&q=80",
    details:
      "Learn to build secure and scalable blockchain solutions using Ethereum and Solidity.",
  },
  {
    id: 9,
    title: "Artificial Intelligence with Python",
    description:
      "Dive into AI concepts, neural networks, and deep learning using Python libraries.",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e8eab6c1688?auto=format&fit=crop&w=800&q=80",
    details:
      "This course provides a comprehensive introduction to AI, covering both theoretical concepts and practical applications.",
  },
  {
    id: 10,
    title: "Game Development with Unity",
    description:
      "Learn to create 2D and 3D games using Unity, C#, and game design principles.",
    image:
      "https://images.unsplash.com/photo-1581093588401-6c80fa3f1e33?auto=format&fit=crop&w=800&q=80",
    details:
      "This course covers the fundamentals of game development, including physics, animations, and user interfaces.",
  },
  {
    id: 11,
    title: "Internet of Things (IoT) Development",
    description:
      "Understand IoT architecture, sensors, and how to build connected devices.",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e8eab6c1688?auto=format&fit=crop&w=800&q=80",
    details:
      "Learn to create IoT solutions that collect and analyze data from the physical world.",
  },
  {
    id: 12,
    title: "Software Testing and Quality Assurance",
    description:
      "Master testing methodologies, automation tools, and best practices for software quality.",
    image:
      "https://images.unsplash.com/photo-1581093588401-6c80fa3f1e33?auto=format&fit=crop&w=800&q=80",
    details:
      "This course equips you with the skills to ensure software reliability and performance through effective testing strategies.",
  },
];

const EnrollPage = () => {
  const { id } = useParams();
  const course = courses.find((c) => c.id.toString() === id);

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Normally you'd send form data to backend here
  };

  if (!course) {
    return (
      <div className="p-8 text-center text-red-600">
        Course not found.{" "}
        <Link to="/courses" className="underline text-blue-600">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded-xl shadow-md mt-6">
      <Link
        to={`/courses/${id}`}
        className="text-blue-600 underline mb-4 inline-block"
      >
        ← Back to Course
      </Link>

      <h1 className="text-2xl font-bold mb-4">Enroll in: {course.title}</h1>

      {submitted ? (
        <div className="text-green-700 text-lg font-semibold">
          Thank you, {form.name}! You’ve been enrolled in{" "}
          <strong>{course.title}</strong>.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit Enrollment
          </button>
        </form>
      )}
    </div>
  );
};

export default EnrollPage;
