import React, { useState, useRef } from "react";
import { useRouter, usePathname, Slot } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { Dimensions } from "react-native";
import { Checkbox } from "react-native-paper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Button } from "react-native";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
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
  Platform,
} from "react-native";

import DropDownPicker from "react-native-dropdown-picker";
import Octicons from "@expo/vector-icons/Octicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ScrollArea } from "@mantine/core";

export default function ImplementationForm() {
    
  const [checked, setChecked] = useState(false);
  const [count, setCount] = useState(1);
  const [recruitments, setRecruitments] = useState([{ name: '', count: 1 }]);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const onChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS !== "web") {
      // chỉ mobile mới dùng picker
      setShow(Platform.OS === "ios");
      if (selectedDate) {
        setDate(selectedDate);
      }
    }
  };
  return (
    // Tổng toàn trang
    <View style={{ gap: 20, marginBottom: 20 }}>
      <View
        style={{
          flexDirection: "column",
          backgroundColor: "#FFFFFF",
          paddingHorizontal: 20,
          paddingVertical: 20,
          borderRadius: 7,
          gap: 10,
        }}
      >
        <Text style={{ fontWeight: 700, fontSize: 17, marginBottom: 10 }}>
          KẾ HOẠCH THỰC HIỆN
        </Text>
        <Text style={{ color: "#6C757D" }}>
          Khai báo tin này tuyển cho nhu cầu tháng nào và SL cần tuyển thực tế
          để phục vụ thống kê báo cáo. Có thể chia tin thành nhiều đợt tuyển
          dụng
        </Text>
        <View>
          <Text style={{ fontWeight: 500, marginBottom: 15, fontSize: 17 }}>
            Kế hoạch thực hiện
          </Text>
          <View style={{ flexDirection: "row", gap: 15, flex: 1 }}>
            <View style={{ flexDirection: "column", gap: 7, flex: 1 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Text style={{ fontWeight: 500 }}>Loại hình công việc</Text>
                <FontAwesome5 name="star-of-life" size={5} color="#E54848" />
              </View>

              <TextInput
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderColor: "#d1d5db",
                  borderWidth: 1,
                  borderRadius: 4,
                  color: "#6C757D",
                  outline: "none",
                }}
                placeholder="0"
                placeholderTextColor={"#6C757D"}
              ></TextInput>
            </View>
            <View style={{ flexDirection: "column", gap: 7, flex: 1 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Text style={{ fontWeight: 500 }}>Hạn nộp hồ sơ</Text>
                <FontAwesome5 name="star-of-life" size={5} color="#E54848" />
              </View>
              {Platform.OS === "web" ? (
                <input
                  type="date"
                  value={date.toISOString().split("T")[0]}
                  onChange={(e) => setDate(new Date(e.target.value))}
                  style={{
                    fontSize: 15,
                    color: "#1E2633",
                    fontWeight: "500",
                    padding: 8,
                    borderRadius: 8,
                    border: "1px solid #ccc",
                  }}
                />
              ) : (
                <>
                  <TouchableOpacity onPress={() => setShow(true)}>
                    <Text>{date.toLocaleDateString()}</Text>
                  </TouchableOpacity>
                  {show && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="default"
                      onChange={onChange}
                    />
                  )}
                </>
              )}
            </View>
            <View style={{ flexDirection: "column", gap: 7, flex: 1 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Text style={{ fontWeight: 500 }}>
                  SL hiển thị trên website
                </Text>
                <FontAwesome5 name="star-of-life" size={5} color="#E54848" />
              </View>
              {Platform.OS === "web" ? (
                <input
                  type="date"
                  value={date.toISOString().split("T")[0]}
                  onChange={(e) => setDate(new Date(e.target.value))}
                  style={{
                    fontSize: 15,
                    color: "#1E2633",
                    fontWeight: "500",
                    padding: 8,
                    borderRadius: 8,
                    border: "1px solid #ccc",
                  }}
                />
              ) : (
                <>
                  <TouchableOpacity onPress={() => setShow(true)}>
                    <Text>{date.toLocaleDateString()}</Text>
                  </TouchableOpacity>
                  {show && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="default"
                      onChange={onChange}
                    />
                  )}
                </>
              )}
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                gap: 8,
                paddingVertical: 15,
              }}
            >
              <FontAwesome5 name="plus" size={15} color="#2680EB" />
              <Text style={{ fontSize: 15 }}>
                Chia chỉ tiêu theo nhân sự tuyển dụng
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ borderWidth: 1, borderColor: "#CECECE" }}></View>
          {/* Checkbox */}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginTop: 3,
              alignItems: "center",
            }}
          >
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              color="#2680EB"
              onPress={() => setChecked(!checked)}
            />
            <Text>Lên kế hoạch theo đợt</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
