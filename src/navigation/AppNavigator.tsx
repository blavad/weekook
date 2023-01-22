/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React, { useEffect } from "react"

/* Authentification flow */
import AuthRouter from "./AuthRouter";

/* Main app flow */
import MainRouter from "./MainRouter";

/* Get active auth and user  */
import { useAuth } from "~/services/auth";
import { useActiveUserManager } from "~/services/user";

const isAuthentified = (auth: any) => (auth !== undefined && auth !== null)

export const AppNavigator = () => {
  // Gets the current auth  
  const auth = useAuth(state => state.auth)

  // Update the user data according to the authentified user 
  useActiveUserManager(auth?.uid)

  // Check if initial loading
  const initialLoading = useAuth(state => state.initialLoading)

  return (
    (!isAuthentified(auth) && !initialLoading) ?
      <AuthRouter /> :
      <MainRouter />
  )
}
