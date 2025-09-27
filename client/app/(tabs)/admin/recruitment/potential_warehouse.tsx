import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Modal, Dimensions } from 'react-native';
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
import AddCandidateModal from '../../../../components/addCandidate';

const candidateData = [
  { id: '1', name: 'Bùi Thu Thủy', phone: '0368 27 17 739', email: 'buithuthuy686868@gmail...', campaign: '--', position: 'Business Analyst', job: 'Business' },
  { id: '2', name: 'Lê Thanh Thủy', phone: '0963 972 721', email: 'thanhtuyh.nh@gmail.com', campaign: '--', position: 'Business Analyst', job: 'Business' },
  { id: '3', name: 'Hoàng Thị Nga', phone: '0946 988 890', email: 'lienhoang5593@gmail.com', campaign: '--', position: 'Business Analyst', job: 'Business' },
  { id: '4', name: 'Nguyễn Thế Mạnh', phone: '09 77 282 840', email: 'themanh.nguyen@gmail...', campaign: '--', position: 'Business Analyst', job: 'Business' },
  { id: '5', name: 'Lê Tiên Mai', phone: '0969 569 587', email: 'letienmai.nuce@gmail.com', campaign: '--', position: 'Business Analyst', job: 'Business' },
  { id: '6', name: 'Nguyễn Hoài Anh', phone: '098 6 5 55 128', email: 'Anhnh208@gmail.com', campaign: '--', position: 'Business Analyst', job: 'Business' },
];
interface Candidate {
id: string;
  name: string;
  phone: string;
  email: string;
  campaign: string;
  position: string;
  job: string;
  round: string;
  rating: string;
  applyDate: string;
  source: string;
  educationLevel: string;
  trainingPlace: string;
  major: string;
  recentWorkplace: string;
  exploiter: string;
  unit: string;}
  
export default function PotentialWarehousePage() { 
    const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
    const router = useRouter();
    // Bảng
const renderTableRow = (item: Candidate) => (
    <View key={item.id} style={styles.tableRow}>
      <View style={[styles.cell, { flex: 0.5, alignItems: 'center' }]}>
        <View style={styles.checkbox}></View>
      </View>
      <View style={[styles.cell, { flex: 2, flexDirection: 'row', alignItems: 'center' }]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.name.split(' ').map(n => n[0]).join('')}</Text>
        </View>
        <Text style={styles.cellText}>{item.name}</Text>
        <Text style={styles.badge}>MỚI</Text>
      </View>
      <Text style={[styles.cell, { flex: 2 }]}>{item.phone}</Text>
      <Text style={[styles.cell, { flex: 2.5 }]}>{item.email}</Text>
      <Text style={[styles.cell, { flex: 1.5 }]}>{item.campaign}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.position}</Text>
      <Text style={[styles.cell, { flex: 1.5 }]}>{item.job}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.round}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.rating}</Text>
      <Text style={[styles.cell, { flex: 2.5 }]}>{item.applyDate}</Text>
      <Text style={[styles.cell, { flex: 1.5 }]}>{item.source}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.educationLevel}</Text>
      <Text style={[styles.cell, { flex: 1.5 }]}>{item.trainingPlace}</Text>
      <Text style={[styles.cell, { flex: 2.5 }]}>{item.major}</Text>
      <Text style={[styles.cell, { flex: 1.5 }]}>{item.recentWorkplace}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.exploiter}</Text>
      <Text style={[styles.cell, { flex: 1.5 }]}>{item.unit}</Text>
    </View>
  );
// Dữ liệu mẫu cũng nên được định nghĩa kiểu
const candidateData: Candidate[] = [
    {
    id: '1',
    name: 'Bùi Thu Thủy',
    phone: '0368 27 17 739',
    email: 'buithuthuy686868@gmail...',
    campaign: '--',
    position: 'Business Analyst',
    job: 'Business',
    round: 'Vòng 1',
    rating: 'Tốt',
    applyDate: '2023-01-15',
    source: 'Website',
    educationLevel: 'Đại học',
    trainingPlace: 'Đại học Bách Khoa',
    major: 'Kỹ thuật phần mềm',
    recentWorkplace: 'Công ty ABC',
    exploiter: 'Nguyễn Văn A',
    unit: 'Phòng ban 1'
  },
  {
    id: '2',
    name: 'Bùi Thu Thủy',
    phone: '0368 27 17 739',
    email: 'buithuthuy686868@gmail...',
    campaign: '--',
    position: 'Business Analyst',
    job: 'Business',
    round: 'Vòng 1',
    rating: 'Tốt',
    applyDate: '2023-01-15',
    source: 'Website',
    educationLevel: 'Đại học',
    trainingPlace: 'Đại học Bách Khoa',
    major: 'Kỹ thuật phần mềm',
    recentWorkplace: 'Công ty ABC',
    exploiter: 'Nguyễn Văn A',
    unit: 'Phòng ban 1'
  },
  {
    id: '3',
    name: 'Bùi Thu Thủy',
    phone: '0368 27 17 739',
    email: 'buithuthuy686868@gmail...',
    campaign: '--',
    position: 'Business Analyst',
    job: 'Business',
    round: 'Vòng 1',
    rating: 'Tốt',
    applyDate: '2023-01-15',
    source: 'Website',
    educationLevel: 'Đại học',
    trainingPlace: 'Đại học Bách Khoa',
    major: 'Kỹ thuật phần mềm',
    recentWorkplace: 'Công ty ABC',
    exploiter: 'Nguyễn Văn A',
    unit: 'Phòng ban 1'
  },
  {
    id: '4',
    name: 'Bùi Thu Thủy',
    phone: '0368 27 17 739',
    email: 'buithuthuy686868@gmail...',
    campaign: '--',
    position: 'Business Analyst',
    job: 'Business',
    round: 'Vòng 1',
    rating: 'Tốt',
    applyDate: '2023-01-15',
    source: 'Website',
    educationLevel: 'Đại học',
    trainingPlace: 'Đại học Bách Khoa',
    major: 'Kỹ thuật phần mềm',
    recentWorkplace: 'Công ty ABC',
    exploiter: 'Nguyễn Văn A',
    unit: 'Phòng ban 1'
  },
  {
    id: '5',
    name: 'Bùi Thu Thủy',
    phone: '0368 27 17 739',
    email: 'buithuthuy686868@gmail...',
    campaign: '--',
    position: 'Business Analyst',
    job: 'Business',
    round: 'Vòng 1',
    rating: 'Tốt',
    applyDate: '2023-01-15',
    source: 'Website',
    educationLevel: 'Đại học',
    trainingPlace: 'Đại học Bách Khoa',
    major: 'Kỹ thuật phần mềm',
    recentWorkplace: 'Công ty ABC',
    exploiter: 'Nguyễn Văn A',
    unit: 'Phòng ban 1'
  },
];    
return (
        <View style={{ flexDirection: "column", gap: 5, paddingVertical: 10, paddingHorizontal: 25}}>
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
        <Text style={{ fontSize: 20, fontWeight: 700 }}>Kho tiềm năng</Text>
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
          <View>
      <TouchableOpacity onPress={handleOpenModal}>
        <Text style={{fontWeight: 'bold', color: '#FFFFFF'}}>Thêm ứng viên</Text>
      </TouchableOpacity>
      
      <AddCandidateModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
      />
    </View>
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
        {/* NavSearchRight */}
        <View
          style={{
            flexDirection: "row",
            
            alignItems: 'flex-start',
            gap: 5,
            width: 600
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
      {/* Main containt */}
            <View>
                {/* Table */}
<ScrollView horizontal={true} style={styles.tableScrollView}>
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.headerCell, { flex: 0.5, minWidth: 50 }]}> </Text>
            <Text style={[styles.headerCell, { flex: 2, minWidth: 150 }]}>Họ và tên</Text>
            <Text style={[styles.headerCell, { flex: 2, minWidth: 150 }]}>Số điện thoại</Text>
            <Text style={[styles.headerCell, { flex: 2.5, minWidth: 200 }]}>Email</Text>
            <Text style={[styles.headerCell, { flex: 1.5, minWidth: 150 }]}>Chiến dịch tuyển dụng</Text>
            <Text style={[styles.headerCell, { flex: 2, minWidth: 150 }]}>Vị trí tuyển dụng</Text>
            <Text style={[styles.headerCell, { flex: 1.5, minWidth: 150 }]}>Tin tuyển dụng</Text>
            <Text style={[styles.headerCell, { flex: 2, minWidth: 150 }]}>Vòng tuyển dụng</Text>
            <Text style={[styles.headerCell, { flex: 2, minWidth: 150 }]}>Đánh giá</Text>
            <Text style={[styles.headerCell, { flex: 2.5, minWidth: 200 }]}>Ngày ứng tuyển</Text>
            <Text style={[styles.headerCell, { flex: 1.5, minWidth: 150 }]}>Nguồn ứng viên</Text>
            <Text style={[styles.headerCell, { flex: 2, minWidth: 150 }]}>Trình độ đào tạo</Text>
            <Text style={[styles.headerCell, { flex: 1.5, minWidth: 150 }]}>Nơi đào tạo</Text>
            <Text style={[styles.headerCell, { flex: 2.5, minWidth: 200 }]}>Chuyên ngành</Text>
            <Text style={[styles.headerCell, { flex: 1.5, minWidth: 150 }]}>Nơi làm việc gần đây</Text>
            <Text style={[styles.headerCell, { flex: 2, minWidth: 150 }]}>Nhân sự khai thác</Text>
            <Text style={[styles.headerCell, { flex: 1.5, minWidth: 150 }]}>Đơn vị sử dụng</Text>
          </View>
          {candidateData.map(renderTableRow)}
        </View>
      </ScrollView>
      {/* Pagination */}
      <View style={styles.pagination}>
        <Text style={styles.paginationText}>Tổng: {candidateData.length} bản ghi</Text>
        <View style={styles.paginationControls}>
          <Text style={styles.paginationText}>Số bản ghi/trang</Text>
          <Text style={styles.paginationText}>25 ▼</Text>
          <Text style={styles.paginationText}>1 - {candidateData.length} bản ghi</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  alert: {
    backgroundColor: '#e6f0ff',
    padding: 12,
    borderRadius: 5,
    marginBottom: 16,
  },
  alertText: {
    color: '#004085',
  },
  linkText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchInput: {
    height: 40,
    flex: 1,
  },
  toolbarIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    backgroundColor: '#fff',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
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
    backgroundColor: '#FFFFFf',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    fontWeight: 'bold',
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#555',
  },
  cell: {
    flex: 1,
    paddingHorizontal: 4,
  },
  cellText: {
    fontSize: 14,
    color: '#333',
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
  
  
})