import React, { useEffect } from 'react'
import { Pressable, View, ViewStyle } from 'react-native'

import {
  useNormalize,
  Text,
  useScale,
  useTranslate,
  useTheme,
} from '@unboared/base-ui.all'

import { useMargin, GoogleSignIn } from '../signin'
import { EmailPasswordSignUp } from './components/email_password'
import { useAuth } from '../../../services/auth'
import { ActivityIndicator } from '../../../components/loaders'
import Container from '../../../components/container/main_container'
import { useLinkTo } from '@react-navigation/native'

/**
 * Sign in page.
 */
export const SignUp = () => {
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
              <EmailPasswordSignUp />
              <SignUpSeparator />
              <GoogleSignIn />
              <CreateAccount />
            </View>
          )}
        </View>
      </View>
    </Container>
  )
}

const CreateAccount = () => {
  const { translate } = useTranslate()
  const { largeMargin } = useMargin()

  const theme = useTheme()
  
  const linkTo = useLinkTo()
  const resetFields = useAuth((state) => state.resetFields)

  return (
    <Pressable
      onPress={() => {
        resetFields()
        linkTo('/login')
      }}
    >
      <Text
        style={{
          ...largeMargin,
          fontFamily: 'OpenSansBold',
          alignSelf: 'center',
        }}
      >
        {translate('common.signup.alreadyAccount.message')}{' '}
        <Text
          style={{
            color: theme.color.primary,
            fontFamily: 'OpenSansBold',
          }}
          tx="common.signup.alreadyAccount.login"
        />
      </Text>
    </Pressable>
  )
}

const SignUpSeparator = () => {
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

export default SignUp
