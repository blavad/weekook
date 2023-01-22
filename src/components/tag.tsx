import {
  Button,
  Heading,
  Text,
  transparency,
  useNormalize,
} from '@unboared/base-ui.all'
import { View } from 'react-native'

export const Tag = ({ text, color, size = 10 }: any) => {
  const { normalize } = useNormalize()
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color,
        borderRadius: normalize(size),
        paddingHorizontal: normalize(size / 2),
      }}
    >
      <Heading
        style={{ color:'white',fontFamily: 'GoodDogRegular', fontSize: normalize(size) }}
      >
        {text}
      </Heading>
    </View>
  )
}
