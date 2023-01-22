import { Button, useNormalize } from '@unboared/base-ui.all'
import { View } from 'react-native'
import { SPACE } from '../const'
import { Logo } from './logo'

export const Header = ({ style }: any) => {
  const { normalize } = useNormalize()
  const customStyle = [
    {
      flex: 1,
      paddingHorizontal: normalize(SPACE.small),
      paddingVertical: normalize(SPACE.tiny),
      alignSelf: 'stretch',
      //   position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderColor: '#AAA',
        borderBottomWidth: normalize(1),
        
    },
    style,
  ]
  
  return (
    <View style={customStyle}>
      <View style={{ justifyContent: 'center' }}>
        <Logo size={20} />
      </View>
    </View>
  )
}
