import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import EventInfo from "./pages/eventInfo/EventInfo";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate ,
} from "react-router-dom";
import Password from "./pages/password/Password";
import EditAccount from "./pages/editAccount/EditAccount";
import EventsHome from "./pages/eventsHome/EventsHome";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element =
          {user ? <Home/> : <Login />}
        />
        <Route path="/login" element =
          {user ? <Navigate  to="/" /> : <Login />}
         />
        <Route path="/register" element =
          {user ? <Navigate  to="/" /> : <Register />}
       />
        <Route path="/profile/:username"element =
          {<Profile />}
        />
        <Route path="/events" element =
          {user ? <EventsHome/> : <Login />}
        />
        <Route path="/event/:eventId" element =
          {user ? <EventInfo/> : <Login />}
        />
        <Route path="/editAccount" element={user ? <EditAccount/> : <Login />} />
        <Route path="/forgotPassword" element={<Password/>} />
      </Routes>

    </Router>
  );
}

export default App;
