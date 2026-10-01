import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { ArrowLeft, Check, UserPlus, Calendar, Award } from 'lucide-react-native';
import { RootStackParamList, Artwork, CreationStory } from '../types/artpick';
import { ARTISTS_DATA, INITIAL_ARTWORKS, CREATION_STORIES } from '../data/artpickData';
import { ArtworkDetailModal } from '../components/ArtworkDetailModal';
import { StoryModal } from '../components/StoryModal';

type ArtistProfileRouteProp = RouteProp<RootStackParamList, 'ArtistProfile'>;

const { width } = Dimensions.get('window');

export const ArtistProfileScreen: React.FC = () => {
  const route = useRoute<ArtistProfileRouteProp>();
  const navigation = useNavigation();
  const { artistId } = route.params;

  const artist = ARTISTS_DATA[artistId] || ARTISTS_DATA.seoyun_lee;
  const [isFollowed, setIsFollowed] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'작품' | '창작일지' | '소개' | '전시'>('작품');

  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [artworkModalVisible, setArtworkModalVisible] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<number[]>([1, 3]);

  const [selectedStory, setSelectedStory] = useState<CreationStory | null>(null);
  const [storyModalVisible, setStoryModalVisible] = useState<boolean>(false);

  const artistArtworks = INITIAL_ARTWORKS.filter(
    (item) => item.artistId === artist.id || item.artistId === 'seoyun_lee'
  );

  const artistStories = CREATION_STORIES.filter((story) => story.artistId === artist.id);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top Cover Image */}
      <View style={styles.coverWrap}>
        <Image source={{ uri: artist.coverImage }} style={styles.coverImage} resizeMode="cover" />
        <View style={styles.coverOverlay} />

        {/* Back Button */}
        <SafeAreaView style={styles.backSafeArea}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <ArrowLeft size={20} color="#ffffff" />
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarRow}>
            <View style={styles.avatarWrap}>
              <Image source={{ uri: artist.avatar }} style={styles.avatar} />
            </View>

            <TouchableOpacity
              style={[styles.followBtn, isFollowed && styles.followBtnActive]}
              activeOpacity={0.8}
              onPress={() => setIsFollowed(!isFollowed)}
            >
              {isFollowed ? (
                <>
                  <Check size={14} color="#4b5563" />
                  <Text style={styles.followBtnTextActive}>팔로잉</Text>
                </>
              ) : (
                <>
                  <UserPlus size={14} color="#ffffff" />
                  <Text style={styles.followBtnText}>+ 팔로우</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Name & Bio */}
          <Text style={styles.artistName}>{artist.name}</Text>
          <Text style={styles.artistCategory}>{artist.category}</Text>
          <Text style={styles.artistBio}>{artist.bio}</Text>

          {/* Counts Bar */}
          <View style={styles.countsBar}>
            <View style={styles.countItem}>
              <Text style={styles.countNumber}>{artist.followers}</Text>
              <Text style={styles.countLabel}>팔로워</Text>
            </View>
            <View style={styles.countDivider} />
            <View style={styles.countItem}>
              <Text style={styles.countNumber}>{artist.artworksCount}</Text>
              <Text style={styles.countLabel}>작품</Text>
            </View>
            <View style={styles.countDivider} />
            <View style={styles.countItem}>
              <Text style={styles.countNumber}>{artist.exhibitionsCount}</Text>
              <Text style={styles.countLabel}>전시</Text>
            </View>
          </View>

          {/* Tab Menu */}
          <View style={styles.tabBar}>
            {(['작품', '창작일지', '소개', '전시'] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[styles.tabItem, isActive && styles.tabItemActive]}
                  onPress={() => setActiveTab(tab)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContentWrap}>
          {activeTab === '작품' && (
            <View style={styles.gridContainer}>
              {artistArtworks.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.gridItem}
                  activeOpacity={0.85}
                  onPress={() => {
                    setSelectedArtwork(item);
                    setArtworkModalVisible(true);
                  }}
                >
                  <View style={styles.gridImageWrap}>
                    <Image source={{ uri: item.image }} style={styles.gridImage} resizeMode="cover" />
                  </View>
                  <Text style={styles.gridTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.gridPrice}>{item.formattedPrice}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {activeTab === '창작일지' && (
            <View style={styles.storiesList}>
              {artistStories.map((story) => (
                <TouchableOpacity
                  key={story.id}
                  style={styles.storyListItem}
                  activeOpacity={0.85}
                  onPress={() => {
                    setSelectedStory(story);
                    setStoryModalVisible(true);
                  }}
                >
                  <Image source={{ uri: story.image }} style={styles.storyListImage} resizeMode="cover" />
                  <View style={styles.storyListRight}>
                    <View style={styles.stageTag}>
                      <Text style={styles.stageTagText}>{story.stage}</Text>
                    </View>
                    <Text style={styles.storyListTitle} numberOfLines={2}>
                      {story.title}
                    </Text>
                    <Text style={styles.storyListDate}>{story.date}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {activeTab === '소개' && (
            <View style={styles.aboutCard}>
              <Text style={styles.quoteHeader}>Artist Statement</Text>
              <Text style={styles.quoteBody}>{artist.quote}</Text>
              <View style={styles.aboutDivider} />
              <Text style={styles.aboutSubHeader}>아티스트 이력</Text>
              <Text style={styles.aboutText}>{artist.bio}</Text>
            </View>
          )}

          {activeTab === '전시' && (
            <View style={styles.exhibitionsList}>
              {artist.exhibitions.map((ex, idx) => (
                <View key={idx} style={styles.exhibitionRow}>
                  <View style={styles.exhibitionIconWrap}>
                    <Calendar size={16} color="#2563eb" />
                  </View>
                  <View style={styles.exhibitionInfo}>
                    <Text style={styles.exhibitionYear}>{ex.year}</Text>
                    <Text style={styles.exhibitionTitle}>{ex.title}</Text>
                    <Text style={styles.exhibitionLocation}>{ex.location}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Artwork Modal */}
      <ArtworkDetailModal
        artwork={selectedArtwork}
        artist={artist}
        visible={artworkModalVisible}
        isFavorite={selectedArtwork ? favorites.includes(selectedArtwork.id) : false}
        onToggleFavorite={toggleFavorite}
        onClose={() => setArtworkModalVisible(false)}
      />

      {/* Story Modal */}
      <StoryModal
        story={selectedStory}
        visible={storyModalVisible}
        onClose={() => setStoryModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f6f2',
  },
  coverWrap: {
    height: 200,
    width: width,
    position: 'relative',
    backgroundColor: '#262626',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  backSafeArea: {
    position: 'absolute',
    top: 10,
    left: 16,
    zIndex: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    marginTop: -30,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileHeader: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 20,
    paddingTop: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  avatarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: -50,
    marginBottom: 12,
  },
  avatarWrap: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 4,
    borderColor: '#ffffff',
    backgroundColor: '#e5e5e5',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  followBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#181816',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followBtnActive: {
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  followBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  followBtnTextActive: {
    color: '#4b5563',
    fontSize: 12,
    fontWeight: '700',
  },
  artistName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#181816',
  },
  artistCategory: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '600',
    marginTop: 2,
  },
  artistBio: {
    fontSize: 13,
    color: '#4b5563',
    lineHeight: 19,
    marginTop: 8,
  },
  countsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.08)',
    paddingVertical: 12,
    marginTop: 16,
  },
  countItem: {
    alignItems: 'center',
  },
  countNumber: {
    fontSize: 15,
    fontWeight: '800',
    color: '#181816',
  },
  countLabel: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 1,
  },
  countDivider: {
    width: StyleSheet.hairlineWidth,
    height: 20,
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.08)',
    marginTop: 4,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#181816',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9ca3af',
  },
  tabTextActive: {
    color: '#181816',
    fontWeight: '800',
  },
  tabContentWrap: {
    padding: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    width: (width - 44) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  gridImageWrap: {
    width: '100%',
    height: (width - 44) / 2,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
    marginBottom: 8,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  gridTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#181816',
  },
  gridPrice: {
    fontSize: 12,
    fontWeight: '800',
    color: '#181816',
    marginTop: 2,
  },
  storiesList: {
    gap: 12,
  },
  storyListItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  storyListImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    backgroundColor: '#e5e5e5',
  },
  storyListRight: {
    flex: 1,
    justifyContent: 'center',
  },
  stageTag: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  stageTagText: {
    color: '#2563eb',
    fontSize: 10,
    fontWeight: '700',
  },
  storyListTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#181816',
    lineHeight: 18,
  },
  storyListDate: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 4,
  },
  aboutCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  quoteHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2563eb',
    textTransform: 'uppercase',
  },
  quoteBody: {
    fontSize: 14,
    color: '#181816',
    fontStyle: 'italic',
    lineHeight: 22,
    marginTop: 6,
  },
  aboutDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0,0,0,0.08)',
    marginVertical: 14,
  },
  aboutSubHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: '#181816',
    marginBottom: 6,
  },
  aboutText: {
    fontSize: 13,
    color: '#4b5563',
    lineHeight: 20,
  },
  exhibitionsList: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    gap: 14,
  },
  exhibitionRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  exhibitionIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  exhibitionInfo: {
    flex: 1,
  },
  exhibitionYear: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563eb',
  },
  exhibitionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#181816',
    marginTop: 1,
  },
  exhibitionLocation: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
  },
});
