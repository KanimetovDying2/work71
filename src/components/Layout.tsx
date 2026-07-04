import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header>
        <nav>
          <NavLink to="/admin/dishes">Turtle Pizza Admin Panel</NavLink>
          <NavLink to="/admin/add">Add New Dish!</NavLink>
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
