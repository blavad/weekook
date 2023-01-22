import { Button, useNormalize } from '@unboared/base-ui.all'
import { ImageBackground, View } from 'react-native'
import { BottomButton } from '../components/bottom_button'
import { BackButton } from '../components/buttons/back_button'
import SecondaryContainer from '../components/container/secondary_container'

export default function RecipeScreen() {
  const { normalize } = useNormalize()

  const { name, image, seasons, author, favorite } = {
    name: 'Steak végétarien',
    image:
      'https://www.hervecuisine.com/wp-content/uploads/2020/04/recette-steak-ve%CC%81ge%CC%81tarien-1024x684.jpg',
    seasons: ['winter'],
    author: 'blavad',
    favorite: false,
  }

  return (
    <SecondaryContainer
      style={{
        flex: 1,
      }}
    >
      <ImageBackground
        source={{ uri: image }}
        style={{
          width: '100%',
          height: normalize(300),
          justifyContent: 'center',
        }}
      ></ImageBackground>
      <BackButton />
      <BottomButton text="Ajouter à ma liste" icon="add" />
    </SecondaryContainer>
  )
}
