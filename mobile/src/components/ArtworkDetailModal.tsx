import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  SafeAreaView,
  Share,
} from 'react-native';
import { X, Heart, Share2, ShieldCheck, Sparkles } from 'lucide-react-native';
import { Artwork, Artist } from '../types/artpick';

interface ArtworkDetailModalProps {
  artwork: Artwork | null;
  artist?: Artist;
  visible: boolean;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onClose: () => void;
  onOpenArtistProfile?: (artistId: string) => void;
}

const { width } = Dimensions.get('window');

export const ArtworkDetailModal: React.FC<ArtworkDetailModalProps> = ({
  artwork,
  artist,
  visible,
  isFavorite,
  onToggleFavorite,
  onClose,
  onOpenArtistProfile,
}) => {
  if (!artwork) return null;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `[ARTPICK] ${artwork.artist} 작가의 <${artwork.title}> 작품을 확인해보세요!`,
        url: artwork.image,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <SafeAreaView style={styles.safeArea}>
        {/* Top Header Bar */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.actionBtn} onPress={onClose} activeOpacity={0.7}>
            <X size={20} color="#181816" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {artwork.title}
          </Text>
          <TouchableOpacity style={styles.actionBtn} onPress={handleShare} activeOpacity={0.7}>
            <Share2 size={18} color="#181816" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Main Artwork Image */}
          <View style={styles.imageWrap}>
            <Image source={{ uri: artwork.image }} style={styles.mainImage} resizeMode="contain" />
          </View>

          {/* Artist Bar */}
          <TouchableOpacity
            style={styles.artistBar}
            activeOpacity={0.7}
            onPress={() => {
              if (onOpenArtistProfile) {
                onClose();
                onOpenArtistProfile(artwork.artistId);
              }
            }}
          >
            <View style={styles.artistLeft}>
              {artist?.avatar ? (
                <Image source={{ uri: artist.avatar }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, styles.avatarPlaceholder]}>
                  <Text style={styles.avatarInitial}>{artwork.artist[0]}</Text>
                </View>
              )}
              <View>
                <Text style={styles.artistName}>{artwork.artist}</Text>
                <Text style={styles.artistHandle}>{artwork.artistHandle}</Text>
              </View>
            </View>
            <View style={styles.profileBadge}>
              <Text style={styles.profileBadgeText}>작가 프로필 →</Text>
            </View>
          </TouchableOpacity>

          {/* Title & Price Section */}
          <View style={styles.mainInfoSection}>
            <View style={styles.badgeRow}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{artwork.category}</Text>
              </View>
              <Text style={styles.yearText}>{artwork.year}</Text>
            </View>

            <Text style={styles.titleText}>{artwork.title}</Text>
            <Text style={styles.priceText}>{artwork.formattedPrice}</Text>
          </View>

          {/* Specs Table */}
          <View style={styles.specsCard}>
            <Text style={styles.specsTitle}>작품 상세 규격</Text>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>재료 및 기법</Text>
              <Text style={styles.specValue}>{artwork.medium}</Text>
            </View>
            <View style={styles.specDivider} />
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>크기</Text>
              <Text style={styles.specValue}>{artwork.dimensions}</Text>
            </View>
            <View style={styles.specDivider} />
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>보증 및 인증</Text>
              <View style={styles.guaranteeWrap}>
                <ShieldCheck size={14} color="#16a34a" />
                <Text style={styles.guaranteeText}>작가 친필 보증서 포함</Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descSection}>
            <Text style={styles.descHeader}>작품 설명</Text>
            <Text style={styles.descText}>{artwork.description}</Text>
          </View>

          {/* Artpick Safe Purchase Guarantee */}
          <View style={styles.guaranteeBox}>
            <Sparkles size={16} color="#2563eb" />
            <Text style={styles.guaranteeBoxText}>
              ARTPICK은 신진 작가 직거래 및 원화 검수 시스템을 통해 100% 진품 보증 및 안전 결제를 지원합니다.
            </Text>
          </View>
        </ScrollView>

        {/* Bottom Sticky Action Bar (iOS Style) */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={[styles.favBtn, isFavorite && styles.favBtnActive]}
            activeOpacity={0.7}
            onPress={() => onToggleFavorite(artwork.id)}
          >
            <Heart
              size={22}
              color={isFavorite ? '#ef4444' : '#181816'}
              fill={isFavorite ? '#ef4444' : 'transparent'}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.inquireBtn} activeOpacity={0.8}>
            <Text style={styles.inquireBtnText}>소장 및 구매 문의하기</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#181816',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f7f6f2',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  imageWrap: {
    width: width,
    height: 340,
    backgroundColor: '#181816',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  artistBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  artistLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#e5e5e5',
  },
  avatarPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181816',
  },
  avatarInitial: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  artistName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#181816',
  },
  artistHandle: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.5)',
    marginTop: 1,
  },
  profileBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#f0f3ff',
  },
  profileBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563eb',
  },
  mainInfoSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginTop: 10,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: 'rgba(0,0,0,0.06)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#181816',
  },
  yearText: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.5)',
  },
  titleText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#181816',
    lineHeight: 26,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#181816',
    marginTop: 8,
  },
  specsCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  specsTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#181816',
    marginBottom: 12,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  specLabel: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.55)',
  },
  specValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#181816',
  },
  specDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0,0,0,0.08)',
    marginVertical: 4,
  },
  guaranteeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  guaranteeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#16a34a',
  },
  descSection: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  descHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: '#181816',
    marginBottom: 8,
  },
  descText: {
    fontSize: 13,
    color: '#333333',
    lineHeight: 21,
  },
  guaranteeBox: {
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  guaranteeBoxText: {
    fontSize: 11,
    color: '#1e40af',
    flex: 1,
    lineHeight: 16,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.1)',
    gap: 12,
  },
  favBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  favBtnActive: {
    borderColor: '#fca5a5',
    backgroundColor: '#fef2f2',
  },
  inquireBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#181816',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inquireBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});
