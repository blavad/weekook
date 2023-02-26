import {
  color,
  Heading,
  palette,
  Text,
  useNormalize,
} from '@unboared/base-ui.all'
import { ImageBackground, ScrollView, View } from 'react-native'
import { WeekookUserIcon } from '../components/avatar'
import { BottomButton } from '../components/bottom_button'
import { BackButton } from '../components/buttons/back_button'
import SecondaryContainer from '../components/container/secondary_container'
import { ActivityIndicator } from '../components/loaders'
import { Tag } from '../components/tag'
import { SPACE } from '../const'
import { useActiveUser } from '../services/user'
import { useRecipe, usersAPI } from '../services/users_api/users_api'

export default function RecipeScreen({ navigation, route }: any) {
  const { normalize } = useNormalize()
  const recipe = useRecipe(route.params.recipeID)
  const { user: me } = useActiveUser()
  const isMyRecipe = recipe && me.uid === recipe.author.uid
  const isInMyList =
    recipe && me.recipes.filter((rec) => rec.id === recipe.id).length > 0

  const addToMyList = () => {
    usersAPI.addToList(me.uid, recipe.id)
  }

  const removeFromList = () => {
    usersAPI.removeFromList(me.uid, recipe.id)
  }

  let MyBottomButton
  if (!recipe || isMyRecipe) {
    MyBottomButton = <></>
  } else {
    if (isInMyList) {
      MyBottomButton = (
        <BottomButton
          color={palette.yellow.c500}
          text="Supprimer de ma liste"
          icon="delete"
          onPress={removeFromList}
        />
      )
    } else {
      MyBottomButton = (
        <BottomButton
          text="Ajouter à ma liste"
          icon="add"
          onPress={addToMyList}
        />
      )
    }
  }

  return (
    <SecondaryContainer
      style={{
        flex: 1,
      }}
    >
      {!recipe ? (
        <ActivityIndicator />
      ) : (
        <ScrollView style={{ flex: 1, alignSelf: 'stretch' }}>
          <ImageBackground
            source={{ uri: recipe.images.urls[0] }}
            style={{
              width: '100%',
              height: normalize(150),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Heading style={{ fontSize: normalize(25), color: 'white' }}>
              {recipe.name}
            </Heading>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                flexDirection: 'row',
                paddingBottom: normalize(SPACE.tiny),
              }}
            >
              {recipe.tags.map((tag: any, index: number) => (
                <Tag
                  key={index}
                  style={{ marginHorizontal: normalize(SPACE.tiny) }}
                  text={`${tag.icon} ${tag.name}`}
                  color={tag.color}
                  size={7}
                />
              ))}
            </View>
            <View>
              <Text style={{ fontSize: normalize(10) }}>Créé par</Text>
              <WeekookUserIcon
                size={10}
                username={recipe.author.username}
                avatar={recipe.author.avatar}
              />
            </View>
          </ImageBackground>
          <View style={{ padding: normalize(SPACE.small) }}>
            <Heading type="h3" text="Ingrédients:" />
            <View>
              {recipe.ingredients.map((ingr, index) => (
                <Text key={index} style={{ marginVertical: 2.5 }}>
                  • {ingr.quantity} {ingr.name}
                </Text>
              ))}
            </View>
            <Heading
              style={{ marginTop: normalize(SPACE.smaller) }}
              type="h3"
              text="Instructions:"
            />
            <View>
              {recipe.instructions.map((instr, index) => (
                <Text key={index} style={{ marginVertical: 2.5 }}>
                  • {instr}
                </Text>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
      <BackButton />
      {MyBottomButton}
    </SecondaryContainer>
  )
}
