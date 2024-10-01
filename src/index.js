import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";

import "./styles/style.css";

const route = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={route} />
    </React.StrictMode>
);
