import {
  Button,
  CheckBox,
  Heading,
  TextInput,
  useNormalize,
  useTheme,
} from '@unboared/base-ui.all'

import { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { BottomButton } from '../components/bottom_button'
import Container from '../components/container/main_container'
import { Tag } from '../components/tag'
import { SPACE } from '../const'
import { useAllTags } from '../services/users_api/users_api'

export default function GeneratorScreen({ navigation }: any) {
  const { normalize } = useNormalize()

  const [numRecipes, setNumRecipes] = useState('4')

  const tags = useAllTags()
  const [activeTags, setActiveTags] = useState([])
  const [inFavorite, setInFavorite] = useState(false)

  return (
    <Container
      style={{ padding: normalize(SPACE.small), alignItems: 'flex-start' }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: normalize(SPACE.small),
        }}
      >
        <Heading
          type="h3"
          text="Nombre de recettes"
          style={{ marginRight: normalize(SPACE.small) }}
        />
        <TextInput
          text={numRecipes}
          onChangeText={setNumRecipes}
          containerStyle={{ width: normalize(1) }}
          keyboardType="numeric"
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: normalize(SPACE.small),
        }}
      >
        <Heading
          type="h3"
          text="Favoris ?"
          style={{ marginRight: normalize(SPACE.small) }}
        />
        <CheckBox
          value={inFavorite}
          onValueChange={() => setInFavorite((state) => !state)}
          size={10}
        />
      </View>

      <View
        style={{
          // flexDirection: 'row',
          // alignItems: 'center',
          flexWrap: 'wrap',
          marginVertical: normalize(SPACE.small),
        }}
      >
        <Heading
          type="h3"
          text="Tags (tous par défaut)"
          style={{ marginRight: normalize(SPACE.small) }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginVertical: normalize(SPACE.small),
          }}
        >
          {tags.map((tag: any, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setActiveTags((state) => {
                    let newState = [...state]
                    if (newState.includes(tag)) {
                      newState = newState.filter((el) => el !== tag)
                    } else {
                      newState.push(tag)
                    }
                    return newState
                  })
                }}
              >
                <Tag
                  style={{ margin: normalize(SPACE.tiny) }}
                  text={`${tag.icon} ${tag.name}`}
                  textColor={activeTags?.includes(tag) ? 'white' : 'black'}
                  color={
                    activeTags?.includes(tag) ? tag.color : 'rgba(0,0,0,0)'
                  }
                  size={7}
                />
              </TouchableOpacity>
            )
          })}
        </View>
      </View>

      <BottomButton
        icon="fa-random"
        text="Générer la semaine"
        onPress={() => {}}
      />
    </Container>
  )
}
