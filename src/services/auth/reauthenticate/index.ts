import { EmailAuthProvider, GoogleAuthProvider, reauthenticateWithCredential, reauthenticateWithPopup } from 'firebase/auth';
import { AuthState } from '../auth_state';
import { auth as firebaseAuth } from '../config'
import { onErrorLogin } from '../login';

export const reauthenticateWithGoogle = async (set: any, get: any) => {
    set((state: AuthState) => ({ ...state, loading: true, errorMessage: '' }))
    const user = firebaseAuth.currentUser
    const credential = new GoogleAuthProvider()
    const reset = get().resetFields

    await reauthenticateWithPopup(user, credential).then(() => {
        reset()
    }).catch((error) => {
        get().loginFailure("common.signin.google.error")
        throw new Error("Error reauthenticate")
    })
}

export const reauthenticateWithPassword = async (set: any, get: any, email: string, password: string) => {
    set((state: AuthState) => ({ ...state, loading: true, errorMessage: '' }))
    const reset = get().resetFields
    const user = firebaseAuth.currentUser
    const credential = EmailAuthProvider.credential(
        email, // references the user's email address
        password
    );

    await reauthenticateWithCredential(user, credential).then(() => {
        reset()
    }).catch((error) => {
        onErrorLogin(set, get, error)
        throw new Error("Error reauthenticate")
    })
}