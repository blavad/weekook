import { Image } from 'react-native'
import { useNormalize } from '@unboared/base-ui.all'

export const WeekookAvatar = ({ url, size = 60 }: any) => {
  const { normalize } = useNormalize()
  return (
    <Image
      style={{
        width: normalize(size),
        height: normalize(size),
        borderRadius: normalize(size ),
      }}
      source={{
        uri: url,
      }}
    />
  )
}
