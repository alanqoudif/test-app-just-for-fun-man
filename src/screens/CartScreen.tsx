import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CartItemRow } from '../components/CartItemRow';
import { useApp } from '../context/AppProvider';
import { useCartTotals } from '../hooks/useCartTotals';
import { RootStackParamList } from '../types/navigation';
import { formatCurrency } from '../utils/format';

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

export const CartScreen: React.FC<Props> = ({ navigation }) => {
  const {
    cart,
    selectedRestaurant,
    updateCartItemQuantity,
    updateCartItemNote,
    removeCartItem,
    placeOrder
  } = useApp();
  const { subtotal, tax, total } = useCartTotals();

  const handlePlaceOrder = () => {
    const order = placeOrder();
    if (order) {
      navigation.replace('OrderStatus', { orderId: order.id });
    }
  };

  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>عربتك فارغة</Text>
          <Text style={styles.emptySubtitle}>أضف أصنافاً من المنيو للمتابعة في الطلب.</Text>
          <TouchableOpacity
            style={styles.cta}
            onPress={() => {
              if (selectedRestaurant) {
                navigation.navigate('Menu', { restaurantId: selectedRestaurant.id });
              } else {
                navigation.navigate('RestaurantList');
              }
            }}
          >
            <Text style={styles.ctaText}>استكشف المطاعم</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {selectedRestaurant ? (
          <View style={styles.restaurantHeader}>
            <Text style={styles.restaurantName}>{selectedRestaurant.name}</Text>
            <Text style={styles.restaurantMeta}>{selectedRestaurant.neighborhood}</Text>
          </View>
        ) : null}
        {cart.map((item) => (
          <CartItemRow
            key={item.menuItemId}
            item={item}
            onQuantityChange={(quantity) => updateCartItemQuantity(item.menuItemId, quantity)}
            onNoteChange={(note) => updateCartItemNote(item.menuItemId, note)}
            onRemove={() => removeCartItem(item.menuItemId)}
          />
        ))}

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text>المجموع</Text>
            <Text>{formatCurrency(subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>الضريبة (15%)</Text>
            <Text>{formatCurrency(tax)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotalLabel}>الإجمالي للدفع</Text>
            <Text style={styles.summaryTotal}>{formatCurrency(total)}</Text>
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handlePlaceOrder}>
            <Text style={styles.submitText}>تأكيد الطلب للاستلام</Text>
          </TouchableOpacity>
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
  restaurantHeader: {
    marginBottom: 16
  },
  restaurantName: {
    fontSize: 22,
    fontWeight: '700'
  },
  restaurantMeta: {
    color: '#6B7280'
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  summaryTotalLabel: {
    fontWeight: '600'
  },
  summaryTotal: {
    fontSize: 20,
    fontWeight: '700'
  },
  submitButton: {
    backgroundColor: '#111827',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 8
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700'
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 12
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700'
  },
  emptySubtitle: {
    color: '#6B7280',
    textAlign: 'center'
  },
  cta: {
    backgroundColor: '#111827',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 999
  },
  ctaText: {
    color: '#fff',
    fontWeight: '600'
  }
});
