export const authError = {
    isInvalidEmail: (error: any) => (
        error.code === 'auth/invalid-email'
    ),
    isInvalidPassword: (error: any) => (
        error.code === 'auth/wrong-password'
    ),
    isUserNotFound: (error: any) => (
        error.code === 'auth/user-not-found'
    ),
    isTooManyRequest: (error: any) => (
        error.code === 'auth/too-many-requests'
    ),
    isUserMismatch: (error: any) => (
        error.code === 'auth/user-mismatch'
    ),
    isAlreadyInUse: (error: any) => (
        error.code === 'auth/email-already-in-use'
    ),
    isWeakPassword: (error: any) => (
        error.code === 'auth/weak-password'
    )
}

