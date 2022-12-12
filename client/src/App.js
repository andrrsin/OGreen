import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import EventInfo from "./pages/eventInfo/EventInfo";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Password from "./pages/password/Password";
import EditAccount from "./pages/editAccount/EditAccount";
import EventsHome from "./pages/eventsHome/EventsHome";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const { currentUser } = useContext(AuthContext);



  const queryClient = new QueryClient();
  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>

        <Topbar />
        <div style={{ display: "flex" }}>
          <Sidebar />
          <Outlet />

        </div>

      </QueryClientProvider>
    )
  };
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:username",
          element: <Profile />,
        },
        {
          path: "/events"
          , element: <EventsHome />
        },
        {
          path: "/event/:eventId",
          element: <EventInfo />
        },
        
      ],
    },
    {
      path: "/login",
      element: <Login />,
    }, {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/forgotPassword",
      element: <Password />,
    },
    {
      path: "/editAccount",
      element: <EditAccount />,
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
