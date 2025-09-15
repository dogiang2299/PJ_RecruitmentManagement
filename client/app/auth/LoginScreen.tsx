import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  useWindowDimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

// Nếu bạn đã cấu hình svg transformer, giữ import dưới dạng component:
// Nếu chưa, đổi thành Image + require('...png') tương ứng.
import MisaLogo from "../../assets/images/misa_logo.svg";
import GoogleIcon from "../../assets/images/icon-google.svg";
import AppleIcon from "../../assets/images/icon-apple.svg";
import MicrosoftIcon from "../../assets/images/icon-microsoft.svg";
import ShowPassIcon from "../../assets/images/icon-show-pass.svg";
import HidePassIcon from "../../assets/images/icon-hide-pass.svg";

export default function LoginPage() {
  const useRouters = useRouter();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [activeTab, setActiveTab] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const formBoxWidth = isMobile ? Math.min(width * 0.9, 360) : 340;

  return (
    <ImageBackground
      source={require("../../assets/images/bg9.jpg")}
      style={styles.bgImage}
      resizeMode="cover"
    >
      {/* Thay thế centerWrapper bằng KeyboardAvoidingView và ScrollView */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* Card chính - ra giữa màn hình */}
          <View
            style={[
              styles.card,
              isMobile && styles.cardMobile,
              {
                width: isMobile ? formBoxWidth + 40 : "75%",
                height: isMobile ? "auto" : "80%",
              },
            ]}
          >
            {/* Giữ nguyên code bên trong View này */}
            {!isMobile && (
              <View style={styles.leftPanel}>
                <Image
                  source={require("../../assets/images/adaptive-icon.png")}
                  style={styles.leftImage}
                  resizeMode="cover"
                />
              </View>
            )}

            <View
              style={[styles.rightPanel, isMobile && styles.rightPanelMobile]}
            >
              <View style={[styles.formBox, { width: formBoxWidth }]}>
                <MisaLogo width={120} height={50} />

                <Text style={styles.title}>Đăng nhập</Text>

                <View style={styles.tabs}>
                  {/* Tabs */}

                  <View style={styles.tabs}>
                    <TouchableOpacity
                      style={[
                        styles.tab,

                        activeTab === "password" && styles.activeTab,
                      ]}
                      onPress={() => setActiveTab("password")}
                    >
                      <Text
                        style={[
                          styles.tabText,

                          activeTab === "password" && styles.activeTabText,
                        ]}
                      >
                        Với mật khẩu
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tab,

                        activeTab === "qr" && styles.activeTab,
                      ]}
                      onPress={() => setActiveTab("qr")}
                    >
                      <Text
                        style={[
                          styles.tabText,

                          activeTab === "qr" && styles.activeTabText,
                        ]}
                      >
                        Với mã QR
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {activeTab === "password" ? (
                  <>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </View>

                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        placeholder="Mật khẩu"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                      />
                      <TouchableOpacity
                        style={styles.eyeButton}
                        onPress={() => setShowPassword((s) => !s)}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        {showPassword ? (
                          <ShowPassIcon width={20} height={20} />
                        ) : (
                          <HidePassIcon width={20} height={20} />
                        )}
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.loginButton}>
                      <Text style={styles.loginButtonText}>Đăng nhập</Text>
                    </TouchableOpacity>

                    <View style={styles.row}>
                      <TouchableOpacity>
                        <Text style={styles.link}>Quên mật khẩu?</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          useRouters.push("../auth/RegisterScreen")
                        }
                      >
                        <Text style={styles.link}>Đăng ký</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <View style={styles.qrBox}>
                    <Text style={{ fontSize: 16, color: "#555" }}>
                      📷 Quét mã QR để đăng nhập
                    </Text>
                  </View>
                )}

                <View style={styles.dividerRow}>
                  <View style={styles.divider} />
                  <Text style={styles.dividerText}>Hoặc đăng nhập với</Text>
                  <View style={styles.divider} />
                </View>

                <View style={styles.socialRow}>
                  <TouchableOpacity style={styles.socialButton}>
                    <GoogleIcon width={26} height={26} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialButton}>
                    <AppleIcon width={26} height={26} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialButton}>
                    <MicrosoftIcon width={26} height={26} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
  },
  centerWrapper: {
    flex: 1,
  },

  card: {
    flexDirection: "row",
    width: "60%",
    height: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  cardMobile: {
    flexDirection: "column",
    paddingVertical: 20,
    borderRadius: 12,
    height: "auto", // 👈 auto height khi mobile
  },

  leftPanel: {
    flex: 0.55,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
  },
  leftImage: {
    width: "100%",
    height: "100%",
  },

  rightPanel: {
    flex: 0.45,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  rightPanelMobile: {
    flex: 1, // Thay đổi flex từ 0 thành 1
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  formBox: {
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 8,
    marginBottom: 10,
  },

  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    width: "100%",
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#0b74ff",
  },
  tabText: {
    fontSize: 15,
    color: "#666",
  },
  activeTabText: {
    color: "#0b74ff",
    fontWeight: "700",
  },

  inputWrapper: {
    width: "100%",
    marginBottom: 12,
    position: "relative",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#e1e6ef",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    paddingRight: 46,
    backgroundColor: "#fff",
    fontSize: 15,
  },

  eyeButton: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -10 }],
    height: 24,
    width: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  loginButton: {
    backgroundColor: "#0b74ff",
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 8,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 8,
  },
  link: {
    color: "#0b74ff",
    fontSize: 13,
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 14,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#eee",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#777",
    fontSize: 13,
  },

  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginTop: 10,
  },
  socialButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 999,
    backgroundColor: "#fff",
  },

  qrBox: {
    width: "100%",
    height: 140,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  // Loại bỏ style centerWrapper cũ, thay bằng style mới cho KeyboardAvoidingView
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
