import { db as firebaseDB } from './config'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { User } from '../user'

export const usersAPI = {
  /**
   * Get the user from its id.
   *
   * @param uid the user identifier
   * @returns
   */
  getUser: (uid: string) => {
    const docRef = doc(firebaseDB, 'utilisateurs', uid)
    const promiseUser = new Promise((resolve, reject) => {
      getDoc(docRef)
        .then((item: any) => {
          let data = item.data()
          resolve(data)
        })
        .catch((error: any) => {
          reject(error)
        })
    })
    return promiseUser
  },

  getTag: async (tagID: string) => {
    const docRef = doc(firebaseDB, 'tags', tagID)
    try {
      let tagItem = await getDoc(docRef)
      return tagItem.data()
    } catch (error) {
      console.error(error)
    }
  },

  getRecipes: async (uid: string) => {
    let myRecipes: any = []
    const docRef = doc(firebaseDB, 'utilisateurs', uid)
    try {
      let userItem = await getDoc(docRef)
      let recipes = (userItem.data() as any).recipes
      for (let recipeRef of recipes) {
        let recItem = await getDoc(recipeRef)
        let rec = recItem.data() as any
        if (rec.tags) {
          for (let i = 0; i < rec.tags.length; i++) {
            rec.tags[i] = await usersAPI.getTag(rec.tags[i])
          }
        }
        myRecipes.push(rec)
      }
    } catch (error) {
      console.error(error)
    }
    return myRecipes
  },

  createUser: (user: any) => {
    const docRef = doc(firebaseDB, 'utilisateurs', user.uid)
    const promiseUser = new Promise((resolve, reject) => {
      setDoc(docRef, user)
        .then((item: any) => {
          resolve(item)
        })
        .catch((error: any) => {
          reject(error)
        })
    })
    return promiseUser
  },
}

export const useUser = (id: string) => {
  const [user, setUser] = useState<User>()
  useEffect(() => {
    const loadUser = async (id: string) => {
      if (id) {
        usersAPI
          .getUser(id)
          .then(setUser)
          .catch((error) => {
            console.log(error)
          })
      }
    }
    loadUser(id)
  }, [id])

  return user
}

export const useRecipes = (id: string) => {
  const [recipes, setRecipes] = useState<any>(undefined)
  useEffect(() => {
    const loadUser = (id: string) => {
      if (id) {
        try {
          ;(async () => {
            const rec = await usersAPI.getRecipes(id)
            setRecipes(rec)
          })()
        } catch (error) {
          console.log(error)
        }
      }
    }
    loadUser(id)
  }, [id])

  return recipes || []
}
