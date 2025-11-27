import React, { useMemo } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { restaurants } from '../data/restaurants';
import { RestaurantCard } from '../components/RestaurantCard';
import { useApp } from '../context/AppProvider';
import { RootStackParamList } from '../types/navigation';

const featuredMessages = ['استلم من السيارة خلال 5 دقائق', 'بدون طوابير ولا مكالمات'];

type Props = NativeStackScreenProps<RootStackParamList, 'RestaurantList'>;

export const RestaurantListScreen: React.FC<Props> = ({ navigation }) => {
  const { location, setSelectedRestaurant } = useApp();

  const filteredRestaurants = useMemo(() => {
    if (!location) {
      return restaurants;
    }
    return restaurants.filter((restaurant) => restaurant.state === location.state);
  }, [location]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>مطاعم متاحة للاستلام</Text>
          {location ? <Text style={styles.locationLabel}>{location.label}</Text> : null}
          {!location ? (
            <TouchableOpacity onPress={() => navigation.navigate('Location')}>
              <Text style={styles.link}>حدد موقعك لعرض خيارات أقرب</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.banner}>
          {featuredMessages.map((message) => (
            <Text key={message} style={styles.bannerText}>
              • {message}
            </Text>
          ))}
        </View>

        <View>
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onPress={() => {
                setSelectedRestaurant(restaurant);
                navigation.navigate('RestaurantDetails', { restaurantId: restaurant.id });
              }}
            />
          ))}
          {filteredRestaurants.length === 0 ? (
            <Text style={styles.empty}>لا يتوفر مطاعم في هذه الولاية حالياً.</Text>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6'
  },
  container: {
    padding: 24
  },
  header: {
    marginBottom: 16
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 6
  },
  locationLabel: {
    color: '#4B5563',
    marginBottom: 6
  },
  link: {
    color: '#2563EB'
  },
  banner: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 18,
    marginBottom: 24
  },
  bannerText: {
    color: '#fff',
    fontWeight: '500'
  },
  empty: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 32
  }
});
