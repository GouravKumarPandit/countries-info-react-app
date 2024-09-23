import React from 'react'
import { createRoot } from 'react-dom/client'
import Home from './Home.jsx'
import './index.css'
import AllCountries from './components/AllCountries.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Country from './components/Country.jsx'

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		children: [
			{
				path: "",
				element: <AllCountries />
			},
			{
				path: "/:country",
				element: <Country />
			}
		]
	},
]);

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
