import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Pressable } from "react-native";
import { spacing, sizing, typography, colors } from "../../utils";

interface TabBarProps {
  tabs: string[];
  activeTab: string;
  onTabPress: (tab: string) => void;
}

export default function TabBar({ tabs, activeTab, onTabPress }: TabBarProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <Pressable
            key={tab}
            onPress={() => onTabPress(tab)}
            style={styles.tab}
          >
            <Text style={[styles.tabText, isActive && styles.tabActive]}>
              {tab}
            </Text>
            {isActive && <View style={styles.underline} />}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceLight,
    maxHeight: sizing.tabBarHeight,
  },
  content: {
    paddingHorizontal: spacing.md,
    gap: spacing.lg,
  },
  tab: {
    paddingVertical: spacing.sm,
    alignItems: "center",
  },
  tabText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.body,
  },
  tabActive: {
    color: colors.textPrimary,
    fontWeight: "600",
  },
  underline: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.tabUnderline,
    borderRadius: 1,
  },
});
