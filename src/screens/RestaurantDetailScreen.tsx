import React, { useEffect, useMemo } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { restaurants } from '../data/restaurants';
import { useApp } from '../context/AppProvider';
import { RootStackParamList } from '../types/navigation';

const infoBlocks = [
  { label: 'استلام سريع', value: 'جاهز خلال 10-25 دقيقة' },
  { label: 'دفع عند الاستلام', value: 'ادفع في المطعم أو مسبقاً' }
];

type Props = NativeStackScreenProps<RootStackParamList, 'RestaurantDetails'>;

export const RestaurantDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { selectedRestaurant, setSelectedRestaurant } = useApp();

  const restaurant = useMemo(
    () =>
      restaurants.find((item) => item.id === route.params.restaurantId) ||
      selectedRestaurant,
    [route.params.restaurantId, selectedRestaurant]
  );

  useEffect(() => {
    if (restaurant) {
      setSelectedRestaurant(restaurant);
    }
  }, [restaurant, setSelectedRestaurant]);

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <Text>لم نتمكن من تحميل بيانات المطعم.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: restaurant.heroImage }} style={styles.hero} />
        <View style={styles.content}>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.name}>{restaurant.name}</Text>
              <Text style={styles.meta}>{restaurant.cuisine.join(' • ')}</Text>
            </View>
            <View style={styles.ratingChip}>
              <Text style={styles.ratingText}>{restaurant.rating.toFixed(1)}</Text>
              <Text style={styles.ratingMeta}>{restaurant.ratingCount} تقييم</Text>
            </View>
          </View>

          <Text style={styles.description}>{restaurant.description}</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gallery}>
            {restaurant.gallery.map((image) => (
              <Image key={image} source={{ uri: image }} style={styles.galleryImage} />
            ))}
          </ScrollView>

          <View style={styles.infoGrid}>
            {infoBlocks.map((block) => (
              <View style={styles.infoCard} key={block.label}>
                <Text style={styles.infoLabel}>{block.label}</Text>
                <Text style={styles.infoValue}>{block.value}</Text>
              </View>
            ))}
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>ساعات العمل</Text>
              <Text style={styles.infoValue}>{restaurant.openingHours}</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>الحي</Text>
              <Text style={styles.infoValue}>{restaurant.neighborhood}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View>
          <Text style={styles.pickupLabel}>الاستلام</Text>
          <Text style={styles.pickupValue}>{restaurant.pickupEstimate}</Text>
        </View>
        <TouchableOpacity
          style={styles.cta}
          onPress={() => navigation.navigate('Menu', { restaurantId: restaurant.id })}
        >
          <Text style={styles.ctaText}>عرض المنيو وبدء الطلب</Text>
        </TouchableOpacity>
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
    paddingBottom: 140
  },
  hero: {
    width: '100%',
    height: 240
  },
  content: {
    padding: 24,
    gap: 16
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: {
    fontSize: 28,
    fontWeight: '700'
  },
  meta: {
    color: '#6B7280'
  },
  ratingChip: {
    alignItems: 'center'
  },
  ratingText: {
    fontSize: 20,
    fontWeight: '700'
  },
  ratingMeta: {
    color: '#6B7280'
  },
  description: {
    fontSize: 16,
    color: '#4B5563'
  },
  gallery: {
    flexDirection: 'row'
  },
  galleryImage: {
    width: 180,
    height: 120,
    borderRadius: 16,
    marginRight: 12
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  infoCard: {
    flexBasis: '48%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16
  },
  infoLabel: {
    color: '#6B7280',
    marginBottom: 4
  },
  infoValue: {
    fontWeight: '600'
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff'
  },
  pickupLabel: {
    color: '#6B7280'
  },
  pickupValue: {
    fontWeight: '700'
  },
  cta: {
    backgroundColor: '#111827',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999
  },
  ctaText: {
    color: '#fff',
    fontWeight: '700'
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
