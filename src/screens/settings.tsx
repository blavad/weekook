import { BottomButton } from '../components/bottom_button'
import Container from '../components/container/main_container'
import { useAuth } from '../services/auth'

export default function SettingsScreen({ navigation }: any) {
  const { logout } = useAuth()

  return (
    <Container>
      <BottomButton icon="" text="Se déconnecter" onPress={logout} />
    </Container>
  )
}
