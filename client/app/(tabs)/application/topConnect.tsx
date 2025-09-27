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

export default function TopConnectScreen() {
  const [checked, setChecked] = React.useState(false);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../../assets/images/react-logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>topCV Connect</Text>
      </View>
      <View style={styles.rulesBlock}>
        <Text style={styles.rulesTitle}>Quy định sử dụng tính năng</Text>
        <View style={styles.ruleItem}>
          <Text style={styles.ruleNum}>1. Phiên bản 4.2.1</Text>
          <Text style={styles.ruleText}>
            Phiên bản hiện tại là phiên bản thử nghiệm nên trong quá trình sử
            dụng có thể gặp lỗi hoặc một số tính năng có thể không hoạt động
            đúng cách khi bạn sử dụng chúng.
          </Text>
        </View>
        <View style={styles.ruleItem}>
          <Text style={styles.ruleNum}>
            2. Giới hạn tạo cuộc hội thoại mới mỗi ngày.
          </Text>
          <Text style={styles.ruleText}>
            Tài khoản ứng viên được tạo tối đa 5 cuộc hội thoại mới mỗi ngày.
            Tài khoản nhà tuyển dụng được tạo tối đa 100 cuộc hội thoại mới mỗi
            ngày.
          </Text>
        </View>
        <View style={styles.ruleItem}>
          <Text style={styles.ruleNum}>
            3. Lịch sử khi tương tác, trao đổi.
          </Text>
          <Text style={styles.ruleText}>
            Lịch sử khi tương tác, trao đổi. Không gửi hoặc tạo điều kiện cho
            việc truyền nội dung không phù hợp, số lượng lớn tin nhắn thương mại
            hay tự động.
          </Text>
        </View>
        <View style={styles.ruleItem}>
          <Text style={styles.ruleNum}>
            4. Nghiêm cấm thực hiện hành vi lừa đảo.
          </Text>
          <Text style={styles.ruleText}>
            Không dùng tính năng TopCV Connect để thực hiện hành vi lừa đảo
            (hoặc có dấu hiệu lừa đảo). Không yêu cầu hoặc thu thập dữ liệu nhạy
            cảm. Không dùng tính năng TopCV Connect để lừa những người dùng khác
            chia sẻ thông tin theo cách sai trái. Không mạo danh người khác.
            Cung cấp thông tin không đúng về bản thân. Không sử dụng TopCV
            Connect để gây rối, làm phiền hay có hành vi quấy rối người dùng
            khác.
          </Text>
        </View>
        <View style={styles.agreementRow}>
          <TouchableOpacity
            style={styles.checkboxWrap}
            onPress={() => setChecked(!checked)}
          >
            <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
              {checked && <Ionicons name="checkmark" size={16} color="#fff" />}
            </View>
          </TouchableOpacity>
          <Text style={styles.agreementText}>
            Tôi đồng ý với tất cả các quy định và hoàn toàn chịu trách nhiệm nếu
            vi phạm
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.submitBtn, !checked && { opacity: 0.5 }]}
          disabled={!checked}
        >
          <Text style={styles.submitBtnText}>Gửi</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  logo: {
    width: 36,
    height: 36,
    resizeMode: "contain",
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },
  rulesBlock: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  rulesTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 10,
  },
  ruleItem: {
    marginBottom: 10,
  },
  ruleNum: {
    fontWeight: "700",
    color: "#222",
    fontSize: 14,
    marginBottom: 2,
  },
  ruleText: {
    color: "#64748B",
    fontSize: 13,
    lineHeight: 18,
  },
  agreementRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 16,
  },
  checkboxWrap: {
    marginRight: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#22C55E",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#22C55E",
    borderColor: "#22C55E",
  },
  agreementText: {
    flex: 1,
    color: "#222",
    fontSize: 13,
  },
  submitBtn: {
    backgroundColor: "#22C55E",
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 10,
  },
  submitBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
