import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Restaurant } from '../types';

interface Props {
  restaurant: Restaurant;
  onPress: () => void;
}

export const RestaurantCard: React.FC<Props> = ({ restaurant, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.85}>
      <ImageBackground source={{ uri: restaurant.heroImage }} style={styles.image} imageStyle={styles.imageRadius}>
        <View style={styles.ratingChip}>
          <Text style={styles.ratingText}>⭐️ {restaurant.rating.toFixed(1)}</Text>
          <Text style={styles.ratingCount}>({restaurant.ratingCount})</Text>
        </View>
      </ImageBackground>
      <View style={styles.info}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.meta}>
          {restaurant.cuisine.join(' • ')} · {restaurant.pickupEstimate}
        </Text>
        <Text style={styles.meta}>
          {restaurant.neighborhood} · {restaurant.openingHours}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  image: {
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden'
  },
  imageRadius: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  ratingChip: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderBottomLeftRadius: 12
  },
  ratingText: {
    fontWeight: '600',
    fontSize: 14
  },
  ratingCount: {
    fontSize: 12,
    color: '#4D4D4D'
  },
  info: {
    padding: 16,
    gap: 4
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#161616'
  },
  meta: {
    color: '#5C5C5C'
  }
});
