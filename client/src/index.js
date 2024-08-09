// import React from "react";
// import App from "./App";
// import "./index.css";
// import { createRoot } from "react-dom/client";

// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(<App />);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import routes from './routes.js';

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router}/>);
