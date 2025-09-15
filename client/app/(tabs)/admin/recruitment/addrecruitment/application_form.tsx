import React, { useState, useRef } from "react";
import { useRouter, usePathname, Slot } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { Dimensions } from "react-native";
import { Button } from "react-native";
import { RadioButton } from "react-native-paper";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";
import {
  TouchableOpacity,
  TextInput,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Octicons from "@expo/vector-icons/Octicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ScrollArea } from "@mantine/core";

export default function ApplicationForm() {
  return (
    // Tổng màn
    <View
      style={{
        gap: 20,
        marginBottom: 20,
        backgroundColor: "#FFFFFF",
        padding: 20,
        borderRadius: 6,
      }}
    >
      {/* Thanh trên cùng */}
      <View>
        <Text style={{ fontWeight: 700, fontSize: 17, marginBottom: 10 }}>
          Mẫu ứng tuyển
        </Text>
        <Text style={{ color: "#6C757D" }}>
          Thiết lập những thông tin ứng viên cần khai báo khi Nộp đơn ứng tuyển
          vào tin tuyển dụng này
        </Text>
      </View>
      {/* Thanh sao chép */}
      <View style={{ alignItems: "flex-start" }}>
        <TouchableOpacity
          style={{
            flex: 1,
            paddingVertical: 10,
            borderRadius: 5,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: "#E0E6EC",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Octicons name="copy" size={20} color="#7A8188" />
          <Text style={{ fontWeight: 600, fontSize: 15, color: "#1E2633" }}>
            Sao chép nội dung từ tin tuyển khác
          </Text>
          <AntDesign name="down" size={10} color="#7A8188" />
        </TouchableOpacity>
      </View>
      {/* Thông tin ứng viên */}
      <View>
        <Text style={{fontWeight: 600, fontSize: 15 , marginBottom: 10}}>Thông tin ứng viên</Text>
        {/* Phần nội dung */}
        <View></View>
        {/* Phần button */}
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        borderColor: "#2680EB",
                        borderStyle: "dotted",
                        padding: 9,
                        flexDirection: 'row', // Đảm bảo các thành phần nằm ngang
                        justifyContent: 'center', // Căn giữa theo trục ngang (chính)
                        alignItems: 'center', // Căn giữa theo trục dọc (chéo)
                        gap: 8, // Khoảng cách giữa icon và chữ
                    }}
                >
                    <FontAwesome5 name="plus" size={15} color="#2680EB" />
                    <Text>Thêm thông tin</Text>
                </TouchableOpacity>
            </View>
      </View>

      {/* Câu hỏi sàng lọc ứng viên */}
      <View>
        <Text style={{fontWeight: 600, fontSize: 15 , marginBottom: 10}}>Câu hỏi sàng lọc ứng viên</Text>
         <Text style={{ color: "#6C757D" , marginBottom: 10}}>
          Bộ câu hỏi sẽ hiển thị khi ứng viên ứng tuyển, giúp cho nhân sự dễ dàng sàng lọc hồ sơ phù hợp.

        </Text>
        {/* Phần nội dung */}
        <View></View>
        {/* Phần button */}
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        borderColor: "#2680EB",
                        borderStyle: "dotted",
                        padding: 9,
                        flexDirection: 'row', // Đảm bảo các thành phần nằm ngang
                        justifyContent: 'center', // Căn giữa theo trục ngang (chính)
                        alignItems: 'center', // Căn giữa theo trục dọc (chéo)
                        gap: 8, // Khoảng cách giữa icon và chữ
                    }}
                >
                    <FontAwesome5 name="plus" size={15} color="#2680EB" />
                    <Text>Thêm câu hỏi</Text>
                </TouchableOpacity>
            </View>
      </View>
    </View>
  );
}
