import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onBuy: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onBuy }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.card, { backgroundColor: theme.background, borderColor: theme.border }]}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={[styles.name, { color: theme.text }]}>{product.name}</Text>
      <Text style={[styles.price, { color: theme.text }]}>{product.price}</Text>
      <TouchableOpacity
        style={[styles.buyButton, { backgroundColor: theme.primary }]}
        onPress={() => onBuy(product)}
        accessibilityLabel={`Buy ${product.name} Button`}
      >
        <Text style={styles.buyButtonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    width: '48%', // For two-column layout with space-between
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8, 
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    marginBottom: 10,
  },
  buyButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
