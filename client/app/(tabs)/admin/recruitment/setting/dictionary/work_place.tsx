// types.ts

export interface JobPosition {
  id: string; // Mã vị trí (VT0005)
  name: string; // Tên vị trí (Android Fresher)
  industry: string; // Ngành nghề (không hiển thị rõ, có thể thay bằng Name)
  department: string; // Phòng ban
  dataSource: string; // Nguồn dữ liệu
  status: "Đang" | "Ngừng"; // Trạng thái (Đang/Ngừng)
}
import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from '@react-native-picker/picker';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
export const mockJobPositions: JobPosition[] = [
  {
    id: "VT0005",
    name: "Android Fresher",
    industry: "CNTT",
    department: "Tiểu Tun Thị ...",
    dataSource: "Thêm mới",
    status: "Đang",
  },
  {
    id: "VT0006",
    name: "PHP Developer",
    industry: "CNTT",
    department: "Tiểu Tun Thị ...",
    dataSource: "Thêm mới",
    status: "Đang",
  },
  {
    id: "VT0007",
    name: "Automation Tes...",
    industry: "CNTT",
    department: "Tiểu Tun Thị ...",
    dataSource: "Thêm mới",
    status: "Đang",
  },
  {
    id: "VT0008",
    name: "IT System Engi...",
    industry: "CNTT",
    department: "Tiểu Tun Thị ...",
    dataSource: "Thêm mới",
    status: "Đang",
  },
  {
    id: "VT0009",
    name: "Data Analyst",
    industry: "CNTT",
    department: "Tiểu Tun Thị ...",
    dataSource: "Thêm mới",
    status: "Đang",
  },
  {
    id: "VT0010",
    name: "Lập Trình Viên",
    industry: "CNTT",
    department: "Tiểu Tun Thị ...",
    dataSource: "Thêm mới",
    status: "Đang",
  },
  {
    id: "VT0011",
    name: "Chuyên Viên Bả...",
    industry: "CNTT",
    department: "Tiểu Tun Thị ...",
    dataSource: "Thêm mới",
    status: "Đang",
  },
  // ... (16 bản ghi)
];
import { Checkbox } from "react-native-paper";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
  Platform,
  TouchableOpacity
} from "react-native";
import {
  Text,
  Searchbar,
  Button,
  Switch,
  Card,
  useTheme,
  Appbar,
  FAB, // Sử dụng FAB cho nút Thêm mới nổi
} from "react-native-paper";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
// Component con cho từng item trong danh sách (tối ưu cho Mobile)
const WorkPlace: React.FC<{ item: JobPosition }> = ({ item }) => {
  const [checked, setChecked] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAutoSync, setIsAutoSync] = useState(false);
  const theme = useTheme();
    const [time, setTime] = React.useState("Chọn đơn vị sử dụng");

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const filteredData = mockJobPositions.filter(
    (pos) =>
      pos.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pos.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const renderTableRow = (item: JobPosition) => (
    <View key={item.id} style={styles.tableRow}>
      <Checkbox
        status={checked ? "checked" : "unchecked"}
        onPress={() => setChecked(!checked)}
      />{" "}
      <View
        style={[
          styles.cell,
          { flex: 2, flexDirection: "row", alignItems: "center" },
        ]}
      >
        <Text style={styles.cellText}>{item.name}</Text>
      </View>
      <Text style={[styles.cell, { flex: 2  }  ] }>{item.id}</Text>
      <Text style={[styles.cell, { flex: 2.5 }]}>{item.name}</Text>
      <Text style={[styles.cell, { flex: 1.5 }]}>{item.industry}</Text>
      <Text style={[styles.cell, { flex: 2  }  ]}>{item.department}</Text>
      <Text style={[styles.cell, { flex: 1.5 }]}>{item.dataSource}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      {/* Nav trên */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15, }}>
        {/* Nav trái */}
        <View style={{ flexDirection: "column" }}>
          <View style={{ flexDirection: "row", gap: 20, marginBottom: 5, }}>
          <Text style={{fontSize: 20, fontWeight: 700}}>Địa điểm làm viêc</Text>
          
        </View>
        <View>
          <Text style={styles.syncLabel}>Quản lý các văn phòng, địa điểm làm việc của Công ty bạn.</Text>
        </View>
        </View>
        {/* Nav phải */}
        <View style={styles.actionBar}>
                    
                  <TouchableOpacity  style={{
                      paddingHorizontal: 25,
          
                      backgroundColor: "#2680EB",
                      paddingVertical: 8,
                      flexDirection: "row",
                      gap: 6,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                    }}>
                      <AntDesign name="plus" size={15} color="#FFFFFF" />
                          <Text style={{fontWeight: 500, color: '#FFFFFF', fontSize: 15}}>Thêm mới</Text>
                        </TouchableOpacity>
          
        </View>
      </View>

      <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15,}}>
        <View
          style={{
            flexDirection: "row",
            width: 400,
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

        
      </View>
      {/* Nội dung */}
      <ScrollView>
        {/* Main containt */}
        <View>
          {/* Table */}
          <ScrollView horizontal={true} style={styles.tableScrollView}>
            <View style={styles.tableContainer}>
              {/* Table Header */}
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.headerCell, { flex: 0.5, minWidth: 50 }]}>
                  {" "}
                </Text>
                <Text style={[styles.headerCell, { flex: 2, minWidth: 150 }]}>
                  Họ và tên
                </Text>
                <Text style={[styles.headerCell, { flex: 2, minWidth: 150 }]}>
                  Số điện thoại
                </Text>
                <Text style={[styles.headerCell, { flex: 2.5, minWidth: 100 }]}>
                  Email
                </Text>
                <Text style={[styles.headerCell, { flex: 1.5, minWidth: 200 }]}>
                  Chiến dịch tuyển dụng
                </Text>
                <Text style={[styles.headerCell, { flex: 2, minWidth: 150 }]}>
                  Vị trí tuyển dụng
                </Text>
                 <Text style={[styles.headerCell, { flex: 2, minWidth: 150 }]}>
                  Vị trí tuyển dụng
                </Text>
              </View>
              {mockJobPositions.map(renderTableRow)}
            </View>
          </ScrollView>
          {/* Pagination */}
          <View style={styles.pagination}>
            <Text style={styles.paginationText}>
              Tổng: {mockJobPositions.length} bản ghi
            </Text>
            <View style={styles.paginationControls}>
              <Text style={styles.paginationText}>Số bản ghi/trang</Text>
              <Text style={styles.paginationText}>25 ▼</Text>
              <Text style={styles.paginationText}>
                1 - {mockJobPositions.length} bản ghi
              </Text>
              <Text style={styles.paginationText}>{"<"}</Text>
              <Text style={styles.paginationText}>1</Text>
              <Text style={styles.paginationText}>{">"}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonNavRight: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 7,
    color: "#1E2633",
    width: 130,
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 500,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
   pickerContainer_: {
    overflow: 'hidden',
    width: 300,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f7f9", // Nền màu xám nhẹ giống web
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
 picker_: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    color: '#7A8188',
    borderColor: '#FFFFFF',
    borderRadius: 6,
  },
  // 1. Sync Row
  syncRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 15,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  paginationText: {
    color: "#555",
  },
  paginationControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  syncLabel: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: 400,
    marginTop: 5,
  },

  // 2. Action Bar
  actionBar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 15,
    gap: 10
  },
  actionButton: {
    marginRight: 10,
    borderRadius: 8,
  },
  buttonLabel: {
    fontSize: 12,
  },

  // 3. Search & Filter Bar
  searchFilterBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  tableContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
    fontWeight: "bold",
     
  },
  headerCell: {
    fontWeight: "bold",
    color: "#555",
   
  },
  searchBar: {
    flex: Platform.OS === "web" ? 2 : 0,
    marginBottom: Platform.OS === "web" ? 0 : 10,
    borderRadius: 8,
    height: 40,
  },
  searchBarInput: {
    minHeight: 0,
  },
  filterButton: {
    flex: Platform.OS === "web" ? 1 : 0,
    marginLeft: Platform.OS === "web" ? 10 : 0,
    borderRadius: 8,
    height: 40,
    justifyContent: "center", // Căn giữa nội dung nút
  },
  cellText: {
    fontSize: 14,
    color: "#333",
  },
  // 4. Data List (Cards)
  listTitle: {
    marginBottom: 10,
    fontWeight: "bold",
  },
  listContent: {
    paddingBottom: 20,
  },
  cell: {
    flex: 1,
    paddingHorizontal: 4,
  },
  card: {
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: "#ffffff",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  cardTitle: {
    fontWeight: "bold",
    color: "#007bff", // Màu xanh nổi bật cho tên vị trí
  },
  cardId: {
    marginBottom: 8,
    fontSize: 12,
    color: "#6c757d",
  },
  cardRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  cardLabel: {
    fontWeight: "600",
    marginRight: 5,
    width: 100, // Căn chỉnh cột cho các nhãn
    fontSize: 13,
  },
  cardValue: {
    fontSize: 13,
  },
  tableScrollView: {
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  cardActions: {
    justifyContent: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 5,
    paddingBottom: 0,
  },

  // 5. Footer
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    // Đảm bảo footer không bị che bởi FAB nếu FAB nằm dưới cùng
    marginBottom: 50,
  },

  // Nút Thêm mới nổi (FAB)
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#007bff", // Màu xanh dương giống nút Thêm mới
  },
});

export default WorkPlace;
