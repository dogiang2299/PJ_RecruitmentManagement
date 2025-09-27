import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import CreateTaskModal from '../../../../components/CreateTaskModal';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);
// src/models/taskModels.ts
export interface ITask {
  id: string;
  name: string;
  type: string;
  result: string;
  relatedCandidate: string;
  assignee: string;
  assigneeAvatar: string;
  deadline: string; // Sử dụng định dạng ISO 8601 để dễ xử lý ngày tháng
  isCompleted: boolean;
}
const tasks: ITask[] = [
  {
    id: '1',
    name: 'Gửi email',
    type: 'Gửi email',
    result: 'Chưa gửi',
    relatedCandidate: '--',
    assignee: 'Đỗ Tiểu Tuân Thị',
    assigneeAvatar: 'DT',
    deadline: '2025-09-22T10:28:00', // Ngày hết hạn: hôm qua
    isCompleted: false,
  },
  {
    id: '2',
    name: 'Phỏng vấn',
    type: 'Phỏng vấn trực tiếp',
    result: 'Chưa hoàn thành',
    relatedCandidate: 'Nguyễn Văn A',
    assignee: 'Lê Thị B',
    assigneeAvatar: 'LB',
    deadline: '2025-09-25T14:00:00', // Ngày hết hạn: trong tương lai
    isCompleted: false,
  },
  {
    id: '3',
    name: 'Gửi báo cáo',
    type: 'Báo cáo công việc',
    result: 'Chưa gửi',
    relatedCandidate: '--',
    assignee: 'Trần Văn C',
    assigneeAvatar: 'TC',
    deadline: '2025-09-23T08:00:00', // Ngày hết hạn: hôm nay
    isCompleted: false,
  },
];
const isDeadlineExpired = (deadline: string): boolean => {
  const deadlineDate = dayjs(deadline);
  const now = dayjs();
  
  // Kiểm tra nếu ngày hết hạn là trước hoặc bằng ngày hiện tại
  return deadlineDate.isSameOrBefore(now, 'day');
}
const TaskManagementScreen = () => {
  
const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={styles.tabText}>Chưa hoàn thành</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Đã hoàn thành</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#fff" />
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Text style={styles.addButtonText}>Thêm công việc</Text>
          </TouchableOpacity>
          <CreateTaskModal
            isVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
          />
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'column', backgroundColor: '#FFFFFF'}}>
         {/* Filter and Search */}
      <View style={styles.controls}>
        <View style={styles.filter}>
          <Text style={styles.filterText}>Tất cả (1)</Text>
          <Ionicons name="chevron-down-outline" size={16} color="#000" />
        </View>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={18} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm nhanh trong danh sách"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Table */}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow_header}>
          <Text style={[styles.tableHeaderCell, { flex: 0.15 }]}>Tên công việc</Text>
          <Text style={[styles.tableHeaderCell, { flex: 0.15 }]}>Loại công việc</Text>
          <Text style={[styles.tableHeaderCell, { flex: 0.15 }]}>Kết quả thực hiện</Text>
          <Text style={[styles.tableHeaderCell, { flex: 0.15 }]}>Ứng viên liên quan</Text>
          <Text style={[styles.tableHeaderCell, { flex: 0.2 }]}>Người thực hiện</Text>
          <Text style={[styles.tableHeaderCell, { flex: 0.2 }]}>Hạn hoàn thành</Text>
        </View>

        {/* Table Body */}
      <ScrollView>
        {tasks.map((task: ITask) => {
          const deadlineExpired = isDeadlineExpired(task.deadline);
          
          return (
            <View key={task.id} style={styles.tableRow}>
              <View style={[styles.tableCell, styles.taskNameCell]}>
                <Ionicons name="checkmark-circle-outline" size={20} color="#7A8188" />
                <Text style={styles.cellText}>{task.name}</Text>
              </View>
              <Text style={styles.tableCellText}>{task.type}</Text>
              <Text style={styles.tableCellText}>{task.result}</Text>
              <Text style={styles.tableCellText}>{task.relatedCandidate}</Text>
              <View style={styles.tableCell}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{task.assigneeAvatar}</Text>
                </View>
                <Text style={styles.cellText}>{task.assignee}</Text>
              </View>
              <Text style={[styles.tableCellText, deadlineExpired && styles.expiredText]}>
                {dayjs(task.deadline).format('HH:mm - DD/MM/YYYY')}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Tổng: {tasks.length} bản ghi</Text>
        <View style={styles.pagination}>
          <Text>Số bản ghi/trang</Text>
          <View style={styles.paginationSelect}>
            <Text>25</Text>
            <Ionicons name="chevron-down-outline" size={16} color="#000" />
          </View>
          <Text>1 - {tasks.length} bản ghi</Text>
          <View style={styles.paginationControls}>
            <Ionicons name="chevron-back-outline" size={20} color="#ccc" />
            <Ionicons name="chevron-forward-outline" size={20} color="#000" />
          </View>
        </View>
      </View>
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    padding: 2,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  tabText: {
    fontWeight: 'bold',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  controls: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10,
  padding: 15
},
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  filterText: {
    marginRight: 5,
    fontWeight: 'bold'
  },
  searchContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  width: 500,
  marginLeft: 10,
  borderWidth: 1,
  borderColor: '#DDDdE4',
  borderRadius: 5,
  paddingHorizontal: 10,
},
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    outline: 'none',
    outlineWidth: 0,
    height: 35,
  },
  table: {
    borderColor: '#ccc',
  },
  tableRow_header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderTopWidth:1,
    borderColor: '#DDDdE4',
    backgroundColor: '#F9FAFD',
    paddingVertical: 10,
    alignItems: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderTopWidth: 0.2,
    borderColor: '#DDDdE4',
    paddingVertical: 10,
    alignItems: 'center',
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  tableCell: {
    flex: 0.15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskNameCell: {
    flex: 0.15,
  },
  cellText: {
    marginLeft: 5,
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: '#d6e9f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  avatarText: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paginationSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  paginationControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    gap: 10,
  },
  // tableRow: {
  //   flexDirection: 'row',
  //   borderBottomWidth: 1,
  //   borderColor: '#eee',
  //   paddingVertical: 10,
  //   alignItems: 'center',
  // },
  // tableCell: {
  //   flex: 0.15,
  //   paddingHorizontal: 10,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  tableCellText: {
    flex: 0.15,
    paddingHorizontal: 10,
  },
  // taskNameCell: {
  //   flex: 0.15,
  // },
  // cellText: {
  //   marginLeft: 5,
  // },
  // avatar: {
  //   width: 25,
  //   height: 25,
  //   borderRadius: 12.5,
  //   backgroundColor: '#d6e9f9',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginRight: 5,
  // },
  // avatarText: {
  //   fontWeight: 'bold',
  //   color: '#007bff',
  // },
  expiredText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default TaskManagementScreen;