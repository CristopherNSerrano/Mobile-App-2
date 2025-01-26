import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

interface Review {
  id: number;
  avatar: string;
  name: string;
  rating: number;
  text: string;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { theme } = useContext(ThemeContext);
  const { avatar, name, rating, text } = review;

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Text key={`star-${i}`} style={styles.star}>⭐</Text>);
    }
    if (halfStar) {
      stars.push(<Text key="half-star" style={styles.star}>⭐️</Text>);
    }
    return stars;
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.background, borderColor: theme.border }]}>
      <View style={styles.header}>
        <Image
          source={{ uri: avatar }}
          style={styles.avatar}
        />
        <View>
          <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
          <View style={styles.stars}>
            {renderStars()}
          </View>
        </View>
      </View>
      <Text style={[styles.text, { color: theme.text }]}>{text}</Text>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
  },
  stars: {
    flexDirection: 'row',
    marginTop: 2,
  },
  star: {
    fontSize: 16,
    marginHorizontal: 1,
  },
  text: {
    fontSize: 14,
    textAlign: 'justify',
    letterSpacing: 0.5,
  },
});
