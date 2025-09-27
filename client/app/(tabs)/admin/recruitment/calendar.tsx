import React , {useState}from 'react';
import { StyleSheet, View, Text, TextInput, Dimensions,TouchableOpacity, Image, ScrollView } from 'react-native';
import { SvgProps } from "react-native-svg";
import IconCalendar from "../../../../assets/images/calendar.svg";

interface OptionFunction {
  icon: React.FC<SvgProps>;
  label: string;
 
}
import AntDesign from '@expo/vector-icons/AntDesign';
const ScheduleScreen = () => {
  const [isFocused, setIsFocused] = useState(false);
  const { height } = Dimensions.get('window');
  const [checked, setChecked] = React.useState(false);
  const [time, setTime] = React.useState("30");
  return (
    <View style={styles.container}>
      {/* Header - Đứng im */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Theo tuần</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navText}><AntDesign name="left" size={16} color="#7A8188" /></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navText}><AntDesign name="right" size={16} color="#7A8188" /></Text>
          </TouchableOpacity>
          <Text style={styles.dateRangeText}>22/9/2025 - 28/9/2025</Text>
          <TouchableOpacity style={styles.dropdownButton}>
            <Text style={styles.dropdownText}>Toàn bộ lịch công ty ▼</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.searchContainer}>
          <TextInput 
                  style={[
                    styles.searchInput,
                    { borderColor: isFocused ? 'transparent' : 'white' }
                  ]}
                  placeholder="Tìm kiếm lịch theo tên ứng viên, tin tuyển dụng..."
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />          
            </View>
          <TouchableOpacity style={styles.iconButton}>
            <Text>📅</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text>📜</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content - Cuộn được */}
      <ScrollView contentContainerStyle={[styles.mainContent, { minHeight: height }]}>
        <IconCalendar></IconCalendar>
        <Text style={styles.mainText}>Chưa có lịch phỏng vấn</Text>
        <Text style={styles.subText}>Đặt lịch để quản lý thời gian thi tuyển phỏng vấn của ứng viên</Text>
        <TouchableOpacity style={styles.scheduleButton}>
          <Text style={styles.scheduleButtonText}><AntDesign name="plus" size={18} color="#FFFFFF" />   Đặt lịch</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f7fa',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    backgroundColor: '#e9f1f8',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginRight: 10,
  },
  headerButtonText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  navButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginRight: 5,
  },
  navText: {
    color: '#333',
  },
  dateRangeText: {
    fontSize: 14,
    color: '#555',
    marginRight: 10,
  },
  dropdownButton: {
    padding: 8,
  },
  dropdownText: {
    color: '#555',
    fontWeight: 'bold',
  },
  searchContainer: {
    borderWidth: 1,
    borderColor: '#fff', // Hoặc màu viền mong muốn khi không focus
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    width: 350,
  },
  searchInput: {
    height: 40,
    width: '100%',
    // Bỏ outline
  },
  iconButton: {
    height: 40,
    width: 40,
        backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    marginLeft: 8,
  },
  mainContent: {
    flexGrow: 1, // Quan trọng để nội dung có thể cuộn
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    
    backgroundColor: '#FFFFFF'
  },
  illustrationImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
  scheduleButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  scheduleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScheduleScreen;