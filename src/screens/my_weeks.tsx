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
import {
  ImageBackground,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native'
import { BottomButton } from '../components/bottom_button'
import { BackButton } from '../components/buttons/back_button'
import Container from '../components/container/main_container'
import SecondaryContainer from '../components/container/secondary_container'
import { ActivityIndicator } from '../components/loaders'
import { RecipePreview } from '../components/recipes/recipe_preview'
import { Tag } from '../components/tag'
import { SPACE } from '../const'
import { useActiveUser } from '../services/user'
import {
  useAllTags,
  useCooklists,
  usersAPI,
} from '../services/users_api/users_api'
import CreateRecipeImage from '../assets/img/header.jpg'

export default function WeeksScreen({ navigation }: any) {
  const [weekookList, setWeekookList] = useState()

  if (weekookList) {
    return (
      <ShowWeekookList
        weekookList={weekookList}
        onCancel={() => setWeekookList(undefined)}
      />
    )
  }

  return <ShowMyWeekookLists onShow={setWeekookList} />
}

export function ShowWeekookList({ weekookList, onCancel }: any) {
  const { normalize } = useNormalize()
  const linkTo = useLinkTo()
  const { user } = useActiveUser()
  const [name, setName] = useState('')

  const [recipes, setRecipes] = useState<any>(undefined)

  useEffect(() => {
    try {
      ;(async () => {
        const rec = await usersAPI.getRecipesFromRefs(weekookList.recipes)
        setRecipes(rec)
      })()
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <>
      <SecondaryContainer>
        <ScrollView
          style={{ flex: 1, marginTop: normalize(40), alignSelf: 'stretch' }}
        >
          {recipes === undefined ? (
            <ActivityIndicator />
          ) : (
            recipes.map((recipe: any, index: number) => (
              <RecipePreview key={index} {...recipe} />
            ))
          )}
        </ScrollView>
        <ImageBackground
          source={CreateRecipeImage}
          style={{
            width: '100%',
            position: 'absolute',
            top: 0,
            height: normalize(40),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Heading
            style={{ color: 'white' }}
            type="h2"
            text={weekookList.name}
          />
        </ImageBackground>
        <BackButton onPress={onCancel} />
      </SecondaryContainer>
      {/* <BottomButton
        icon="add"
        text="Show ingredients"
        onPress={() => {
          linkTo('/generator')
        }}
      /> */}
    </>
  )
}

export function ShowMyWeekookLists({ onShow }: any) {
  const { user } = useActiveUser()
  const linkTo = useLinkTo()
  const [weekookLists, setWeekookLists] = useState()
  const cooklists = useCooklists(user.uid)

  useEffect(() => {
    if (cooklists) {
      usersAPI
        .getLists(cooklists)
        .then((list) => {
          setWeekookLists(list)
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      setWeekookLists([])
    }
  }, [cooklists])

  return (
    <>
      <Container>
        <ScrollView style={{ flex: 1, alignSelf: 'stretch' }}>
          {weekookLists === undefined ? (
            <ActivityIndicator />
          ) : (
            weekookLists.map((kooklist: any, index: number) => (
              <KooklistPreview
                key={index}
                list={kooklist}
                listRef={user.cooklists[index]}
                onShow={onShow}
              />
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

const KooklistPreview = ({ list, listRef, onShow }: any) => {
  const theme = useTheme()
  const { user } = useActiveUser()
  const { normalize } = useNormalize()

  const onPress = () => {
    onShow(list)
  }

  return (
    <Pressable
      style={{
        width: '100%',
        borderColor: '#AAA',
        borderBottomWidth: normalize(1),
        paddingVertical: normalize(SPACE.smaller),
        paddingHorizontal: normalize(SPACE.small),
        flexDirection: 'row',
      }}
      onPress={onPress}
    >
      <View style={{ flex: 0.8 }}>
        <Heading type="h2" text={list.name} />
        <Text>
          <Text style={{ color: theme.color.primary }}>
            {list.recipes.length}
          </Text>{' '}
          recettes
        </Text>
      </View>
      <View
        style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}
      >
        <Button
          icon="delete"
          size={15}
          onPress={() => {
            usersAPI.removeList(user.uid, listRef)
          }}
        />
      </View>
    </Pressable>
  )
}
