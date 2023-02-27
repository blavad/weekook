import { Heading } from '@unboared/base-ui.all'
import { View } from 'react-native'
import { WeekookAvatar } from '../components/avatar'
import { BottomButton } from '../components/bottom_button'
import Container from '../components/container/main_container'
import { useAuth } from '../services/auth'
import { useActiveUser } from '../services/user'

export default function SettingsScreen({ navigation }: any) {
  const { logout } = useAuth()
  const { user } = useActiveUser()

  return (
    <Container>
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <WeekookAvatar url={user.avatar} size={80} />
        <Heading type="h2" text={user.username} />
      </View>

      <BottomButton icon="md-logout" text="Se déconnecter" onPress={logout} />
    </Container>
  )
}
