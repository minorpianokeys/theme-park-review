import App from "./App";
import Home from "./components/Home";
import Directory from "./components/Directory";
import RideInfo from "./components/RideInfo";
import AddRide from "./components/AddRide";
import AddReview from "./components/AddReview";
import EditReview from "./components/EditReview";

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
                path: "/reviews/:id/edit",
                element: <EditReview />
            },
        ]
    }
];

export default routes;