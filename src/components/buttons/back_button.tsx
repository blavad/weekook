import { Button, transparency, useNormalize } from '@unboared/base-ui.all'
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import { SPACE } from '../../const'

export const BackButton = () => {
  const navigation = useNavigation()
  const { normalize } = useNormalize()
  return (
    <View
      style={{
        position: 'absolute',
        left: normalize(SPACE.small),
        top: normalize(SPACE.small),
      }}
    >
      <Button
        icon="back"
        size={15}
        style={{
          paddingLeft: normalize(SPACE.small),
          backgroundColor: transparency('dark', 0.3),
        }}
        // preset='secondary'
        onPress={() => {
          navigation.goBack()
        }}
      />
    </View>
  )
}
