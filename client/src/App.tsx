import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./Layouts/MainLayout";
import Search from "./components/Search";
import Name from "./components/Name";
import Login from "./components/Login";

import "./App.css";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Search />}></Route>
        <Route path="downloads" element={<Name />} />
        <Route path="login" element={<Login />} />
        <Route path="help" element={<Name />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
