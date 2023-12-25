import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import DemoPage from './common'
import TransactionListingPage from './page/TransactionListingPage/index.tsx'
import ProductListingPage from './page/ProductListingPage'
import ProductDetailPage from './page/ProductDetailPage'
import ShoppingCartPage from './page/ShoppingCartPage'
import TransactionPage from './page/TransactionPage'
import CheckOutPage from './page/CheckOutPage'
import ThankYouPage from './page/ThankYouPage'
import LoginPage from './page/LoginPage'
import ErrorPage from './page/ErrorPage'
import AboutPage from './page/AboutPage'
import HomePage from './page/HomePage'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react'
import { UserData } from './data/dto/UserDto'
import * as FirebaseAuthService from "./firebase/FirebaseAuthService.ts";

export const LoginUserContext = createContext<UserData | null | undefined>(undefined);

function App() {
  //                                 have login V, no login V,  V async need time to check
  const [loginUser, setLoginUser] = useState<UserData | null | undefined>(undefined);

  useEffect(() => {
    FirebaseAuthService.handleOnAuthStateChanged(setLoginUser);
  }, []);

  const router = createBrowserRouter([
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
      element: <ProductListingPage />
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


  return (
    <>
      <LoginUserContext.Provider value={loginUser}>
        <RouterProvider router={router} />

      </LoginUserContext.Provider>
    </>
  )
}

export default App
