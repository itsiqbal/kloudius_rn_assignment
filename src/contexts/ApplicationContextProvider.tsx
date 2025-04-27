import type { MMKV } from 'react-native-mmkv';

import { GoogleLocationDetailResult } from '@appandflow/react-native-google-autocomplete';
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';

//types
import { ApplicationStorage } from '@/contexts/types';

type Context = {
  updateLocationHistory: (value: GoogleLocationDetailResult) => void;
} & ApplicationStorage;

type Props = PropsWithChildren<{
  readonly storage: MMKV;
}>;

const defaultValues = {
  locationsHistory: [],
};

export const ApplicationContext = createContext<Context | undefined>(undefined);

const GET_APP_STORAGE = 'appStorage';

function ApplicationProvider({ children = undefined, storage }: Props) {
  const [appStorage, setAppStorage] = useState(
    storage.getString(GET_APP_STORAGE) ?? JSON.stringify(defaultValues),
  );

  useEffect(() => {
    const appHasConfigDefined = storage.contains(GET_APP_STORAGE);
    if (!appHasConfigDefined) {
      storage.set(GET_APP_STORAGE, getAppStorageString(defaultValues));
    }
  }, []);

  const getAppStorageString = (value: ApplicationStorage): string => {
    return JSON.stringify(value);
  };

  const getParsedObject = (value: string): ApplicationStorage => {
    return JSON.parse(value) as ApplicationStorage;
  };

  const updateLocationHistory = (value: GoogleLocationDetailResult) => {
    const config = getParsedObject(appStorage);
    config.locationsHistory.push(value);
    setAppStorage(getAppStorageString(config));
    storage.set(GET_APP_STORAGE, getAppStorageString(config));
  };

  const value = useMemo(() => {
    const config = getParsedObject(appStorage);
    return {
      ...config,
      updateLocationHistory,
    };
  }, [appStorage]);

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
}

export default ApplicationProvider;
