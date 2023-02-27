import { Button, TextInput, useNormalize } from '@unboared/base-ui.all'
import { useState } from 'react'
import { View } from 'react-native'
import { WeekookAvatar } from '../../components/avatar'
import Container from '../../components/container/main_container'
import { ActivityIndicator } from '../../components/loaders'
import { useAuth } from '../../services/auth'
import { useActiveUser } from '../../services/user'

export const UserSelectionAndLaunch = () => {
  const { normalize } = useNormalize()
  const auth = useAuth((state) => state.auth)
  const initialLoading = useAuth((state) => state.initialLoading)
  const { createUser, user, loading, errorMessage } = useActiveUser()

  const launchUI = (username: string, avatar: string) => {
    createUser(auth.uid, username, avatar)
  }

  const [localUsername, setLocalUsername] = useState('')
  const localAvatar = `https://api.dicebear.com/5.x/lorelei-neutral/png?seed=${localUsername}`

  if (initialLoading) {
    return (
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 100,
          elevation: 100,
        }}
      >
        {/* <AuthContainer> */}
        <ActivityIndicator />
        {/* </AuthContainer> */}
      </View>
    )
  }

  return (
    <>
      {auth && !user && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 100,
            elevation: 100,
          }}
        >
          <Container
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <View
                style={{
                  flex: 1,
                  width:'100%', 
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <WeekookAvatar url={localAvatar} size={80} />
                <TextInput
                  label="Mon pseudo"
                  containerStyle={{ marginTop: normalize(40) }}
                  style={{ borderRadius: normalize(20) }}
                  minLength={3}
                  maxLength={12}
                  text={localUsername}
                  placeholder={'girolina ?'}
                  onChangeText={setLocalUsername}
                  //   helperText={errorMessage}
                />
                <Button
                  style={{ margin: 20 }}
                  text="Valider"
                  onPress={() => launchUI(localUsername, localAvatar)}
                />
              </View>
            )}
          </Container>
        </View>
      )}
    </>
  )
}
