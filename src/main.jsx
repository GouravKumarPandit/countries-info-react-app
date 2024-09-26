import { createRoot } from 'react-dom/client'
import Home from './Home.jsx'
import './index.css'
import AllCountries from './components/AllCountries.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Country from './components/Country.jsx'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<Home />} >
			<Route path='/' element={<AllCountries />} />
			<Route path='/:country' element={<Country />} />
		</Route>
	)
);

createRoot(document.getElementById('root')).render(
	<>
		<RouterProvider router={router} />
	</>
)
