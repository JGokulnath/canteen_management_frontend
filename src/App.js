import "./App.css";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./layout";
import Homepage from "./pages/Homepage";
import Orders from "./pages/Orders";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Homepage />}></Route>
          <Route path="orders" element={<Orders />}></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
