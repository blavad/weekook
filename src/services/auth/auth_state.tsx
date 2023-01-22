import { UserCredential } from "firebase/auth";

export type AuthStatus = 'RESET_PASSWORD' | 'SIGNIN' | 'SIGNUP'

/* The default authentification value */
export const INITIAL_STATE = {
    status: '',
    auth: null,
    email: '',
    password: '',
    loading: false,
    initialLoading: true,
    reauthenticating: false,
    errorMessage: '',
    emailErrorMessage: '',
    passwordErrorMessage: '',
};

export type Auth = {
    uid: string,
    name: string,
    email: string,
    activated: string
}

export const initAuth = () => {
    return {
        uid: "",
        name: "",
        email: "",
        activated: true,
    }
}


export const getAuthMinified = (auth: any) => {
    const { uid, email, displayName: name, emailVerified: activated, isAnonymous, providerData } = auth;

    let isGoogle = false, isFacebook = false, isPassword = false
    for (let provider of providerData) {
        switch (provider.providerId) {
            case 'password':
                isPassword = true
                break;
            case 'google.com':
                isGoogle = true
                break;
            case 'facebook.com':
                isFacebook = true
                break;
        }
    }

    return {
        uid,
        name,
        email,
        activated,
        isAnonymous,
        isGoogle,
        isPassword,
        isFacebook,
        providerData
    };
};


/* The authentification state type  */
export type AuthState = {
    status: AuthStatus;
    auth: any;
    email: string;
    password: string;
    loading: boolean;
    initialLoading: boolean,
    reauthenticating: boolean,
    errorMessage: string;
    emailErrorMessage: string;
    passwordErrorMessage: string;
    signup: (newletterSubscription: boolean) => void;
    login: (email: string, password: string) => void;
    loginWithPassword: (email: string, password: string) => void;
    loginWithGoogle: () => Promise<UserCredential>;
    loginAsGuest: () => void;
    loginSuccess: (auth: any) => void;
    loginFailure: (errorMessage: string) => void;
    loginEmailFailure: (errorMessage: string) => void,
    loginPasswordFailure: (errorMessage: string) => void,
    logout: () => void;
    deleteAccount: () => void;
    updatePassword: (password: string) => Promise<void>;
    onForgotPassword: () => void;
    onResetPassword: (password: string, actionCode: string, continueUrl: string, lang: string) => void
    changeStatus: (status: AuthStatus) => void;
    changeEmail: (email: string) => void;
    changePassword: (password: string) => void;
    reauthenticate: (credential: UserCredential) => void;
    resetFields: () => void;
    resetErrorMessage: () => void;
    onAuthStateChanged: () => void;
    reauthenticateWithPassword: (email: string, password: string) => Promise<void>;
    reauthenticateWithGoogle: () => Promise<void>;
}