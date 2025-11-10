import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Dashboard from "../modules/Dashboard";
import Posts from "../modules/Posts";
import Albums from "../modules/Albums";
import User from "../modules/User";
import Users from "../modules/Users";
import Login from "../modules/Login";

function App() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          path="/"
          element={isAdmin ? <MainLayout /> : <Navigate to={"/login"} replace />}
        >
          <Route index element={<Dashboard />} />
          <Route path="posts" element={<Posts />} />
          <Route path="albums" element={<Albums />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:userId" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
