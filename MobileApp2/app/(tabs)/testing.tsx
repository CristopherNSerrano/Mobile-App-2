import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
  Animated,
  TextInput,
  Alert,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Using Ionicons
import ProductCard from '../../components/ProductCard';
import ReviewCard from '../../components/ReviewCard';
import Toast from '../../components/Toast';



const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type TabType = 'about' | 'socials' | 'gallery' | 'reviews' | 'product';

interface MediaItem {
  type: 'photo' | 'video';
  uri: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface Review {
  id: number;
  avatar: string;
  name: string;
  rating: number;
  text: string;
}

const BusinessProfileScreen: React.FC = () => {
  // State Variables
  const [selectedTab, setSelectedTab] = useState<TabType>('about');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [showHours, setShowHours] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [showMedicalMenu, setShowMedicalMenu] = useState<boolean>(false);

  // Media Modal States
  const [mediaModalVisible, setMediaModalVisible] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [media, setMedia] = useState<Array<{ type: 'photo' | 'video'; uri: string }>>([
    {
        type: 'photo',
        uri: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
    },
    {
        type: 'photo',
        uri: 'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        type: 'photo',
        uri: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
    },
    {
        type: 'photo',
        uri: 'https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        type: 'photo',
        uri: 'https://images.pexels.com/photos/208984/pexels-photo-208984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    { type: 'video', uri: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { type: 'video', uri: 'https://www.youtube.com/watch?v=3fumBcKC6RE' },
    { type: 'video', uri: 'https://www.youtube.com/watch?v=ScMzIvxBSi4' },
    { type: 'video', uri: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { type: 'video', uri: 'https://www.youtube.com/watch?v=3fumBcKC6RE' },
    { type: 'video', uri: 'https://www.youtube.com/watch?v=ScMzIvxBSi4' },
    {
      type: 'photo',
      uri: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
  },
  {
      type: 'photo',
      uri: 'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
      type: 'photo',
      uri: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
  },
  {
      type: 'photo',
      uri: 'https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
      type: 'photo',
      uri: 'https://images.pexels.com/photos/208984/pexels-photo-208984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
    // Add more media items as needed
  ]);

  // Products Array
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Product One',
      price: '$49.99',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Product Two',
      price: '$79.99',
      image: 'https://via.placeholder.com/150',
    },
    {
        id: 3,
        name: 'Product One',
        price: '$49.99',
        image: 'https://via.placeholder.com/150',
      },
      {
        id: 4,
        name: 'Product Two',
        price: '$79.99',
        image: 'https://via.placeholder.com/150',
      },
      {
        id: 5,
        name: 'Product One',
        price: '$49.99',
        image: 'https://via.placeholder.com/150',
      },
      {
        id: 6,
        name: 'Product Two',
        price: '$79.99',
        image: 'https://via.placeholder.com/150',
      },
      {
        id: 7,
        name: 'Product One',
        price: '$49.99',
        image: 'https://via.placeholder.com/150',
      },

    // Add more products as needed
  ]);

  // Reviews Array
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      avatar: 'https://randomuser.me/api/portraits/men/31.jpg',
      name: 'John Doe',
      rating: 5,
      text: 'Excellent service and quality products! Highly recommend to others.',
    },
    {
      id: 2,
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      name: 'Jane Smith',
      rating: 4,
      text: 'Outstanding experience! The team was professional and attentive.',
    },
    {
        id: 3,
        avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
        name: 'John Doe',
        rating: 5,
        text: 'Excellent service and quality products! Highly recommend to others.',
      },
      {
        id: 4,
        avatar: 'https://randomuser.me/api/portraits/women/34.jpg',
        name: 'Jane Smith',
        rating: 4,
        text: 'Outstanding experience! The team was professional and attentive.',
      },
      {
        id: 5,
        avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
        name: 'John Doe',
        rating: 5,
        text: 'Excellent service and quality products! Highly recommend to others.',
      },
      {
        id: 6,
        avatar: 'https://randomuser.me/api/portraits/women/37.jpg',
        name: 'Jane Smith',
        rating: 5,
        text: 'Outstanding experience! The team was professional and attentive.',
      },
    // Add more reviews as needed
  ]);

  // Review Modal States
  const [reviewModalVisible, setReviewModalVisible] = useState<boolean>(false);
  const [reviewText, setReviewText] = useState<string>('');

  // Booking Modal States
  const [bookingModalVisible, setBookingModalVisible] = useState<boolean>(false);
  const [service, setService] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Toast State
  const [toast, setToast] = useState<{ visible: boolean; message: string }>({ visible: false, message: '' });

  // FlatList Refreshing State
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // References
  const mediaScrollRef = useRef<FlatList>(null);
  const mainFlatListRef = useRef<FlatList<{ key: string }>>(null);

  // Animation Values
  const spinValue = useRef(new Animated.Value(0)).current;

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  // Handlers for Animations
  const toggleMedicalMenuHandler = () => setShowMedicalMenu((prev) => !prev);

  useEffect(() => {
    Animated.timing(spinValue, {
      toValue: showMedicalMenu ? 1 : 0,
      duration: 240,
      useNativeDriver: true,
    }).start();
  }, [showMedicalMenu]);

  // Handlers for Media Modal
  useEffect(() => {
    if (mediaModalVisible && mediaScrollRef.current) {
      setTimeout(() => {
        mediaScrollRef.current.scrollToIndex({ index: selectedIndex, animated: false });
      }, 50);
    }
  }, [mediaModalVisible, selectedIndex]);

  // Scroll to top when selectedTab changes
  useEffect(() => {
    if (mainFlatListRef.current) {
        mainFlatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }, [selectedTab]);

  // Function to close the media modal
  const closeMediaModal = () => setMediaModalVisible(false);

  // Function to show toast
  const showToast = (message: string) => {
    setToast({ visible: true, message });
  };

  // Handler for buying a product
  const handleBuyProduct = (product: Product) => {
    showToast(`You have bought ${product.name} for ${product.price}.`);
  };

  // Handler to open the booking modal
  const handleOpenBookingModal = () => {
    setBookingModalVisible(true);
  };

  // Handler to close the booking modal
  const handleCloseBookingModal = () => {
    setBookingModalVisible(false);
    setService('');
    setDate(new Date());
    setNotes('');
    setIsSubmitting(false);
  };

  // Handler to submit booking
  const handleSubmitBooking = () => {
    if (!service || !date) {
      showToast('Please select a service and date.');
      return;
    }
    setIsSubmitting(true);
    // Simulate booking logic (e.g., API call)
    setTimeout(() => {
      showToast(`You have booked ${service} on ${date.toLocaleString()}.`);
      setIsSubmitting(false);
      handleCloseBookingModal();
    }, 2000);
  };

  // Handler for pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    // Simulate fetching new data
    setTimeout(() => {
      // Update products and reviews if fetched from API
      setRefreshing(false);
    }, 2000);
  };

  // Tab content rendering
  const renderTabContent = () => {
    switch (selectedTab) {
      case 'about':
        return (
          <View style={styles.tabContentContainer}>
            <Text style={styles.tabContentTitle}>About Us</Text>
            <Text style={styles.detailText}>📞 +1 (234) 567-8910</Text>
            <Text style={styles.detailText}>✉️ business@email.com</Text>
            <Text style={styles.detailText}>📍 123 Main Street, City, State</Text>
            <Text style={styles.detailText}>🌐 Website.com</Text>
            <Text style={styles.detailText}>🕒 Open: 1:00 AM - 12:00 AM</Text>
            <Text style={styles.tabContentBody}>
              {/* Long content here */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel dui in ante iaculis maximus nec quis neque. Praesent congue sagittis ornare. Praesent ultricies viverra malesuada. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum a nisl ultricies, dapibus risus sollicitudin, dapibus quam. Maecenas lacinia turpis sem, vitae varius purus convallis eget. Cras posuere pretium ipsum, sit amet efficitur nibh gravida eget.

Morbi ut lacus sapien. Morbi imperdiet placerat nunc, non efficitur nisi tempor in. Sed tincidunt leo purus, vel maximus erat tincidunt eget. Nam sapien nisi, facilisis sed iaculis ut, porta id metus. In dapibus, lacus non rhoncus facilisis, nunc sem luctus orci, in hendrerit magna est ac lacus. Maecenas iaculis libero sapien, in efficitur leo ornare eu. Pellentesque tempor nisi at sapien finibus gravida. Aliquam felis ipsum, fringilla in varius id, feugiat at magna. Vivamus tristique tortor vel enim congue rutrum. In aliquet vestibulum suscipit. Sed commodo lorem eu malesuada dictum. Praesent eget arcu risus. Morbi posuere magna vel metus fermentum tristique. Ut ac elit aliquam, suscipit orci non, luctus ipsum.

Mauris nec nibh tellus. Cras mattis dui elit, vitae sagittis dui scelerisque luctus. Nulla in finibus ante, a ultrices ante. Aliquam et nibh mauris. Suspendisse nec lectus eget urna finibus hendrerit sed sed urna. Aliquam id lacus convallis leo finibus eleifend. In faucibus odio ut lacus mollis, et maximus ante volutpat. Integer volutpat odio ac lacinia accumsan. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam pharetra molestie justo, eget cursus arcu. Morbi sollicitudin elit vitae urna fringilla suscipit. Sed euismod blandit luctus. Vestibulum quis augue non tellus pellentesque faucibus. Aenean lobortis sit amet elit eget congue. Nullam sed odio in nunc dignissim faucibus sed eu dolor. Nulla ante quam, malesuada ut risus id, mollis semper risus.
            </Text>
          </View>
        );
      case 'socials':
        return (
          <View style={styles.tabContentContainer}>
            <Text style={styles.tabContentTitle}>Our Socials</Text>
            <View style={styles.socialsContainer}>
              {[
                { name: 'LinkedIn', icon: 'logo-linkedin' },
                { name: 'Instagram', icon: 'logo-instagram' },
                { name: 'Facebook', icon: 'logo-facebook' },
                { name: 'Twitter', icon: 'logo-twitter' },
                { name: 'GitHub', icon: 'logo-github' },
                { name: 'YouTube', icon: 'logo-youtube' },
                { name: 'Twitch', icon: 'logo-twitch' },
                { name: 'Slack', icon: 'logo-slack' },
              ].map((social, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.socialButton}
                  onPress={() => console.log(`${social.name} pressed`)}
                  accessibilityLabel={`${social.name} Button`}
                >
                  <Ionicons name={social.icon as any} size={28} color="#000000" />
                  <Text style={styles.socialLabel}>{social.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      case 'gallery':
        if (!media || media.length === 0) {
          return <Text style={styles.tabContentBody}>No content added</Text>;
        }
        return (
          <View style={styles.tabContentContainer}>
            <Text style={styles.galleryTitle}>Gallery</Text>
            <View style={styles.mediaContainer}>
              {media.map((item, index) => {
                if (item.type === 'photo') {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => openMediaModal(index)}
                      style={styles.mediaItemTouchable}
                      accessibilityLabel={`Photo ${index + 1}`}
                    >
                      <Image
                        source={{ uri: item.uri }}
                        style={styles.mediaItem}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  );
                } else {
                  // Video placeholder with Ionicons
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => openMediaModal(index)}
                      style={[styles.mediaItemTouchable, styles.videoPlaceholder]}
                      accessibilityLabel={`Video ${index + 1}`}
                    >
                      <Ionicons name="play-circle" size={48} color="#000000" />
                      <Text style={styles.videoLabel}>Video {index + 1}</Text>
                    </TouchableOpacity>
                  );
                }
              })}
            </View>
          </View>
        );
      case 'reviews':
        return (
          <View style={styles.tabContentContainer}>
            <Text style={styles.tabContentTitle}>Reviews</Text>
            <FlatList
              data={reviews}
              renderItem={({ item }) => <ReviewCard review={item} />}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.reviewsContainer}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </View>
        );
      case 'product':
        return (
          <View style={styles.tabContentContainer}>
            <Text style={styles.tabContentTitle}>Store</Text>
            {/* Store-specific content */}
            <View style={styles.storeContent}>
              <Text style={styles.storeText}>Welcome to our store! Browse our products below.</Text>
              {/* Products FlatList */}
              <FlatList
                data={products}
                renderItem={({ item }) => <ProductCard product={item} onBuy={handleBuyProduct} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.productsGrid}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
              />
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  // Icon handlers 
  const handleBack = () => {
    // Handle back navigation
    console.log('Back pressed');
  };
  const handleShare = () => console.log('Share pressed');
  const handleHeart = () => setIsFavorite(!isFavorite);
  const handleBriefcase = () => setModalVisible(true);

  // Function to open media modal
  const openMediaModal = (index: number) => {
    setSelectedIndex(index);
    setMediaModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* -- FLOATING ICONS (TOP-LEFT) -- */}
      <View style={styles.floatingBackButtonContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.iconButton} accessibilityLabel="Back Button">
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* -- FLOATING ICONS (TOP-RIGHT) -- */}
      <View style={styles.floatingRightIconsContainer}>
        <TouchableOpacity onPress={handleShare} style={styles.iconButton} accessibilityLabel="Share Button">
          <Ionicons name="share-social" size={24} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHeart} style={styles.iconButton} accessibilityLabel="Favorite Button">
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={24} 
            color={isFavorite ? "red" : "black"} // Change color based on isFavorite
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleBriefcase} style={styles.iconButton} accessibilityLabel="Briefcase Button">
          <Ionicons name="briefcase" size={24} color="#000000" />
        </TouchableOpacity>

        {/* Medical (*) Icon + Dropdown Menu */}
        <View>
          <TouchableOpacity onPress={toggleMedicalMenuHandler} style={styles.menuButton} accessibilityLabel="Medical Menu Button">
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <Ionicons name="medical" size={24} color="#000000" />
            </Animated.View>
          </TouchableOpacity>
          {showMedicalMenu && (
            <View style={styles.medicalMenu}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedTab('about');
                  setShowMedicalMenu(false);
                }}
                style={styles.dropdownButton}
                accessibilityLabel="About Us Menu"
              >
                <Ionicons name="information-circle-outline" size={20} color="#FFFFFF" />
                <Text style={styles.dropdownText}> About Us</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedTab('gallery');
                  setShowMedicalMenu(false);
                }}
                style={styles.dropdownButton}
                accessibilityLabel="Gallery Menu"
              >
                <Ionicons name="images-outline" size={20} color="#FFFFFF" />
                <Text style={styles.dropdownText}> Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedTab('reviews');
                  setShowMedicalMenu(false);
                }}
                style={styles.dropdownButton}
                accessibilityLabel="Reviews Menu"
              >
                <Ionicons name="star-outline" size={20} color="#FFFFFF" />
                <Text style={styles.dropdownText}> Reviews</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedTab('socials');
                  setShowMedicalMenu(false);
                }}
                style={styles.dropdownButton}
                accessibilityLabel="Socials Menu"
              >
                <Ionicons name="people-outline" size={20} color="#FFFFFF" />
                <Text style={styles.dropdownText}> Socials</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedTab('product');
                  setShowMedicalMenu(false);
                }}
                style={styles.dropdownButton}
                accessibilityLabel="Store Menu"
              >
                <Ionicons name="storefront-outline" size={20} color="#FFFFFF" />
                <Text style={styles.dropdownText}> Store</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* FlatList as the main scroll container */}
      <FlatList
        ref={mainFlatListRef}
        data={[{ key: 'header' }, { key: 'content' }]}
        renderItem={({ item }) => {
        if (item.key === 'header') {
            return (
            <View style={styles.topSection}>
                {/* Profile Image */}
                <View style={styles.profilePlaceholder}>
                <Image
                    source={require('../../assets/images/react-logo.png')}
                    style={styles.profileImage}
                    resizeMode="cover"
                />
                </View>
                <View style={styles.starsContainer}>
                <Ionicons name="star" size={20} color="#ffd500" style={styles.star} />
                <Ionicons name="star" size={20} color="#ffd500" style={styles.star} />
                <Ionicons name="star" size={20} color="#ffd500" style={styles.star} />
                <Ionicons name="star" size={20} color="#ffd500" style={styles.star} />
                <Ionicons name="star-half-outline" size={20} color="#ffd500" style={styles.star} />
                </View>
            </View>
            );
        } else {
            return <View style={styles.contentArea}>{renderTabContent()}</View>;
        }
        }}
        keyExtractor={(item) => item.key}
        ListHeaderComponent={() => (
        <View style={styles.stickyHeaderContainer}>
            <Text style={styles.businessName}>Business Name</Text>
            <Text style={styles.businessType}>Barber / Web Developer / Handy-man / Etc.</Text>
        </View>
        )}
        stickyHeaderIndices={[0]} // Makes the ListHeaderComponent sticky
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
        />



      {/* Floating "Leave a Review" Button - Fixed Position */}
      {selectedTab === 'reviews' && (
        <TouchableOpacity
          style={styles.floatingReviewButton}
          onPress={() => setReviewModalVisible(true)}
          accessibilityLabel="Leave a Review Button"
        >
          <Ionicons name="pencil" size={20} color="#FFFFFF" />
          <Text style={styles.floatingReviewButtonText}>Leave a Review</Text>
        </TouchableOpacity>
      )}

      {/* Floating "Book a Service" Button - Fixed Position */}
      <TouchableOpacity
        style={styles.floatingBookButton}
        onPress={handleOpenBookingModal}
        accessibilityLabel="Book a Service Button"
      >
        <Ionicons name="calendar" size={20} color="#FFFFFF" />
        <Text style={styles.floatingBookButtonText}>Book a Service</Text>
      </TouchableOpacity>

      {/* Render Toast */}
      {toast.visible && (
        <Toast
          message={toast.message}
          onHide={() => setToast({ visible: false, message: '' })}
        />
      )}

      {/* =============== MODALS =============== */}
      {/* Briefcase Card Modal */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                  accessibilityLabel="Close Briefcase Modal"
                >
                  <Ionicons name="close" size={24} color="#000000" />
                </TouchableOpacity>

                {/* Inner Card Container */}
                
                  {/* Popup Content */}
                  <View style={styles.popupContent}>
                    {/* Popup Header */}
                    <View style={styles.popupHeader}>
                      <View style={styles.popupLogoContainer}>
                        <Image
                          source={require('../../assets/images/react-logo.png')} // Replace with your logo
                          style={styles.popupLogo}
                          resizeMode="contain"
                        />
                      </View>
                      <View style={styles.popupstarsContainer}>
                        <Ionicons name="star" style={styles.popstar} />
                        <Ionicons name="star" style={styles.popstar} />
                        <Ionicons name="star" style={styles.popstar} />
                        <Ionicons name="star" style={styles.popstar} />
                        <Ionicons name="star-half" style={styles.popstar} />
                      </View>
                    </View>

                    {/* Popup Icons Row */}
                    <View style={styles.popupIconsRow}>
                      <TouchableOpacity
                        style={styles.popupIconButton}
                        onPress={() => console.log('Call pressed')}
                        accessibilityLabel="Call Button"
                      >
                        <Ionicons name="call-outline" size={24} color="#000000" />
                        <Text style={styles.iconLabel}>Call</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.popupIconButton}
                        onPress={() => console.log('Mail pressed')}
                        accessibilityLabel="Mail Button"
                      >
                        <Ionicons name="mail-outline" size={24} color="#000000" />
                        <Text style={styles.iconLabel}>Mail</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.popupIconButton}
                        onPress={() => console.log('Globe pressed')}
                        accessibilityLabel="Website Button"
                      >
                        <Ionicons name="globe-outline" size={24} color="#000000" />
                        <Text style={styles.iconLabel}>Website</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.popupIconButton}
                        onPress={() => console.log('Location pressed')}
                        accessibilityLabel="Location Button"
                      >
                        <Ionicons name="location-outline" size={24} color="#000000" />
                        <Text style={styles.iconLabel}>Location</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Popup Icons Row */}
                    <View style={styles.popupIconsRow}>
                      <TouchableOpacity
                        style={styles.popupIconButton}
                        onPress={() => console.log('LinkedIn pressed')}
                        accessibilityLabel="LinkedIn Button"
                      >
                        <Ionicons name="logo-linkedin" size={24} color="#000000" />
                        <Text style={styles.iconLabel}>LinkedIn</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.popupIconButton}
                        onPress={() => console.log('Instagram pressed')}
                        accessibilityLabel="Instagram Button"
                      >
                        <Ionicons name="logo-instagram" size={24} color="#000000" />
                        <Text style={styles.iconLabel}>Instagram</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.popupIconButton}
                        onPress={() => console.log('Facebook pressed')}
                        accessibilityLabel="Facebook Button"
                      >
                        <Ionicons name="logo-facebook" size={24} color="#000000" />
                        <Text style={styles.iconLabel}>Facebook</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.popupIconButton}
                        onPress={() => console.log('Twitter pressed')}
                        accessibilityLabel="Twitter Button"
                      >
                        <Ionicons name="logo-twitter" size={24} color="#000000" />
                        <Text style={styles.iconLabel}>Twitter</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Divider */}
                    <View style={styles.popupDivider} />

                    {/* Hours Toggle */}
                    <TouchableOpacity
                      style={styles.hoursToggle}
                      onPress={() => setShowHours(!showHours)}
                      accessibilityLabel="Toggle Hours Button"
                    >
                      <Text style={styles.hoursToggleText}>
                        {showHours ? 'Hide Hours' : 'View Our Hours'}
                      </Text>
                      <Ionicons
                        name={showHours ? "chevron-up" : "chevron-down"}
                        size={20}
                        color="#000000"
                      />
                    </TouchableOpacity>

                    {/* Hours List */}
                    {showHours && (
                      <View style={styles.hoursList}>
                        <Text style={styles.hoursItem}>Mon. 1:00 AM - 12:00 AM</Text>
                        <Text style={styles.hoursItem}>Tue. 1:00 AM - 12:00 AM</Text>
                        <Text style={styles.hoursItem}>Wed. 1:00 AM - 12:00 AM</Text>
                        <Text style={styles.hoursItem}>Thu. 1:00 AM - 12:00 AM</Text>
                        <Text style={styles.hoursItem}>Fri. 1:00 AM - 12:00 AM</Text>
                        <Text style={styles.hoursItem}>Sat. By appointment</Text>
                        <Text style={styles.hoursItem}>Sun. By appointment</Text>
                      </View>
                    )}
                  </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Fullscreen Media Carousel Modal */}
      <Modal
        visible={mediaModalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeMediaModal}
      >
        <TouchableWithoutFeedback onPress={closeMediaModal}>
          <View style={styles.fullScreenOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.fullScreenContainer}>
                <TouchableOpacity
                  style={styles.closeMediaButton}
                  onPress={closeMediaModal}
                  accessibilityLabel="Close Media Modal"
                >
                  <Ionicons name="close-circle-outline" size={30} color="#fff" />
                </TouchableOpacity>
                <FlatList
                  ref={mediaScrollRef}
                  data={media}
                  renderItem={({ item }) => (
                    <View style={styles.fullScreenItem}>
                      {item.type === 'photo' ? (
                        <Image
                          source={{ uri: item.uri }}
                          style={styles.fullScreenImage}
                          resizeMode="contain"
                        />
                      ) : (
                        <View style={styles.videoFullScreen}>
                          <Ionicons name="play-circle" size={64} color="#000000" />
                          <Text style={styles.videoText}>
                            YouTube Video Link: {item.uri}
                          </Text>
                        </View>
                      )}
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onMomentumScrollEnd={(e) => {
                    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
                    setSelectedIndex(index);
                  }}
                  getItemLayout={(data, index) => ({
                    length: SCREEN_WIDTH, // Width of each item
                    offset: SCREEN_WIDTH * index, // Distance from start to this item
                    index, // The item's index
                  })}
                />
                <Text style={styles.indexText}>
                  {selectedIndex + 1} / {media.length}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Leave a Review Modal */}
      <Modal
        visible={reviewModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setReviewModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setReviewModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.reviewModalContainer}>
                <TouchableOpacity
                  style={styles.closeReviewModalButton}
                  onPress={() => setReviewModalVisible(false)}
                  accessibilityLabel="Close Review Modal"
                >
                  <Ionicons name="close" size={24} color="#000000" />
                </TouchableOpacity>

                <Text style={styles.reviewModalTitle}>Leave a Review</Text>
                <TextInput
                  style={styles.reviewInput}
                  placeholder="Write your review..."
                  placeholderTextColor="#555555"
                  multiline
                  numberOfLines={4}
                  value={reviewText}
                  onChangeText={setReviewText}
                  accessibilityLabel="Review Text Input"
                />
                <TouchableOpacity
                  style={[
                    styles.submitReviewButton,
                    { backgroundColor: reviewText.trim() ? '#000000' : '#888888' },
                  ]}
                  onPress={() => {
                    if (reviewText.trim()) {
                      // Handle review submission logic here
                      console.log('Review submitted:', reviewText);
                      showToast('Thank you! Your review has been submitted.');
                      setReviewModalVisible(false);
                      setReviewText('');
                    } else {
                      showToast('Please write a review before submitting.');
                    }
                  }}
                  accessibilityLabel="Submit Review Button"
                  disabled={!reviewText.trim()}
                >
                  <Text style={styles.submitReviewButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Booking Modal */}
      <Modal
        visible={bookingModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseBookingModal}
      >
        <TouchableWithoutFeedback onPress={handleCloseBookingModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.bookingModalContainer}>
                <TouchableOpacity
                  style={styles.closeBookingModalButton}
                  onPress={handleCloseBookingModal}
                  accessibilityLabel="Close Booking Modal Button"
                >
                  <Ionicons name="close" size={24} color="#000000" />
                </TouchableOpacity>

                <Text style={styles.bookingModalTitle}>Book a Service</Text>
                
                <Text style={styles.bookingLabel}>Select Service:</Text>
                <TextInput
                  style={styles.bookingInput}
                  placeholder="e.g., Consultation, Installation"
                  placeholderTextColor="#555555"
                  value={service}
                  onChangeText={setService}
                  accessibilityLabel="Service Selection Input"
                />

                <Text style={styles.bookingLabel}>Select Date & Time:</Text>
                <TouchableOpacity
                  style={styles.bookingDateButton}
                  onPress={() => {
                    // Open date picker - Use Expo's DateTimePicker
                    Alert.prompt(
                      'Select Date & Time',
                      'Enter date and time (e.g., 2025-01-25 14:00)',
                      [
                        {
                          text: 'Cancel',
                          style: 'cancel',
                        },
                        {
                          text: 'OK',
                          onPress: (input: string) => {
                            const parsedDate = new Date(input);
                            if (isNaN(parsedDate.getTime())) {
                              Alert.alert('Invalid Date', 'Please enter a valid date and time.');
                            } else {
                              setDate(parsedDate);
                            }
                          },
                        },
                      ],
                      'plain-text',
                      date.toLocaleString()
                    );
                  }}
                  accessibilityLabel="Select Date and Time Button"
                >
                  <Ionicons name="calendar-outline" size={24} color="#555555" />
                  <Text style={styles.bookingDateText}>{date.toLocaleString()}</Text>
                </TouchableOpacity>

                <Text style={styles.bookingLabel}>Additional Notes:</Text>
                <TextInput
                  style={[styles.bookingInput, styles.bookingNotesInput]}
                  placeholder="Any specific requests or information"
                  placeholderTextColor="#555555"
                  value={notes}
                  onChangeText={setNotes}
                  multiline
                  numberOfLines={4}
                  accessibilityLabel="Additional Notes Input"
                />

                <TouchableOpacity
                  style={[
                    styles.submitBookingButton,
                    { backgroundColor: service.trim() && date ? '#007AFF' : '#888888' },
                  ]}
                  onPress={handleSubmitBooking}
                  accessibilityLabel="Submit Booking Button"
                  disabled={!service.trim() || !date || isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.submitBookingButtonText}>Confirm Booking</Text>
                  )}
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const App: React.FC = () => {
  return <BusinessProfileScreen />;
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White base for a clean look
    position: 'relative', // Ensure children can be absolutely positioned
  },
  /* Floating Icons */
  floatingBackButtonContainer: {
    position: 'absolute',
    top: 32,
    left: 12,
    zIndex: 10,
  },
  floatingRightIconsContainer: {
    position: 'absolute',
    top: 32,
    right: 12,
    zIndex: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginBottom: 12,
    borderRadius: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.03)', // Transparent background
  },
  menuButton: {
    padding: 8,
    borderRadius: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.03)', // Transparent background
    alignItems: 'center',
    justifyContent: 'center',
  },
  medicalMenu: {
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.86)', // Solid dark background
    borderRadius: 8,
    width: 180, // Increased width to accommodate labels
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 2,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#444444', // Subtle divider
  },
  dropdownText: {
    color: '#FFFFFF',
    marginLeft: 10,
    fontSize: 14,
    letterSpacing: 0.5,
    flexShrink: 1, // Prevent text overflow
  },
  iconLabel: {
    color: '#FFFFFF',
    marginLeft: 10,
    fontSize: 14,
    letterSpacing: 0.5,
    flexShrink: 1, // Prevent text overflow
  },

  /* Header Container */
  headerContainer: {
    backgroundColor: '#FFFFFF',
  },
  /* Top section that scrolls away (logo and star) */
  topSection: {
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
  },
  profilePlaceholder: {
    width: 160,
    height: 160,
    backgroundColor: '#F0F0F0',
    borderRadius: 8, 
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#fff', // Black accent
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },

  /* Stars */
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  star: {
    fontSize: 21,
    color: '#ffd700',
    marginHorizontal: 13,
  },

  /* Sticky Header: Name + Type */
  stickyHeaderContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 23,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: 16,
    borderBottomLeftRadius: 8,  // Round bottom corners
    borderBottomRightRadius: 8, // Round bottom corners
  },
  businessName: {
    fontSize: 25,
    fontWeight: '700',
    color: '#000000', 
    textAlign: 'center',
    letterSpacing: 1,
  },
  businessType: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
    marginTop: 4,
    letterSpacing: 0.5,
  },

  /* Main Content Area */
  contentArea: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginTop: 10,
    padding: 16,
    marginHorizontal: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5, 
  },

  /* Tab Content Styling */
  tabContentContainer: {
    marginBottom: 16,
    position: 'relative', // Ensure children can be absolutely positioned
  },
  tabContentTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000', 
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 1,
  },
  detailText: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 4,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  tabContentBody: {
    fontSize: 14,
    color: '#555555',
    marginTop: 10,
    lineHeight: 22,
    textAlign: 'justify',
    letterSpacing: 0.5,
  },

  /* Gallery */
  galleryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000', 
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 1,
  },
  mediaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  mediaItemTouchable: {
    margin: 6,
  },
  mediaItem: {
    width: 100,
    height: 180,
    borderRadius: 4, 
    backgroundColor: '#E0E0E0',
    borderWidth: 1,
    borderColor: '#000000', 
  },
  videoPlaceholder: {
    width: 100,
    height: 180,
    borderRadius: 8, 
    backgroundColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000', 
  },
  videoLabel: {
    marginTop: 5,
    fontSize: 12,
    color: '#000000',
  },

  /* Reviews */
  reviewsContainer: {
    marginTop: 10,
  },
  review: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3, 
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewName: {
    color: '#000000', 
    fontSize: 14,
    fontWeight: '600',
  },
  reviewStars: {
    flexDirection: 'row',
    marginTop: 2,
  },
  reviewText: {
    fontSize: 14,
    color: '#555555',
    textAlign: 'justify',
    letterSpacing: 0.5,
  },

  /* Socials */
  socialsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  socialButton: {
    alignItems: 'center',
    margin: 10,
  },
  socialLabel: {
    color: '#000000', 
    fontSize: 12,
    marginTop: 4,
    letterSpacing: 0.5,
    textAlign: 'center',
    flexWrap: 'wrap',
  },

  /* Store Content */
  storeContent: {
    marginTop: 20,
    alignItems: 'center',
  },
  storeText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    letterSpacing: 0.5,
    marginBottom: 15,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%', // Ensures the grid takes full width of the container
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  /* Floating "Leave a Review" Button */
  floatingReviewButton: {
    position: 'absolute',
    bottom: 80, // Distance from the bottom of the screen
    right: 20,  // Distance from the right edge
    backgroundColor: '#000000', // Black background
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    zIndex: 100, // Ensure it's above other elements
  },
  floatingReviewButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
  },

  /* Floating "Book a Service" Button */
  floatingBookButton: {
    position: 'absolute',
    bottom: 20, // Distance from the bottom of the screen
    right: 20,  // Distance from the right edge
    backgroundColor: '#007AFF', // iOS blue color for a standout appearance
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 25,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    zIndex: 100, // Ensure it's above other elements
  },
  floatingBookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
  },

  /* Leave a Review Modal */
  reviewModalContainer: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  closeReviewModalButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  reviewModalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    color: '#000000',
    textAlign: 'center',
  },
  reviewInput: {
    width: '100%',
    height: 100,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
    fontSize: 14,
    color: '#555555',
  },
  submitReviewButton: {
    backgroundColor: '#000000', // Default color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
  },
  submitReviewButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  /* Booking Modal */
  bookingModalContainer: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  closeBookingModalButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  bookingModalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    color: '#000000',
    textAlign: 'center',
  },
  bookingLabel: {
    fontSize: 16,
    color: '#333333',
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  bookingInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#555555',
  },
  bookingNotesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  bookingDateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    marginTop: 5,
  },
  bookingDateText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#555555',
  },
  submitBookingButton: {
    backgroundColor: '#007AFF', // iOS blue color for a standout appearance
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  submitBookingButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  /* Modal Overlay */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(13, 13, 13, 0.8)', // Semi-transparent dark
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Inner Card Container */
  modalContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF', // White background for the inner card
    borderRadius: 20,
    alignItems: 'center',
    position: 'relative',
    padding: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
   
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

  /* Popup Content */
  popupContent: {
    alignItems: 'center',
    width: '100%',
  },
  popupHeader: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 10,
  },
  popupLogoContainer: {
    backgroundColor: '#F0F0F0',
    width: 65,
    height: 65,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#fff', // Black border
  },
  popupLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  popupstarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  popstar: {
    fontSize: 22,
    color: '#ffd700', // Gold color
    marginHorizontal: 12,
  },
  popupIconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 8,
    width: '100%',
  },
  popupIconButton: {
    alignItems: 'center',
    flex: 1, // Distribute space evenly
    paddingVertical: 10,
  },
  popupIcon: {
    color: '#000000', 
  },
  popupDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#000',
    marginVertical: 8,
  },
  hoursToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  hoursToggleText: {
    fontSize: 16,
    color: '#000000', 
    marginRight: 4,
    letterSpacing: 0.5,
  },
  hoursList: {
    width: '100%',
    marginTop: 8,
  },
  hoursItem: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 4,
    textAlign: 'center',
    letterSpacing: 0.5,
  },

  /* Fullscreen Media Carousel Modal */
  fullScreenOverlay: {
    flex: 1,
    backgroundColor: 'rgba(13, 13, 13, 0.95)', // Nearly opaque dark
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  closeMediaButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 999,
  },
  fullScreenItem: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
  videoFullScreen: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoText: {
    color: '#000000', 
    textAlign: 'center',
    marginTop: 10,
  },
  indexText: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    color: '#000000', 
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent black
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    letterSpacing: 0.5,
  },
});
