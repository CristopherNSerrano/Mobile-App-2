import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

// If you want to use icons from a library like 'react-native-vector-icons':
// import Icon from 'react-native-vector-icons/Ionicons';
// Then you can replace <Image> with <Icon> or any other icon component.

const BusinessProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Top Section with Logo (e.g., Twitter) and Rating */}
        <View style={styles.headerContainer}>
          {/* Logo or icon */}
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/1259px-Twitter_Bird.svg.png',
            }}
            style={styles.logo}
            resizeMode="contain"
          />
          {/* Star Rating */}
          <View style={styles.starsContainer}>
            {/* Replace with your star icons or any other rating UI */}
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
          </View>
        </View>

        {/* Business Name */}
        <Text style={styles.businessName}>Business Name</Text>

        {/* Tabs: Product, About, etc. */}
        <View style={styles.tabRow}>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabButtonText}>Product</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabButtonText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabButtonText}>Socials</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabButtonText}>Photos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabButtonText}>Reviews</Text>
          </TouchableOpacity>
        </View>

        {/* About Us Section */}
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutHeading}>About Us</Text>
          <View style={styles.aboutDetails}>
            <Text style={styles.detailText}>+1 (234)-5678</Text>
            <Text style={styles.detailText}>Email420@email.com</Text>
            <Text style={styles.detailText}>Location</Text>
            <Text style={styles.detailText}>Website.com</Text>
            <Text style={styles.detailText}>Open from: 1:00AM - 12:00AM</Text>
          </View>
          <Text style={styles.aboutDescription}>
            Lorem ipsum odor amet, consectetur adipiscing elit. Ultricies dictum
            sociosqu ligula lacinia, cubilia scelerisque orci inceptos. Semper
            suspendisse ...
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BusinessProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  starsContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  star: {
    fontSize: 20,
    color: '#FFD700', // gold color for stars
    marginRight: 3,
  },
  businessName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  tabRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tabButton: {
    backgroundColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 4,
    marginRight: 4,
  },
  tabButtonText: {
    fontSize: 14,
    color: '#333',
  },
  aboutContainer: {
    centering,
    backgroundColor: '#cde9e7',
    borderRadius: 8,
    padding: 16,
  },
  aboutHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  aboutDetails: {
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 2,
  },
  aboutDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});
