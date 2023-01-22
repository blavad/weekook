import { View } from 'react-native'
import { Button, Heading, useNormalize } from '@unboared/base-ui.all'
import Container from '../components/container/main_container'
import { BottomButton } from '../components/bottom_button'
import { RecipePreview } from '../components/recipes/recipe_preview'
import { ScrollView } from 'react-native-gesture-handler'

export default function RecipesScreen({ navigation }: any) {
  const { normalize } = useNormalize()

  return (
    <>
      <Container>
        <ScrollView style={{flex:1, alignSelf:'stretch'}}>
        <RecipePreview id="100" />
        {/* <RecipePreview id="100" />
        <RecipePreview id="100" />
        <RecipePreview id="100" />
        <RecipePreview id="100" />
        <RecipePreview id="100" /> */}
        </ScrollView>
      </Container>
      <BottomButton icon="add" text="Nouvelle recette" onPress={() => {}} />
    </>
  )
}
