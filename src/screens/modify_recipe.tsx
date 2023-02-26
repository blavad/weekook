import { useEffect, useState } from 'react'
import { Button, Heading, useNormalize } from '@unboared/base-ui.all'
import {
  ImageBackground,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'
import { BottomButton } from '../components/bottom_button'
import { BackButton } from '../components/buttons/back_button'
import SecondaryContainer from '../components/container/secondary_container'
import { ActivityIndicator } from '../components/loaders'
import { Tag } from '../components/tag'
import { SPACE } from '../const'
import { useActiveUser } from '../services/user'
import {
  useAllTags,
  useRecipe,
  usersAPI,
} from '../services/users_api/users_api'
import { TextInput, Theme, useTheme } from '@unboared/base-ui.all'
import CreateRecipeImage from '../assets/img/createRecipe.jpg'
import { useLinkTo } from '@react-navigation/native'

const initRecipe = (me, recipe) => {
  if (recipe) {
    return {
      name: recipe.name,
      imgURL: recipe.images.urls[0],
      author: {
        uid: me.id,
      },
      tags: recipe.tags,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
    }
  } else {
    return {
      name: '',
      imgURL: '',
      author: {
        uid: me.id,
      },
      activeTags: [],
      ingredients: [{ quantity: '', name: '' }],
      instructions: [''],
    }
  }
}

export function ModifyRecipeFor({ recipe }: any) {
  const linkTo = useLinkTo()

  const theme = useTheme() as Theme
  const { normalize } = useNormalize()
  const { user: me } = useActiveUser()
  const isMyRecipe = recipe && me.uid === recipe.author.uid

  const currentRecipe = initRecipe(me, recipe)
  const [name, setName] = useState(currentRecipe.name)
  const [imgURL, setImgURL] = useState(currentRecipe.imgURL)
  const [ingredients, setIngredients] = useState(currentRecipe.ingredients)
  const [instructions, setInstructions] = useState(currentRecipe.instructions)

  const tags = useAllTags()
  const [activeTags, setActiveTags] = useState(currentRecipe.activeTags)

  const saveRecipe = () => {
    usersAPI
      .createRecipe({
        name: name,
        images: {
          urls: [imgURL],
        },
        tags: activeTags?.map((tag) => tag.name),
        author: me.uid,
        ingredients: ingredients,
        instructions: instructions,
      })
      .then(() => {
        linkTo('/home')
      })
      .catch(() => {
        console.error('Error while save recipe.')
      })
  }

  if (recipe && !isMyRecipe) {
    return (
      <SecondaryContainer
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Heading
          type="h2"
          text="Cette recette ne vous appartient pas, vous ne pouvez pas la modifier."
        />
      </SecondaryContainer>
    )
  }

  return (
    <SecondaryContainer
      style={{
        flex: 1,
      }}
    >
      {!currentRecipe ? (
        <ActivityIndicator />
      ) : (
        <ScrollView
          style={{
            flex: 1,
            marginTop: normalize(40),
            padding: normalize(SPACE.small),
            alignSelf: 'stretch',
          }}
        >
          <TextInput
            containerStyle={{ marginBottom: normalize(SPACE.small) }}
            label="Nom de la recette"
            placeholder="Soupe de poisson"
            text={name || ''}
            onChangeText={setName}
          />
          <TextInput
            containerStyle={{ marginBottom: normalize(SPACE.small) }}
            label="URL de l'image"
            placeholder="https://url-vers/soupe-poisson.png"
            text={imgURL || ''}
            onChangeText={setImgURL}
          />
          <Heading type="h3" text="Tags" />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginBottom: normalize(SPACE.small),
            }}
          >
            {tags.map((tag: any, index: number) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setActiveTags((state) => {
                      let newState = [...state]
                      if (newState.includes(tag)) {
                        newState = newState.filter((el) => el !== tag)
                      } else {
                        newState.push(tag)
                      }
                      return newState
                    })
                  }}
                >
                  <Tag
                    style={{ margin: normalize(SPACE.tiny) }}
                    text={`${tag.icon} ${tag.name}`}
                    textColor={
                      activeTags?.includes(tag) ? 'white' : theme.textColor
                    }
                    color={
                      activeTags?.includes(tag) ? tag.color : 'rgba(0,0,0,0)'
                    }
                    size={7}
                  />
                </TouchableOpacity>
              )
            })}
          </View>
          <IngredientForm
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
          <InstructionForm
            instructions={instructions}
            setInstructions={setInstructions}
          />
        </ScrollView>
      )}
      <ImageBackground
        source={CreateRecipeImage}
        style={{
          width: '100%',
          position: 'absolute',
          top: 0,

          height: normalize(40),
          alignItems: 'center',
          justifyContent: 'center',
        }}
      ></ImageBackground>
      <BackButton />
      <BottomButton
        text="Sauvegarder ma recette"
        icon="io-save"
        onPress={saveRecipe}
      />
    </SecondaryContainer>
  )
}

export default function ModifyRecipesScreen({ route }: any) {
  const recipe = useRecipe(route.params.recipeID)

  return (
    <SecondaryContainer
      style={{
        flex: 1,
      }}
    >
      {!recipe ? <ActivityIndicator /> : <ModifyRecipeFor reciper={recipe} />}
    </SecondaryContainer>
  )
}

const IngredientForm = ({ ingredients, setIngredients }: any) => {
  return (
    <>
      <Heading type="h3" text="Ingrédients:" />
      <View style={{ flexDirection: 'row' }}>
        <Heading style={{ flex: 1 }} type="h4" text="Quantités:" />
        <Heading style={{ flex: 1 }} type="h4" text="Nom:" />
      </View>
      <View>
        {ingredients.map(
          (ingr: any, index: number) =>
            ingr && (
              <IngredientFormElement
                key={index}
                index={index}
                ingr={ingr}
                setIngr={setIngredients}
              />
            ),
        )}
      </View>
      <Button
        preset="secondary"
        icon="add"
        text="Ajouter un ingrédient"
        onPress={() => {
          setIngredients((state) => [...state, { quantity: '', name: '' }])
        }}
      />
    </>
  )
}

const IngredientFormElement = ({ index, ingr, setIngr }: any) => {
  const updateIngredient = (index: number, quantity: string, name: string) => {
    setIngr((state) => {
      let newState = [...state]
      newState[index] = { quantity, name }
      return newState
    })
  }
  return (
    <View key={index} style={{ flexDirection: 'row' }}>
      <TextInput
        containerStyle={{ flex: 1 }}
        style={{ minWidth: 0 }}
        placeholder={`qté ${index + 1}`}
        text={ingr.quantity || ''}
        onChangeText={(text) => updateIngredient(index, text, ingr.name)}
      />
      <TextInput
        containerStyle={{ flex: 1 }}
        style={{ minWidth: 0 }}
        placeholder={`nom ${index + 1}`}
        text={ingr.name || ''}
        onChangeText={(text) => updateIngredient(index, ingr.quantity, text)}
      />
      <Button
        icon="delete"
        size={15}
        style={{ flex: 0.2 }}
        onPress={() => {
          setIngr((state) => {
            let newState = [...state]
            newState.splice(index, index)
            return newState
          })
        }}
      />
    </View>
  )
}

const InstructionForm = ({ instructions, setInstructions }: any) => {
  return (
    <>
      <Heading type="h3" text="Instructions:" />
      <View>
        {instructions.map((instr: any, index: number) => (
          <InstructionFormElement
            key={index}
            index={index}
            instr={instr}
            setInstructions={setInstructions}
          />
        ))}
      </View>
      <Button
        preset="secondary"
        icon="add"
        text="Ajouter une instruction"
        onPress={() => {
          setInstructions((state) => [...state, ''])
        }}
      />
    </>
  )
}

const InstructionFormElement = ({ index, instr, setInstructions }: any) => {
  const updateInstructions = (index: number, instruction: string) => {
    setInstructions((state) => {
      let newState = [...state]
      newState[index] = instruction
      return newState
    })
  }
  return (
    <View key={index} style={{ flexDirection: 'row' }}>
      <TextInput
        key={index}
        containerStyle={{ flex: 2 }}
        style={{ minWidth: 0 }}
        placeholder={`instruction ${index + 1}`}
        text={instr}
        onChangeText={(text) => updateInstructions(index, text)}
      />
      <Button
        icon="delete"
        size={15}
        style={{ flex: 0.2 }}
        onPress={() => {
          setInstructions((state) => {
            let newState = [...state]
            newState.splice(index, index)
            return newState
          })
        }}
      />
    </View>
  )
}
