// LoginPage.js
import React from "react";
import { useParams } from "react-router-dom";

const LoginPage = () => {
  const { username } = useParams();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-2xl shadow-xl w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Welcome, {username}!
        </h2>
        <form className="flex flex-col space-y-3">
          <input
            type="password"
            placeholder="Enter your password"
            className="border rounded-lg p-2"
          />
          <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
