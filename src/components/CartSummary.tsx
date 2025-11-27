import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { formatCurrency } from '../utils/format';

interface Props {
  total: number;
  itemsCount: number;
  ctaLabel?: string;
  onPress: () => void;
}

export const CartSummary: React.FC<Props> = ({ total, itemsCount, ctaLabel = 'مراجعة الطلب', onPress }) => {
  if (itemsCount === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.itemsLabel}>{itemsCount} صنف</Text>
        <Text style={styles.total}>{formatCurrency(total)}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.9}>
        <Text style={styles.buttonText}>{ctaLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#111827',
    borderRadius: 16,
    marginVertical: 16
  },
  itemsLabel: {
    color: '#D1D5DB'
  },
  total: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700'
  },
  button: {
    backgroundColor: '#F97316',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});
