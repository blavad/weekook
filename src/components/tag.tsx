import {
  Button,
  Heading,
  Text,
  transparency,
  useNormalize,
} from '@unboared/base-ui.all'
import { View } from 'react-native'

export const Tag = ({ text, color, textColor, size = 7, style }: any) => {
  const { normalize } = useNormalize()

  const customStyle = [
    {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color,
      borderRadius: normalize(size),
      paddingHorizontal: normalize(size / 2),
    },
    style,
  ]

  return (
    <View
      style={customStyle}
    >
      <Heading type="h2" style={{ color: textColor || 'white', fontSize: normalize(size) }}>
        {text}
      </Heading>
    </View>
  )
}
