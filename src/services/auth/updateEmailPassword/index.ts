import { confirmPasswordReset, reauthenticateWithCredential, signInWithEmailAndPassword, verifyPasswordResetCode } from 'firebase/auth';
import { updatePassword as firebaseUpdatePassword } from "firebase/auth";

import { auth as firebaseAuth } from '../config';
import { authError } from '../auth_error';
import { AuthState } from '../auth_state';

export const updatePassword = async (set: any, get: any, password: string) => {

    // Start loading
    set((state: AuthState) => ({ ...state, loading: true, errorMessage: '' }))
    const state = get()

    const user = firebaseAuth.currentUser;
    const onErrorResetPassword = (state: AuthState, error: any) => {
        if (authError.isWeakPassword(error)) {
            state.loginPasswordFailure("common.signin.email_password.password.weak_password")
        }
        else {
            // state.loginFailure("screen.settingPage.myAccount.action.reauthenticate.requires")
            set((state: AuthState) => ({ ...state, loading: false, reauthenticating: true }))
        }
    }

    if (password === "") {
        state.loginPasswordFailure("common.signin.email_password.password.missing_password")
        throw new Error('Error')
    }
    else {
        await firebaseUpdatePassword(user, password).then(() => {
            // Update successful.
            state.loginSuccess(state.auth)
        }).catch((error) => {
            onErrorResetPassword(state, error)
            throw new Error('Error')
        });
        return true
    }


}


export const resetPassword = async (set: any, get: any, password: string, actionCode: string, continueUrl: string, lang: string) => {
    const state = get()

    const onErrorResetPassword = (state: AuthState, error: any) => {
        if (authError.isWeakPassword(error)) {
            state.loginPasswordFailure("common.signin.email_password.password.weak_password")
        }
        else {
            state.loginPasswordFailure("common.signin.email_password.email.unknown_error")
        }
    }

    if (password === "") {
        state.loginPasswordFailure("common.signin.email_password.password.missing_password")
    }
    else {
        // Localize the UI to the selected language as determined by the lang
        // parameter.

        // Verify the password reset code is valid.
        verifyPasswordResetCode(firebaseAuth, actionCode).then((email) => {
            const accountEmail = email;

            // TODO: Show the reset screen with the user's email and ask the user for
            // the new password.
            const newPassword = password;

            // Save the new password.
            confirmPasswordReset(firebaseAuth, actionCode, newPassword).then((resp) => {
                // Password reset has been confirmed and new password updated.

                // TODO: Display a link back to the app, or sign-in the user directly
                // if the page belongs to the same domain as the app:
                signInWithEmailAndPassword(firebaseAuth, accountEmail, newPassword);

                // TODO: If a continue URL is available, display a button which on
                // click redirects the user back to the app via continueUrl with
                // additional state determined from that URL's parameters.
            }).catch((error: any) => {
                // Error occurred during confirmation. The code might have expired or the
                // password is too weak.
                onErrorResetPassword(state, error)
            });
        }).catch((error) => {
            // Invalid or expired action code. Ask user to try to reset the password
            // again.
            onErrorResetPassword(state, error)
        });
    }
};