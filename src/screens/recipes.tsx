import { View } from 'react-native'
import { Button, Heading, useNormalize } from '@unboared/base-ui.all'
import Container from '../components/container/main_container'
import { BottomButton } from '../components/bottom_button'
import { RecipePreview } from '../components/recipes/recipe_preview'
import { ScrollView } from 'react-native'
import { useRecipes, useUser } from '../services/users_api/users_api'
import { ActivityIndicator } from '../components/loaders'
import { useActiveUser } from '../services/user'

export default function RecipesScreen({ navigation, route }: any) {
  const { normalize } = useNormalize()
  const { user } = useActiveUser()
  // const isMe = !(route.params.userID && route.params.userID !== 'undefined')
  // const uid = isMe ? route.params.userID : user.uid
  const recipes = useRecipes(user.uid)

  return (
    <>
      <Container>
        <ScrollView style={{ flex: 1, alignSelf: 'stretch' }}>
          {recipes.length === 0 ? (
            <ActivityIndicator />
          ) : (
            recipes.map((recipe: any, index: number) => (
              <RecipePreview key={{ index }} {...recipe} />
            ))
          )}
        </ScrollView>
      </Container>
      <BottomButton icon="add" text="Nouvelle recette" onPress={() => {}} />
    </>
  )
}
