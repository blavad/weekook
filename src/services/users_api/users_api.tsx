import { db as firebaseDB } from './config'
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'
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

  getAllTags: async () => {
    let tagList: any[] = []
    const querySnapshot = await getDocs(collection(firebaseDB, 'tags'))
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data())
      tagList.push({ id: doc.id, ...doc.data() })
    })
    return tagList
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

  getRecipe: async (recipeID: string) => {
    let myRecipe: any = {}
    const recipeRef = doc(firebaseDB, 'recipes', recipeID)
    try {
      let recipeItem = await getDoc(recipeRef)
      let rec = recipeItem.data() as any
      rec.id = recipeID
      if (rec.tags) {
        for (let i = 0; i < rec.tags.length; i++) {
          rec.tags[i] = await usersAPI.getTag(rec.tags[i])
        }
      }
      if (rec.author) {
        const authItem = await getDoc(rec.author)
        rec.author = authItem.data() as any
      }
      myRecipe = rec
    } catch (error) {
      console.error(error)
    }
    return myRecipe
  },

  getRecipes: async (uid: string) => {
    let myRecipes: any = []
    const docRef = doc(firebaseDB, 'utilisateurs', uid)
    try {
      let userItem = await getDoc(docRef)
      let recipes = (userItem.data() as any).recipes
      for (let recipeRef of recipes) {
        let recipeItem = await getDoc(recipeRef)
        let rec = recipeItem.data() as any
        rec.id = recipeRef.id
        if (rec.tags) {
          for (let i = 0; i < rec.tags.length; i++) {
            rec.tags[i] = await usersAPI.getTag(rec.tags[i])
          }
        }
        if (rec.author) {
          const authItem = await getDoc(rec.author)
          rec.author = authItem.data() as any
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

  createRecipe: async (recipe: any) => {
    const authorRef = doc(firebaseDB, 'utilisateurs', recipe.author)
    recipe.author = authorRef
    const docRef = await addDoc(collection(firebaseDB, 'recipes'), recipe)
    const docID = docRef.id
    updateDoc(authorRef, {
      recipes: arrayUnion(doc(firebaseDB, 'recipes/' + docID)),
    })
  },

  addToFavorites: async (
    uid: string,
    currentFavorites: any,
    recipeID: string,
  ) => {
    const docRef = doc(firebaseDB, 'utilisateurs', uid)
    const newRef = doc(firebaseDB, 'recipes/' + recipeID)

    const promiseUser = new Promise((resolve, reject) => {
      updateDoc(docRef, {
        favorites: [...currentFavorites, newRef],
      })
        .then((item: any) => {
          resolve(item)
        })
        .catch((error: any) => {
          reject(error)
        })
    })
    return promiseUser
  },

  addToList: async (uid: string, recipeID: string) => {
    const docRef = doc(firebaseDB, 'utilisateurs', uid)
    updateDoc(docRef, {
      recipes: arrayUnion(doc(firebaseDB, 'recipes/' + recipeID)),
    }).then(() => {
      console.log('Add with success')
    })
    .catch(() => {
      console.error('Error add to list')
    })
  },

  removeFromList: async (uid: string, recipeID: string) => {
    const docRef = doc(firebaseDB, 'utilisateurs', uid)
    updateDoc(docRef, {
      favorites: arrayRemove(doc(firebaseDB, 'recipes/' + recipeID)),
    })
      .then(() => {
        updateDoc(docRef, {
          recipes: arrayRemove(doc(firebaseDB, 'recipes/' + recipeID)),
        })
      })
      .then(() => {
        console.log('Remove with success')
      })
      .catch(() => {
        console.error('Error remove from list')
      })
  },

  removeToFavorites: async (
    uid: string,
    currentFavorites: any,
    recipeID: any,
  ) => {
    const docRef = doc(firebaseDB, 'utilisateurs', uid)

    const newFav = currentFavorites.filter((fav) => fav.id !== recipeID)

    const promiseUser = new Promise((resolve, reject) => {
      updateDoc(docRef, {
        favorites: newFav,
      })
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

  const loadUser = useCallback(async (id: string) => {
    if (id) {
      usersAPI
        .getUser(id)
        .then(setUser)
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])

  useEffect(() => {
    loadUser(id)
  }, [id])

  return user
}

export const useRecipe = (id: string) => {
  const [recipe, setRecipe] = useState<any>(undefined)
  useEffect(() => {
    const loadRecipe = (id: string) => {
      if (id) {
        try {
          ;(async () => {
            const rec = await usersAPI.getRecipe(id)
            setRecipe(rec)
          })()
        } catch (error) {
          console.log(error)
        }
      }
    }
    loadRecipe(id)
  }, [id])

  return recipe
}

export const useRecipes = (id: string) => {
  const [recipes, setRecipes] = useState<any>(undefined)

  useEffect(() => {
    if (id) {
      const docRef = doc(firebaseDB, 'utilisateurs', id)
      const unsub = onSnapshot(docRef, (doc) => {
        try {
          ;(async () => {
            const rec = await usersAPI.getRecipes(id)
            setRecipes(rec)
          })()
        } catch (error) {
          console.log(error)
        }
      })
      return unsub
    }
  }, [id])

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

  return recipes || undefined
}

export const useAllTags = () => {
  const [recipes, setRecipes] = useState<any>(undefined)
  useEffect(() => {
    const loadTags = () => {
      try {
        ;(async () => {
          const rec = await usersAPI.getAllTags()
          setRecipes(rec)
        })()
      } catch (error) {
        console.log(error)
      }
    }
    loadTags()
  }, [])

  return recipes || []
}
