import { db as firebaseDB } from './config'
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  documentId,
  FieldPath,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'
import { User } from '../user'

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

export const usersAPI = {
  /* MANAGE USERS */

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

  /* MANAGE TAGS */

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

  /* MANAGE RECIPES */

  createRecipe: async (recipe: any) => {
    const authorRef = doc(firebaseDB, 'utilisateurs', recipe.author)
    recipe.author = authorRef
    const docRef = await addDoc(collection(firebaseDB, 'recipes'), recipe)
    const docID = docRef.id
    updateDoc(authorRef, {
      recipes: arrayUnion(doc(firebaseDB, 'recipes/' + docID)),
    })
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

  getRecipesFromRefs: async (refs: any) => {
    console.log(refs)
    let myRecipes: any = []
    for (let recipeRef of refs) {
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
    return myRecipes
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
    })
      .then(() => {
        console.log('Add with success')
      })
      .catch(() => {
        console.error('Error add to list')
      })
  },

  removeFromList: async (uid: string, recipeID: string) => {
    const docRef = doc(firebaseDB, 'utilisateurs', uid)
    updateDoc(docRef, {
      recipes: arrayRemove(doc(firebaseDB, 'recipes/' + recipeID)),
    })
      .then(() => {
        updateDoc(docRef, {
          favorites: arrayRemove(doc(firebaseDB, 'recipes/' + recipeID)),
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

  /* MANAGE KOOKLISTS */

  createList: async (
    uid: string,
    listType: string,
    cooklistName: string,
    recipes: Array<string>,
  ) => {
    const authorRef = doc(firebaseDB, 'utilisateurs', uid)
    let cooklist = {
      name: cooklistName,
      author: authorRef,
      type: listType,
      recipes: recipes,
    }
    const docRef = await addDoc(collection(firebaseDB, 'cooklists'), cooklist)
    const docID = docRef.id
    updateDoc(authorRef, {
      cooklists: arrayUnion(doc(firebaseDB, 'cooklists/' + docID)),
    })
  },
  createStdLists: async (uid: string, recipes: Array<string>) => {
    usersAPI.createList(uid, 'stdlist', 'recipes', recipes)
    usersAPI.createList(uid, 'stdlist', 'favorites', recipes)
    usersAPI.createList(uid, 'stdlist', 'myRecipes', recipes)
    usersAPI.createList(uid, 'stdlist', 'history', recipes)
  },
  createCooklist: async (
    uid: string,
    weekListName: string,
    recipes: Array<string>,
  ) => {
    usersAPI.createList(uid, 'cooklist', weekListName, recipes)
  },
  createWeekookList: async (
    uid: string,
    weekListName: string,
    recipes: Array<string>,
  ) => {
    usersAPI.createList(uid, 'weekooklist', weekListName, recipes)
  },

  removeList: async (authorID: string, listRef: any) => {
    const docRef = doc(firebaseDB, 'utilisateurs', authorID)
    deleteDoc(listRef)
      .then(() => {
        updateDoc(docRef, {
          cooklists: arrayRemove(listRef),
        })
      })
      .then(() => {
        console.log('Remove with success')
      })
      .catch(() => {
        console.error('Error remove from list')
      })
  },

  getLists: async (listsRef: Array<any>) => {
    let myLists: any = []
    for (let listRef of listsRef) {
      let listItem = await getDoc(listRef)
      let listData = listItem.data() as any

      myLists.push(listData)
    }
    return myLists
  },

  getCookLists: async (uid: string) => {
    let myCooklists: any = []
    const docRef = doc(firebaseDB, 'utilisateurs', uid)
    try {
      let userItem = await getDoc(docRef)
      myCooklists = (userItem.data() as any).cooklists
    } catch (error) {
      console.error(error)
    }
    return myCooklists
  },

  addToCooklist: async (cooklistID: string, recipeID: string) => {
    const docRef = doc(firebaseDB, 'cooklists', cooklistID)
    updateDoc(docRef, {
      recipes: arrayUnion(doc(firebaseDB, 'recipes/' + recipeID)),
    })
      .then(() => {
        console.log('Add with success')
      })
      .catch(() => {
        console.error('Error add to list')
      })
  },

  removeFromCooklist: async (cooklistID: string, recipeID: string) => {
    const docRef = doc(firebaseDB, 'cooklists', cooklistID)
    updateDoc(docRef, {
      recipes: arrayRemove(doc(firebaseDB, 'recipes/' + recipeID)),
    })
      .then(() => {
        console.log('Remove with success')
      })
      .catch(() => {
        console.error('Error remove from list')
      })
  },

  generateWeekookList: async (
    uid: string,
    inFavorites: boolean,
    tags: Array<string>,
    numRecipes: number,
  ) => {
    const userRef = doc(firebaseDB, 'utilisateurs', uid)
    let userItem = await getDoc(userRef)
    let userData = userItem.data() as any
    let fulllist = inFavorites ? userData.favorites : userData.recipes

    let weekooklist: any[] = []

    if (!numRecipes) {
      throw `Veuillez spécifier un nombre de recettes valide.`
    }

    if (fulllist.length !== 0) {
      const q = query(
        collection(firebaseDB, 'recipes'),
        where(documentId(), 'in', fulllist),
      )
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        let docData = doc.data()
        const inSelectedTag = (element) => tags.includes(element)
        if (docData.tags.some(inSelectedTag)) {
          console.log(doc.id, ' => ', doc.data())
          weekooklist.push(doc.ref)
        }
      })
    }
    if (weekooklist.length < numRecipes) {
      if (weekooklist.length == 0) {
        throw `Aucune recette ne respecte les contraintes.`
      }
      if (weekooklist.length == 1) {
        throw `Une seule recette respecte les contraintes.`
      }
      throw `Seulement ${weekooklist.length} recettes respectent les contraintes.`
    }
    shuffle(weekooklist)
    return weekooklist.slice(0, numRecipes)
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

export const useCooklists = (id: string) => {
  const [recipes, setRecipes] = useState<any>(undefined)

  useEffect(() => {
    if (id) {
      const docRef = doc(firebaseDB, 'utilisateurs', id)
      const unsub = onSnapshot(docRef, (doc) => {
        try {
          ;(async () => {
            const rec = await usersAPI.getCookLists(id)
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
            const rec = await usersAPI.getCookLists(id)
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
