// LoginScreen.tsx
import React, { useState } from "react";
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen: React.FC = () => {
  const [EmailKichHoat, setEmailKichHoat] = useState("");
  const [MatKhauHash, setMatKhauHash] = useState("");
  const [showMatKhauHash, setShowMatKhauHash] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
const handleLogin = async () => {
  setMessage("");
        setIsLoading(true); // 👈 Bắt đầu loading
  try {
    const res = await axios.post("http://localhost:4000/api/custom-login", {
      email: EmailKichHoat,
      password: MatKhauHash,
    });

    console.log("Response:", res.data);

    if (res.data?.token) {
    await AsyncStorage.setItem("access_token", res.data.token);
    setMessage("Đăng nhập thành công ✅");
    router.push('/(tabs)/admin/recruitment/recruiment_news');
    // 👈 Tạo độ trễ 2-3 giây trước khi chuyển hướng
    setTimeout(() => {
        setIsLoading(false); // Dừng loading
        router.push('/(tabs)/admin/recruitment/recruiment_news');
    }, 4000); // 2000ms = 2 giây
    } else {
      setMessage("Tên đăng nhập hoặc mật khẩu không đúng");
      setIsLoading(false); // Dừng loading
    }
  } catch (err) {
    console.error(err);
    setMessage("Lỗi kết nối server ❌");
    setIsLoading(false); // Dừng loading
  }
};
  return (
    <ImageBackground
      source={{
        uri: "https://amisplatform.misacdn.net/apps/login/assets/img/bg1.jpg", // ảnh nền demo
      }}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Left banner */}
        <ImageBackground style={styles.leftPanel} source={{
        uri: "https://amisplatform.misacdn.net/apps/login/assets/img/Banner.jpg?v=1", // ảnh nền demo
      }}>
                    <Text style={styles.bannerTitle}>NỀN TẢNG</Text>
          <Text style={styles.bannerSubtitle}>QUẢN TRỊ DOANH NGHIỆP HỢP NHẤT</Text>
        </ImageBackground>

        {/* Right panel */}
        <View style={styles.rightPanel}>
          <Image
            source={{ uri: "https://amisplatform.misacdn.net/apps/login/assets/img/misa_logo.svg" }}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.loginTitle}>Đăng nhập</Text>

          {/* Input EmailKichHoat */}
          <TextInput
            style={styles.input}
            placeholder="EmailKichHoat"
            value={EmailKichHoat}
            onChangeText={setEmailKichHoat}
          />

          {/* Input MatKhauHash */}
          <View style={styles.MatKhauHashContainer}>
            <TextInput
              style={styles.MatKhauHashInput}
              placeholder="Mật khẩu"
              secureTextEntry={!showMatKhauHash}
              value={MatKhauHash}
              onChangeText={setMatKhauHash}
            />
            <TouchableOpacity onPress={() => setShowMatKhauHash(!showMatKhauHash)}>
              <Ionicons
                name={showMatKhauHash ? "eye" : "eye-off"}
                size={22}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          {/* Hiển thị thông báo ngay dưới đây */}
          <Text style={styles.messageText}>{message}</Text>
          {/* Login Button */}
          {/* Thay đổi nút tùy thuộc vào trạng thái loading */}
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.loginButton}
            disabled={isLoading} // Vô hiệu hóa nút khi đang loading
          >
            {isLoading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={styles.loginButtonText}>Đăng nhập</Text>
            )}
          </TouchableOpacity>
          {/* Forgot + Register */}
          <View style={styles.linkRow}>
            <TouchableOpacity>
              <Text style={styles.linkText}>Quên mật khẩu?</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.linkText}>Đăng ký</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.orText}>Hoặc đăng nhập với</Text>

          {/* Social Login */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-google" size={26} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-apple" size={26} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-windows" size={26} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  messageText: {
    marginTop: 10,
    marginBottom: 10,
    color: "red", // Thay đổi màu sắc tùy theo thông báo
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 5,
    width: "80%",
    maxWidth: 900,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  leftPanel: {
    width: '40%',
    height: 300,
    backgroundColor: "#007BFF15",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerImage: {
    width: '100%',
    height: 440,
  },
  bannerTitle: {
    fontSize: 16,
    color: "#007bff",
    marginTop: 10,
  },
  bannerSubtitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  rightPanel: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 60,
    alignSelf: "center",
    marginBottom: 20,
  },
  loginTitle: {
    fontSize: 26,
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  MatKhauHashContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  MatKhauHashInput: {
    flex: 1,
    paddingVertical: 12,
  },
  loginButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  linkText: {
    color: "#007bff",
  },
  orText: {
    textAlign: "center",
    marginVertical: 15,
    color: "#666",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  socialButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginHorizontal: 10,
    backgroundColor: "#fff",
  },
});
