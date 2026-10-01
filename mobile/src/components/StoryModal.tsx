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
} from 'react-native';
import { X, Clock, Palette, BookOpen } from 'lucide-react-native';
import { CreationStory } from '../types/artpick';

interface StoryModalProps {
  story: CreationStory | null;
  visible: boolean;
  onClose: () => void;
}

const { width } = Dimensions.get('window');

export const StoryModal: React.FC<StoryModalProps> = ({ story, visible, onClose }) => {
  if (!story) return null;

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <SafeAreaView style={styles.safeArea}>
        {/* Top Header */}
        <View style={styles.header}>
          <View style={styles.headerTitleWrap}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{story.stage}</Text>
            </View>
            <Text style={styles.headerSub}>{story.artistName} 작가의 창작 일지</Text>
          </View>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.7}>
            <X size={20} color="#181816" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Main Cover Image */}
          <View style={styles.coverWrap}>
            <Image source={{ uri: story.image }} style={styles.coverImage} resizeMode="cover" />
            <View style={styles.coverOverlay} />
            <View style={styles.coverTextWrap}>
              <Text style={styles.coverDate}>{story.date}</Text>
              <Text style={styles.coverTitle}>{story.title}</Text>
            </View>
          </View>

          {/* Summary Quote Box */}
          <View style={styles.summaryBox}>
            <Text style={styles.summaryText}>{story.summary}</Text>
          </View>

          {/* Quick Info (Duration & Materials) */}
          <View style={styles.metaSection}>
            <View style={styles.metaRow}>
              <Clock size={16} color="#2563eb" />
              <Text style={styles.metaLabel}>작업 기간:</Text>
              <Text style={styles.metaValue}>{story.fullLog.duration}</Text>
            </View>

            <View style={styles.materialsWrap}>
              <View style={styles.metaRow}>
                <Palette size={16} color="#2563eb" />
                <Text style={styles.metaLabel}>사용 재료:</Text>
              </View>
              <View style={styles.chipRow}>
                {story.fullLog.materials.map((mat, idx) => (
                  <View key={idx} style={styles.materialChip}>
                    <Text style={styles.materialChipText}>{mat}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Process Timeline Steps */}
          <View style={styles.timelineSection}>
            <View style={styles.sectionHeader}>
              <BookOpen size={18} color="#181816" />
              <Text style={styles.sectionTitle}>단계별 창작 과정</Text>
            </View>

            {story.fullLog.steps.map((step, idx) => (
              <View key={idx} style={styles.stepCard}>
                <View style={styles.stepHeader}>
                  <View style={styles.stepNumberBadge}>
                    <Text style={styles.stepNumberText}>{step.step}</Text>
                  </View>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                </View>

                {step.image && (
                  <Image source={{ uri: step.image }} style={styles.stepImage} resizeMode="cover" />
                )}

                <Text style={styles.stepDesc}>{step.desc}</Text>
              </View>
            ))}
          </View>

          {/* Artist Note */}
          <View style={styles.artistNoteBox}>
            <Text style={styles.artistNoteHeader}>💬 작가 한마디</Text>
            <Text style={styles.artistNoteText}>"{story.fullLog.artistNote}"</Text>
            <Text style={styles.artistNoteSign}>— {story.artistName}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f6f2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#f7f6f2',
  },
  headerTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    backgroundColor: '#181816',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  headerSub: {
    fontSize: 13,
    fontWeight: '600',
    color: '#181816',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  coverWrap: {
    width: width,
    height: 240,
    position: 'relative',
    backgroundColor: '#e5e5e5',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  coverTextWrap: {
    position: 'absolute',
    bottom: 16,
    left: 20,
    right: 20,
  },
  coverDate: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  coverTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
  },
  summaryBox: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 14,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  summaryText: {
    fontSize: 13,
    color: '#333333',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  metaSection: {
    marginHorizontal: 16,
    marginTop: 14,
    padding: 14,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    gap: 10,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#181816',
  },
  metaValue: {
    fontSize: 13,
    color: '#444444',
  },
  materialsWrap: {
    gap: 6,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  materialChip: {
    backgroundColor: '#f0f3ff',
    borderWidth: 1,
    borderColor: '#c7d7fe',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  materialChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1e40af',
  },
  timelineSection: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#181816',
  },
  stepCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  stepNumberBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#181816',
    flex: 1,
  },
  stepImage: {
    width: '100%',
    height: 170,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#e5e5e5',
  },
  stepDesc: {
    fontSize: 13,
    color: '#444444',
    lineHeight: 19,
  },
  artistNoteBox: {
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: '#fef3c7',
    borderColor: '#fde68a',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  artistNoteHeader: {
    fontSize: 13,
    fontWeight: '800',
    color: '#92400e',
    marginBottom: 6,
  },
  artistNoteText: {
    fontSize: 13,
    color: '#78350f',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  artistNoteSign: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400e',
    textAlign: 'right',
    marginTop: 8,
  },
});
