// app/(tabs)/taoCV.tsx - Tạo CV

import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TaoCVScreen() {
  const [selectedLanguage, setSelectedLanguage] = React.useState("vietnamese");
  const [selectedStyle, setSelectedStyle] = React.useState("all");

  const cvTemplates = [
    {
      id: 1,
      name: "Ấn tượng 6",
      image: require("../../../assets/images/react-logo.png"),
      category: "all",
    },
    {
      id: 2,
      name: "Hiện đại 6",
      image: require("../../../assets/images/react-logo.png"),
      category: "modern",
    },
    {
      id: 3,
      name: "Basic 4",
      image: require("../../../assets/images/react-logo.png"),
      category: "simple",
    },
    {
      id: 4,
      name: "Sinh viên 2",
      image: require("../../../assets/images/react-logo.png"),
      category: "student",
    },
  ];

  const styleFilters = [
    { key: "all", label: "Tất cả" },
    { key: "simple", label: "Đơn giản" },
    { key: "professional", label: "Chuyên nghiệp" },
    { key: "modern", label: "Hiện đại" },
    { key: "student", label: "Sinh viên" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Tạo CV</Text>
        <TouchableOpacity>
          <Text style={styles.myCVBtn}>CV của tôi</Text>
        </TouchableOpacity>
      </View>

      {/* Language Tabs */}
      <View style={styles.languageTabs}>
        {[
          { key: "vietnamese", label: "Tiếng Việt" },
          { key: "english", label: "Tiếng Anh" },
          { key: "japanese", label: "Tiếng Nhật" },
        ].map((lang) => (
          <TouchableOpacity
            key={lang.key}
            style={[
              styles.languageTab,
              selectedLanguage === lang.key && styles.languageTabActive,
            ]}
            onPress={() => setSelectedLanguage(lang.key)}
          >
            <Text
              style={[
                styles.languageTabText,
                selectedLanguage === lang.key && styles.languageTabTextActive,
              ]}
            >
              {lang.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Style Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.styleFilters}
      >
        {styleFilters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.styleFilterBtn,
              selectedStyle === filter.key && styles.styleFilterBtnActive,
            ]}
            onPress={() => setSelectedStyle(filter.key)}
          >
            <Text
              style={[
                styles.styleFilterText,
                selectedStyle === filter.key && styles.styleFilterTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* CV Templates Grid */}
      <ScrollView
        style={styles.templatesScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.templatesGrid}>
          {cvTemplates
            .filter(
              (t) => selectedStyle === "all" || t.category === selectedStyle
            )
            .map((template) => (
              <View key={template.id} style={styles.templateCard}>
                <Image source={template.image} style={styles.templateImg} />
                <Text style={styles.templateName}>{template.name}</Text>
                <TouchableOpacity style={styles.useBtn}>
                  <Text style={styles.useBtnText}>Dùng mẫu này</Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingTop: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },
  myCVBtn: {
    color: "#22C55E",
    fontWeight: "600",
    fontSize: 15,
  },
  languageTabs: {
    flexDirection: "row",
    backgroundColor: "#E5E7EB",
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 4,
  },
  languageTab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 16,
  },
  languageTabActive: {
    backgroundColor: "#fff",
  },
  languageTabText: {
    color: "#64748B",
    fontWeight: "600",
    fontSize: 15,
  },
  languageTabTextActive: {
    color: "#22C55E",
  },
  styleFilters: {
    flexGrow: 0,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  styleFilterBtn: {
    backgroundColor: "#E5E7EB",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 8,
  },
  styleFilterBtnActive: {
    backgroundColor: "#22C55E",
  },
  styleFilterText: {
    color: "#222",
    fontWeight: "600",
    fontSize: 14,
  },
  styleFilterTextActive: {
    color: "#fff",
  },
  templatesScroll: {
    flex: 1,
    paddingHorizontal: 16,
  },
  templatesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  templateCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 14,
    alignItems: "center",
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  templateImg: {
    width: 120,
    height: 160,
    borderRadius: 10,
    marginBottom: 8,
    resizeMode: "cover",
    backgroundColor: "#F3F4F6",
  },
  templateName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
    textAlign: "center",
  },
  useBtn: {
    backgroundColor: "#22C55E",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  useBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
