import React, { useState } from "react";
import { Modal } from "react-native";
import { Checkbox } from 'react-native-paper';
import {
  TouchableOpacity,
  TextInput,
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SvgProps } from "react-native-svg";
import { Image } from "expo-image";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { useRouter, usePathname, Slot } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Label } from "@react-navigation/elements";
import WatchRecruitment from '../../../../assets/images/watchRe.svg';
import Share from '../../../../assets/images/share.svg';
import Copy from '../../../../assets/images/copy.svg';
import Delete from '../../../../assets/images/delete.svg';
import Edit from '../../../../assets/images/edit.svg';
import Border from '../../../../assets/images/border.svg';

import DropDownPicker from "react-native-dropdown-picker";
interface OptionStatus {
  label: string;
  desc: string;
  color: string;
};
interface OptionFunction {
  icon: React.FC<SvgProps>;
  label: string;
 
}
export default function RecruitmentNewsPage() {
  const router = useRouter();
  const [openStatus, setOpenStatus] = useState(false);
  const [valueStatus, setValueStatus] = useState("Đang tuyển dụng");
  const [statusRecruitment, setStatusRecruitment] = useState([
    { label: "Tất cả", value: "Tất cả" },
    { label: "Đang tuyển dụng", value: "Đang tuyển dụng" },
    { label: "Công khai", value: "Công khai" },
    { label: "Nội bộ", value: "Nội bộ" },
    { label: "Ngừng nhận hồ sơ", value: "Ngừng nhận hồ sơ" },
    { label: "Nháp", value: "Nháp" },
    { label: "Đóng", value: "Đóng" },
  ]);
  const [status, setStatus] = useState('Công khai');
  const [statusColor, setStatusColor] = useState("#48BB56"); 
  const [visibleStatus, setVisibleStatus] = useState(false);
const optionsStatus: OptionStatus[] = [
    {
      label: "Công khai",
      desc: "Mọi người đều có thể xem tin tuyển dụng.",
      color: "#48BB56",
    },
    {
      label: "Nội bộ",
      desc: "Có thể xem trực tiếp được liên kết nhưng không hiển thị trên kênh tuyển dụng.",
      color: "#2680eb",
    },
    {
      label: "Ngừng nhận hồ sơ",
      desc: "Tin sẽ được gỡ khỏi các kênh tuyển dụng. Không cho phép nộp đơn ứng tuyển.",
      color: "#E54848",
    },
    {
      label: "Đóng",
      desc: "Tin tuyển dụng đã được hoàn tất.",
      color: "#646464",
    },
  ];
const handleSelect = (optionStatus: OptionStatus) => {
    setStatus(optionStatus.label);
    setStatusColor(optionStatus.color);
    setVisibleStatus(false);
  };
  
  const handleSelectFunction = (optionFunction: OptionFunction) => {
    setFunctions(optionFunction.label);
    setVisibleFunction(false);
  }
const optionFunction: OptionFunction[] = [
    { icon: Edit, label: "Sửa tin" },
    { icon: Copy, label: "Nhân bản" },
    { icon: Share, label: "Chia sẻ" },
    { icon: WatchRecruitment, label: "Xem tin tuyển dụng" },
    { icon: Delete, label: "Xoá" },
  ];
  
      const [checked, setChecked] = React.useState(false);

  const [visibleFunction, setVisibleFunction] = useState(false);
  const [functions, setFunctions] = useState<string>("");

  const [openArrange, setOpenArrange] = useState(false);
  const [valueArrange, setValueArrange] = useState("Ngày tạo");
  const [arrangeFollow, setArrangeFollow] = useState([
    { label: "Ngày tạo", value: "Ngày tạo" },
    { label: "Tiêu đề tin", value: "Tiêu đề tin" },
    { label: "Đơn vị sử dụng", value: "Đơn vị sử dụng" },
  ]);
  //#region CONNECT API
  //#endregion CONNECT API

  return (
    <View style={{ flexDirection: "column", gap: 5, paddingVertical: 30, paddingHorizontal: 15}}>
      {/* Header */}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 40,
          position: "sticky",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 700 }}>Tin tuyển dụng</Text>
        <TouchableOpacity
          style={{
            paddingHorizontal: 15,
            backgroundColor: "#2680EB",
            paddingVertical: 6,
            flexDirection: "row",
            gap: 6,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
          onPress={() => router.push("/(tabs)/admin/recruitment/addrecruitment/addRecruitment")}
        >
          <Ionicons name={"add" as any} size={20} color={"#FFFFFF"} />
          <Text style={{ color: "#FFFFFF", fontWeight: 500 }}>Thêm mới</Text>
        </TouchableOpacity>
      </View>
      {/* NavButton */}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
          position: "sticky",
        }}
      >
        {/* NavSearchLeft */}
        <View style={{ flexDirection: "row", gap: 5, flex: 1 }}>
          <View>
            <DropDownPicker
              open={openStatus}
              value={valueStatus}
              items={statusRecruitment}
              setOpen={setOpenStatus}
              setValue={setValueStatus}
              setItems={setStatusRecruitment}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              textStyle={styles.text}
              listItemLabelStyle={styles.itemText}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text style={{ fontSize: 14, color: "#1e2633" }}>
              Sắp xếp theo:
            </Text>
            <View style={{ flex: 1 }}>
              {" "}
              {/* giúp dropdown chiếm phần còn lại */}
              <DropDownPicker
                open={openArrange}
                value={valueArrange}
                items={arrangeFollow}
                setOpen={setOpenArrange}
                setValue={setValueArrange}
                setItems={setArrangeFollow}
                style={styles.dropdowns}
                dropDownContainerStyle={styles.dropdownContainer}
                textStyle={styles.text}
                listItemLabelStyle={styles.itemText}
              />
            </View>
          </View>
        </View>
        {/* NavSearchRight */}
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            gap: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              borderRadius: 10,
              backgroundColor: "#FFFFFF",
              paddingHorizontal: 10,
              paddingVertical: 8,
              gap: 7,
            }}
          >
            <Ionicons
              name="search"
              size={20}
              color={"#7A8188"}
              style={{ marginRight: 8 }}
            />
            <TextInput
              style={{ outline: "none", flex: 1, padding: 0 }}
              placeholder="Tìm kiếm nhanh trong danh sách"
              placeholderTextColor="#7A8188"
            ></TextInput>
          </View>
          <TouchableOpacity style={styles.buttonNavRight}>
            <AntDesign name="filter" size={20} color="#7A8188" />
            <Text>Bộ lọc</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonNavRight}>
            <Ionicons
              name="share-outline"
              size={20}
              color={"#7A8188"}
            ></Ionicons>
            <Text>Xuất khẩu tin</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Main contain */}
      <View style={{ height: "100%" }}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Checkbox
                          status={checked ? 'checked' : 'unchecked'}
                          onPress={() => setChecked(!checked)}
                        /> 
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.title}>Business Analysis</Text>
              <View style={styles.subInfo}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 6,
                  }}
                >
                  <Text style={styles.subText}>Business Analyst</Text>
                  <Text style={styles.subText}>• Tiểu Tun Thị</Text>
                  <Text style={styles.subText}>• SL cần tuyển: 1</Text>

                  <Text style={styles.subText}>
                    • Hạn nộp hồ sơ: <Text style={styles.dark}>03/11/2025</Text>
                  </Text>
                  
                </View>
              </View>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 7 }}
            >
              {/* Phần button Công khai */}
              <View style={styles.container}>
                <TouchableOpacity
                  style={[styles.mainButton, { borderColor: statusColor }]}
                  onPress={() => setVisibleStatus(true)}
                >
                  <Octicons name="dot-fill" size={15} color={statusColor} />
                  <Text style={[styles.mainButtonText, { color: statusColor }]}>
                    {status}{" "}
                    <AntDesign name="down" size={10} color={statusColor} />
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Phần button chức năng */}
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{ borderColor: "transparent", flexDirection: 'row' }}
                  onPress={() => setVisibleFunction(true)}
                >
                  <MaterialCommunityIcons
                    style={{
                      paddingLeft: 6,
                      paddingRight: 6,
                      color: "#7A8188",
                    }}
                    name="dots-vertical"
                    size={24}
                    color="black"
                  />
                  
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Stats row */}
          <View style={styles.statsRow}>
            <TouchableOpacity style={[styles.statItem]}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Ứng tuyển</Text>
            </TouchableOpacity>
            <Border />

            <TouchableOpacity style={[styles.statItem]}>
              <Text style={styles.statNumber}>1</Text>
              <Text style={styles.statLabel}>Thi tuyển</Text>
            </TouchableOpacity>
            <Border />

            <TouchableOpacity style={[styles.statItem]}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Phỏng vấn</Text>
            </TouchableOpacity>
            <Border />

            <TouchableOpacity style={[styles.statItem]}>
              <Text style={styles.statNumber}>1</Text>
              <Text style={styles.statLabel}>Offer</Text>
            </TouchableOpacity>
            <Border />

            <TouchableOpacity style={[styles.statItem]}>
              <Text style={styles.statNumber}>1</Text>
              <Text style={styles.statLabel}>Đã tuyển</Text>
            </TouchableOpacity>
          </View>
          {/* Dropdown hiển thị ngay dưới nút */}
          {visibleStatus && (
            <View style={styles.dropdownWrapper}>
              <View style={styles.dropdownSF}>
                {optionsStatus.map((opt, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.options}
                    onPressOut={() => setVisibleStatus(false)}
                    onPress={() => handleSelect(opt)}
                  >
                    <View>
                      <Text style={[styles.optionLabels, { color: opt.color }]}>
                        {opt.label}
                      </Text>
                      <Text style={styles.optionDescs}>{opt.desc}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
          {visibleFunction && (
            <View style={styles.dropdownWrapperFucn}>
                          <View style={[ styles.dropdownFunc]}>
              <TouchableOpacity>
                {optionFunction.map((opt, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.option}
                    onPress={() => handleSelectFunction(opt)}
                  >
                    <opt.icon width={17} height={17} />
                    <Text>{opt.label}</Text>
                  </TouchableOpacity>
                ))}
              </TouchableOpacity>
            </View>

            </View>
          )}
                  </View>
        
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  dropdown: {
    width: 170,
    borderWidth: 0,
    // borderRadius: 12,
    // borderWidth: 0,
    // borderColor: "#d1d5db", // màu xám nhẹ
    backgroundColor: "transparant",
    // paddingHorizontal: 12,
    // paddingVertical: 8,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3, // shadow Android
  },
  dropdowns: {
    width: 150,
    borderWidth: 0,
    backgroundColor: "transparant",
  },
  dropdownContainer: {
    borderRadius: 12,
    borderColor: "#d1d5db",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  text: {
    fontSize: 14,
    color: "#1e2633",
    fontWeight: "500",
  },
  itemText: {
    fontSize: 14,
    color: "#1e2633",
    fontWeight: "400",
  },
  buttonNavRight: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 7,
    color: "#1E2633",
    gap: 6,
    alignItems: "center",
    fontWeight: 500,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    gap: 4
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  checkbox: {
    marginTop: 4,
    marginRight: 8
  },
  title: {
    fontSize: 19,
    fontWeight: '600',
    color: "#1e2633",
    marginBottom: 8,
  },
  subInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: 'center',
    gap: 6, // React Native chưa hỗ trợ gap, có thể dùng marginRight
  },
  subText: {
    fontSize: 14,
    color: "#1e2633",
    marginRight: 6,
  },
  status: {
    borderWidth: 1,
    borderColor: "#48bb56",
    borderRadius: 6,
    paddingHorizontal: 13,
    paddingVertical: 4,
    flexDirection: 'row',
    gap: 7,
    alignItems: "center",
    marginLeft: 8,
  },
  statusText: {
    fontSize: 14,
    color: "#48bb56",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    padding: 4
  },
  statNumber: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1e2633",
  },
  dropdownWrapper: {
  position: "absolute",
  top: 50,
  right: 60,
  zIndex: 100000,
  elevation: 100, // Android
},
dropdownWrapperFucn: {
  position: "absolute",
  top: 50,
  right: 0,
  zIndex: 100000,
  elevation: 100, // Android
},
dropdownFunc: {
  flexDirection: 'row',
  width: 200,
  backgroundColor: "#FFFFFF",   // nền trắng đặc
  borderRadius: 10,
  paddingVertical: 10,
  paddingHorizontal: 12,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 4,
  elevation: 5,
},
dropdownSF: {
  width: 220,
  backgroundColor: "#FFFFFF",   // nền trắng đặc
  borderRadius: 10,
  paddingVertical: 10,
  paddingHorizontal: 12,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 4,
  elevation: 5,
},


  statLabel: {
    color: "#6a727d",
    textAlign: 'center',
    fontSize: 14, 
    fontWeight: '500',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    marginTop: 8
  },
  
  dark: {
    fontWeight: "700"
  },
  container: { justifyContent: "center", alignItems: "center", flexDirection: 'row' },
  mainButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    flexDirection: 'row',
    gap: 7,
    borderColor: "#48BB56",
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  mainButtonText: { color: "#48BB56", fontWeight: "500", fontSize: 14, alignItems: 'center' },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  option: { paddingVertical: 10, flexDirection: 'row', gap: 10},
  optionLabel: { fontSize: 15, fontWeight: "bold", marginBottom: 3 },
  optionDesc: { fontSize: 14, color: "#555" },
  options: { paddingVertical: 10, lineHeight: 3},
  optionLabels: { fontSize: 15, fontWeight: "bold", marginBottom: 3 },
  optionDescs: { fontSize: 14, color: "#555" },

});