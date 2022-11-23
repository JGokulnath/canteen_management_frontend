import "./App.css";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./layout";
import VerifyAccount from "./pages/VerifyAccount";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:userId/verify/:token" element={<VerifyAccount />} />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
