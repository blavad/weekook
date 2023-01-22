import { signOut } from 'firebase/auth';
import { auth as firebaseAuth } from '../config';
import { AuthState, INITIAL_STATE } from '../auth_state';

export const logout = async (set: any, get: any) => {
    const loginFailure = get().loginFailure

    // Start loading
    set((state: AuthState) => ({ ...state, loading: true, errorMessage: '' }))

    const onErrorLogout = (error: any) => {
        loginFailure("common.manageAccount.logout.error")
    }

    signOut(firebaseAuth).then(() => {
        // Sign-out successful.
        set({ ...INITIAL_STATE, initialLoading: false })
    }).catch((error) => {
        onErrorLogout(error)
    });
};