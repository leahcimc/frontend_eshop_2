import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import DemoPage from './common'
import TransactionListingPage from './page/TransactionListingPage/index.tsx'
import ProductListingPage from './page/ProductListingPage'
import ProductDetailPage from './page/ProductDetailPage'
import ShoppingCartPage from './page/ShoppingCartPage'
import TransactionPage from './page/TransactionPage'
import CheckOutPage from './page/TransactionPage'
import ThankYouPage from './page/ThankYouPage'
import LoginPage from './page/LoginPage'
import ErrorPage from './page/ErrorPage'
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
      element: <ProductListingPage />
    },
    {
      path: "/:searchWord",
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
      path: "/product/:productId",
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
      path: "/checkout",
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
