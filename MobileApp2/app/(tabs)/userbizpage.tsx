import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BusinessProfileScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('about');
  const [modalVisible, setModalVisible] = useState(false);
  const [showHours, setShowHours] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // 1) Media state, now includes 5 photos and 3 YouTube video links
  const [media, setMedia] = useState([
    // 5 CAT IMAGES (placeholder)
    { type: 'photo', uri: 'https://placekitten.com/300/200' },
    { type: 'photo', uri: 'https://placekitten.com/301/201' },
    { type: 'photo', uri: 'https://placekitten.com/302/202' },
    { type: 'photo', uri: 'https://placekitten.com/303/203' },
    { type: 'photo', uri: 'https://placekitten.com/304/204' },
    // 3 VIDEO PLACEHOLDERS (YouTube links)
    { type: 'video', uri: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { type: 'video', uri: 'https://www.youtube.com/watch?v=3fumBcKC6RE' },
    { type: 'video', uri: 'https://www.youtube.com/watch?v=ScMzIvxBSi4' },
  ]);

  // 2) Your existing tab content renderer, updated for the 'photos' tab
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
 ...
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
            <View style={styles.popupIconsRow}>
              <TouchableOpacity
                style={styles.popupIconButton}
                onPress={() => console.log('Github pressed')}
              >
                <Ionicons name="logo-github" size={24} style={styles.popupIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.popupIconButton}
                onPress={() => console.log('Tiktok pressed')}
              >
                <Ionicons name="logo-tiktok" size={24} style={styles.popupIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.popupIconButton}
                onPress={() => console.log('Snapchat pressed')}
              >
                <Ionicons name="logo-snapchat" size={24} style={styles.popupIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.popupIconButton}
                onPress={() => console.log('Twitch pressed')}
              >
                <Ionicons name="logo-twitch" size={24} style={styles.popupIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.popupIconsRow}>
              <TouchableOpacity
                style={styles.popupIconButton}
                onPress={() => console.log('Discord pressed')}
              >
                <Ionicons name="logo-discord" size={24} style={styles.popupIcon} />
              </TouchableOpacity>
            </View>
          </View>
        );
      case 'photos':
        // 3) If there's no content, display "No content added"
        if (!media || media.length === 0) {
          return <Text style={styles.tabContentBody}>No content added</Text>;
        }

        // 4) Otherwise, map over the media array and display images or video placeholders
        return (
          <View style={styles.mediaContainer}>
            {media.map((item, index) => {
              if (item.type === 'photo') {
                return (
                  <Image
                    key={index}
                    source={{ uri: item.uri }}
                    style={styles.mediaItem}
                    resizeMode="cover"
                  />
                );
              } else if (item.type === 'video') {
                // Placeholder for a video. You can replace it with e.g. react-native-video
                return (
                  <View key={index} style={styles.videoPlaceholder}>
                    <Ionicons name="play-circle-outline" size={48} color="#333" />
                    <Text style={{ textAlign: 'center' }}>YouTube Video Link</Text>
                  </View>
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

  // Icon press handlers
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
        {/* Logo */}
        <View style={styles.profilePlaceholder}>
          <Text style={styles.placeholderText}>Logo / Photo</Text>
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

        {/* Tab Buttons */}
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
            style={[styles.tabButton, selectedTab === 'photos' && styles.tabButtonActive]}
            onPress={() => setSelectedTab('photos')}
          >
            <Text style={styles.tabButtonText}>Photos</Text>
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

      {/* MODAL POPUP */}
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
                    source={{
                      uri: 'https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/1259px-Twitter_Bird.svg.png',
                    }}
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
                  <Text style={styles.hoursItem}>M 1:00AM - 12:00AM</Text>
                  <Text style={styles.hoursItem}>T 1:00AM - 12:00AM</Text>
                  <Text style={styles.hoursItem}>W 1:00AM - 12:00AM</Text>
                  <Text style={styles.hoursItem}>TH 1:00AM - 12:00AM</Text>
                  <Text style={styles.hoursItem}>F 1:00AM - 12:00AM</Text>
                  <Text style={styles.hoursItem}>S 1:00AM - 12:00AM</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default BusinessProfileScreen;

const styles = StyleSheet.create({
  /* Main screen layout */
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
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  // Logo / Photo
  profilePlaceholder: {
    width: 160,
    height: 160,
    backgroundColor: '#eeeaee',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 1,
  },
  placeholderText: {
    color: '#555',
    fontSize: 12,
  },

  // Stars
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  star: {
    fontSize: 24,
    color: '#ffd500',
    marginHorizontal: 15,
  },

  // Name
  businessName: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 20,
  },

  // Tabs
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

  // Tab Content area
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

  // Media container (photos/videos)
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
    backgroundColor: '#ddd',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* MODAL POPUP */
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
});
