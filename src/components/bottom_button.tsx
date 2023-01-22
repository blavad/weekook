import { Button, useNormalize } from "@unboared/base-ui.all"
import { View } from "react-native"

export const BottomButton = ({ icon, text, onPress }: any) => {
  const { normalize } = useNormalize()
  return (
    <View
      style={{
        position: 'absolute',
        alignSelf: 'center',
        bottom: normalize(15),
      }}
    >
      <Button icon={icon} size={25} text={text} onPress={onPress} />
    </View>
  )
}
