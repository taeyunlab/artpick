import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Compass, Sparkles, BookOpen } from 'lucide-react-native';
import { RootStackParamList, CreationStory, Artwork } from '../types/artpick';
import { ARTISTS_DATA, CREATION_STORIES, INITIAL_ARTWORKS } from '../data/artpickData';
import { StoryModal } from '../components/StoryModal';
import { ArtworkDetailModal } from '../components/ArtworkDetailModal';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const { width } = Dimensions.get('window');

export const ExploreScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedStory, setSelectedStory] = useState<CreationStory | null>(null);
  const [storyModalVisible, setStoryModalVisible] = useState(false);

  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [artworkModalVisible, setArtworkModalVisible] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([1, 3]);

  const artistsList = Object.values(ARTISTS_DATA);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Compass size={22} color="#181816" />
          <Text style={styles.headerTitle}>탐색 · Explore</Text>
        </View>
        <Text style={styles.headerSubtitle}>신진 작가들과 생생한 작업실 기록</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Featured Artists Horizon */}
        <View style={styles.sectionWrap}>
          <Text style={styles.sectionTitle}>✨ 주목할 신진 예술가</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.artistsScroll}
          >
            {artistsList.map((artist) => (
              <TouchableOpacity
                key={artist.id}
                style={styles.artistCard}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('ArtistProfile', { artistId: artist.id })}
              >
                <Image source={{ uri: artist.avatar }} style={styles.artistAvatar} />
                <Text style={styles.artistName}>{artist.name}</Text>
                <Text style={styles.artistCategory} numberOfLines={1}>
                  {artist.category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* All Stories Feed */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionTitleRow}>
            <BookOpen size={16} color="#181816" />
            <Text style={styles.sectionTitle}>📖 전체 창작 일지 아카이브</Text>
          </View>

          <View style={styles.storiesGrid}>
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
                <Image source={{ uri: story.image }} style={styles.storyImage} resizeMode="cover" />
                <View style={styles.storyBody}>
                  <View style={styles.stageTag}>
                    <Text style={styles.stageText}>{story.stage}</Text>
                  </View>
                  <Text style={styles.storyTitle}>{story.title}</Text>
                  <Text style={styles.storyArtist}>by {story.artistName}</Text>
                  <Text style={styles.storySummary} numberOfLines={2}>
                    {story.summary}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Gallery Curation Grid */}
        <View style={styles.sectionWrap}>
          <Text style={styles.sectionTitle}>🖼️ 갤러리 하이라이트</Text>
          <View style={styles.galleryGrid}>
            {INITIAL_ARTWORKS.map((art) => (
              <TouchableOpacity
                key={art.id}
                style={styles.artCard}
                activeOpacity={0.85}
                onPress={() => {
                  setSelectedArtwork(art);
                  setArtworkModalVisible(true);
                }}
              >
                <Image source={{ uri: art.image }} style={styles.artImage} resizeMode="cover" />
                <View style={styles.artInfo}>
                  <Text style={styles.artTitle} numberOfLines={1}>
                    {art.title}
                  </Text>
                  <Text style={styles.artArtist}>{art.artist}</Text>
                  <Text style={styles.artPrice}>{art.formattedPrice}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Story Details Modal */}
      <StoryModal
        story={selectedStory}
        visible={storyModalVisible}
        onClose={() => setStoryModalVisible(false)}
      />

      {/* Artwork Details Modal */}
      <ArtworkDetailModal
        artwork={selectedArtwork}
        artist={selectedArtwork ? ARTISTS_DATA[selectedArtwork.artistId] : undefined}
        visible={artworkModalVisible}
        isFavorite={selectedArtwork ? favorites.includes(selectedArtwork.id) : false}
        onToggleFavorite={(id) => {
          setFavorites((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
          );
        }}
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 10,
    backgroundColor: '#f7f6f2',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#181816',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 90,
  },
  sectionWrap: {
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#181816',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
    gap: 6,
  },
  artistsScroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  artistCard: {
    width: 110,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  artistAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#e5e5e5',
    marginBottom: 8,
  },
  artistName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#181816',
  },
  artistCategory: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 2,
    textAlign: 'center',
  },
  storiesGrid: {
    paddingHorizontal: 16,
    gap: 14,
  },
  storyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  storyImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#e5e5e5',
  },
  storyBody: {
    padding: 14,
  },
  stageTag: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  stageText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563eb',
  },
  storyTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#181816',
  },
  storyArtist: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2563eb',
    marginTop: 2,
  },
  storySummary: {
    fontSize: 12,
    color: '#4b5563',
    lineHeight: 17,
    marginTop: 6,
  },
  galleryGrid: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  artCard: {
    width: (width - 44) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  artImage: {
    width: '100%',
    height: (width - 44) / 2,
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
    marginBottom: 8,
  },
  artInfo: {
    gap: 2,
  },
  artTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#181816',
  },
  artArtist: {
    fontSize: 11,
    color: '#6b7280',
  },
  artPrice: {
    fontSize: 12,
    fontWeight: '800',
    color: '#181816',
    marginTop: 2,
  },
});
