// import { createRoot } from 'react-dom/client'
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { NotificationSocketProvider } from "./context/NotificationSocketContext.jsx";
import "./index.css";
import { router } from "./router/routes.jsx";
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NotificationSocketProvider>
      <RouterProvider router={router} />
    </NotificationSocketProvider>
  </React.StrictMode>,
);
