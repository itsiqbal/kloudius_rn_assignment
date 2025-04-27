import {
  GoogleLocationDetailResult,
  useGoogleAutocomplete,
} from '@appandflow/react-native-google-autocomplete';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';

import { useTheme } from '@/theme';

const API_KEY = Config.MAPS_API_KEY;

type AutoCompleteTextInputType = {
  readonly handleChangeRegion: (data: GoogleLocationDetailResult) => void;
  readonly placeholder: string;
};

function AutoCompleteTextInput({
  handleChangeRegion,
  placeholder,
}: AutoCompleteTextInputType) {
  const { colors, fonts } = useTheme();

  const {
    clearSearch,
    isSearching,
    locationResults,
    searchDetails,
    setTerm,
    term,
  } = useGoogleAutocomplete(API_KEY, {
    debounce: 500,
    language: 'en',
    minLength: 3,
  });

  const handlePressOnSuggestedItem = async (placeId: string): Promise<void> => {
    const data: GoogleLocationDetailResult = await searchDetails(placeId);
    clearSearch();
    setTerm('');
    handleChangeRegion(data);
    // console.log(data);
  };
  return (
    <View>
      <TextInput
        onChangeText={setTerm}
        placeholder={placeholder}
        style={[styles.input, fonts.gray400, { borderColor: colors.gray400 }]}
        value={term}
      />
      {!isSearching && locationResults.length > 0 ? (
        <View style={styles.suggestionContainer}>
          <View
            style={{
              backgroundColor: colors.purple100,
              borderRadius: 4,
              borderWidth: 1,
              justifyContent: 'center',
              marginHorizontal: 10,
            }}
          >
            {locationResults.map((location) => (
              <TouchableOpacity
                key={`key-${location.id}-${location.place_id}`}
                onPress={() =>
                  void handlePressOnSuggestedItem(location.place_id)
                }
                style={{
                  borderBottomWidth: 0.5,
                  height: 40,
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ marginHorizontal: 10 }}>
                  {location.structured_formatting.main_text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : undefined}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
    height: 40,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
  },
  suggestionContainer: {
    position: 'absolute',
    top: 55,
    width: '100%',
    zIndex: 10,
  },
});

export default AutoCompleteTextInput;
