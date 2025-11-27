import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusStep } from '../components/StatusStep';
import { useApp } from '../context/AppProvider';
import { RootStackParamList } from '../types/navigation';
import { formatCurrency } from '../utils/format';

const AUTO_ADVANCE_INTERVAL = 8000;

type Props = NativeStackScreenProps<RootStackParamList, 'OrderStatus'>;

export const OrderStatusScreen: React.FC<Props> = ({ navigation }) => {
  const { activeOrder, advanceOrderStatus, resetOrder } = useApp();

  useEffect(() => {
    if (!activeOrder) {
      return;
    }
    if (activeOrder.statusIndex >= activeOrder.statuses.length - 1) {
      return;
    }

    const timer = setTimeout(() => advanceOrderStatus(), AUTO_ADVANCE_INTERVAL);
    return () => clearTimeout(timer);
  }, [activeOrder, advanceOrderStatus]);

  if (!activeOrder) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>لا يوجد طلبات جارية</Text>
          <TouchableOpacity
            style={styles.cta}
            onPress={() => {
              resetOrder();
              navigation.navigate('RestaurantList');
            }}
          >
            <Text style={styles.ctaText}>ابدأ طلباً جديداً</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>الطلب #{activeOrder.id}</Text>
          <Text style={styles.subheading}>{activeOrder.restaurant.name}</Text>
          <Text style={styles.pickupCode}>رمز الاستلام: {activeOrder.pickupCode}</Text>
        </View>

        <View style={styles.statusCard}>
          <Text style={styles.sectionTitle}>حالة الطلب</Text>
          {activeOrder.statuses.map((status, index) => (
            <StatusStep key={status} label={status} index={index} activeIndex={activeOrder.statusIndex} />
          ))}
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>ملخص الطلب</Text>
          {activeOrder.items.map((item) => (
            <View style={styles.summaryRow} key={item.menuItemId}>
              <Text>
                {item.quantity} × {item.name}
              </Text>
              <Text>{formatCurrency(item.price * item.quantity)}</Text>
            </View>
          ))}
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>الإجمالي</Text>
            <Text style={styles.totalValue}>{formatCurrency(activeOrder.total)}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.cta}
          onPress={() => {
            resetOrder();
            navigation.navigate('RestaurantList');
          }}
        >
          <Text style={styles.ctaText}>إنهاء العودة للرئيسية</Text>
        </TouchableOpacity>
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
    padding: 24,
    paddingBottom: 48,
    gap: 16
  },
  header: {
    gap: 6
  },
  heading: {
    fontSize: 24,
    fontWeight: '700'
  },
  subheading: {
    color: '#6B7280'
  },
  pickupCode: {
    fontWeight: '600'
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    gap: 12
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700'
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    gap: 12
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  totalLabel: {
    fontWeight: '600'
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700'
  },
  cta: {
    backgroundColor: '#111827',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 8
  },
  ctaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700'
  }
});
