import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "../components/Navbar";

import { io } from "socket.io-client";
import GlobalContext from "../context/globalContext/GlobalContext";

const MainLayout = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("No Global context");

  const { downloading, setDownloading } = context;

  const socket = io("http://localhost:5000", {
    transports: ["websocket", "polling"],
  });

  useEffect(() => {
    socket.on("complete", (data) => {
      console.log("download complete", data);
      let newDownload = undefined;
      setDownloading(
        downloading.filter((item) => {
          if (item.title !== data.title && item.coverPath !== data.coverPath)
            return item;
          newDownload = item;
        })
      );
      if (newDownload) {
        newDownload.complete = true;
        const downloads = localStorage.getItem("downloads");
        if (downloads) {
          localStorage.setItem(
            "downloads",
            JSON.stringify([...JSON.parse(downloads), newDownload])
          );
        } else localStorage.setItem("downloads", JSON.stringify([newDownload]));
      }
    });

    return () => {
      socket.off("complete");
    };
  }, [socket, downloading, setDownloading]);

  return (
    <div className="min-h-[100vh] grid grid-cols-[1.3fr_8fr]">
      <Navbar />
      <div>
        <Outlet />
        <ToastContainer
          className={"overflow-clip absolute"}
          position="top-right"
          theme="dark"
          pauseOnHover
          pauseOnFocusLoss
        />
      </div>
    </div>
  );
};

export default MainLayout;
