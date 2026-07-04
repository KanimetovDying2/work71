import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm z-50">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <NavLink
            to="/admin/dishes"
            className="text-xl font-bold bg-gradient-to-r from-teal-500 to-indigo-600 bg-clip-text text-transparent"
          >
            Turtle Pizza Admin
          </NavLink>

          <div className="flex gap-6">
            {[
              { to: "/admin/add", label: "Add Dish" },
              { to: "/admin/dishes", label: "Dishes" },
              { to: "/admin/orders", label: "Orders" },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-indigo-600"
                      : "text-gray-500 hover:text-indigo-500"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default Layout;
