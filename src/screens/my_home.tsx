import Container from '../components/container/main_container'
import { ActivityIndicator } from '../components/loaders'
import { useActiveUser } from '../services/user'
import { RecipesForUser } from './recipes'

export default function MyHomeScreen({ navigation, route }: any) {
  const { user } = useActiveUser()
  if (!user) {
    return (
      <Container style={{ justifyContent: 'center' }}>
        <ActivityIndicator />
      </Container>
    )
  }
  return <RecipesForUser userID={user.uid} />
}

