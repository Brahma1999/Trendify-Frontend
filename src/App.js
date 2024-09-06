import React, { useEffect } from "react";
import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Protected from "./features/auth/components/Protected";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";

import { useDispatch, useSelector } from "react-redux";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";

// // Lazy load your pages
const Home = React.lazy(() => import("./pages/Home"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const SignupPage = React.lazy(() => import("./pages/SignupPage"));
const CartPage = React.lazy(() => import("./pages/CartPage"));
const Checkout = React.lazy(() => import("./pages/Checkout"));
const ProductDetailPage = React.lazy(() => import("./pages/ProductDetailPage"));
const PageNotFound = React.lazy(() => import("./pages/404"));
const OrderSuccessPage = React.lazy(() => import("./pages/OrderSuccessPage"));
const UserOrdersPage = React.lazy(() => import("./pages/UserOrdersPage"));
const UserProfilePage = React.lazy(() => import("./pages/UserProfilePage"));
const LogOut = React.lazy(() => import("./features/auth/components/LogOut"));

const AdminHome = React.lazy(() => import("./pages/AdminHome"));
const AdminProductDetailPage = React.lazy(() =>
  import("./pages/AdminProductDetailPage")
);

const AdminProductFormPage = React.lazy(() =>
  import("./pages/AdminProductFormPage")
);
const AdminOrdersPage = React.lazy(() => import("./pages/AdminOrdersPage"));
const ForgotPasswordPage = React.lazy(() =>
  import("./pages/ForgotPasswordPage")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
      // <Home />
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage />,
      </Protected>
    ),
  },
  {
    path: "/admin/product-detail/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/productForm",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/productForm/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout />
      </Protected>
    ),
  },
  {
    path: "/orders",
    element: (
      <Protected>
        <UserOrdersPage />
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage />
      </Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage />,
  },
  {
    path: "/logout",
    element: <LogOut />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
