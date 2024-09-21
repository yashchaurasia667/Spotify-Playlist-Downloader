import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./Layouts/MainLayout";
import Search from "./components/Search";
import Downloads from "./components/Downloads";
import Login from "./components/Login";
import Help from "./components/Help";

import "./App.css";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Search />}></Route>
        <Route path="downloads" element={<Downloads />} />
        <Route path="login" element={<Login />} />
        <Route path="help" element={<Help />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
