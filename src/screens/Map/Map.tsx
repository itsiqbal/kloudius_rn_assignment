import { useStorage } from '@/contexts';
import { GoogleLocationDetailResult } from '@appandflow/react-native-google-autocomplete';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, MapMarker, Marker, Region } from 'react-native-maps';

import { RootStackParamList } from '@/navigation/types';
import { useTheme } from '@/theme';

import { GooglePlacesAutocomplete } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';

const screenWidth = Dimensions.get('screen').width;

const screenHeight = Dimensions.get('screen').height;

type MapScreenRouteProperty = RouteProp<RootStackParamList, 'MapScreen'>;

const baseLocation: Region = {
  latitude: 5.627_783, // Example: Petronas
  latitudeDelta: 0.01,
  longitude: 100.463_675,
  longitudeDelta: 0.01,
};

const baseLocationDetails: GoogleLocationDetailResult = {
  formatted_address: 'Petronas, 08000 Sungai Petani, Kedah, Malaysia',
  icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png',
  name: 'Petronas',
  place_id:
    'Ei5QZXRyb25hcywgMDgwMDAgU3VuZ2FpIFBldGFuaSwgS2VkYWgsIE1hbGF5c2lhIi4qLAoUChIJDSYaot3XSjARNJ4m4Nian-gSFAoSCc-LD5PNKUswEQN5WTmKcLXL',
  vicinity: 'Sungai Petani',
} as GoogleLocationDetailResult;

const ANIMATE_TO_REGION_DURATION = 1000;

function MapScreen() {
  const route = useRoute<MapScreenRouteProperty>();
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const searchedLocation = route.params?.searchedLocation;

  const mapReference = useRef<MapView>(null);
  const markerReference = useRef<MapMarker>(null);

  const [selectedLocation, setSelectedLocation] =
    useState<Region>(baseLocation);
  const [locationDetails, setLocationDetails] =
    useState<GoogleLocationDetailResult>(baseLocationDetails);

  const { layout } = useTheme();
  const { updateLocationHistory } = useStorage();

  useEffect(() => {
    if (mapReference.current && searchedLocation) {
      mapReference.current.animateToRegion({
        latitude: searchedLocation.geometry.location.lat,
        latitudeDelta: 0.01,
        longitude: searchedLocation.geometry.location.lng,
        longitudeDelta: 0.01,
      });
      setLocationDetails(searchedLocation);
    }
  }, [searchedLocation]);

  const handleSuggestionPress = (
    locationDetailResult: GoogleLocationDetailResult,
  ): void => {
    const newLocation: Region = {
      latitude: locationDetailResult.geometry.location.lat,
      latitudeDelta: 0.01,
      longitude: locationDetailResult.geometry.location.lng,
      longitudeDelta: 0.01,
    };
    setSelectedLocation(newLocation);
    setLocationDetails(locationDetailResult);
    updateLocationHistory(locationDetailResult); // update in local storage to use in history
    mapReference.current?.animateToRegion(
      newLocation,
      ANIMATE_TO_REGION_DURATION,
    );
  };

  return (
    <SafeScreen>
      <View style={[layout.flex_1, layout.justifyCenter, layout.itemsCenter]}>
        <View style={[layout.fullWidth]}>
          <GooglePlacesAutocomplete
            handleChangeRegion={handleSuggestionPress}
            placeholder="Search for a location..."
          />
        </View>
        <View style={[layout.flex_1]}>
          <MapView
            initialRegion={selectedLocation}
            loadingEnabled
            onRegionChangeComplete={(region) => {
              setSelectedLocation(region);
              if (markerReference.current) {
                markerReference.current.hideCallout();
              }
            }}
            provider="google"
            ref={mapReference}
            style={{ height: screenHeight, width: screenWidth }}
            userInterfaceStyle="light"
            zoomControlEnabled
            zoomEnabled
          >
            <Marker coordinate={selectedLocation} ref={markerReference}>
              <Callout>
                <View style={styles.callout}>
                  <Text style={styles.title}>{locationDetails.name}</Text>
                  <Text style={styles.description}>
                    {locationDetails.formatted_address}
                  </Text>
                </View>
              </Callout>
            </Marker>
          </MapView>
        </View>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  callout: {
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 5,
    padding: 10,
    width: 200,
  },
  container: {
    flex: 1,
  },
  description: {
    color: 'gray',
  },
  map: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default MapScreen;
