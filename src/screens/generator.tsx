import { Button, useNormalize } from '@unboared/base-ui.all'
import { View } from 'react-native'
import { BottomButton } from '../components/bottom_button'
import Container from '../components/container/main_container'

export default function RecipesScreen({ navigation }: any) {
  const { normalize } = useNormalize()

  return (
    <Container>
      <BottomButton
        icon="fa-random"
        text="Générer la semaine"
        onPress={() => {}}
      />
    </Container>
  )
}
