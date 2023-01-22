import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth as firebaseAuth } from "../config"
import { authError } from "../auth_error"
import { AuthState } from "../auth_state"


export const signup = async (set: any, get: any, newletterSubscription: boolean) => {
    // Start loading
    set((state: AuthState) => ({ ...state, loading: true, errorMessage: '' }))

    const { email, password, loginEmailFailure, loginPasswordFailure } = get()

    if (email === "") {
        loginEmailFailure("common.signin.email_password.email.missing_email")
    }
    else if (password === "") {
        loginPasswordFailure("common.signin.email_password.password.missing_password")
    }
    else {
        await createUserWithEmailAndPassword(firebaseAuth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                onSuccessSignUp(email, newletterSubscription, user)
            })
            .catch((error) => {
                onErrorSignUp(set, get, error)
            });
    }
}

const onErrorSignUp = (set: any, get: any, error: any) => {
    const { loginEmailFailure, loginPasswordFailure } = get()

    if (authError.isAlreadyInUse(error)) {
        loginEmailFailure("common.signin.email_password.email.already_in_use")
    }
    else if (authError.isInvalidEmail(error)) {
        loginEmailFailure("common.signin.email_password.email.invalid_email_address")
    }
    else if (authError.isWeakPassword(error)) {
        loginPasswordFailure("common.signin.email_password.password.weak_password")
    }
    else if (authError.isInvalidPassword(error)) {
        loginPasswordFailure("common.signin.email_password.password.wrong_password")
    }
    else {
        loginEmailFailure("common.signin.email_password.email.unknown_error")
        loginPasswordFailure("common.signin.email_password.email.unknown_error")
    }
}

const onSuccessSignUp = (email: string, newletterSubscription: boolean, user: any) => {
    if (newletterSubscription) {
        subscribeToNewsletter(email)
    }
}

const subscribeToNewsletter = (email: string) => {
    console.log(email)

    // let formData = new FormData();
    // formData.append('EMAIL', email);


    // // Simple POST request with a JSON body using fetch
    // const requestOptions = {
    //     method: 'POST',
    //     body: formData
    // };
    // fetch(
    //     urlNewsletterSubscription,
    //     requestOptions
    // )
    //     .then(response => {
    //         console.log("success response")
    //         console.log(response)
    //     })
    //     .catch(error => {
    //         console.log('error')
    //         console.log(error)
    //         throw error
    //     })
}