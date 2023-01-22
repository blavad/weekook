import { deleteUser, reauthenticateWithCredential } from "firebase/auth";
import { AuthState, INITIAL_STATE } from "../auth_state";
import { auth as firebaseAuth } from "../config";



export const deleteAccount = async (set: any, get: any) => {
    // Start loading
    set((state: AuthState) => ({ ...state, loading: true, errorMessage: '' }))

    // Get attributes
    const { loginFailure } = get()

    const user = firebaseAuth.currentUser
    const onErrorDeleteAccount = (error: any) => {
        loginFailure("common.manageAccount.deleteAccount.error")
    }

    if (user) {
        deleteUser(user).then(() => {
            // User deleted.
            set({ ...INITIAL_STATE, initialLoading: false })
        }).catch((error) => {
            set((state: AuthState) => ({ ...state, loading: false, reauthenticating: true }))
        });
    }
    else {
        set((state: AuthState) => ({ ...state, loading: false, reauthenticating: true }))
    }
}
