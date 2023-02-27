import { Heading, Text, useTheme } from '@unboared/base-ui.all'
import { View } from 'react-native'
import { WeekookAvatar } from '../components/avatar'
import { BottomButton } from '../components/bottom_button'
import Container from '../components/container/main_container'
import { useAuth } from '../services/auth'
import { useActiveUser } from '../services/user'

export default function SettingsScreen({ navigation }: any) {
  const { logout } = useAuth()
  const { user } = useActiveUser()
  const theme = useTheme()

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
        <Text>
          <Text style={{ color: theme.color.primary }}>
            {user.recipes.length}
          </Text>{' '}
          recettes
        </Text>
        <Text>
          <Text style={{ color: theme.color.primary }}>
            {user.favorites.length}
          </Text>{' '}
          recettes favorites
        </Text>
      </View>

      <BottomButton icon="md-logout" text="Se déconnecter" onPress={logout} />
    </Container>
  )
}
