import React from "react";
import { TouchableOpacity, Text, View, ScrollView } from "react-native";
import { useRouter, usePathname, Slot } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../assets/images/logo_recruit.svg";
import MessengeIcon from '../assets/images/messenge.svg';
import ClippathIcon from '../assets/images/Clippathgroup.svg';
import WebCruit from '../assets/images/website_recruit.svg';
import Phone from '../assets/images/phone.svg';
import Question from '../assets/images/question.svg';
import Bell from '../assets/images/bell.svg';
import User from '../assets/images/user.svg'
const backgroundShibar =
  "https://amisplatform.misacdn.net/apps/recruit/event-sidebar.8355fa013573cdcf.png";

const gradientColors = ['rgba(0, 0, 0, 0.8)', 'rgba(255, 255, 255, 0.4)'] as const;

const menuItems = [
  {
    title: "Tin tuyển dụng",
    path: "/(tabs)/admin/recruitment/recruiment_news",
    icon: "newspaper-outline",
    iconActive: "newspaper",
  },
  {
    title: "Ứng viên",
    path: "/(tabs)/admin/recruitment/applicant",
    icon: "person-outline",
    iconActive: "person",
  },
  {
    title: "Lịch",
    path: "/(tabs)/admin/recruitment/calendar",
    icon: "calendar-outline",
    iconActive: "calendar",
  },
  {
    title: "Kho tiềm năng",
    path: "/(tabs)/admin/recruitment/potential_warehouse",
    icon: "people-outline",
    iconActive: "people",
  },
  {
    title: "Chiến dịch tuyển dụng",
    path: "/(tabs)/admin/recruitment/recruitment_campaign",
    icon: "briefcase-outline",
    iconActive: "briefcase",
  },
  {
    title: "Công việc",
    path: "/(tabs)/admin/recruitment/jobs",
    icon: "checkbox-outline",
    iconActive: "checkbox",
  },
  {
    title: "Báo cáo",
    path: "/(tabs)/admin/recruitment/report",
    icon: "document-text-outline",
    iconActive: "document-text",
  },
  {
    title: "Thiết lập",
    // C:\Users\Do Zang\Documents\Project_HRManagement_\client\app\(tabs)\admin\recruitment\setting\account\connect.tsx
    path: "/(tabs)/admin/recruitment/setting/account/customize_display",
    icon: "settings-outline",
    iconActive: "settings",
  },
];

const menuNavbarLeft = [
  {
    icon: "apps",
    path: "/(tabs)/admin/system/information_company",
    iconActive: "apps"
  },
  {
    iconSvg: Logo
  },
  {
    title: "Tuyển dụng",
    path: "/(tabs)/admin/recruitment/recruiment_news"
  },
  
]

const menuNavbarRight = [
  { icon: WebCruit, title: "Website tuyển dụng", path: "" },
  { icon: "megaphone-outline" },
  { icon: Phone },
  { iconSvg: MessengeIcon },
  { icon: Bell },
  { icon: Question },
  { iconSvg: ClippathIcon },
  { icon: User }
];
export default function SidebarMenuAdmin() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      {/* Navbar trên cùng */}
{/* Navbar trên cùng */}
        <View
          style={{
    backgroundColor: '#FFFFFF',
    padding: 10,
    overflow: 'hidden', // tránh shadow bị cắt
    // Shadow iOS
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    // Shadow Android
    elevation: 8,

            height: 50,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 12,
           
          }}
        >
          <View style={{flexDirection:'row'}}>
            {menuNavbarLeft.map((itemleft, index) => (
              <TouchableOpacity
                key={itemleft.path || index}
                onPress={() => router.push(itemleft.path as any)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 4,
                  paddingVertical: 4,
                  marginRight: index < menuNavbarRight.length - 1 ? 5 : 0,
                }}
              >
                {itemleft.iconSvg ? (
                  <itemleft.iconSvg width={25} height={25} fill="#1e2633" />
                ) : (
                  <Ionicons name={itemleft.icon as any} size={20} color="#1e2633" />
                )}

                {itemleft.title && (
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "700",
                      color: "#1e2633",
                      marginLeft: 8,
                    }}
                  >
                    {itemleft.title}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
          <View style={{flexDirection:'row', gap: 5}}>
            {menuNavbarRight.map((itemright, index) => (
              <TouchableOpacity
                key={itemright.path || index}
                onPress={() => router.push(itemright.path as any)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  marginRight: index < menuNavbarRight.length - 1 ? 5 : 0,
                }}
              >
                {itemright.iconSvg ? (
                  <itemright.iconSvg width={25} height={25} fill="#1e2633" />
                ) : (
                  <Ionicons name={itemright.icon as any} size={20} color="#1e2633" />
                )}

                {itemright.title && (
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      color: "#1e2633",
                      marginLeft: 8,
                    }}
                  >
                    {itemright.title}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      {/* Nội dung chính */}
      <View style={{ flex: 1, flexDirection: "row" }}>
        {/* Sidebar */}
        <View style={{ width: 250, height: "100%" }}>
          <ImageBackground
            source={{ uri: backgroundShibar }}
            resizeMode="cover"
            style={{ flex: 1 }}
          >
            <LinearGradient
              colors={[
                "rgba(11, 24, 45, 1)",
                "rgba(45, 45, 45, 0.9)",
                "rgba(0, 0, 0, 0)",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{ flex: 1, padding: 12 }}
            >
              {menuItems.map((item) => {
                const isActive = pathname === item.path.replace("/(tabs)", "");
                return (
                  <TouchableOpacity
                    key={item.path}
                    onPress={() => router.push(item.path as any)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 12,
                      borderRadius: 8,
                      marginBottom: 8,
                      backgroundColor: isActive ? "#007bff" : "transparent",
                    }}
                  >
                    <Ionicons
                      name={isActive ? item.iconActive : (item.icon as any)}
                      size={20}
                      color={isActive ? "#fff" : "#d1d5db"}
                      style={{ marginRight: 10 }}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "500",
                        color: isActive ? "#fff" : "#d1d5db",
                      }}
                    >
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </LinearGradient>
          </ImageBackground>
        </View>

        {/* Nội dung slot chính */}
        <View style={{ flex: 1 }}>
            <Slot />
        </View>
      </View>
    </View>
  );
}