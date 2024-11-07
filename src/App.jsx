import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import "./index.css";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/protectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import Notifications from "./pages/Notifications";
import AllDoctors from "./pages/Admin/AllDoctors";
import Allusers from "./pages/Admin/Allusers";
import Profile from "./pages/doctor/Profile";
import Services from "./pages/Services";
import Appointments from "./pages/Appointments";
import UserAppointment from "./pages/UserAppointment";
import ApointmentAprovel from "./pages/doctor/ApointmentAprovel";
import Chat from "./pages/Chat";
import Video from "./pages/webrtc/Video";
import { SocketProvider } from "./pages/webrtc/context/ScoketProvider";
import Room from "./pages/webrtc/webrtcPages/Room";

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div
            class="spinner-border"
            style={{ color: "#9381FF" }}
            role="status"
          ></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/apply-doctor"
          element={
            <ProtectedRoute>
              <ApplyDoctor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notification"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/doctors"
          element={
            <ProtectedRoute>
              <AllDoctors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/Users"
          element={
            <ProtectedRoute>
              <Allusers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/profile/:userId"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />
        <Route
          path="/boock-appointment/:doctorId"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointment"
          element={
            <ProtectedRoute>
              <UserAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/appointment"
          element={
            <ProtectedRoute>
              <ApointmentAprovel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/video"
          element={
            <ProtectedRoute>
              <SocketProvider>
                <Video />
              </SocketProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/room/:roomId"
          element={
            <ProtectedRoute>
              <SocketProvider>
                <Room />
              </SocketProvider>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
