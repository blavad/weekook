import { auth as firebaseAuth } from '../config';
import { getRedirectResult, GoogleAuthProvider, sendPasswordResetEmail, signInAnonymously, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, UserCredential } from "firebase/auth";

import { AuthState, getAuthMinified } from "../auth_state"
import { authError } from "../auth_error";

export const loginWithPassword = async (set: any, get: any, email: string, password: string) => {
    set((state: AuthState) => ({ ...state, loading: true, errorMessage: '' })) // start loading

    const loginEmailFailure = get().loginEmailFailure
    const loginPasswordFailure = get().loginPasswordFailure

    if (email === "") {
        loginEmailFailure("common.signin.email_password.email.missing_email")
    }
    else if (password === "") {
        loginPasswordFailure("common.signin.email_password.password.missing_password")
    }
    else {
        signInWithEmailAndPassword(firebaseAuth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                onSuccessLogin(set, get, user)
            })
            .catch((error) => {
                onErrorLogin(set, get, error)
            });
    }
}

export const loginWithGoogle = async (set: any, get: any): Promise<UserCredential | void> => {

    set((state: AuthState) => ({ ...state, loading: true, errorMessage: '' })) // start loading

    const provider = new GoogleAuthProvider();

    const onErrorLoginWithGoogle = (set: any, get: any, error: any) => {
        get().loginFailure("common.signin.google.error")
    }

    signInWithPopup(firebaseAuth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      onSuccessLogin(set, get, user)
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      onErrorLoginWithGoogle(set, get, error)
    });

    // signInWithPopup(firebaseAuth, provider)
    // signInWithRedirect(firebaseAuth, provider)
    //     .then(() => {
    //         getRedirectResult(firebaseAuth)
    //             .then((result) => {
    //                 console.log("result")
    //                 console.log(result)
    //                 // This gives you a Google Access Token. You can use it to access the Google API.
    //                 const credential = GoogleAuthProvider.credentialFromResult(result);
    //                 // const token = credential.accessToken;
    //                 // The signed-in user info.
    //                 const user = result.user;
    //                 // The custom onAuthentified function
    //                 onSuccessLogin(set, get, user)

    //                 // return credential
    //                 // resolve(credential)
    //             }).catch((error) => {
    //                 // // Handle Errors here.
    //                 // const errorCode = error.code;
    //                 // const errorMessage = error.message;
    //                 // // The email of the user's account used.
    //                 // const email = error.customData.email;
    //                 // // The AuthCredential type that was used.
    //                 // const credential = GoogleAuthProvider.credentialFromError(error);
    //                 onErrorLoginWithGoogle(set, get, error)
    //             });
    //     }).catch((error) => {
    //         onErrorLoginWithGoogle(set, get, error)
    //     });
}

export const loginAsGuest = async (set: any, get: any) => {
    // Start loading
    set((state: AuthState) => ({ ...state, loading: true, errorMessage: '' }))

    const onErrorLoginAsGuest = (error: any) => {
        get().loginFailure("common.signin.email_password.guest.error")
    }

    signInAnonymously(firebaseAuth)
        .then((user) => {
            // Signed in 
            onSuccessLogin(set, get, user)
        })
        .catch((error) => {
            onErrorLoginAsGuest(error)
        });
}

export const handleForgotPassword = async (set: any, get: any) => {
    const email = get().email
    const changeStatus = get().changeStatus
    const loginEmailFailure = get().loginEmailFailure

    if (email === "") {
        loginEmailFailure("common.signin.email_password.email.missing_email")
    }
    else {
        sendPasswordResetEmail(firebaseAuth, email)
            .then(() => {
                changeStatus('RESET_PASSWORD')
            })
            .catch((error) => {
                onErrorLogin(set, get, error)
            });
    }
}

export const onSuccessLogin = (set: any, get: any, user: any) => {
    const userMinified = getAuthMinified(user);

    // if (!userMinified.activated) {
    //     const error = { code: 'auth/account-not-activated' };

    //     throw error;
    // }
    get().loginSuccess(userMinified)
}

export const onErrorLogin = (set: any, get: any, error: any) => {
    const loginEmailFailure = get().loginEmailFailure
    const loginPasswordFailure = get().loginPasswordFailure
    const loginFailure = get().loginFailure

    if (authError.isUserNotFound(error)) {
        loginEmailFailure("common.signin.email_password.email.user_not_found")
    }
    else if (authError.isInvalidEmail(error)) {
        loginEmailFailure("common.signin.email_password.email.invalid_email_address")
    }
    else if (authError.isInvalidPassword(error)) {
        loginPasswordFailure("common.signin.email_password.password.wrong_password")
    }
    else if (authError.isTooManyRequest(error)){
        loginFailure("common.signin.email_password.email.too_many_request")
    }
    else if (authError.isUserMismatch(error)){
        loginFailure("common.signin.email_password.email.user_mismatch")
    }
    else {
        loginFailure("common.signin.email_password.email.unknown_error")
    }
}