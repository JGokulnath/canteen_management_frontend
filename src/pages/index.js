import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Menu from "./Admin/Menu";
import Products from "./Admin/Products";
import Orders from "./Orders";
import AdminHomepage from "./Admin/AdminHomepage";
const Pages = ({ isAdmin }) => {
  console.log("isAdmin " + isAdmin);
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={isAdmin ? <AdminHomepage /> : <Homepage />}
      />
      {isAdmin ? (
        [
          <Route path="/menu" key={1} element={<Menu />} />,
          <Route path="/products" key={2} element={<Products />} />,
        ]
      ) : (
        <Route path="/orders" element={<Orders />} />
      )}
    </Routes>
  );
};
export default Pages;
