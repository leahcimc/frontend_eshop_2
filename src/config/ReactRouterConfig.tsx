
import ProductListingPage from "../page/ProductListingPage";
import ProductDetailPage from "../page/ProductDetailPage";
import ShoppingCartPage from "../page/ShoppingCartPage";

import ThankYouPage from "../page/ThankYouPage";
import CheckOutPage from "../page/CheckOutPage";
import AboutPage from "../page/AboutPage";
import ErrorPage from "../page/ErrorPage";
import LoginPage from "../page/LoginPage";
import HomePage from "../page/HomePage";
import DemoPage from "../common";
import { createBrowserRouter } from 'react-router-dom'
import TransactionPage from "../page/TransactionPage";
import TransactionListingPage from "../page/TransactionListingPage";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/about",
      element: <AboutPage />
    },
    {
      path: "/product",
      element: <ProductListingPage />
    },
    {
      path: "/product/:searchWord",
      element: <ProductListingPage/>
    },
    {
      path: "/demo",
      element: <DemoPage />
    },
    {
      path: "/error",
      element: <ErrorPage />
    },
    {
      path: "/product/detail/:productId",
      element: <ProductDetailPage />
    },
    {
      path: "/shoppingcart",
      element: <ShoppingCartPage />
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/transaction/:transactionId",
      element: <TransactionPage />
    },
    {
      path: "/transaction",
      element: <TransactionListingPage />
    },
    {
      path: "/checkout/:transactionId",
      element: <CheckOutPage />
    },
    {
      path: "/thankyou",
      element: <ThankYouPage />
    }
  ])