import React, { useState } from "react";
import { useRouter, usePathname, Slot, router } from "expo-router";
import { View, TouchableOpacity, Text } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { ScrollView } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import Edit from "../../../../assets/images/edit.svg";
import MauUngTuyen from "../../../../assets/images/user.svg";
import KeHoach from "../../../../assets/images/nguoi.svg";
import TaoTrangTin from "../../../../assets/images/square.svg";
import KenhTuyenDung from "../../../../assets/images/email.svg";
import QuyTrinhTuyenDung from "../../../../assets/images/quytrinhtuyendung.svg";
import HoiDongTuyenDung from "../../../../assets/images/thietlap.svg";
import ChiPhiTuyenDung from "../../../../assets/images/bieumau.svg";
import Website from "../../../../assets/images/glo3.svg";
import ThietLAP from "../../../../assets/images/thietlap.svg";
import Ionicons from "@expo/vector-icons/Ionicons";
import Logo from "../../../../assets/images/logo_recruit.svg";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SvgProps } from "react-native-svg";
interface NavItem {
  path: string;
  label: string;
}

interface NavGroup {
  group: string;
  groupIcon: React.FC<SvgProps>;
  items: NavItem[];
}
import MessengeIcon from "../../../../assets/images/messenge.svg";
import ClippathIcon from "../../../../assets/images/Clippathgroup.svg";
import WebCruit from "../../../../assets/images/website_recruit.svg";
import Phone from "../../../../assets/images/phone.svg";
import Question from "../../../../assets/images/question.svg";
import Bell from "../../../../assets/images/bell.svg";
import User from "../../../../assets/images/user.svg";

export default function LayoutSystem() {
  const pathname = usePathname();
  // Dữ liệu cho menu
  const navLeftRecruitment: NavGroup[] = [
    {
      group: "THÔNG TIN CÔNG TY",
      groupIcon: KeHoach,
      items: [
        {
          path: "/(tabs)/admin/system/information_company",

          label: "Thông tin công ty",
        },
      ],
    },
    {
      group: "QUẢN LÝ DANH MỤC",
      groupIcon: TaoTrangTin,

      items: [
        {
          path: "/(tabs)/admin/system/category/organization",

          label: "Cơ cấu tổ chức",
        },
        {
          path: "/(tabs)/admin/system/category/member_employee",

          label: "Đối tượng Nhân viên",
        },
        {
          path: "/(tabs)/admin/system/category/member_user",

          label: "Đối tượng Người dùng",
        },
        {
          path: "/(tabs)/admin/system/category/jobposition",

          label: "Vị trí công việc",
        },
      ],
    },
    {
      group: "PHÂN QUYỀN",
      groupIcon: KenhTuyenDung,

      items: [
        {
          path: "/(tabs)/admin/system/permission/admin_system",

          label: "Quản trị Hệ thống",
        },
        {
          path: "/(tabs)/admin/system/permission/user_group",

          label: "Phân quyền Nhóm",
        },
        {
          path: "/(tabs)/admin/system/permission/tenant_apps",

          label: "Phân quyền Ứng dụng",
        },
      ],
    },
    {
      group: "LỊCH SỬ",
      groupIcon: ChiPhiTuyenDung,

      items: [
        {
          path: "/(tabs)/admin/system/history/logs",

          label: "Nhật ký hoạt động",
        },
        {
          path: "/(tabs)/admin/system/history/trash",

          label: "Thùng rác",
        },
      ],
    },
  ];
  const menuNavbarLeft = [
    {
      icon: "apps",
      path: "/(tabs)/admin/system/information_company",
      iconActive: "apps",
    },
    {
      iconSvg: Logo,
    },
    {
      title: "Tuyển dụng",
      path: "/(tabs)/admin/recruitment/recruiment_news",
    },
  ];
  const menuNavbarRight = [
    { icon: WebCruit, title: "Website tuyển dụng", path: "" },
    { icon: "megaphone-outline" },
    { icon: Phone },
    { iconSvg: MessengeIcon },
    { icon: Bell },
    { icon: Question },
    { iconSvg: ClippathIcon },
    { icon: User },
  ];
  return (
    <View style={{ flex: 1 }}>
      <View>
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
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          height: 700,
          justifyContent: "space-between",
        }}
      >
        {/* MenuNavbar */}
        <View style={styles.sidebarContainer}>
          {navLeftRecruitment.map((group, groupIndex) => (
            <View key={group.group}>
              {/* 👈 Hiển thị icon và tiêu đề của nhóm */}
              <View style={styles.groupTitleContainer}>
                {React.createElement(group.groupIcon, {
                  style: styles.groupIcon,
                })}
                <Text style={styles.groupTitle}>{group.group}</Text>
              </View>

              {/* 👈 Lặp qua các mục con */}
              {group.items.map((item) => {
                const isActive = pathname === item.path.replace("/(tabs)", "");
                return (
                  <TouchableOpacity
                    key={item.path}
                    onPress={() => router.push(item.path as any)}
                    style={[styles.menuItem, isActive && styles.activeMenuItem]}
                  >
                    <Text
                      style={[
                        styles.menuLabel,
                        isActive && styles.activeMenuLabel,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              {/* {groupIndex < navLeftRecruitment.length - 1 && (
                <View style={styles.divider} />
              )} */}
            </View>
          ))}
        </View>
        {/* Contain */}
        <View style={{ flex: 1 }}>
            <Slot></Slot>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  sidebarContainer: {
    flexDirection: "column",
    backgroundColor: "#17365A",
    padding: 10,
    width: 250,
    overflowY: "auto",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  groupTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  groupIcon: {
    marginRight: 8,
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    marginBottom: 4,
    marginLeft: 20
  },
  activeMenuItem: {
    backgroundColor: "#3D75de",
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: "#BBCCD5",
  },
  activeMenuLabel: {
    color: "#ffffff",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#BBCCD5",
    marginVertical: 10,
  },
});
import { StyleSheet } from "react-native";
