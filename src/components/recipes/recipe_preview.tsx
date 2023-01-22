import { Button, Heading, useNormalize } from '@unboared/base-ui.all'
import { ImageBackground, Pressable, View } from 'react-native'
import { FavoriteButton } from '@unboared/design.system.system_action_button'
import { useLinkTo } from '@react-navigation/native'
import { SPACE } from '../../const'
import { Tag } from '../tag'

const IMG_WIDTH = 90
const IMG_HEIGHT = 90

export const RecipePreview = ({
  name,
  ingredients,
  instructions,
  tags,
  author,
}: any) => {
  const linkTo = useLinkTo()
  console.log(tags)
  const { normalize } = useNormalize()
  const { image, favorite } = {
    image:
      'https://www.hervecuisine.com/wp-content/uploads/2020/04/recette-steak-ve%CC%81ge%CC%81tarien-1024x684.jpg',
    favorite: true,
  }

  return (
    <Pressable
      style={{
        width: '100%',
        // paddingVertical:normalize(5),
        borderColor: '#AAA',
        borderBottomWidth: normalize(1),
        // borderTopWidth: normalize(1),
        padding: normalize(SPACE.small),
      }}
      onPress={() => {
        linkTo(`/recipe/${id}`)
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Heading type="h3">{name}</Heading>
        <FavoriteButton size={15} onPress={() => {}} active={favorite} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingTop: normalize(2),
          paddingBottom: normalize(SPACE.tiny),
        }}
      >
        {tags.map((tag: any, index: number) => (
          <Tag
            key={index}
            text={`${tag.icon} ${tag.name}`}
            color={tag.color}
            size={7}
          />
        ))}
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            margin:normalize(SPACE.tiny),
            flex: 1,
          }}
        >
          <ImageBackground
            source={{ uri: image }}
            resizeMode="cover"
            style={{
              alignItems: 'flex-end',
              width: normalize(IMG_WIDTH),
              height: normalize(IMG_HEIGHT),
            }}
          >
            <Heading style={{ top: -normalize(SPACE.tiny) }} type="h3">
              📌
            </Heading>
          </ImageBackground>
        </View>

        <View
          style={{
            flex: 1,
          }}
        ></View>
      </View>
    </Pressable>
  )
}
