import { useStorage } from '@/contexts';
import { GoogleLocationDetailResult } from '@appandflow/react-native-google-autocomplete';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StaticParamList, useNavigation } from '@react-navigation/native';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';

import { IconByVariant, Separator } from '@/components/atoms';

type BottomTabParamList = StaticParamList<typeof BottomTabNavigator>;
type HistoryScreenNavigationProperty = BottomTabNavigationProp<
  BottomTabParamList,
  'History'
>;

function LocationHistory() {
  const navigation = useNavigation<HistoryScreenNavigationProperty>();

  const { backgrounds } = useTheme();
  const { locationsHistory } = useStorage();

  const handlePress = (item: GoogleLocationDetailResult) => {
    navigation.navigate(Paths.Map, { searchedLocation: item });
  };

  const renderItem = ({ item }: { item: GoogleLocationDetailResult }) => (
    <TouchableOpacity
      key={`key-${item.id}-${item.name}`}
      onPress={() => {
        handlePress(item);
      }}
      style={styles.itemContainer}
      testID={`location-item-${item.id}`}
    >
      <View style={styles.row}>
        <IconByVariant height={40} path="map" style={styles.icon} width={40} />

        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description}>{item.formatted_address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[backgrounds.gray50, styles.container]}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={locationsHistory}
        ItemSeparatorComponent={Separator}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No location history.</Text>
        }
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default LocationHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 5,
  },
  description: {
    color: '#6B7280',
    fontSize: 14,
    marginTop: 4,
  },
  emptyText: {
    color: '#9CA3AF',
    fontSize: 16,
    marginTop: 40,
    textAlign: 'center',
  },
  icon: {
    borderRadius: 25,
    height: 50,
    marginRight: 12,
    width: 50,
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 2,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  listContent: {
    paddingBottom: 20,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
  },
});
