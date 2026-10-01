import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Sparkles, ArrowRight } from 'lucide-react-native';
import { Artist } from '../types/artpick';

interface SpotlightBannerProps {
  artist: Artist;
  onPressStory: () => void;
  onPressProfile: () => void;
}

export const SpotlightBanner: React.FC<SpotlightBannerProps> = ({
  artist,
  onPressStory,
  onPressProfile,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Top Tag */}
        <View style={styles.tagWrap}>
          <Sparkles size={12} color="#f59e0b" />
          <Text style={styles.tagText}>이 주의 주목할 신진 작가</Text>
        </View>

        {/* Content Row */}
        <View style={styles.contentRow}>
          <TouchableOpacity activeOpacity={0.8} onPress={onPressProfile}>
            <Image source={{ uri: artist.avatar }} style={styles.avatar} />
          </TouchableOpacity>

          <View style={styles.textWrap}>
            <TouchableOpacity activeOpacity={0.8} onPress={onPressProfile}>
              <Text style={styles.artistName}>{artist.name} 작가</Text>
            </TouchableOpacity>
            <Text style={styles.quoteText} numberOfLines={2}>
              {artist.quote}
            </Text>

            <TouchableOpacity style={styles.linkRow} activeOpacity={0.7} onPress={onPressStory}>
              <Text style={styles.linkText}>작가 스토리 & 창작 일지 보기</Text>
              <ArrowRight size={12} color="#1d4ed8" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
  },
  card: {
    backgroundColor: '#fffbeb',
    borderColor: '#fde68a',
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tagWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
    backgroundColor: '#181816',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginBottom: 12,
  },
  tagText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ffffff',
    backgroundColor: '#e5e5e5',
  },
  textWrap: {
    flex: 1,
  },
  artistName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#181816',
  },
  quoteText: {
    fontSize: 11,
    color: '#4b5563',
    lineHeight: 16,
    marginTop: 2,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  linkText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1d4ed8',
  },
});
