import { NavLink } from "react-router-dom";
import "./Menu.css";

export function Menu() {
  return (
    <nav className="Navigation">
      <ul>
        <li>
          <NavLink to="/menus" className="Link">
            Menus
          </NavLink>
        </li>
        <li>
          <NavLink to="/meals" className="Link">
            Meals
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders" className="Link">
            Orders
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
