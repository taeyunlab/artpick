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
import { Heart, Trash2 } from 'lucide-react-native';
import { Artwork } from '../types/artpick';
import { INITIAL_ARTWORKS, ARTISTS_DATA } from '../data/artpickData';
import { ArtworkDetailModal } from '../components/ArtworkDetailModal';

const { width } = Dimensions.get('window');

export const FavoritesScreen: React.FC = () => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([1, 3]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const favoriteArtworks = INITIAL_ARTWORKS.filter((art) => favoriteIds.includes(art.id));

  const removeFavorite = (id: number) => {
    setFavoriteIds((prev) => prev.filter((item) => item !== id));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <Heart size={20} color="#ef4444" fill="#ef4444" />
          <Text style={styles.headerTitle}>관심 작품 (찜)</Text>
        </View>
        <Text style={styles.headerSubtitle}>내가 눈여겨본 신진 작가의 원화 컬렉션</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {favoriteArtworks.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Heart size={48} color="#d1d5db" />
            <Text style={styles.emptyTitle}>찜한 작품이 없습니다</Text>
            <Text style={styles.emptyDesc}>홈 피드에서 마음에 드는 작품의 하트를 눌러보세요.</Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            {favoriteArtworks.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                activeOpacity={0.85}
                onPress={() => {
                  setSelectedArtwork(item);
                  setModalVisible(true);
                }}
              >
                <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardArtist}>{item.artist} 작가</Text>
                  <Text style={styles.cardMedium}>{item.medium}</Text>
                  <Text style={styles.cardPrice}>{item.formattedPrice}</Text>
                </View>

                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => removeFavorite(item.id)}
                  activeOpacity={0.7}
                >
                  <Trash2 size={16} color="#9ca3af" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      <ArtworkDetailModal
        artwork={selectedArtwork}
        artist={selectedArtwork ? ARTISTS_DATA[selectedArtwork.artistId] : undefined}
        visible={modalVisible}
        isFavorite={selectedArtwork ? favoriteIds.includes(selectedArtwork.id) : false}
        onToggleFavorite={(id) => {
          if (favoriteIds.includes(id)) {
            removeFavorite(id);
          } else {
            setFavoriteIds((prev) => [...prev, id]);
          }
        }}
        onClose={() => setModalVisible(false)}
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
  headerTitleRow: {
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
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    gap: 10,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4b5563',
  },
  emptyDesc: {
    fontSize: 12,
    color: '#9ca3af',
  },
  listContainer: {
    padding: 16,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#e5e5e5',
  },
  cardContent: {
    flex: 1,
    marginLeft: 14,
    gap: 2,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#181816',
  },
  cardArtist: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '600',
  },
  cardMedium: {
    fontSize: 11,
    color: '#6b7280',
  },
  cardPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: '#181816',
    marginTop: 2,
  },
  deleteBtn: {
    padding: 10,
  },
});
