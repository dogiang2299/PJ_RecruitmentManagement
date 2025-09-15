import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { TextInput, Checkbox } from "react-native-paper";

export default function RegisterScreen() {
  const [form, setForm] = useState({
    product: "",
    type: "doanhnghiep",
    tax: "",
    company: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    job: "",
    agree: false,
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.card}>
          <Text style={styles.title}>Đăng ký tài khoản dùng thử</Text>
          <Text style={styles.subtitle}>
            Bạn đã có tài khoản? <Text style={styles.link}>Đăng nhập</Text>
          </Text>

          {/* Input: Sản phẩm */}
          <TextInput
            label="Chọn sản phẩm dùng thử"
            mode="outlined"
            value={form.product}
            onChangeText={(text) => setForm({ ...form, product: text })}
            style={styles.input}
          />

          {/* Radio buttons */}
          <View style={styles.radioRow}>
            <TouchableOpacity
              onPress={() => setForm({ ...form, type: "doanhnghiep" })}
              style={styles.radioOption}
            >
              <View
                style={[
                  styles.radioCircle,
                  form.type === "doanhnghiep" && styles.radioChecked,
                ]}
              />
              <Text>Doanh nghiệp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setForm({ ...form, type: "hokinhdoanh" })}
              style={styles.radioOption}
            >
              <View
                style={[
                  styles.radioCircle,
                  form.type === "hokinhdoanh" && styles.radioChecked,
                ]}
              />
              <Text>Hộ kinh doanh</Text>
            </TouchableOpacity>
          </View>

          {/* Mã số thuế & Công ty */}
          <View style={styles.row}>
            <TextInput
              label="Mã số thuế"
              mode="outlined"
              value={form.tax}
              onChangeText={(text) => setForm({ ...form, tax: text })}
              style={[styles.input, styles.flex]}
            />
            <TextInput
              label="Tên công ty"
              mode="outlined"
              value={form.company}
              onChangeText={(text) => setForm({ ...form, company: text })}
              style={[styles.input, styles.flex]}
            />
          </View>

          {/* Họ & Tên */}
          <View style={styles.row}>
            <TextInput
              label="Họ và đệm"
              mode="outlined"
              value={form.firstname}
              onChangeText={(text) => setForm({ ...form, firstname: text })}
              style={[styles.input, styles.flex]}
            />
            <TextInput
              label="Tên"
              mode="outlined"
              value={form.lastname}
              onChangeText={(text) => setForm({ ...form, lastname: text })}
              style={[styles.input, styles.flex]}
            />
          </View>

          {/* Email & SĐT */}
          <View style={styles.row}>
            <TextInput
              label="Email"
              mode="outlined"
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
              style={[styles.input, styles.flex]}
            />
            <TextInput
              label="Số điện thoại"
              mode="outlined"
              value={form.phone}
              onChangeText={(text) => setForm({ ...form, phone: text })}
              style={[styles.input, styles.flex]}
            />
          </View>

          {/* Vị trí công việc */}
          <TextInput
            label="Vị trí công việc"
            mode="outlined"
            value={form.job}
            onChangeText={(text) => setForm({ ...form, job: text })}
            style={styles.input}
          />

          {/* Checkbox */}
          <View style={styles.checkboxRow}>
            <Checkbox
              status={form.agree ? "checked" : "unchecked"}
              onPress={() => setForm({ ...form, agree: !form.agree })}
            />
            <Text style={styles.checkboxText}>
              Tôi đồng ý với các điều khoản và{" "}
              <Text style={styles.link}>Chính sách quyền riêng tư</Text>
            </Text>
          </View>

          {/* Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },
  wrapper: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 600,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 8 },
  subtitle: { textAlign: "center", color: "#555", marginBottom: 16 },
  link: { color: "#2563eb" },
  input: { marginBottom: 12 },
  row: { flexDirection: "row", gap: 8 },
  flex: { flex: 1 },
  radioRow: { flexDirection: "row", marginBottom: 12 },
  radioOption: { flexDirection: "row", alignItems: "center", marginRight: 16 },
  radioCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#555",
    marginRight: 6,
  },
  radioChecked: { backgroundColor: "#2563eb" },
  checkboxRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  checkboxText: { flex: 1, color: "#555" },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
