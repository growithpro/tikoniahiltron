import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/ITCoursesPage";

import Login from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import ITCoursesPage from "./pages/ITCoursesPage";
import CourseDetail from "./pages/CourseDetail";
import EnrollPage from "./pages/EnrollPage";
import TeachersPage from "./pages/TeachersPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddCourse from "./pages/admin/AddCourse";
import AdminCourses from "./pages/admin/AdminCourses";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/courses" element={<ITCoursesPage />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/enroll/:id" element={<EnrollPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/add-course" element={<AddCourse />} />
            <Route path="/admin/courses" element={<AdminCourses />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
