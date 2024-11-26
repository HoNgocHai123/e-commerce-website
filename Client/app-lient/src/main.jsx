import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import SignIn from './components/SingIn';
import Register from './components/Register';
import Admin from './components/Admin/Admin';
import AddCategory from './components/Admin/Category/AddCategory';
import ListCategory from './components/Admin/Category/ListCategory';
import AddProducts from './components/Admin/Products/AddProducts';
import ListProducts from './components/Admin/Products/ListProducts';
import Cart from './components/Cart';
import UpdateCategory from './components/Admin/Category/UpdateCategory';
import ProductDetails from './components/Productdetails';
import UpdateProduct from './components/Admin/Products/UpdeteProduct'
import ListUsers from './components/Admin/User/ListUsers';
import Home from './components/Admin/Home';
import ListComment from './components/Admin/Comment/ListComment';

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "home", 
        element: <Home/>,
      },
      {
        path: "add-category", 
        element: <AddCategory />,
      },
      {
        path: "list-category", // Sửa lại thành chữ thường để nhất quán
        element: <ListCategory />,
      },
      {
        path: "update-category/:id", 
        element: <UpdateCategory />,
      },
      // Products
      {
        path: "add-product", // Sửa thành chữ thường
        element: <AddProducts />,
      },
      {
        path: "list-product", // Sửa thành chữ thường
        element: <ListProducts />,
      },
      {
        path: "update-product/:id", // Sửa chính tả cho 'update-product'
        element: <UpdateProduct />,
      },
      {
        path: "users", // Đường dẫn tới danh sách người dùng
        element: <ListUsers />,
      },
      {
        path: "comment", 
        element: <ListComment/>,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/product-details/:id",
    element: <ProductDetails/>
  },
  {
    path: "/cart", // Sửa thành chữ thường
    element: <Cart />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
