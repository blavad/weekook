import { useEffect, useState } from 'react'

import { db as firebaseDB } from '../users_api/config'
import { usersAPI } from '../users_api/users_api'
import { useAuth, useAuthManager } from '../auth'
import { createGlobalStorage } from '@unboared/utils.storage'
import { initialUser, initialUserState, UserState } from './user_state'
import { doc, onSnapshot } from 'firebase/firestore'

/* The store that keep informations about the authentification */
export const useActiveUser = createGlobalStorage<UserState>((set, get) => ({
  ...initialUserState,

  /**
   *
   */
  createUser: (uid: string, username: string, avatar: string) => {
    const newUser = {
      ...initialUser,
      username: username,
      avatar: avatar,
      uid: uid,
    }
    set((state: UserState) => ({ ...state, loading: true, errorMessage: '' })) // start loading
    usersAPI
      .createUser(newUser)
      .then(() => {
        set((state: UserState) => ({ ...state, loading: false, user: newUser }))
      })
      .catch((error) => {
        set((state: UserState) => ({
          ...state,
          loading: false,
          errorMessage: error,
        })) // start loading
      })
  },

  /**
   *
   * @param user
   * @returns
   */
  loadUserData: (uid: string) => {
    set((state: UserState) => ({ ...state, loading: true, errorMessage: '' })) // start loading
    if (uid) {
      usersAPI
        .getUser(uid)
        .then((user) => {
          set((state: UserState) => ({ ...state, loading: false, user: user })) // user found in database
        })
        .catch((error) => {
          set((state: UserState) => ({
            ...state,
            loading: false,
            errorMessage: error,
          })) // user not found in database
        })
    } else {
      set((state: UserState) => ({
        ...state,
        loading: false,
        errorMessage: '',
      }))
    }
  },

  /**
   * Set the authentified user.
   */
  setUser: (user: any) => set({ user: user }),
}))

/**
 * Hook that can be used to get the authentified user.
 *
 * @returns the current user
 */
export const useActiveUserManager = (id: string) => {
  const loadUserData = useActiveUser((state) => state.loadUserData)

  useEffect(() => {
    if (id) {
      const docRef = doc(firebaseDB, 'utilisateurs', id)
      const unsub = onSnapshot(docRef, (doc) => {
        loadUserData(id)
      })
      return unsub
    }
  }, [id])

  useEffect(() => {
    loadUserData(id)
  }, [id])
}

/**
 * Hook that can be used to get the authentified user.
 *
 * @returns the current user
 */
export const useActiveUserManager2 = () => {
  useAuthManager()
  const auth = useAuth((state) => state.auth)

  const loadUserData = useActiveUser((state) => state.loadUserData)
  useEffect(() => {
    loadUserData(auth.id)
  }, [auth.id])
}
