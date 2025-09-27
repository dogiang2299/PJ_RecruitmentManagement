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
import { useRouter } from "expo-router";
export default function TaiKhoanScreen() {
  const router = useRouter();
  const [jobSearchEnabled, setJobSearchEnabled] = React.useState(false);
  const [hrContactEnabled, setHrContactEnabled] = React.useState(true);
  const statsData = [
    { label: "Việc làm đã ứng tuyển", value: "0", icon: "briefcase" },
    { label: "Việc làm đã lưu", value: "0", icon: "bookmark" },
    { label: "Việc làm phù hợp", value: "30", icon: "checkmark-circle" },
    { label: "Công ty đang theo dõi", value: "0", icon: "business" },
    { label: "NTD đã xem hồ sơ", value: "0", icon: "eye" },
    { label: "Thông báo việc làm", value: "0", icon: "notifications" },
  ];
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarWrap}>
          <Image
            source={require("../../../assets/images/react-logo.png")}
            style={styles.avatar}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>Binh Luong Thanh</Text>
          <Text style={styles.id}>Mã ứng viên: 8114661</Text>
        </View>
        <TouchableOpacity style={styles.upgradeBtn}>
          <Ionicons name="star" size={16} color="#22C55E" />
          <Text style={styles.upgradeBtnText}>Nâng cấp tài khoản</Text>
        </TouchableOpacity>
      </View>

      {/* Trạng thái tìm việc & Cho phép NTD liên hệ */}
      <View style={styles.switchBlock}>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Trạng thái tìm việc</Text>
          <TouchableOpacity
            style={[
              styles.switchBtn,
              jobSearchEnabled && styles.switchBtnActive,
            ]}
            onPress={() => setJobSearchEnabled(!jobSearchEnabled)}
          >
            <View
              style={[
                styles.switchThumb,
                jobSearchEnabled && styles.switchThumbActive,
              ]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Cho phép NTD liên hệ</Text>
          <TouchableOpacity
            style={[
              styles.switchBtn,
              hrContactEnabled && styles.switchBtnActive,
            ]}
            onPress={() => setHrContactEnabled(!hrContactEnabled)}
          >
            <View
              style={[
                styles.switchThumb,
                hrContactEnabled && styles.switchThumbActive,
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* CV của tôi */}
      <View style={styles.sectionBlock}>
        <Text style={styles.sectionTitle}>CV của tôi</Text>
        <TouchableOpacity style={styles.sectionItem}>
          <Ionicons
            name="document-text"
            size={20}
            color="#22C55E"
            style={styles.sectionItemIcon}
          />
          <Text style={styles.sectionItemText}>CV đã tạo trên TopCV</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionItem}>
          <Ionicons
            name="cloud-upload"
            size={20}
            color="#22C55E"
            style={styles.sectionItemIcon}
          />
          <Text style={styles.sectionItemText}>CV đã tải lên</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionItem}>
          <Ionicons
            name="document"
            size={20}
            color="#22C55E"
            style={styles.sectionItemIcon}
          />
          <Text style={styles.sectionItemText}>Cover Letter</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* Quản lý tìm việc */}
      <View style={styles.sectionBlock}>
        <Text style={styles.sectionTitle}>Quản lý tìm việc</Text>
        <View style={styles.statsGrid}>
          {statsData.map((stat, idx) => {
            // fallback icon nếu tên không hợp lệ
            const validIcons = [
              "briefcase",
              "bookmark",
              "checkmark-circle",
              "business",
              "eye",
              "notifications",
            ];
            const iconName = validIcons.includes(stat.icon)
              ? stat.icon
              : "help-circle-outline";
            return (
              <View key={idx} style={styles.statCard}>
                <Ionicons
                  name={iconName as keyof typeof Ionicons.glyphMap}
                  size={22}
                  color="#22C55E"
                />

                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Banner việc làm gần bạn */}
      <TouchableOpacity style={styles.bannerBlock}>
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTitle}>Khám phá việc làm gần bạn</Text>
          <TouchableOpacity style={styles.bannerBtn}>
            <Text style={styles.bannerBtnText}>XEM NGAY</Text>
          </TouchableOpacity>
        </View>
        <Ionicons
          name="map"
          size={36}
          color="#22C55E"
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>

      {/* Cài đặt tài khoản */}
      <View style={styles.sectionBlock}>
        <Text style={styles.sectionTitle}>Cài đặt tài khoản</Text>
        <TouchableOpacity style={styles.sectionItem}>
          <Ionicons
            name="star-outline"
            size={20}
            color="#666"
            style={styles.sectionItemIcon}
          />
          <Text style={styles.sectionItemText}>Nâng cấp tài khoản VIP</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionItem}>
          <Ionicons
            name="key-outline"
            size={20}
            color="#666"
            style={styles.sectionItemIcon}
          />
          <Text style={styles.sectionItemText}>Đổi mật khẩu</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionItem}>
          <Ionicons
            name="shield-outline"
            size={20}
            color="#666"
            style={styles.sectionItemIcon}
          />
          <Text style={styles.sectionItemText}>Cài đặt bảo mật</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionItem}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="#666"
            style={styles.sectionItemIcon}
          />
          <Text style={styles.sectionItemText}>Cài đặt thông báo email</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionItem}>
          <Ionicons
            name="lock-open-outline"
            size={20}
            color="#666"
            style={styles.sectionItemIcon}
          />
          <Text style={styles.sectionItemText}>Vô hiệu hóa tài khoản</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* Chính sách và hỗ trợ */}
      <View style={styles.sectionBlock}>
        <Text style={styles.sectionTitle}>Chính sách và hỗ trợ</Text>
        <TouchableOpacity style={styles.sectionItem}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color="#666"
            style={styles.sectionItemIcon}
          />
          <Text style={styles.sectionItemText}>Về TopCV</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionItem}>
          <Ionicons
            name="document-text-outline"
            size={20}
            color="#666"
            style={styles.sectionItemIcon}
          />
          <Text style={styles.sectionItemText}>Điều khoản dịch vụ</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionItem}>
          <Ionicons
            name="shield-checkmark-outline"
            size={20}
            color="#666"
            style={styles.sectionItemIcon}
          />
          <Text style={styles.sectionItemText}>Chính sách bảo mật</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionItem}>
          <Ionicons
            name="call-outline"
            size={20}
            color="#666"
            style={styles.sectionItemIcon}
          />
          <Text style={styles.sectionItemText}>Trợ giúp</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionItem}>
          <Ionicons
            name="thumbs-up-outline"
            size={20}
            color="#666"
            style={styles.sectionItemIcon}
          />
          <Text style={styles.sectionItemText}>Đánh giá ứng dụng</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionItem}>
          <Ionicons
            name="refresh-outline"
            size={20}
            color="#666"
            style={styles.sectionItemIcon}
          />
          <Text style={styles.sectionItemText}>Kiểm tra bản cập nhật mới</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* Đăng xuất */}
      <TouchableOpacity style={styles.logoutBtn} onPress={() => router.push('/auth/GetStartedScreen')}>
        <Ionicons
          name="log-out-outline"
          size={20}
          color="#fff"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.logoutBtnText}>Đăng xuất</Text>
      </TouchableOpacity>

      {/* Phiên bản */}
      <Text style={styles.versionText}>Phiên bản ứng dụng: 5.6.37</Text>
    </ScrollView>
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
    backgroundColor: "#22C55E",
    borderRadius: 18,
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  avatarWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    resizeMode: "cover",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  id: {
    fontSize: 13,
    color: "#D1FAE5",
    marginBottom: 4,
  },
  upgradeBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  upgradeBtnText: {
    color: "#22C55E",
    fontWeight: "700",
    fontSize: 13,
    marginLeft: 4,
  },
  switchBlock: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 15,
    color: "#222",
    fontWeight: "600",
  },
  switchBtn: {
    width: 44,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    padding: 3,
  },
  switchBtnActive: {
    backgroundColor: "#22C55E",
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignSelf: "flex-start",
  },
  switchThumbActive: {
    alignSelf: "flex-end",
  },
  sectionBlock: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
  },
  sectionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  sectionItemIcon: {
    marginRight: 10,
  },
  sectionItemText: {
    flex: 1,
    fontSize: 15,
    color: "#222",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    width: "48%",
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E0E7EF",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#22C55E",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 13,
    color: "#222",
    textAlign: "center",
  },
  bannerBlock: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6F4EA",
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 16,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 6,
  },
  bannerBtn: {
    backgroundColor: "#22C55E",
    borderRadius: 14,
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  bannerBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#22C55E",
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 60,
    paddingVertical: 12,
    justifyContent: "center",
  },
  logoutBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  versionText: {
    textAlign: "center",
    color: "#64748B",
    fontSize: 13,
    marginBottom: 16,
  },
});
