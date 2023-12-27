import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { RouterProvider } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react'
import { UserData } from './data/dto/UserDto'
import * as FirebaseAuthService from "./firebase/FirebaseAuthService.ts";
import { router } from './config/ReactRouterConfig.tsx'

export const LoginUserContext = createContext<UserData | null | undefined>(undefined);

function App() {
  //                                 have login V, no login V,  V async need time to check
  const [loginUser, setLoginUser] = useState<UserData | null | undefined>(undefined);

  useEffect(() => {
    FirebaseAuthService.handleOnAuthStateChanged(setLoginUser);
  }, []);


  return (
    <>
      <LoginUserContext.Provider value={loginUser}>
        <RouterProvider router={router} />

      </LoginUserContext.Provider>
    </>
  )
}

export default App
