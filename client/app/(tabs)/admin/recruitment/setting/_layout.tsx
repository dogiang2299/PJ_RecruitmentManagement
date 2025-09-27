import React, { useState } from "react";
import { useRouter, usePathname, Slot, router } from "expo-router";
import { View, TouchableOpacity, Text } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { ScrollView } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import Edit from "../../../../../assets/images/edit.svg";
import MauUngTuyen from "../../../../../assets/images/user.svg";
import KeHoach from "../../../../../assets/images/nguoi.svg";
import TaoTrangTin from "../../../../../assets/images/square.svg";
import KenhTuyenDung from "../../../../../assets/images/email.svg";
import QuyTrinhTuyenDung from "../../../../../assets/images/quytrinhtuyendung.svg";
import HoiDongTuyenDung from "../../../../../assets/images/thietlap.svg";
import ChiPhiTuyenDung from "../../../../../assets/images/bieumau.svg";
import Website from "../../../../../assets/images/glo3.svg";
import ThietLAP from "../../../../../assets/images/thietlap.svg";
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
export default function LayoutAddRecruitment() {
  const pathname = usePathname();
  // Dữ liệu cho menu
  const navLeftRecruitment : NavGroup[] =  [
    {
      group: "TÀI KHOẢN",
      groupIcon: KeHoach,
      items: [
        {
          path: "/(tabs)/admin/recruitment/setting/account/customize_display",
          
          label: "Tùy chỉnh hiển thị",
        },
        {
          path: "/(tabs)/admin/recruitment/setting/account/setting_email",
          label: "Thiết lập email",
        },
        {
          path: "/(tabs)/admin/recruitment/setting/account/setting_notification",
          label: "Thiết lập thông báo",
        },
        {
          path: "/(tabs)/admin/recruitment/setting/account/connect",
          label: "Thiết lập kết nối",
        },
      ],
    },
    {
      group: "DANH MỤC",
            groupIcon: TaoTrangTin,

      items: [
        
        {
          path:"/(tabs)/admin/recruitment/setting/dictionary/job_position",
          
          label: "Vị trí công việc",
        },
        {
          path: "/(tabs)/admin/recruitment/setting/dictionary/career",
          
          label: "Ngành nghề",
        },
        {
          path: "/(tabs)/admin/recruitment/setting/dictionary/rank_recruitment",
          
          label: "Cấp bậc",
        },
        {
          path: "/(tabs)/admin/recruitment/setting/dictionary/work_place",
          
          label: "Địa điểm làm việc",
        },
        {
          path: "/(tabs)/admin/recruitment/setting/dictionary/education_degree",
          
          label: "Trình độ đào tạo",
        },
        {
          path: "/(tabs)/admin/recruitment/setting/dictionary/education_place",
          
          label: "Nơi đào tạo",
        },
         {
          path: "/(tabs)/admin/recruitment/setting/dictionary/education_major",
          
          label: "Chuyên ngành",
        },
        {
          path: "/(tabs)/admin/recruitment/setting/dictionary/tag",
          
          label: "Thẻ ứng viên",
        },
        {
          path: "/(tabs)/admin/recruitment/setting/dictionary/talent_pool_classification",
          
          label: "Loại tiềm năng",
        },
        {
          path: "/(tabs)/admin/recruitment/setting/dictionary/reason_reject_candidate",
          
          label: "Lý do loại ứng viên",
        },
        {
          path: "/(tabs)/admin/recruitment/setting/dictionary/reason_reject_campaign",
          
          label: "Lý do từ chối chiến dịch",
        },
        {
          path: "/(tabs)/admin/recruitment/setting/dictionary/source_candidate",
          
          label: "Nguồn ứng viên",
        },
      ],
    },
    {
      group: "MẪU EMAIL",
            groupIcon: KenhTuyenDung,

      items: [
        {
          path: "/(tabs)/admin/recruitment/setting/email-template/confirm_email",
          
          label: "Xác nhận ứng tuyển",
        },
        {
          path: "/(tabs)/admin/recruitment/addrecruitment/invired_email",
          
          label: "Mời thi tuyển/phỏng vấn",
        },
        {
          path: "/(tabs)/admin/recruitment/addrecruitment/reject_email",
          
          label: "Loại ứng viên",
        },
        {
          path: "/(tabs)/admin/recruitment/addrecruitment/invite_apply_again_email",
          
          label: "Mời ứng tuyển lại",
        },
       
      ],
    },
    {
      group: "BIỂU MẪU",
            groupIcon: ChiPhiTuyenDung,

      items: [
        {
          path: "/(tabs)/admin/recruitment/setting/template/recruitment-template",
          
          label: "Mẫu ứng tuyển",
        },
        {
          path: "/(tabs)/admin/recruitment/setting/template/rating_template",
          
          label: "Mẫu đánh giá",
        },
        {
          path: "/(tabs)/admin/recruitment/setting/template/examination_template",
          
          label: "Mẫu thi tuyển",
        },
        {
          path: "/(tabs)/admin/recruitment/setting/template/offer_template",
          
          label: "Mẫu mời nhận việc",
        },
        
      ],
    },
    {
      group: "QUY TRÌNH",
            groupIcon: QuyTrinhTuyenDung,

      items: [
        {
          path: "/(tabs)/admin/recruitment/setting/process/recruitment_process",
          
          label: "Tuyển dụng",
        },
    ]
    },
    {
      group: "WEBSITE",
      groupIcon: Website,
      items: [
        {
          path: "/(tabs)/admin/recruitment/setting/process/recruitment_process",
          
          label: "Website Tuyển dụng",
        },
        {
          path: "/(tabs)/admin/recruitment/setting/process/recruitment_process",
          
          label: "Trang tin Tuyển dụng",
        },
        {
          path: "/(tabs)/admin/recruitment/setting/process/recruitment_process",
          
          label: "Cổng ứng viên",
        },
    

    ]
    },
    {
      group: "THIẾT LẬP CHUNG",
            groupIcon: ThietLAP,

      items: [
        {
          path: "/(tabs)/admin/recruitment/setting/setting_/access_log",
          
          label: "Nhật ký truy cập",
        },
        {
          path: "/(tabs)/admin/recruitment/setting/setting_/custom_field",
          
          label: "Trường tùy chỉnh",
        },
        {
          path: "/(tabs)/admin/recruitment/setting/setting_/user_management",
          
          label: "Người dùng",
        },
    {
          path: "/(tabs)/admin/recruitment/setting/setting_/role",
          
          label: "Vai trò",
        },

    ]
    }

  ];

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          gap: 20,
          flex: 1,
          height: 700,
          paddingTop: 15,
          justifyContent: "space-between",
        }}
      >
        {/* MenuNavbar */}
<View style={styles.sidebarContainer}>
            {navLeftRecruitment.map((group, groupIndex) => (
                <View key={group.group}>
                    {/* 👈 Hiển thị icon và tiêu đề của nhóm */}
                    <View style={styles.groupTitleContainer}>
                        {React.createElement(group.groupIcon, { style: styles.groupIcon })}
                        <Text style={styles.groupTitle}>{group.group}</Text>
                    </View>
                    
                    {/* 👈 Lặp qua các mục con */}
                    {group.items.map((item) => {
                        const isActive = pathname === item.path.replace("/(tabs)", "");
                        return (
                            <TouchableOpacity
                                key={item.path}
                                onPress={() => router.push(item.path as any)}
                                style={[
                                    styles.menuItem,
                                    isActive && styles.activeMenuItem
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.menuLabel,
                                        isActive && styles.activeMenuLabel
                                    ]}
                                >
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                    {groupIndex < navLeftRecruitment.length - 1 && <View style={styles.divider} />}
                </View>
            ))}
        </View>
                {/* Contain */}
        <View style={{ flex: 1, }}>
            <ScrollView style={{ flex: 1 }}>
                <Slot></Slot>
            </ScrollView>
          
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    sidebarContainer: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 10,
        width: 210,
        overflowY: 'auto',
        borderRadius: 8,
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
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 5,
        paddingHorizontal: 10,
    },
    groupIcon: {
        marginRight: 8,
    },
    groupTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#656565',
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 8,
        marginBottom: 4,
    },
    activeMenuItem: {
        backgroundColor: "#E1EEFF",
    },
    menuLabel: {
        fontSize: 15,
        fontWeight: 400,
        color: "#1E2633",
    },
    activeMenuLabel: {
        color: "#2680EB",
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#EAEAEA',
        marginVertical: 10,
    }
});import { StyleSheet } from "react-native";
