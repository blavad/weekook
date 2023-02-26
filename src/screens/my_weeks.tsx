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

export default function WeeksScreen({ navigation }: any) {
  const [weekookList, setWeekookList] = useState()
  return <ShowWeekookList weekookList={[]} />
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
        icon="add"
        text="Ajouter une semaine"
        onPress={() => {
          linkTo('/generator')
        }}
      />
    </>
  )
}
