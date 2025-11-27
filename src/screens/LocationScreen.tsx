import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as ExpoLocation from 'expo-location';
import { restaurants } from '../data/restaurants';
import { useApp } from '../context/AppProvider';
import { RootStackParamList } from '../types/navigation';

const uniqueStates = Array.from(new Set(restaurants.map((restaurant) => restaurant.state)));

type Props = NativeStackScreenProps<RootStackParamList, 'Location'>;

export const LocationScreen: React.FC<Props> = ({ navigation }) => {
  const { setLocation } = useApp();
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [error, setError] = useState('');

  const statesList = useMemo(
    () =>
      uniqueStates.map((state) => ({
        state,
        restaurants: restaurants.filter((restaurant) => restaurant.state === state).length
      })),
    []
  );

  const handleStateSelection = (stateName: string) => {
    setLocation({ state: stateName, label: stateName });
    navigation.navigate('RestaurantList');
  };

  const handleUseCurrentLocation = async () => {
    try {
      setError('');
      setLoadingLocation(true);
      const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('نحتاج لإذن الوصول للموقع لاختيار أقرب المطاعم.');
        return;
      }

      const { coords } = await ExpoLocation.getCurrentPositionAsync({});
      const [place] = await ExpoLocation.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude
      });

      const label = place
        ? `${place.city ?? place.region ?? 'موقعك الحالي'}, ${place.region ?? ''}`
        : 'موقعك الحالي';

      const matchedState = uniqueStates.find((state) => label.includes(state)) ?? uniqueStates[0];

      setLocation({
        state: matchedState,
        label,
        city: place?.city ?? place?.region ?? matchedState,
        coordinates: coords
      });
      navigation.navigate('RestaurantList');
    } catch (err) {
      setError('تعذر تحديد موقعك حالياً، حاول مرة أخرى.');
    } finally {
      setLoadingLocation(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>كل ما تحتاجه من مطاعم pickup</Text>
        <Text style={styles.subtitle}>ابدأ باختيار موقعك الحالي أو الولاية التي تتواجد فيها.</Text>

        <TouchableOpacity
          style={styles.detectButton}
          onPress={handleUseCurrentLocation}
          activeOpacity={0.85}
        >
          {loadingLocation ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.detectButtonText}>تحديد موقعي الحالي</Text>
          )}
        </TouchableOpacity>
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.sectionLabel}>أو اختر الولاية يدوياً</Text>
        <FlatList
          data={statesList}
          keyExtractor={(item) => item.state}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.stateCard}
              onPress={() => handleStateSelection(item.state)}
            >
              <View>
                <Text style={styles.stateName}>{item.state}</Text>
                <Text style={styles.stateMeta}>{item.restaurants} مطاعم جاهزة للاستلام</Text>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          contentContainerStyle={styles.stateList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    padding: 24
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    color: '#0F172A'
  },
  subtitle: {
    color: '#475467',
    marginBottom: 24
  },
  detectButton: {
    backgroundColor: '#111827',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center'
  },
  detectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  error: {
    color: '#DC2626',
    marginTop: 12
  },
  sectionLabel: {
    marginTop: 24,
    marginBottom: 12,
    fontWeight: '600',
    color: '#0F172A'
  },
  stateList: {
    paddingBottom: 80
  },
  stateCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 18,
    borderRadius: 16
  },
  stateName: {
    fontSize: 18,
    fontWeight: '700'
  },
  stateMeta: {
    marginTop: 4,
    color: '#6B7280'
  }
});
