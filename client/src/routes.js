import App from "./App";
import Home from "./components/Home";
import Directory from "./components/Directory";
import RideInfo from "./components/RideInfo";
import AddRide from "./components/AddRide";
import AddReview from "./components/AddReview";
import EditReview from "./components/EditReview";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AllRides from "./components/AllRides";
import AddPark from "./components/AddPark";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/park/new",
                element: <AddPark />
            },
            {
                path: "/rides",
                element: <AllRides />
            },
            {
                path: "/parks/:id",
                element: <Directory />
            },
            {
                path: "/rides/:id",
                element: <RideInfo />
            },
            {
                path: "/parks/:id/new",
                element: <AddRide />
            },
            {
                path: "/rides/:id/reviews/new",
                element: <AddReview />
            },
            {
                path: "/rides/:rideId/reviews/:id/edit",
                element: <EditReview />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/login",
                element: <Login />
            }
        ]
    }
];

export default routes;