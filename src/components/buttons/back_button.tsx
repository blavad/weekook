import { Button, transparency, useNormalize } from '@unboared/base-ui.all'
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'

export const BackButton = () => {
  const navigation = useNavigation()
  const { normalize } = useNormalize()
  return (
    <View
      style={{
        position: 'absolute',
        left: normalize(20),
        top: normalize(20),
      }}
    >
      <Button
        icon="back"
        style={{paddingLeft:normalize(10),backgroundColor:transparency('dark', 0.3)}}
        // preset='secondary'
        onPress={() => {
          navigation.goBack()
        }}
      />
    </View>
  )
}
