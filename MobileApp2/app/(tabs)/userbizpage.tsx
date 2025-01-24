import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const BusinessProfileScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('about');
  const [modalVisible, setModalVisible] = useState(false);
  const [showHours, setShowHours] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // For full-screen media carousel
  const [mediaModalVisible, setMediaModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // ScrollView ref
  const scrollRef = useRef(null);

  // Example media
  const [media, setMedia] = useState([
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
  ]);

  // ⬇ WHEN MODAL BECOMES VISIBLE, SCROLL TO THE SELECTED INDEX
  useEffect(() => {
    if (mediaModalVisible && scrollRef.current) {
      // Wait a tiny bit to ensure layout is done
      setTimeout(() => {
        scrollRef.current.scrollTo({ x: SCREEN_WIDTH * selectedIndex, animated: false });
      }, 50);
    }
  }, [mediaModalVisible, selectedIndex]);

  // Opens media modal at a certain index
  const openMediaModal = (index) => {
    setSelectedIndex(index);
    setMediaModalVisible(true);
  };

  const closeMediaModal = () => {
    setMediaModalVisible(false);
  };

  const handleScrollEnd = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / SCREEN_WIDTH);
    setSelectedIndex(newIndex);
  };

  // ============== TAB CONTENT ==============
  const renderTabContent = () => {
    switch (selectedTab) {
      case 'about':
        return (
          <View style={styles.tabContentContainer}>
            <Text style={styles.tabContentTitle}>About Us</Text>
            <Text style={styles.detailText}>Phone: +1 (234) 567-8910</Text>
            <Text style={styles.detailText}>Email: business@email.com</Text>
            <Text style={styles.detailText}>123 Main Street, City, State</Text>
            <Text style={styles.detailText}>Website.com</Text>
            <Text style={styles.detailText}>Open: 1:00 AM - 12:00 AM</Text>
            <Text style={styles.tabContentBody}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel dui in ante iaculis maximus nec quis neque. Praesent congue sagittis ornare. Praesent ultricies viverra malesuada. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum a nisl ultricies, dapibus risus sollicitudin, dapibus quam. Maecenas lacinia turpis sem, vitae varius purus convallis eget. Cras posuere pretium ipsum, sit amet efficitur nibh gravida eget.

Morbi ut lacus sapien. Morbi imperdiet placerat nunc, non efficitur nisi tempor in. Sed tincidunt leo purus, vel maximus erat tincidunt eget. Nam sapien nisi, facilisis sed iaculis ut, porta id metus. In dapibus, lacus non rhoncus facilisis, nunc sem luctus orci, in hendrerit magna est ac lacus. Maecenas iaculis libero sapien, in efficitur leo ornare eu. Pellentesque tempor nisi at sapien finibus gravida. Aliquam felis ipsum, fringilla in varius id, feugiat at magna. Vivamus tristique tortor vel enim congue rutrum. In aliquet vestibulum suscipit. Sed commodo lorem eu malesuada dictum. Praesent eget arcu risus. Morbi posuere magna vel metus fermentum tristique. Ut ac elit aliquam, suscipit orci non, luctus ipsum.

Mauris nec nibh tellus. Cras mattis dui elit, vitae sagittis dui scelerisque luctus. Nulla in finibus ante, a ultrices ante. Aliquam et nibh mauris. Suspendisse nec lectus eget urna finibus hendrerit sed sed urna. Aliquam id lacus convallis leo finibus eleifend. In faucibus odio ut lacus mollis, et maximus ante volutpat. Integer volutpat odio ac lacinia accumsan. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam pharetra molestie justo, eget cursus arcu. Morbi sollicitudin elit vitae urna fringilla suscipit. Sed euismod blandit luctus. Vestibulum quis augue non tellus pellentesque faucibus. Aenean lobortis sit amet elit eget congue. Nullam sed odio in nunc dignissim faucibus sed eu dolor. Nulla ante quam, malesuada ut risus id, mollis semper risus.

Vivamus at tincidunt turpis. Cras viverra ut mauris eu commodo. Sed nec posuere diam. Donec sollicitudin tellus quis ante hendrerit, in dignissim nunc ornare. Curabitur mauris lectus, sodales et feugiat vitae, ullamcorper eget tellus. Nunc eget ex at libero convallis venenatis vitae quis lorem. Sed porttitor efficitur sodales. Vivamus a lectus lacinia, venenatis justo sed, interdum sapien. Cras viverra est non bibendum maximus.

Morbi eu lorem est. Fusce tempor, orci eu bibendum pulvinar, sem leo bibendum lectus, in efficitur tellus lectus ornare purus. Integer pellentesque nibh id metus dapibus dictum. Sed et purus aliquam, maximus leo in, mollis nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec a vehicula mauris, vel placerat risus. Integer id tempus ex, sit amet egestas dui. Etiam scelerisque dapibus augue, nec eleifend quam congue at. Proin turpis felis, ultrices ac porttitor nec, viverra nec nisl. Donec pulvinar commodo euismod. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi nec consequat mi. Maecenas tincidunt magna eget blandit faucibus. Mauris in sapien eget metus tincidunt aliquet a vitae est
            </Text>
          </View>
        );
      case 'product':
        return <Text style={styles.tabContentBody}>Product Info...</Text>;
      case 'socials':
        return (
          <View style={styles.tabContentContainer}>
            <Text style={styles.tabContentTitle}>Our Socials</Text>
            <View style={styles.popupIconsRow}>
              <TouchableOpacity
                style={styles.popupIconButton}
                onPress={() => console.log('LinkedIn pressed')}
              >
                <Ionicons name="logo-linkedin" size={24} style={styles.popupIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.popupIconButton}
                onPress={() => console.log('Instagram pressed')}
              >
                <Ionicons name="logo-instagram" size={24} style={styles.popupIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.popupIconButton}
                onPress={() => console.log('Facebook pressed')}
              >
                <Ionicons name="logo-facebook" size={24} style={styles.popupIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.popupIconButton}
                onPress={() => console.log('Twitter pressed')}
              >
                <Ionicons name="logo-twitter" size={24} style={styles.popupIcon} />
              </TouchableOpacity>
            </View>
            {/* ... more icons, etc. */}
          </View>
        );
      case 'gallery':
        if (!media || media.length === 0) {
          return <Text style={styles.tabContentBody}>No content added</Text>;
        }
        return (
          <View style={styles.mediaContainer}>
            {media.map((item, index) => {
              if (item.type === 'photo') {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => openMediaModal(index)}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={{ uri: item.uri }}
                      style={styles.mediaItem}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                );
              } else if (item.type === 'video') {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => openMediaModal(index)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.videoPlaceholder}>
                      <Ionicons name="play-circle-outline" size={48} color="#333" />
                      <Text style={{ textAlign: 'center' }}>YouTube Video Link</Text>
                    </View>
                  </TouchableOpacity>
                );
              }
              return null;
            })}
          </View>
        );
      case 'reviews':
        return <Text style={styles.tabContentBody}>Reviews Section...</Text>;
      default:
        return null;
    }
  };

  // ICON HANDLERS
  const handleBack = () => navigation?.goBack();
  const handleShare = () => console.log('Share pressed');
  const handleHeart = () => {
    setIsFavorite(!isFavorite);
    console.log('Heart pressed. isFavorite now:', !isFavorite);
  };
  const handleBriefcase = () => setModalVisible(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Floating Icons (Top-Left) */}
      <View style={styles.floatingBackButtonContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
          <Ionicons name="arrow-back-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Floating Icons (Top-Right) */}
      <View style={styles.floatingRightIconsContainer}>
        <TouchableOpacity onPress={handleShare} style={styles.iconButton}>
          <Ionicons name="share-social-outline" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHeart} style={styles.iconButton}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? 'red' : '#333'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBriefcase} style={styles.iconButton}>
          <Ionicons name="briefcase-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Main Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HEADER */}
        <View style={styles.headerContainer}>
          {/* Logo */}
          <View style={styles.profilePlaceholder}>
            <Image
              source={require('../../assets/images/react-logo.png')}
              style={{ width: 160, height: 160 }}
            />
          </View>

          {/* Stars */}
          <View style={styles.starsContainer}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
          </View>

          {/* Business Name */}
          <Text style={styles.businessName}>Business Name</Text>

          {/* Subtitle */}
          <Text style={styles.businessType}>Barber / Food Truck / Etc.</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'about' && styles.tabButtonActive]}
            onPress={() => setSelectedTab('about')}
          >
            <Text style={styles.tabButtonText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'socials' && styles.tabButtonActive]}
            onPress={() => setSelectedTab('socials')}
          >
            <Text style={styles.tabButtonText}>Socials</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'gallery' && styles.tabButtonActive]}
            onPress={() => setSelectedTab('gallery')}
          >
            <Text style={styles.tabButtonText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'reviews' && styles.tabButtonActive]}
            onPress={() => setSelectedTab('reviews')}
          >
            <Text style={styles.tabButtonText}>Reviews</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'product' && styles.tabButtonActive]}
            onPress={() => setSelectedTab('product')}
          >
            <Text style={styles.tabButtonText}>Product</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={styles.contentArea}>{renderTabContent()}</View>
      </ScrollView>

      {/* MODAL POPUP (Briefcase) */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
                setShowHours(false);
              }}
            >
              <Ionicons name="close-circle-outline" size={28} color="#444" />
            </TouchableOpacity>

            <View style={styles.popupContent}>
              <View style={styles.popupHeader}>
                <View style={styles.popupLogoContainer}>
                  <Image
                    source={require('../../assets/images/react-logo.png')}
                    style={styles.popupLogo}
                  />
                </View>
                <View style={styles.starsContainer}>
                  <Text style={styles.star}>★</Text>
                  <Text style={styles.star}>★</Text>
                  <Text style={styles.star}>★</Text>
                  <Text style={styles.star}>★</Text>
                  <Text style={styles.star}>★</Text>
                </View>
              </View>

              <View style={styles.popupIconsRow}>
                <TouchableOpacity
                  style={styles.popupIconButton}
                  onPress={() => console.log('Call pressed')}
                >
                  <Ionicons name="call-outline" size={24} style={styles.popupIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.popupIconButton}
                  onPress={() => console.log('Mail pressed')}
                >
                  <Ionicons name="mail-outline" size={24} style={styles.popupIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.popupIconButton}
                  onPress={() => console.log('Globe pressed')}
                >
                  <Ionicons name="globe-outline" size={24} style={styles.popupIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.popupIconButton}
                  onPress={() => console.log('Location pressed')}
                >
                  <Ionicons name="location-outline" size={24} style={styles.popupIcon} />
                </TouchableOpacity>
              </View>

              <View style={styles.popupIconsRow}>
                <TouchableOpacity
                  style={styles.popupIconButton}
                  onPress={() => console.log('LinkedIn pressed')}
                >
                  <Ionicons name="logo-linkedin" size={24} style={styles.popupIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.popupIconButton}
                  onPress={() => console.log('Instagram pressed')}
                >
                  <Ionicons name="logo-instagram" size={24} style={styles.popupIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.popupIconButton}
                  onPress={() => console.log('Facebook pressed')}
                >
                  <Ionicons name="logo-facebook" size={24} style={styles.popupIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.popupIconButton}
                  onPress={() => console.log('Twitter pressed')}
                >
                  <Ionicons name="logo-twitter" size={24} style={styles.popupIcon} />
                </TouchableOpacity>
              </View>

              <View style={styles.popupDivider} />

              <TouchableOpacity
                style={styles.hoursToggle}
                onPress={() => setShowHours(!showHours)}
              >
                <Text style={styles.hoursToggleText}>
                  {showHours ? 'Hide Hours' : 'View Our Hours'}
                </Text>
                <Ionicons
                  name={showHours ? 'chevron-up-outline' : 'chevron-down-outline'}
                  size={18}
                  color="#333"
                />
              </TouchableOpacity>

              {showHours && (
                <View style={styles.hoursList}>
                  <Text style={styles.hoursItem}>Mon. 1:00AM - 12:00AM</Text>
                  <Text style={styles.hoursItem}>Tue. 1:00AM - 12:00AM</Text>
                  <Text style={styles.hoursItem}>Wed. 1:00AM - 12:00AM</Text>
                  <Text style={styles.hoursItem}>Thu. 1:00AM - 12:00AM</Text>
                  <Text style={styles.hoursItem}>Fri. 1:00AM - 12:00AM</Text>
                  <Text style={styles.hoursItem}>Sat. By Appointment</Text>
                  <Text style={styles.hoursItem}>Sun. By Appointment</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>

      {/* FULLSCREEN MEDIA CAROUSEL MODAL */}
      <Modal
        visible={mediaModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={closeMediaModal}
      >
        <View style={styles.fullScreenContainer}>
          {/* Close button */}
          <TouchableOpacity style={styles.closeMediaButton} onPress={closeMediaModal}>
            <Ionicons name="close-circle-outline" size={42} color="#fff" />
          </TouchableOpacity>

          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScrollEnd}
            style={{ flex: 1 }}
          >
            {media.map((item, idx) => (
              <View
                key={idx}
                style={{
                  width: SCREEN_WIDTH,
                  height: SCREEN_HEIGHT,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#000',
                }}
              >
                {item.type === 'photo' ? (
                  <Image
                    source={{ uri: item.uri }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                  />
                ) : (
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Ionicons name="play-circle-outline" size={64} color="#fff" />
                    <Text style={{ color: '#fff', textAlign: 'center', marginTop: 10 }}>
                      YouTube Video Link: {item.uri}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>

          {/* Index indicator */}
          <Text style={styles.indexText}>
            {selectedIndex + 1} / {media.length}
          </Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default BusinessProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fcf8fc',
  },
  floatingBackButtonContainer: {
    position: 'absolute',
    top: 18,
    left: 10,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  floatingRightIconsContainer: {
    position: 'absolute',
    top: 20,
    right: 10,
    zIndex: 10,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
  },
  scrollContent: {
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  headerContainer: {
    alignItems: 'center',
  },
  profilePlaceholder: {
    width: 160,
    height: 160,
    backgroundColor: '#eeeaee',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },

  // stars
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  star: {
    fontSize: 24,
    color: '#ffd500',
    marginHorizontal: 13,
  },

  // business name
  businessName: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  businessType: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },

  tabRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginBottom: 16,
  },
  tabButton: {
    backgroundColor: '#eeeaee',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 4,
  },
  tabButtonActive: {
    backgroundColor: '#ffd500',
  },
  tabButtonText: {
    fontSize: 14,
    color: '#333',
  },

  contentArea: {
    backgroundColor: '#eeeaee',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  tabContentContainer: {
    marginBottom: 16,
  },
  tabContentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  detailText: {
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'center',
  },
  tabContentBody: {
    fontSize: 14,
    marginTop: 10,
    lineHeight: 20,
  },

  mediaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  mediaItem: {
    width: 100,
    height: 100,
    margin: 8,
    backgroundColor: '#eee',
    borderRadius: 6,
  },
  videoPlaceholder: {
    width: 100,
    height: 100,
    margin: 8,
    backgroundColor: '#999',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Briefcase Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    borderRadius: 10,
    backgroundColor: '#cac6ca',
    padding: 16,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  popupContent: {
    alignItems: 'center',
    width: '100%',
  },
  popupHeader: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  popupLogoContainer: {
    backgroundColor: '#eee',
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
  },
  popupLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  popupIconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 8,
    width: '100%',
  },
  popupIconButton: {
    padding: 10,
  },
  popupIcon: {
    color: '#333',
  },
  popupDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#999',
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
    color: '#333',
    marginRight: 4,
  },
  hoursList: {
    width: '100%',
    marginTop: 8,
  },
  hoursItem: {
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'center',
  },

  // Fullscreen Media Carousel
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#000',
    position: 'relative',
  },
  closeMediaButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 999,
  },
  indexText: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
});
