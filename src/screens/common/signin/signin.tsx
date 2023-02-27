import React, { useEffect } from 'react'
import { Pressable, View, ViewStyle } from 'react-native'

import {
  useNormalize,
  useTranslate,
  accent_color,
  Text,
  useTheme,
} from '@unboared/base-ui.all'

import { useMargin } from './hooks/useMargin'
import { EmailPasswordSignIn } from './components/email_password'
import { GoogleSignIn } from './components/google'
import { useAuth } from '../../../services/auth'
import { ActivityIndicator } from '../../../components/loaders'
import { useLinkTo } from '@react-navigation/native'
import Container from '../../../components/container/main_container'

/**
 * Sign in page.
 */
export const SignIn = () => {
  const loading = useAuth((state) => state.loading)

  const styles = {
    container: {
      flexDirection: 'row',
    } as ViewStyle,
    flexCenter: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
    content: {
      minWidth:"80%",
      maxWidth:"80%",
      justifyContent: 'center',
    } as ViewStyle,
  }

  return (
    <Container>
      <View style={[styles.flexCenter, styles.container]}>
        <View style={styles.flexCenter}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.content}>
              <EmailPasswordSignIn />
              <Separator />
              <GoogleSignIn />
              <CreateAccountLink />
            </View>
          )}
        </View>
      </View>
    </Container>
  )
}

/**
 * The link to the signup page.
 */
const CreateAccountLink = () => {
  const { translate } = useTranslate()
  const { largeMargin } = useMargin()
  const theme = useTheme()

  const linkTo = useLinkTo()
  const resetFields = useAuth((state) => state.resetFields)

  return (
    <Pressable
      onPress={() => {
        resetFields()
        linkTo('/signup')
      }}
    >
      <Text
        style={{
          ...largeMargin,
          fontFamily: 'OpenSansBold',
          alignSelf: 'center',
        }}
      >
        {translate('common.signin.noAccount.message')}{' '}
        <Text
          style={{
            color: theme.color.primary,
            fontFamily: 'OpenSansBold',
          }}
          tx="common.signin.noAccount.createAccount"
        />
      </Text>
    </Pressable>
  )
}

const Separator = () => {
  const theme = useTheme()
  const { normalize } = useNormalize()
  const { smallMargin } = useMargin()

  return (
    <Text
      preset="light"
      tx="common.signin.or"
      style={{
        ...smallMargin,
        fontSize: normalize(theme.sizeH4),
        alignSelf: 'center',
        fontFamily: 'OpenSansBold',
      }}
    />
  )
}

export default SignIn
