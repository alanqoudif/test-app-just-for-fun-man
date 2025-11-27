import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MenuItem } from '../types';
import { formatCurrency } from '../utils/format';

interface Props {
  item: MenuItem;
  onAdd: () => void;
}

export const MenuItemCard: React.FC<Props> = ({ item, onAdd }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>{formatCurrency(item.price)}</Text>
        {item.tags ? (
          <View style={styles.tagRow}>
            {item.tags.map((tag) => (
              <View key={tag} style={styles.tagChip}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>
      <View style={styles.media}> 
        <Image source={{ uri: item.image }} style={styles.image} />
        <TouchableOpacity style={styles.addButton} onPress={onAdd}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2
  },
  content: {
    flex: 1,
    gap: 6
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F1F1F'
  },
  description: {
    color: '#6B6B6B'
  },
  price: {
    fontWeight: '600',
    marginTop: 4
  },
  media: {
    width: 110,
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 90,
    borderRadius: 12
  },
  addButton: {
    marginTop: 8,
    backgroundColor: '#111827',
    width: '100%',
    paddingVertical: 6,
    borderRadius: 999,
    alignItems: 'center'
  },
  addText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700'
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6
  },
  tagChip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999
  },
  tagText: {
    fontSize: 12,
    color: '#4B5563'
  }
});
