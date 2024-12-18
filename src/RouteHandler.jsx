import { React } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { TopMenu } from "./components/TopMenu";
import { Aboutus } from "./pages/Aboutus";
import { Sponsors } from "./pages/Sponsors";
import { Sports } from "./pages/Sports";
import { National } from "./pages/National";
import { SignIn } from "./auth/SignIn";
import { SignUp } from "./auth/SignUp";
import { useAuth } from "./auth/AuthContext";
import ExcelUpload from "./pages/ExcelUpload";
import { EditStats } from "./pages/EditStats";
import { Privacy } from "./pages/Privacy";
import { PRHSAA } from "./pages/PRHSAA";

export const RouteHandler = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TopMenu />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        {/* <Route path="/" element={currentUser ? <Navigate replace to="/sports" /> : <Navigate replace to="/signin" />} />
        <Route path="/sports" element={currentUser ? <Sports /> : <Navigate replace to="/signin" />} /> */}
        <Route path="/" element={<Navigate replace to="/aboutus" />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/national_championship" element={<National />} />
        <Route path="/aboutus" element={<Aboutus />} />
        {/* <Route path="/sponsors" element={<Sponsors />} /> */}
        <Route path="/upload" element={<ExcelUpload />} />
        <Route path="/edit_stats" element={<EditStats />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </>
  );
};
