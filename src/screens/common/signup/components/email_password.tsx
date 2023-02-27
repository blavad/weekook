import React, { useState } from 'react'
import {
  Button,
  Heading,
  Text,
  TextInput,
  useNormalize,
  useTranslate,
} from '@unboared/base-ui.all'
import { useMargin } from '../../signin'
import { TermsConditions } from './terms_conditions'
import { strengthChecker } from '../const'
import { useAuth } from '../../../../services/auth'

export const EmailPasswordSignUp = () => {
  const { normalize } = useNormalize()
  const { translate } = useTranslate()
  const { smallMargin, mediumMargin, largeMargin } = useMargin()

  const [newletterSubscription, setNewsletteSubscription] = useState(false)
  const [visible, setVisibility] = React.useState({ name: 'eye-off' })

  const {
    signup,
    email,
    password,
    changeEmail,
    changePassword,
    emailErrorMessage,
    passwordErrorMessage,
  } = useAuth()

  const strengthPassword = strengthChecker(password)

  const ToggleVisibilty = () => {
    if (visible.name === 'eye') {
      setVisibility({ name: 'eye-off' })
    } else {
      setVisibility({ name: 'eye' })
    }
  }

  const secureTextEntry = () => {
    if (visible.name === 'eye') {
      return false
    } else if (visible.name === 'eye-off') {
      return true
    }
  }

  return (
    <>
      <Heading type="h2" tx="common.signup.title" />
      <Text style={smallMargin} tx="common.signup.description" />
      <TextInput
        style={{ height: normalize(30) }}
        containerStyle={mediumMargin}
        text={email}
        onChangeText={changeEmail}
        label={translate('common.signin.email_password.email.label')}
        textContentType="emailAddress"
        placeholder={translate(
          'common.signin.email_password.email.placeholder',
        )}
        returnKeyType="next"
        helperText={translate(emailErrorMessage)}
        warning={emailErrorMessage}
      />
      <TextInput
        style={{ height: normalize(30) }}
        containerStyle={mediumMargin}
        text={password}
        onChangeText={changePassword}
        label={translate('common.signin.email_password.password.label')}
        placeholder={translate(
          'common.signin.email_password.password.placeholder',
        )}
        returnKeyType="go"
        secureTextEntry={secureTextEntry()}
        textContentType="password"
        keyboardType="default"
        autoCorrect={false}
        helperText={
          translate(passwordErrorMessage) ||
          (password.length > 0
            ? `Security Level : ${strengthPassword.type}`
            : undefined)
        }
        warning={passwordErrorMessage}
      />

      {/* <TermsConditions
                icon="io-cloud-outline"
                txTitle="common.signup.terms.conditions.title"
                txDescription="common.signup.terms.conditions.description"
                checked
                disabled
            />

            <TermsConditions
                checked={newletterSubscription}
                onValueChange={setNewsletteSubscription}
                icon="io-card-outline"
                txTitle="common.signup.terms.newsletter.title"
                txDescription="common.signup.terms.newsletter.description"
            /> */}
      <Button
        style={smallMargin}
        tx="common.signin.email_password.submitButton"
        onPress={() => signup(newletterSubscription)}
      />
    </>
  )
}
