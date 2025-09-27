import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Modal, Dimensions } from 'react-native';
import { SvgProps } from "react-native-svg";
import { Checkbox } from 'react-native-paper';

import { Image } from "expo-image";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { useRouter, usePathname, Slot } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Label } from "@react-navigation/elements";
import { Picker } from '@react-native-picker/picker';

interface Career {
  id: string;
  name: string;
  unit: string;
  describe: string;
  status: string;
}
export default function Career() {
    // Bảng
        const [time, setTime] = React.useState("Chọn đơn vị sử dụng");
    
        const [checked, setChecked] = React.useState(false);
      
  const renderTableRow = (item: Career) => (
      <View key={item.id} style={styles.tableRow}>
          <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => setChecked(!checked)}
              />      <View style={[styles.cell, { flex: 2, flexDirection: 'row', alignItems: 'center' }]}>
          
          <Text style={[styles.cellText, { flex: 3.5 }]}>{item.name}</Text>
        </View>
        <Text style={[styles.cell, { flex: 3.5 }]}>{item.unit}</Text>
        <Text style={[styles.cell, { flex: 3 }]}>{item.describe}</Text>
        <Text style={[styles.cell, { flex: 2.5 }]}>{item.status}</Text>
      </View>
    );
  // Dữ liệu mẫu cũng nên được định nghĩa kiểu
  const careerData: Career[] = [
      {
      id: '1',
      name: 'Bùi Thu Thủy',
      unit: '0368 27 17 739',
      describe: 'buithuthuy686868@gmail...',
      status: 'Đang hoạt động',
      },
    {
      id: '1',
      name: 'Bùi Thu Thủy',
      unit: '0368 27 17 739',
      describe: 'buithuthuy686868@gmail...',
      status: 'Đang hoạt động',
      },
    {
      id: '1',
      name: 'Bùi Thu Thủy',
      unit: '0368 27 17 739',
      describe: 'buithuthuy686868@gmail...',
      status: 'Đang hoạt động',
      },
    {
      id: '1',
      name: 'Bùi Thu Thủy',
      unit: '0368 27 17 739',
      describe: 'buithuthuy686868@gmail...',
      status: 'Đang hoạt động',
      },
    {
      id: '1',
      name: 'Bùi Thu Thủy',
      unit: '0368 27 17 739',
      describe: 'buithuthuy686868@gmail...',
      status: 'Đang hoạt động',
      },
  ];    
  return (
            <View style={{ flexDirection: "column", gap: 5}}>
                      {/* Header */}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
              position: "sticky",
            }}
          >
            <View>
                          <Text style={{ fontSize: 23, fontWeight: 700, marginBottom: 10 }}>Cấp bậc</Text>
            <Text>Quản lý các Cấp bậc hiển thị trên website</Text>

            </View>
            <View>
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
              // onPress={() => router.push("/(tabs)/admin/recruitment/addrecruitment/addRecruitment")}
            >
              <Ionicons name={"add" as any} size={20} color={"#FFFFFF"} />
              <View>
          <TouchableOpacity >
            <Text style={{fontWeight: 500, color: '#FFFFFF', fontSize: 15}}>Thêm cấp bậc</Text>
          </TouchableOpacity>
          
         
        </View>
            </TouchableOpacity>

            </View>
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
            {/* NavSearchRight */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 160,
                width: '100%'
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
                  width: 500
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
              <View style={styles.pickerContainer_}>
                  <Picker
                    selectedValue={time}
                    onValueChange={(itemValue) => setTime(itemValue)}
                    style={styles.picker_}
                  >
                    <Picker.Item label="Trước 15 phút" value="15" />
                    <Picker.Item label="Trước 30 phút" value="30" />
                    <Picker.Item label="Trước 1 tiếng" value="60" />
                    <Picker.Item label="Trước 1 ngày" value="1440" />
                    <Picker.Item label="Chọn đơn vị sử dụng" value="Chọn đơn vị sử dụng" />
                  </Picker>
                </View> 
              
            </View>
          </View>
          {/* Main containt */}
                <View>
                    {/* Table */}
        <ScrollView horizontal={true} style={styles.tableScrollView}>
            <View style={styles.tableContainer}>
              {/* Table Header */}
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.headerCell, { flex: 0.5, minWidth: 50 }]}> </Text>
                <Text style={[styles.headerCell, { flex: 3.5, minWidth: 150 }]}>Tên cấp bậc</Text>
                <Text style={[styles.headerCell, { flex: 3.5, minWidth: 150 }]}>Đơn vị sử dụng</Text>
                <Text style={[styles.headerCell, { flex: 3, minWidth: 200 }]}>Mô tả</Text>
                <Text style={[styles.headerCell, { flex: 2.5, minWidth: 150 }]}>Trạng thái</Text>
              </View>
              {careerData.map(renderTableRow)}
            </View>
          </ScrollView>
          {/* Pagination */}
          <View style={styles.pagination}>
            <Text style={styles.paginationText}>Tổng: {careerData.length} bản ghi</Text>
            <View style={styles.paginationControls}>
              <Text style={styles.paginationText}>Số bản ghi/trang</Text>
              <Text style={styles.paginationText}>25 ▼</Text>
              <Text style={styles.paginationText}>1 - {careerData.length} bản ghi</Text>
              <Text style={styles.paginationText}>{'<'}</Text>
              <Text style={styles.paginationText}>1</Text>
              <Text style={styles.paginationText}>{'>'}</Text>
            </View>
          </View>
                </View>
            </View>
    
  );
}
const styles = StyleSheet.create({
  dropdown: {
    width: 170,
    borderWidth: 0,
  },
tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    fontWeight: 'bold',
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#555',
  },
  pickerContainer_: {
    overflow: 'hidden',
    width: 300,
    
  },
  picker_: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    color: '#7A8188',
    borderColor: '#FFFFFF',
   borderRadius: 10,
  },
  cell: {
    flex: 1,
    paddingHorizontal: 4,
  },
  cellText: {
    fontSize: 14,
    color: '#333',
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
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  badge: {
    backgroundColor: '#007bff',
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    fontSize: 10,
    marginLeft: 8,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  paginationText: {
    color: '#555',
  },
  paginationControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
 
  tableScrollView: {
    flex: 1,
  },


});