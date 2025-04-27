import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';

import { IconByVariant } from '@/components/atoms';
import { HistoryScreen, MapScreen } from '@/screens';
const Tab = createBottomTabNavigator();

import { Paths } from '@/navigation/paths';
function ApplicationNavigator() {
  const { colors } = useTheme();

  const getIcon = (path: string, focused = false) => {
    return (
      <IconByVariant
        height={32}
        path={path}
        stroke={focused ? colors.purple500 : colors.gray400}
        width={32}
      />
    );
  };
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            component={MapScreen}
            name={Paths.Map}
            options={{
              tabBarAccessibilityLabel: Paths.Map,
              tabBarActiveBackgroundColor: colors.purple100,
              tabBarIcon: ({ focused }) => getIcon('map', focused),
              tabBarShowLabel: false,
            }}
          />
          <Tab.Screen
            component={HistoryScreen}
            name={Paths.History}
            options={{
              headerShown: true,
              headerTitle: Paths.History,
              tabBarAccessibilityLabel: Paths.History,
              tabBarActiveBackgroundColor: colors.purple100,
              tabBarIcon: ({ focused }) => getIcon('history', focused),
              tabBarShowLabel: false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
