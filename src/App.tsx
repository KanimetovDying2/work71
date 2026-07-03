import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import AdminDishesPage from "./pages/admin/AdminDishesPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import FormDish from "./components/FormDish";
import ClientHomePage from "./pages/client/ClientHomePage";
import NotFoundPage from "./components/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFoundPage />,
    children: [{ path: "/", element: <ClientHomePage /> }],
  },
  {
    path: "/admin",
    element: <Layout />,
    children: [
      { path: "dishes", element: <AdminDishesPage /> },
      { path: "orders", element: <AdminOrdersPage /> },
      { path: "add", element: <FormDish /> },
      { path: "edit/:id", element: <FormDish /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
