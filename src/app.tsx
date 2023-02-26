import React, { useCallback } from 'react'
import * as Linking from 'expo-linking'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ThemeProvider, useGamepadScale, useTheme } from '@unboared/base-ui.all'
import MyHomeScreen from './screens/my_home'
import RecipesScreen from './screens/recipes'
import RecipeScreen from './screens/recipe'
import CreateRecipeScreen from './screens/create_recipe'
import GeneratorScreen from './screens/generator'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Appearance } from 'react-native'

import * as SplashScreen from 'expo-splash-screen'
// import * as SplashScreen from 'expo-splash-screen'
import { useAuth, useAuthManager } from './services/auth'
// import { useActiveUserManager } from './services/user'
import { SignUp } from './screens/common/signup'
import { weekookDarkTheme, weekookLightTheme } from './theme/theme'
import { useActiveUser, useActiveUserManager } from './services/user'
import { UserSelectionAndLaunch } from './screens/user_selection/user_selection'
import ModifyRecipesScreen from './screens/modify_recipe'
import SettingsScreen from './screens/settings'

SplashScreen.preventAutoHideAsync()

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyHome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MyHome" component={MyHomeScreen} />
      <Stack.Screen name="CreateRecipe" component={CreateRecipeScreen} />
      <Stack.Screen name="ModifyRecipe" component={ModifyRecipesScreen} />
      <Stack.Screen name="Recipes" component={RecipesScreen} />
      <Stack.Screen name="Recipe" component={RecipeScreen} />
    </Stack.Navigator>
  )
}

const AppTab = () => {
  const theme = useTheme()

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.buttonColor,
        tabBarStyle: { backgroundColor: theme.backgroundColor },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Mes recettes',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="food-fork-drink" color={color} size={size} />
          ),
        }}
      >
        {() => <HomeStack />}
      </Tab.Screen>
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      <Tab.Screen name="Generator"
       options={{
        tabBarLabel: 'Générer ma semaine',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="widgets-outline" color={color} size={size} />
        ),
      }}
      >{() => <GeneratorScreen />}</Tab.Screen>
    </Tab.Navigator>
  )
}

const MainStack = () => {
  const { user } = useActiveUser()
  if (!user) {
    return <UserSelectionAndLaunch />
  }
  return (
    <Stack.Navigator
      initialRouteName="MainApp"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MainApp">{() => <AppTab />}</Stack.Screen>
      <Stack.Screen name="Settings" component={RecipeScreen} />
    </Stack.Navigator>
  )
}

const isAuthentified = (auth: any) => auth !== undefined && auth !== null

const AppStack = () => {
  // Gets the current auth
  const auth = useAuth((state) => state.auth)
  // Update the user data according to the authentified user
  useActiveUserManager(auth?.uid)

  // Check if initial loading
  const initialLoading = useAuth((state) => state.initialLoading)

  return !isAuthentified(auth) ? <SignUp /> : <MainStack />
}

// Configure paths to screens and gamepads
const config = {
  screens: {
    MainApp: {
      screens: {
        Home: {
          screens: {
            MyHome: {
              path: '/home',
            },
            CreateRecipe: {
              path: '/create',
            },
            ModifyRecipe: {
              path: '/modify/:recipeID',
            },
            Recipes: {
              path: '/recipes/:userID',
              parse: {
                userID: String,
              },
            },
            Recipe: {
              path: '/recipe/:recipeID',
              parse: {
                recipeID: String,
              },
            },
          },
        },
        Generator: '/generator',
      },
      // Weeks: '/weeks',
      // Week: '/week/:weekID',
      // WeekList: '/weeklist/:weekID',
    },
    Settings: '/settings',
  },
}

// Configure linking
const linking = {
  prefixes: [Linking.createURL('/'), 'exp://'],
  config,
}

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export default function App(props: NavigationProps) {
  const colorScheme = Appearance.getColorScheme()
  useAuthManager()
  useGamepadScale()

  return (
    <NavigationContainer
      linking={linking}
      documentTitle={{
        formatter: (options, route) =>
          `Weekook • ${options?.title ?? route?.name}`,
      }}
      {...props}
    >
      <ThemeProvider
        theme={colorScheme === 'dark' ? weekookDarkTheme : weekookLightTheme}
      >
        <AppStack />
      </ThemeProvider>
    </NavigationContainer>
  )
}
