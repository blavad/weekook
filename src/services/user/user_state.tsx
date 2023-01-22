/* The user type */
export type User = {
  uid: string
  username: string
  avatar: string
  recipes: Array<string>
  favorites: Array<string>
}

/* The default user value */
export const initialUser = {
  uid: '',
  username: '',
  avatar: '',
  recipes: [],
  favorites: [],
}

/* The authentification state type  */
export type UserState = {
  user: User
  loading: boolean
  errorMessage: string
  createUser: (uid: string, username: string, avatar: string) => void
  loadUserData: (uid: string) => void
  setUser: (user: any) => void
}

/* The default user state value */
export const initialUserState = {
  user: undefined,
  loading: true,
  errorMessage: '',
}

/**
 * The converter instance from / to player instance
 */
export const userConverter = {
  toFirestore: (user: User) => {
    return { ...user }
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)
    return { ...data }
  },
}
