import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Icon, PortraitMobileLayout, Heading } from '@unboared/base-ui.all';
import { Logo } from '@unboared/design.brand.logo';
import { useTheme } from '@unboared/utils.theme';

export type ChangeScreenOrientationPageProps = {
  /**
   * the target orientation ('portrait', 'landscape') 
   */
  to: 'landscape' | 'portrait'
}

export const ChangeScreenOrientationPage = ({ to }: ChangeScreenOrientationPageProps) => {
  const theme = useTheme(state => state.theme)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.backgroundColor }}>
      <PortraitMobileLayout header={(to === 'landscape') && <Logo size={30} />}>
        <View style={styles.content}>
          <Icon name='screenRotation' size={20} />
          <Heading type="h3" tx="common.orientationPage.message" />
        </View>
      </PortraitMobileLayout>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center'
  }
})