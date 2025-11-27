import React, { useMemo } from 'react';
import { SafeAreaView, SectionList, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { restaurants } from '../data/restaurants';
import { MenuItemCard } from '../components/MenuItemCard';
import { useApp } from '../context/AppProvider';
import { RootStackParamList } from '../types/navigation';
import { CartSummary } from '../components/CartSummary';
import { useCartTotals } from '../hooks/useCartTotals';

type Props = NativeStackScreenProps<RootStackParamList, 'Menu'>;

export const MenuScreen: React.FC<Props> = ({ route, navigation }) => {
  const { addItemToCart, selectedRestaurant } = useApp();
  const { total, itemCount } = useCartTotals();

  const restaurant = useMemo(
    () =>
      restaurants.find((item) => item.id === route.params.restaurantId) ||
      selectedRestaurant,
    [route.params.restaurantId, selectedRestaurant]
  );

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <Text>لم يتم العثور على المنيو.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <SectionList
        style={styles.list}
        sections={restaurant.menu.map((section) => ({
          title: section.title,
          data: section.items,
          description: section.description
        }))}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.description ? <Text style={styles.sectionDescription}>{section.description}</Text> : null}
          </View>
        )}
        renderItem={({ item }) => (
          <MenuItemCard
            item={item}
            onAdd={() => addItemToCart(item, restaurant)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
      <CartSummary
        total={total}
        itemsCount={itemCount}
        ctaLabel="مراجعة العربة"
        onPress={() => navigation.navigate('Cart')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F3F4F6'
  },
  list: {
    flex: 1
  },
  listContent: {
    paddingBottom: 160
  },
  sectionHeader: {
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4
  },
  sectionDescription: {
    color: '#6B7280'
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
