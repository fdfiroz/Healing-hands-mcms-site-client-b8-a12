import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../layout/DashboardLayout";
import CampDetailsPage from "../pages/CampDetailsPage";
import ContactUs from "../pages/ContactUs";
import AvailableCamps from "../pages/AvailableCamps";
import ManageCamps from "../pages/ManageCamps";
import ManageRegisteredCamps from "../pages/ManageRegisteredCamps";
import Profile from "../pages/Profile";
import RegisteredCamps from "../pages/RegisteredCamps";
import PaymentHistory from "../pages/PaymentHistory";
import FeedbackAndRatings from "../pages/FeedbackAndRatings";
import AcceptedCamps from "../pages/AcceptedCamps";
import AddUpcomingCamp from "../pages/AddUpcomingCamp";
import AddACamp from "../pages/AddACamp";

const routes = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: "*",
          element:<ErrorPage/>,
        },
        {
          index: true,
          element: <Home />,
        },
        {
          path: '/available-camps',
          element: <AvailableCamps />,
        },
        {
          path: '/camp-details/:id',
          element: <CampDetailsPage />,
        },
        {
          path: '/contact-us',
          element: <ContactUs />,
        },
        {
          path: '/dashboard',
          element: <DashboardLayout />,
          children: [
            {
              index: true,
              element: <Profile/>,
            },
            //Organizer Dashboard Routes
            {
              path: "add-a-camp",
              element: <AddACamp/>,
            },
            {
              path: "manage-camps",
              element: <ManageCamps />,
            },
            {
              path: "manage-registered-camps",
              element: <ManageRegisteredCamps />,
            },
            {
              path: "add-upcoming-camp",
              element: <AddUpcomingCamp />,
            },
            //Participant Dashboard Routes
            {
              path: "registered-camps",
              element: <RegisteredCamps/>,
            },
            {
              path: "payment-history",
              element: <PaymentHistory/>,
            },
            {
              path: "feedback-and-ratings",
              element: <FeedbackAndRatings/>,
            },
            //Healthcare Professional Dashboard Routes
            {
              path: "accepted-camps",
              element: <AcceptedCamps/>,
            },

          ],
        },
  
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    
   
  ]);
  
  export default routes;