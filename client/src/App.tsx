import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./Layouts/MainLayout";
import Playlist from "./components/Playlist";
import Name from "./components/Name";
import Reset from "./components/Reset";

import "./App.css";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Playlist />}></Route>
        <Route path="reset" element={<Reset />} />
        <Route path="name" element={<Name />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
