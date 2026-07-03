import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header>
        <nav>
          <h1>Turtle Pizza Admin Panel</h1>
          <NavLink to="/admin/dishes">Dishes</NavLink>
          <NavLink to="/admin/orders">Orders</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
