import { useEffect, useState } from 'react';
import { createGlobalStorage } from '@unboared/utils.storage'

import { AuthCredential, onAuthStateChanged } from 'firebase/auth';

import { auth as firebaseAuth } from './config';
import { AuthState, INITIAL_STATE, AuthStatus, getAuthMinified } from './auth_state';

import { loginWithPassword, loginAsGuest, loginWithGoogle, handleForgotPassword } from './login';
import { resetPassword, updatePassword } from './updateEmailPassword'
import { logout } from './logout';
import { signup } from './signup';
import { deleteAccount } from './deleteAccount';
import { reauthenticateWithGoogle, reauthenticateWithPassword } from './reauthenticate';

/* The store that keep informations about the authentification */
export const useAuth = createGlobalStorage<AuthState>(
  (set: any, get: any) => ({
    ...INITIAL_STATE,

    /**
     * This function attempts to register an user and 
     * modifies the authentification state accordingly.
     */
    signup: (newletterSubscription: boolean) => signup(set, get, newletterSubscription),

    /**
     * This function attempts to authenticate an user and 
     * modifies the authentification state accordingly.
     */
    login: async (email: string, password: string) => loginWithPassword(set, get, email, password),

    /**
     * This function attempts to authenticate an user and 
     * modifies the authentification state accordingly.
     */
    loginWithPassword: async (email: string, password: string) => loginWithPassword(set, get, email, password),

    /**
     * This function attempts to authenticate a user with google and 
     * modifies the authentification state accordingly.
     */
    loginWithGoogle: () => loginWithGoogle(set, get),

    /**
     * This function attempts to authenticate a user as guest and 
     * modifies the authentification state accordingly.
     */
    loginAsGuest: () => loginAsGuest(set, get),

    /**
     * This function modifies the auth status after that it suceeds.
     */
    loginSuccess: (auth: any) => set({ ...INITIAL_STATE, initialLoading: false, auth: auth, loading: false }),

    /**
     * This function modifies the auth status after that it fails.
     */
    loginFailure: (errorMessage: string) => set((state: AuthState) => ({ ...state, email: '', password: '', loading: false, errorMessage: errorMessage, passwordErrorMessage: '', emailErrorMessage: '' })),

    /**
     * This function prints an error message relatives to an email error.
     */
    loginEmailFailure: (errorMessage: string) => set((state: AuthState) => ({ ...state, password: '', loading: false, errorMessage: '', passwordErrorMessage: '', emailErrorMessage: errorMessage })),

    /**
     * This function prints an error message relatives to a password error.
     */
    loginPasswordFailure: (errorMessage: string) => set((state: AuthState) => ({ ...state, password: '', loading: false, errorMessage: '', passwordErrorMessage: errorMessage, emailErrorMessage: '' })),

    /**
     * Sign Out the current user.
     */
    logout: () => logout(set, get),

    /**
     * Sign Out the current user.
     */
    deleteAccount: () => deleteAccount(set, get),

    /**
     * Update the password of the current user.
     */
    updatePassword: async (password: string) => updatePassword(set, get, password),

    /**
     * Reset the password.
     */
    onResetPassword: (password: string, actionCode: string, continueUrl: string, lang: string) => {
      resetPassword(set, get, password, actionCode, continueUrl, lang)
    },

    /**
     * If the user click on the forgot password button
     */
    onForgotPassword: () => handleForgotPassword(set, get),

    /**
     * Change status.
     */
    changeStatus: (status: AuthStatus) => set((state: AuthState) => ({ ...state, status: status })),

    /**
     * Change email.
     */
    changeEmail: (email: string) => set((state: AuthState) => ({ ...state, email: email, emailErrorMessage: '' })),

    /**
     * Change password.
     */
    changePassword: (password: string) => set((state: AuthState) => ({ ...state, password: password, passwordErrorMessage: '' })),

    /**
     * Reset auth status.
     */
    resetFields: () => set((state: AuthState) => ({ ...INITIAL_STATE, auth: state.auth, initialLoading: false })),

    /**
     * This function modifies the auth status after that it suceeds.
     */
    resetErrorMessage: () => set((state: AuthState) => ({ ...state, errorMessage: '', emailErrorMessage: '', passwordErrorMessage: '' })),

    /**
     * Reauthenticate the current user with password.
     */
    reauthenticateWithPassword: async (email: string, password: string) => reauthenticateWithPassword(set, get, email, password),

    /**
     * Reauthenticate the current user with google provider.
     */
    reauthenticateWithGoogle: async () => reauthenticateWithGoogle(set, get),

    /**
     * Listen for authentification state changes.
     */
    onAuthStateChanged: () => {
      set({ ...INITIAL_STATE, initialLoading: true, loading: true })
      onAuthStateChanged(firebaseAuth, (auth) => {
        if (auth) {
          set({ ...INITIAL_STATE, initialLoading: false, loading: false, auth: getAuthMinified(auth) })
        } else {
          set({ ...INITIAL_STATE, initialLoading: false, loading: false })
        }
      })

    }

  })
)

/**
 * Hook that can be used to get the current authentification object.
 * 
 * @returns the current authentification object 
 */
export const useAuthManager = () => {
  const onAuthStateChanged = useAuth(state => state.onAuthStateChanged);
  useEffect(() => {
    onAuthStateChanged();
  }, []);

}
