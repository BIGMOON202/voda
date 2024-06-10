import React, { useState } from "react";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate("/signup"); // Navigate to the signup page
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in");
      navigate("/sports");
    } catch (error) {
      console.error("Error signing in: ", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-center">
        <h1 className="text-lg font-bold mb-4">Sign In</h1>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={signIn}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign In
        </button>
      </div>

      <div className="flex justify-center">
        <p
          onClick={goToSignUp}
          className=" underline mt-[20px] hover:cursor-pointer"
        >
          Create an account now
        </p>
      </div>
    </div>
  );
};
