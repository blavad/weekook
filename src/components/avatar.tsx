import { Image, View } from 'react-native'
import { Heading, useNormalize } from '@unboared/base-ui.all'

export const WeekookAvatar = ({ url, size = 60 }: any) => {
  const { normalize } = useNormalize()
  return (
    <Image
      style={{
        width: normalize(size),
        height: normalize(size),
        borderRadius: normalize(size),
      }}
      source={{
        uri: url,
      }}
    />
  )
}

export const WeekookUserIcon = ({
  avatar,
  username,
  size = 5,
  style,
}: {
  avatar: string
  username: string
  size?: number
  style?: any
}) => {
  const { normalize } = useNormalize()
  return (
    <View
      style={[
        {
          alignItems: 'center',
        },
        style,
      ]}
    >
      <WeekookAvatar size={normalize(size)} url={avatar} />
      <Heading type="h5" style={{ fontSize: normalize(size) }}>
        {username}
      </Heading>
    </View>
  )
}
