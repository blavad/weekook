import { View } from 'react-native'
import { Button, Heading, useNormalize } from '@unboared/base-ui.all'
import Container from '../components/container/main_container'
import { BottomButton } from '../components/bottom_button'
import { RecipePreview } from '../components/recipes/recipe_preview'
import { ScrollView } from 'react-native'
import { useRecipes, useUser } from '../services/users_api/users_api'
import { ActivityIndicator } from '../components/loaders'
import { useActiveUser } from '../services/user'
import { useLinkTo } from '@react-navigation/native'

export function RecipesForUser({ userID }: { userID: string }) {
  const { user: me } = useActiveUser()
  const recipes = useRecipes(userID)

  const linkTo = useLinkTo()

  return (
    <>
      <Container>
        <ScrollView style={{ flex: 1, alignSelf: 'stretch' }}>
          {recipes.length === 0 ? (
            <ActivityIndicator />
          ) : (
            recipes.map((recipe: any, index: number) => (
              <RecipePreview
                key={{ index }}
                {...recipe}
                canLike={me.uid === userID}
              />
            ))
          )}
        </ScrollView>
      </Container>
      <BottomButton
        icon="add"
        text="Nouvelle recette"
        onPress={() => {
          linkTo('/create')
        }}
      />
    </>
  )
}

export default function RecipesScreen({ route }: any) {
  return <RecipesForUser userID={route.params.userID} />
}
