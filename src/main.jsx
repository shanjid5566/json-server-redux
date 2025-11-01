import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import Users from "./pages/Users.jsx";
import App from "./App.jsx";
import AddUser from "./pages/AddUser.jsx";
import NavBar from "./components/Navbar.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/users" element={<Users />} />
        <Route path="/add-user" element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
