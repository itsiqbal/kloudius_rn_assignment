import type { StackScreenProps } from '@react-navigation/stack';

import { GoogleLocationDetailResult } from '@appandflow/react-native-google-autocomplete';

export type RootScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;

export type RootStackParamList = {
  LocationHistory: undefined;
  MapScreen: { searchedLocation: GoogleLocationDetailResult | undefined  };
};
