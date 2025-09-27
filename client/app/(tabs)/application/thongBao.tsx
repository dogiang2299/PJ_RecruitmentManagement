import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ThongBaoScreen() {
  const notifications = [
    {
      id: 1,
      title: "Thực tập sinh công nghệ thông tin: 23 việc làm mới nhất",
      description:
        "23 việc làm mới nhất cho từ khóa bạn từng tìm kiếm. Tham khảo ngay!",
      time: "khoảng 6 giờ trước",
      icon: require("../../../assets/images/react-logo.png"),
    },
    {
      id: 2,
      title: "Job mới dành riêng cho bạn. Tham khảo ngay!",
      description: "Frontend Developer (Angular)",
      time: "khoảng 11 giờ trước",
      icon: require("../../../assets/images/react-logo.png"),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Thông báo</Text>
        <TouchableOpacity>
          <Ionicons name="reorder-three" size={24} color="#222" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {notifications.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={item.icon} style={styles.icon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
              <Text style={styles.cardTime}>{item.time}</Text>
            </View>
          </View>
        ))}
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },
  list: {
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  icon: {
    width: 38,
    height: 38,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#F3F4F6",
    resizeMode: "contain",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222",
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 4,
  },
  cardTime: {
    fontSize: 12,
    color: "#94A3B8",
  },
});
