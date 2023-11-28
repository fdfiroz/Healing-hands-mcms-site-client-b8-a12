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
import PrivateRoute from "./PrivateRoute";
import OrganizersRoute from "./OrganizersRoute";
import ParticipantsRoute from "./ParticipantsRoute";
import HealthcareProfessionalsRoute from "./HealthcareProfessionalsRoute";

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
          element: <PrivateRoute><CampDetailsPage /></PrivateRoute> ,
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
              element: <PrivateRoute><Profile/></PrivateRoute>,
            },
            //Organizer Dashboard Routes
            {
              path: "add-a-camp",
              element: <PrivateRoute>
                  <OrganizersRoute>
                  <AddACamp/>
                  </OrganizersRoute>
                </PrivateRoute>,
            },
            {
              path: "manage-camps",
              element: <PrivateRoute>
                <OrganizersRoute>
                <ManageCamps />
                </OrganizersRoute>
                </PrivateRoute>,
            },
            {
              path: "manage-registered-camps",
              element: <PrivateRoute>
                <OrganizersRoute>
                <ManageRegisteredCamps />
                </OrganizersRoute>
                </PrivateRoute>,
            },
            {
              path: "add-upcoming-camp",
              element: <PrivateRoute>
                <OrganizersRoute>

                <AddUpcomingCamp />
                </OrganizersRoute>
                </PrivateRoute>,
            },
            //Participant Dashboard Routes
            {
              path: "registered-camps",
              element: <PrivateRoute>
                <ParticipantsRoute>

                <RegisteredCamps />
                </ParticipantsRoute>
                </PrivateRoute>,
            },
            {
              path: "payment-history",
              element: <PrivateRoute>
                <ParticipantsRoute>

                <PaymentHistory />
                </ParticipantsRoute>
                </PrivateRoute>,
            },
            {
              path: "feedback-and-ratings",
              element: <PrivateRoute>
                <ParticipantsRoute>

                <FeedbackAndRatings />
                </ParticipantsRoute>
                </PrivateRoute>,
            },
            //Healthcare Professional Dashboard Routes
            {
              path: "accepted-camps",
              element: <PrivateRoute>
                <HealthcareProfessionalsRoute>

                <AcceptedCamps />
                </HealthcareProfessionalsRoute>
                </PrivateRoute>,
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