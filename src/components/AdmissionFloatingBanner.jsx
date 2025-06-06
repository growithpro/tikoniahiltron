import React from "react";

const AdmissionFloatingBanner = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-lg rounded-full px-6 py-3 flex items-center gap-4 animate-bounce">
        <div className="text-sm md:text-base font-semibold">
          🎓 Admission Open – Enroll Now!
        </div>
        <a
          href="tel:+919876543210"
          className="bg-white text-indigo-700 font-bold px-4 py-2 rounded-full text-sm hover:bg-indigo-100 transition"
        >
          Call Now
        </a>
      </div>
    </div>
  );
};

export default AdmissionFloatingBanner;
