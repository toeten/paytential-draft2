import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header>
      <a id="logo" href="/">Paytential</a>
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          {currentUser ? (
            <>
              <li><NavLink to="/about">About Us</NavLink></li>
              <li><NavLink to={`/users/${currentUser.id}`}>Profile</NavLink></li>
            </>
          ) : (
            <>
              <li><NavLink to="/about">About Us</NavLink></li>
              <li><NavLink to="/login">Login</NavLink></li>
              <li><NavLink to="/sign-up">Sign Up</NavLink></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
