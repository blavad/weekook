import {
  Button,
  Heading,
  Text,
  size,
  space,
  useNormalize,
  useTheme,
} from '@unboared/base-ui.all'

import { ImageBackground, Pressable, View } from 'react-native'
import { FavoriteButton } from '@unboared/design.system.system_action_button'
import { useLinkTo } from '@react-navigation/native'
import { SPACE } from '../../const'
import { Tag } from '../tag'
import { WeekookUserIcon } from '../avatar'
import { useActiveUser } from '../../services/user'
import { usersAPI } from '../../services/users_api'

const IMG_WIDTH = 90
const IMG_HEIGHT = 90

export const RecipePreview = ({
  name,
  id,
  ingredients,
  instructions,
  tags,
  author,
  images,
  canLike,
}: any) => {
  
  const theme = useTheme()
  const linkTo = useLinkTo()
  const { normalize } = useNormalize()

  const { user: me } = useActiveUser()
  // const isMyRecipe = me.uid === author.uid
  const isInMyFavoriteList =
    me.favorites.filter((rec) => rec.id === id).length > 0

  return (
    <Pressable
      style={{
        width: '100%',
        borderColor: '#AAA',
        borderBottomWidth: normalize(1),
        paddingVertical: normalize(SPACE.smaller),
        paddingHorizontal: normalize(SPACE.small),
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
        <Heading type="h2">{name}</Heading>
        {canLike && (
          <FavoriteButton
            size={25}
            onPress={() => {
              if (isInMyFavoriteList) {
                usersAPI.removeToFavorites(me.uid, me.favorites, id)
              } else {
                usersAPI.addToFavorites(me.uid, me.favorites, id)
              }
            }}
            active={isInMyFavoriteList}
          />
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
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
            margin: normalize(SPACE.tiny),
            flex: 1,
          }}
        >
          <ImageBackground
            source={{
              uri:
                images?.urls[0] ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRwf0iITCRUp4KFzElJ-ayOb_AIG7ia8VpEA&usqp=CAU',
            }}
            resizeMode="cover"
            style={{
              alignItems: 'flex-end',
              flexDirection: 'row',
              width: normalize(IMG_WIDTH),
              height: normalize(IMG_HEIGHT),
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: '#FFFFFF80',
                padding: normalize(SPACE.tiny),
                flexDirection: 'row',
                alignItems: 'flex-start',
              }}
            >
              <View>
                <Text style={{ fontSize: normalize(5) }}>Créé par</Text>
                <WeekookUserIcon
                  username={author.username}
                  avatar={author.avatar}
                  size={5}
                />
              </View>
            </View>
          </ImageBackground>
        </View>

        <View
          style={{
            flex: 1,
            padding: normalize(SPACE.tiny),
          }}
        >
          {ingredients
            .slice(0, ingredients.length == 6 ? 6 : 5)
            .map((ingredient: any, index: number) => (
              <Text
                numberOfLines={1}
                key={index}
                style={{ marginVertical: 2.5 }}
              >
                • {ingredient.quantity} {ingredient.name}
              </Text>
            ))}
          {ingredients.length > 6 && (
            <Text preset="light" style={{ marginVertical: 2.5 }}>
              ••• +{ingredients.length - 5} ingrédients •••
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  )
}
