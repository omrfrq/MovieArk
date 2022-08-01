import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>MoviesArk</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/AboutPage">About</Link>
          </li>
          <li>
            <Link to="/AdvanceSearch">Advanced Search</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default MainNavigation;
