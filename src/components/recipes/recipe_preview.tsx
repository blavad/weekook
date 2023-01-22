import { Heading, useNormalize } from '@unboared/base-ui.all'
import { ImageBackground, Pressable, View } from 'react-native'
import { FavoriteButton } from '@unboared/design.system.system_action_button'
import { useLinkTo } from '@react-navigation/native'

export const RecipePreview = ({ id }: any) => {
  const linkTo = useLinkTo()
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
    <Pressable
      style={{
        width: '100%',
        // paddingVertical:normalize(5),
        borderColor: '#AAA',
        borderBottomWidth: normalize(2),
        borderTopWidth: normalize(2),
      }}
      onPress={() => {
        linkTo(`/recipe/${id}`)
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: normalize(10),
        }}
      >
        <Heading type="h2">{name}</Heading>
        <FavoriteButton onPress={() => {}} active={favorite} />
      </View>
      <ImageBackground
        source={{ uri: image }}
        style={{
          width: '100%',
          height: normalize(200),
          justifyContent: 'center',
        }}
      ></ImageBackground>
    </Pressable>
  )
}
