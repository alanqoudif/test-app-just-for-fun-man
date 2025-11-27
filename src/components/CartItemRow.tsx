import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CartItem } from '../types';
import { formatCurrency } from '../utils/format';

interface Props {
  item: CartItem;
  onQuantityChange: (quantity: number) => void;
  onNoteChange: (note: string) => void;
  onRemove: () => void;
}

export const CartItemRow: React.FC<Props> = ({ item, onQuantityChange, onNoteChange, onRemove }) => {
  const handleDecrease = () => {
    if (item.quantity === 1) {
      onRemove();
      return;
    }
    onQuantityChange(item.quantity - 1);
  };

  const handleIncrease = () => onQuantityChange(item.quantity + 1);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{formatCurrency(item.price * item.quantity)}</Text>
      </View>
      <View style={styles.controls}>
        <View style={styles.stepper}>
          <TouchableOpacity onPress={handleDecrease} style={styles.stepButton}>
            <Text style={styles.stepButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={handleIncrease} style={styles.stepButton}>
            <Text style={styles.stepButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onRemove}>
          <Text style={styles.remove}>حذف</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="ملاحظات للطاهي (مثال: بدون صوص)"
        style={styles.input}
        value={item.note ?? ''}
        onChangeText={onNoteChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: {
    fontSize: 16,
    fontWeight: '600'
  },
  price: {
    fontWeight: '700'
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 999
  },
  stepButton: {
    paddingHorizontal: 14,
    paddingVertical: 6
  },
  stepButtonText: {
    fontSize: 18,
    fontWeight: '600'
  },
  quantity: {
    width: 32,
    textAlign: 'center',
    fontWeight: '600'
  },
  remove: {
    color: '#DC2626'
  },
  input: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12
  }
});
