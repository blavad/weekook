import { useLinkTo } from '@react-navigation/native'
import {
  Button,
  CheckBox,
  Heading,
  TextInput,
  useNormalize,
  useTheme,
  Theme,
  Text,
  color,
} from '@unboared/base-ui.all'

import { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { BottomButton } from '../components/bottom_button'
import Container from '../components/container/main_container'
import { ActivityIndicator } from '../components/loaders'
import { RecipePreview } from '../components/recipes/recipe_preview'
import { Tag } from '../components/tag'
import { SPACE } from '../const'
import { useActiveUser } from '../services/user'
import { useAllTags, usersAPI } from '../services/users_api/users_api'

export default function GeneratorScreen({ navigation }: any) {
  const [weekookList, setWeekookList] = useState()

  if (weekookList) {
    return <ShowWeekookList weekookList={weekookList} />
  }
  return <GeneratorConfigScreen onGenerated={setWeekookList} />
}

export function ShowWeekookList({ weekookList }: any) {
  const { normalize } = useNormalize()
  const linkTo = useLinkTo()
  const { user } = useActiveUser()
  const [name, setName] = useState('')

  const [recipes, setRecipes] = useState<any>(undefined)

  useEffect(() => {
    try {
      ;(async () => {
        const rec = await usersAPI.getRecipesFromRefs(weekookList)
        setRecipes(rec)
      })()
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <>
      <Container>
        <View
          style={{
            padding: normalize(SPACE.small), 
            flexDirection: 'row',
            alignSelf: 'flex-start',
            alignItems: 'center',
            marginVertical: normalize(SPACE.small),
          }}
        >
          <Heading
            type="h3"
            text="Nommer ma semaine"
            style={{ marginRight: normalize(SPACE.small) }}
          />
          <TextInput
            text={name}
            onChangeText={setName}
            containerStyle={{ width: normalize(1) }}
            keyboardType="numeric"
          />
        </View>
        <ScrollView style={{ flex: 1, alignSelf: 'stretch' }}>
          {recipes === undefined ? (
            <ActivityIndicator />
          ) : (
            recipes.map((recipe: any, index: number) => (
              <RecipePreview key={index} {...recipe} />
            ))
          )}
        </ScrollView>
      </Container>
      <BottomButton
        icon="io-save"
        text="Sauvegarder ma semaine"
        onPress={() => {
          usersAPI.createWeekookList(user.uid, name, weekookList)
          linkTo('/home')
        }}
      />
    </>
  )
}

export function GeneratorConfigScreen({ onGenerated }: any) {
  const { normalize } = useNormalize()
  const theme = useTheme() as Theme
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [numRecipes, setNumRecipes] = useState('4')

  const { user } = useActiveUser()
  const tags = useAllTags()
  const [activeTags, setActiveTags] = useState([])
  const [inFavorite, setInFavorite] = useState(false)

  const generateWeekookList = () => {
    setLoading(true)
    usersAPI
      .generateWeekookList(
        user.uid,
        inFavorite,
        activeTags.length > 0
          ? activeTags.map((tag) => tag.name)
          : tags.map((tag) => tag.name),
        parseInt(numRecipes),
      )
      .then((weekookList: any) => {
        onGenerated(weekookList)
      })
      .catch((error) => {
        setErrorMessage(error)
        console.error('Erreur lors de la génération de Weekooklist.', error)
      })
    setLoading(false)
  }

  if (loading) {
    return (
      <Container>
        <ActivityIndicator />
      </Container>
    )
  }

  return (
    <Container
      style={{ padding: normalize(SPACE.small), alignItems: 'flex-start' }}
    >
      {errorMessage && (
        <Text text={errorMessage} style={{ color: color.warning }} />
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: normalize(SPACE.small),
        }}
      >
        <Heading
          type="h3"
          text="Nombre de recettes"
          style={{ marginRight: normalize(SPACE.small) }}
        />
        <TextInput
          text={numRecipes}
          onChangeText={setNumRecipes}
          containerStyle={{ width: normalize(1) }}
          keyboardType="numeric"
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: normalize(SPACE.small),
        }}
      >
        <Heading
          type="h3"
          text="Favoris ?"
          style={{ marginRight: normalize(SPACE.small) }}
        />
        <CheckBox
          value={inFavorite}
          onValueChange={() => setInFavorite((state) => !state)}
          size={10}
        />
      </View>

      <View
        style={{
          // flexDirection: 'row',
          // alignItems: 'center',
          flexWrap: 'wrap',
          marginVertical: normalize(SPACE.small),
        }}
      >
        <Heading
          type="h3"
          text="Tags (tous par défaut)"
          style={{ marginRight: normalize(SPACE.small) }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginVertical: normalize(SPACE.small),
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
      </View>

      <BottomButton
        icon="fa-random"
        text="Générer la semaine"
        onPress={generateWeekookList}
      />
    </Container>
  )
}
