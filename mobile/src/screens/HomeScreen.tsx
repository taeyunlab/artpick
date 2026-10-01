import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Search, Heart, UserPlus, Check, X } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Artwork, CreationStory } from '../types/artpick';
import { CATEGORIES, INITIAL_ARTWORKS, ARTISTS_DATA, CREATION_STORIES } from '../data/artpickData';
import { SpotlightBanner } from '../components/SpotlightBanner';
import { CategoryChips } from '../components/CategoryChips';
import { StoryModal } from '../components/StoryModal';
import { ArtworkDetailModal } from '../components/ArtworkDetailModal';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [searchWord, setSearchWord] = useState<string>('');
  const [artworks] = useState<Artwork[]>(INITIAL_ARTWORKS);
  const [favorites, setFavorites] = useState<number[]>([1, 3]);
  const [following, setFollowing] = useState<Record<string, boolean>>({ seoyun_lee: true });

  const [selectedStory, setSelectedStory] = useState<CreationStory | null>(null);
  const [storyModalVisible, setStoryModalVisible] = useState<boolean>(false);

  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [artworkModalVisible, setArtworkModalVisible] = useState<boolean>(false);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleFollow = (artistId: string) => {
    setFollowing((prev) => ({
      ...prev,
      [artistId]: !prev[artistId],
    }));
  };

  const filteredArtworks = artworks.filter((item) => {
    if (activeCategory !== '전체' && item.category !== activeCategory) return false;
    if (
      searchWord &&
      !item.title.toLowerCase().includes(searchWord.toLowerCase()) &&
      !item.artist.toLowerCase().includes(searchWord.toLowerCase()) &&
      !item.medium.toLowerCase().includes(searchWord.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const spotlightArtist = ARTISTS_DATA.seoyun_lee;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f7f6f2" />

      {/* Top Main Header */}
      <View style={styles.topHeader}>
        <View>
          <View style={styles.logoRow}>
            <Text style={styles.logoText}>ARTPICK</Text>
            <View style={styles.betaBadge}>
              <Text style={styles.betaText}>iOS</Text>
            </View>
          </View>
          <Text style={styles.sloganText}>신진 예술가의 발견 · 기록 · 연결 · 판매</Text>
        </View>

        <TouchableOpacity style={styles.registerArtistBtn} activeOpacity={0.8}>
          <Text style={styles.registerArtistBtnText}>작가 등록</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={18} color="#9ca3af" />
            <TextInput
              style={styles.searchInput}
              placeholder="작품, 작가명, 기법 검색..."
              placeholderTextColor="#9ca3af"
              value={searchWord}
              onChangeText={setSearchWord}
            />
            {searchWord.length > 0 && (
              <TouchableOpacity onPress={() => setSearchWord('')}>
                <X size={16} color="#9ca3af" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Category Filter Chips */}
        <CategoryChips
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* Spotlight Featured Artist Banner */}
        <SpotlightBanner
          artist={spotlightArtist}
          onPressStory={() => {
            setSelectedStory(CREATION_STORIES[0]);
            setStoryModalVisible(true);
          }}
          onPressProfile={() => {
            navigation.navigate('ArtistProfile', { artistId: spotlightArtist.id });
          }}
        />

        {/* 📖 Creation Stories Horizontal Scroll */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionTitle}>📖 창작의 과정 (Story)</Text>
              <Text style={styles.sectionSubtitle}>완성된 작품 너머의 작업실 이야기</Text>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storiesContainer}
          >
            {CREATION_STORIES.map((story) => (
              <TouchableOpacity
                key={story.id}
                style={styles.storyCard}
                activeOpacity={0.85}
                onPress={() => {
                  setSelectedStory(story);
                  setStoryModalVisible(true);
                }}
              >
                <View style={styles.storyImageWrap}>
                  <Image source={{ uri: story.image }} style={styles.storyImage} />
                  <View style={styles.storyStageBadge}>
                    <Text style={styles.storyStageText}>{story.stage}</Text>
                  </View>
                </View>
                <View style={styles.storyContent}>
                  <Text style={styles.storyArtist}>{story.artistName}</Text>
                  <Text style={styles.storyTitle} numberOfLines={1}>
                    {story.title}
                  </Text>
                  <Text style={styles.storySummary} numberOfLines={2}>
                    {story.summary}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 🎨 Live Artwork Curation Feed */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionTitle}>🎨 실시간 작품 큐레이션</Text>
              <Text style={styles.sectionSubtitle}>
                {filteredArtworks.length}개의 작품이 전시 중입니다
              </Text>
            </View>
          </View>

          <View style={styles.feedList}>
            {filteredArtworks.map((item) => {
              const isFav = favorites.includes(item.id);
              const isFollow = !!following[item.artistId];

              return (
                <View key={item.id} style={styles.artworkCard}>
                  {/* Artist Header in Card */}
                  <View style={styles.cardArtistHeader}>
                    <TouchableOpacity
                      style={styles.cardArtistLeft}
                      activeOpacity={0.8}
                      onPress={() => navigation.navigate('ArtistProfile', { artistId: item.artistId })}
                    >
                      <Image
                        source={{
                          uri:
                            ARTISTS_DATA[item.artistId]?.avatar ||
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
                        }}
                        style={styles.cardArtistAvatar}
                      />
                      <View>
                        <Text style={styles.cardArtistName}>{item.artist}</Text>
                        <Text style={styles.cardArtistRole}>신진 예술가</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.followBtn, isFollow && styles.followBtnActive]}
                      activeOpacity={0.8}
                      onPress={() => toggleFollow(item.artistId)}
                    >
                      {isFollow ? (
                        <>
                          <Check size={12} color="#4b5563" />
                          <Text style={styles.followBtnTextActive}>팔로잉</Text>
                        </>
                      ) : (
                        <>
                          <UserPlus size={12} color="#181816" />
                          <Text style={styles.followBtnText}>+ 팔로우</Text>
                        </>
                      )}
                    </TouchableOpacity>
                  </View>

                  {/* Artwork Image */}
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      setSelectedArtwork(item);
                      setArtworkModalVisible(true);
                    }}
                    style={styles.artworkImageWrap}
                  >
                    <Image source={{ uri: item.image }} style={styles.artworkImage} resizeMode="cover" />
                  </TouchableOpacity>

                  {/* Artwork Meta & Actions */}
                  <View style={styles.cardBottomRow}>
                    <TouchableOpacity
                      style={styles.cardInfoWrap}
                      activeOpacity={0.7}
                      onPress={() => {
                        setSelectedArtwork(item);
                        setArtworkModalVisible(true);
                      }}
                    >
                      <Text style={styles.cardArtworkTitle}>{item.title}</Text>
                      <Text style={styles.cardMedium}>{item.medium}</Text>
                      <Text style={styles.cardPrice}>{item.formattedPrice}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.likeBtn}
                      activeOpacity={0.7}
                      onPress={() => toggleFavorite(item.id)}
                    >
                      <Heart
                        size={22}
                        color={isFav ? '#ef4444' : '#9ca3af'}
                        fill={isFav ? '#ef4444' : 'transparent'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Story Details Modal Sheet */}
      <StoryModal
        story={selectedStory}
        visible={storyModalVisible}
        onClose={() => setStoryModalVisible(false)}
      />

      {/* Artwork Details Modal Sheet */}
      <ArtworkDetailModal
        artwork={selectedArtwork}
        artist={selectedArtwork ? ARTISTS_DATA[selectedArtwork.artistId] : undefined}
        visible={artworkModalVisible}
        isFavorite={selectedArtwork ? favorites.includes(selectedArtwork.id) : false}
        onToggleFavorite={toggleFavorite}
        onClose={() => setArtworkModalVisible(false)}
        onOpenArtistProfile={(artistId) => {
          navigation.navigate('ArtistProfile', { artistId });
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f6f2',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: '#f7f6f2',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  logoText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#181816',
    letterSpacing: 1.5,
  },
  betaBadge: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  betaText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
  },
  sloganText: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 2,
  },
  registerArtistBtn: {
    backgroundColor: '#181816',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  registerArtistBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 90,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 44,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#181816',
    height: '100%',
  },
  sectionWrap: {
    marginTop: 18,
  },
  sectionHeaderRow: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#181816',
  },
  sectionSubtitle: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
  },
  storiesContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  storyCard: {
    width: 220,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  storyImageWrap: {
    width: '100%',
    height: 125,
    backgroundColor: '#e5e5e5',
    position: 'relative',
  },
  storyImage: {
    width: '100%',
    height: '100%',
  },
  storyStageBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  storyStageText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  storyContent: {
    padding: 12,
  },
  storyArtist: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563eb',
  },
  storyTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#181816',
    marginTop: 2,
  },
  storySummary: {
    fontSize: 11,
    color: '#6b7280',
    lineHeight: 15,
    marginTop: 4,
  },
  feedList: {
    paddingHorizontal: 16,
    gap: 16,
  },
  artworkCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  cardArtistHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardArtistLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardArtistAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e5e5e5',
  },
  cardArtistName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#181816',
  },
  cardArtistRole: {
    fontSize: 10,
    color: '#9ca3af',
  },
  followBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  followBtnActive: {
    backgroundColor: 'rgba(0,0,0,0.04)',
    borderColor: 'rgba(0,0,0,0.08)',
  },
  followBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#181816',
  },
  followBtnTextActive: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4b5563',
  },
  artworkImageWrap: {
    width: '100%',
    height: width * 0.75,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
  },
  artworkImage: {
    width: '100%',
    height: '100%',
  },
  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cardInfoWrap: {
    flex: 1,
    paddingRight: 10,
  },
  cardArtworkTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#181816',
  },
  cardMedium: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#181816',
    marginTop: 4,
  },
  likeBtn: {
    padding: 6,
  },
});
