import { Button, useNormalize } from '@unboared/base-ui.all'
import { View } from 'react-native'
import { Logo } from './logo'

export const Header = ({ style }: any) => {
  const { normalize } = useNormalize()
  const customStyle = [
    {
      flex: 1,
      paddingHorizontal: normalize(20),
      alignSelf: 'stretch',
      //   position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    style,
  ]

  return (
    <View style={customStyle}>
      <View style={{ justifyContent: 'center' }}>
        <Logo />
      </View>
      {/* <Button text="hello" /> */}
    </View>
  )
}
