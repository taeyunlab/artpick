import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CategoryChipsProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <TouchableOpacity
            key={cat}
            activeOpacity={0.8}
            onPress={() => onSelectCategory(cat)}
            style={[styles.chip, isActive ? styles.activeChip : styles.inactiveChip]}
          >
            <Text style={[styles.chipText, isActive ? styles.activeText : styles.inactiveText]}>
              {cat}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  activeChip: {
    backgroundColor: '#181816',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  inactiveChip: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
  },
  activeText: {
    color: '#ffffff',
  },
  inactiveText: {
    color: '#4b5563',
  },
});
