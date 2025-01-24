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
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const BusinessProfileScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('about');
  const [modalVisible, setModalVisible] = useState(false);
  const [showHours, setShowHours] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // For drop-down (medical icon)
  const [showMedicalMenu, setShowMedicalMenu] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '60deg'],
  });
  const toggleMedicalMenu = () => setShowMedicalMenu((prev) => !prev);

  useEffect(() => {
    Animated.timing(spinValue, {
      toValue: showMedicalMenu ? 1 : 0,
      duration: 240,
      useNativeDriver: true,
    }).start();
  }, [showMedicalMenu]);

  // Example data for “media modal” states
  const [mediaModalVisible, setMediaModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
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
  ]);

  const scrollRef = useRef(null);

  // Whenever the mediaModalVisible changes, scroll to the selected index
  useEffect(() => {
    if (mediaModalVisible && scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollTo({ x: SCREEN_WIDTH * selectedIndex, animated: false });
      }, 50);
    }
  }, [mediaModalVisible, selectedIndex]);

  // Always scroll to top when tab changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: false });
    }
  }, [selectedTab]);

  const openMediaModal = (index) => {
    setSelectedIndex(index);
    setMediaModalVisible(true);
  };
  const closeMediaModal = () => setMediaModalVisible(false);
  const handleScrollEnd = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / SCREEN_WIDTH);
    setSelectedIndex(newIndex);
  };

  // Tab/dispay content
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

Morbi eu lorem est. Fusce tempor, orci eu bibendum pulvinar, sem leo bibendum lectus, in efficitur tellus lectus ornare purus. Integer pellentesque nibh id metus dapibus dictum. Sed et purus aliquam, maximus leo in, mollis nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec a vehicula mauris, vel placerat risus. Integer id tempus ex, sit amet egestas dui. Etiam scelerisque dapibus augue, nec eleifend quam congue at. Proin turpis felis, ultrices ac porttitor nec, viverra nec nisl. Donec pulvinar commodo euismod. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi nec consequat mi. Maecenas tincidunt magna eget blandit faucibus. Mauris in sapien eget metus tincidunt aliquet a vitae est..
            </Text>
          </View>
        );
      case 'product':
        return <Text style={styles.tabContentTitle}>Products</Text>;
      case 'socials':
        return (
          <View style={styles.tabContentContainer}>
            <Text style={styles.tabContentTitle}>Our Socials</Text>
            <View style={styles.popupIconsRow}>
              <TouchableOpacity style={styles.popupIconButton}>
                <Ionicons name="logo-linkedin" size={24} style={styles.popupIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.popupIconButton}>
                <Ionicons name="logo-instagram" size={24} style={styles.popupIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.popupIconButton}>
                <Ionicons name="logo-facebook" size={24} style={styles.popupIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.popupIconButton}>
                <Ionicons name="logo-twitter" size={24} style={styles.popupIcon} />
              </TouchableOpacity>
            </View>
          </View>
        );
      case 'gallery':
        if (!media || media.length === 0) {
          return <Text style={styles.tabContentBody}>No content added</Text>;
        }
        return (
          <View style={{ width: '100%' }}>
            <Text style={styles.galleryTitle}>Gallery</Text>
            <View style={styles.mediaContainer}>
              {media.map((item, index) => {
                if (item.type === 'photo') {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => openMediaModal(index)}
                      style={styles.mediaItemTouchable}
                    >
                      <Image
                        source={{ uri: item.uri }}
                        style={styles.mediaItem}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  );
                } else {
                  // e.g. video placeholder
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => openMediaModal(index)}
                      style={[styles.mediaItemTouchable, styles.videoPlaceholder]}
                    >
                      <Ionicons name="play-circle-outline" size={48} color="#333" />
                    </TouchableOpacity>
                  );
                }
              })}
            </View>
          </View>
        );
      case 'reviews':
        return <Text style={styles.tabContentTitle}>Reviews</Text>;
      default:
        return null;
    }
  };

  // Icon handlers 
  const handleBack = () => navigation?.goBack();
  const handleShare = () => console.log('Share pressed');
  const handleHeart = () => {setIsFavorite(!isFavorite);};
  const handleBriefcase = () => setModalVisible(true);
  
  // floating icons - sticky header - briefcase - menu icon
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* -- FLOATING ICONS (TOP-LEFT) -- */}
      <View style={styles.floatingBackButtonContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
          <Ionicons name="arrow-back-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* -- FLOATING ICONS (TOP-RIGHT) -- */}
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

        {/* Medical Icon + Dropdown Menu */}
        <View>
          <TouchableOpacity onPress={toggleMedicalMenu} style={styles.iconButton}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <Ionicons name="medical" size={24} color="#000" />
            </Animated.View>
          </TouchableOpacity>
          {showMedicalMenu && (
            <View style={styles.medicalMenu}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedTab('about');
                  setShowMedicalMenu(false);
                }}
                style={styles.iconButton}
              >
                <Ionicons name="information-circle-outline" size={24} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedTab('gallery');
                  setShowMedicalMenu(false);
                }}
                style={styles.iconButton}
              >
                <Ionicons name="images-outline" size={24} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedTab('reviews');
                  setShowMedicalMenu(false);
                }}
                style={styles.iconButton}
              >
                <Ionicons name="create-outline" size={24} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedTab('socials');
                  setShowMedicalMenu(false);
                }}
                style={styles.iconButton}
              >
                <Ionicons name="people-outline" size={24} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedTab('product');
                  setShowMedicalMenu(false);
                }}
                style={styles.iconButton}
              >
                <Ionicons name="storefront-outline" size={24} color="#333" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/*
        A ScrollView with:
        1) topSection (profile pic + stars)  [index 0]
        2) stickyHeader (name + type)        [index 1] -> STICKY
        3) contentArea with tab content      [index 2]
      */}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.scrollContent}
        stickyHeaderIndices={[1]} // Make the second child sticky
      >
        {/* 1) Top Section (will scroll away) */}
        <View style={styles.topSection}>
          {/* Photo + Stars */}
          <View style={styles.profilePlaceholder}>
            <Image
              source={require('../../assets/images/react-logo.png')}
              style={{ width: 160, height: 160 }}
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

        {/* 2) Sticky Header: Name + Type (with curved bottom corners) */}
        <View style={styles.stickyHeaderContainer}>
          <Text style={styles.businessName}>Business Name</Text>
          <Text style={styles.businessType}>Barber / Food Truck / Etc.</Text>
        </View>

        {/* 3) Main Content: all the tabs */}
        <View style={styles.contentArea}>
          {renderTabContent()}
        </View>
      </ScrollView>

      {/* =============== MODALS =============== */}
      {/* Briefcase Card Modal */}
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
                <View style={styles.popupstarsContainer}>
                    <Text style={styles.popstar}>★</Text>
                    <Text style={styles.popstar}>★</Text>
                    <Text style={styles.popstar}>★</Text>
                    <Text style={styles.popstar}>★</Text>
                    <Text style={styles.popstar}>★</Text>
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
                    <Text style={styles.hoursItem}>Sat. By appointment</Text>
                    <Text style={styles.hoursItem}>Sun. By appointment</Text>
                </View>
                )}
            </View>
          </View>
        </View>
      </Modal>

      {/* Fullscreen Media Carousel Modal */}
      <Modal
        visible={mediaModalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeMediaModal}
      >
        <View style={styles.fullScreenContainer}>
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
              <View key={idx} style={styles.fullScreenItem}>
                {item.type === 'photo' ? (
                  <Image
                    source={{ uri: item.uri }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                  />
                ) : (
                  <View style={styles.videoFullScreen}>
                    <Ionicons name="play-circle-outline" size={64} color="#fff" />
                    <Text style={{ color: '#fff', textAlign: 'center', marginTop: 10 }}>
                      YouTube Video Link: {item.uri}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
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
    backgroundColor: '#eeeaee', // main background for content display
  },
  /* Floating Icons */
  floatingBackButtonContainer: {
    position: 'absolute',
    top: 32,
    left: 8,
    zIndex: 10,
  },
  floatingRightIconsContainer: {
    position: 'absolute',
    top: 32,
    right: 8,
    zIndex: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
  },
  medicalMenu: {
    position: 'absolute',
    top: 40,
    left: 0,
    backgroundColor: 'transparent',
    zIndex: 9999,
  },

  /* ScrollView */
  scrollContent: {
    paddingBottom: 40,
  },

  /* Top section that scrolls away */
  topSection: {
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.93)', //keep same as stickyHeaderContainer color
  },
  profilePlaceholder: {
    width: 160,
    height: 160,
    backgroundColor: '#eeeaee',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 11,
  },

  /*  Sticky Header (business name & type) */
  stickyHeaderContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.93)', // Business name background collor
    paddingTop: 22,
    paddingBottom: 16,
    borderBottomLeftRadius: 20,  // Round bottom corners
    borderBottomRightRadius: 20, // Round bottom corners
    alignItems: 'center',
  },
  businessName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#222',
    marginBottom: 4,
  },
  businessType: {
    fontSize: 16,
    color: '#888',
  },

  /* 3) Main Content */
  contentArea: {
    backgroundColor: 'transparent', // Change display/ content container color
    borderRadius: 8,
    marginTop: 16,
    padding: 16,
    marginHorizontal: 16,
  },

  /* Stars */
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
  },
  star: {
    fontSize: 24,
    color: '#ffd500',
    marginHorizontal: 11.11,
  },

  /* Tab/icon content styling */
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
    marginRight: 9,
    marginLeft: 9,
    lineHeight: 20,
    textAlign: 'justify',
  },

  /* Gallery */
  galleryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  mediaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  mediaItemTouchable: {
    margin: 4,
  },
  mediaItem: {
    width: 100,
    height: 180,
    borderRadius: 6,
    backgroundColor: '#ddd',
  },
  videoPlaceholder: {
    width: 100,
    height: 180,
    borderRadius: 6,
    backgroundColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Briefcase Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.79)',
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
    marginRight: 0,
    justifyContent: 'flex-start',
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
  popupstarsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 0,
  },
  popstar: {
    fontSize: 24,
    color: '#ffd500',
    marginHorizontal: 10,
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

  /* Fullscreen Media Carousel Modal */
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.89)',
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
  videoFullScreen: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indexText: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.56)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
});
