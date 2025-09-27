import React, { useState } from 'react';
import { Checkbox } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
interface CreateTaskModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isVisible, onClose }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [jobType, setJobType] = useState('Gửi email');
  const [executionResult, setExecutionResult] = useState('Chưa gửi');
  const [assignee, setAssignee] = useState('Đỗ Tiểu Tun Thị');
  const [dueDate, setDueDate] = useState('23/09/2025 - 15:09');
  const [relatedMembers, setRelatedMembers] = useState([]);
  const [remind, setRemind] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const [time, setTime] = React.useState("30");
  const [date, setDate] = useState(new Date());
      const [show, setShow] = useState(false);
      const [showTime, setShowTime] = useState(false);
    const onChange = (event: any, selectedDate?: Date) => {
      if (Platform.OS !== "web") {
        // chỉ mobile mới dùng picker
        setShow(Platform.OS === "ios");
        if (selectedDate) {
          setDate(selectedDate);
        }
      }
    };
  
  const handleSave = () => {
    // Logic để lưu công việc
    console.log('Task saved:', {
      taskName,
      description,
      jobType,
      executionResult,
      assignee,
      dueDate,
      relatedMembers,
      remind,
    });
    onClose();
  };
const [isFocused, setIsFocused] = useState(false);
const [isClosedTime, setIsClosedTime] = useState(false);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <SafeAreaView style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.title}>Tạo công việc</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>X</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tên công việc <Text style={styles.required}>*</Text></Text>
             <TextInput
        style={[
          styles.input,
          // Áp dụng style khi input được focus
          isFocused && styles.inputFocused
        ]}
        placeholder="Nhập tên công việc"
        value={taskName}
        placeholderTextColor={'#9e9e9e'}
        onChangeText={setTaskName}
        // Thêm dòng này để vô hiệu hóa gạch chân trên Android
        underlineColorAndroid="transparent"
        // Thêm onFocus và onBlur để quản lý state
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Mô tả</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Nhập mô tả"
                placeholderTextColor={'#9e9e9e'}
                multiline
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
              />
            </View>

            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>Loại công việc <Text style={styles.required}>*</Text></Text>
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
                    <Picker.Item label="Tùy chọn thời gian" value="custom" />
                  </Picker>
                </View>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Kết quả thực hiện</Text>
                {/* exect; setExecutionRul */}
                <View style={styles.pickerContainer_}>
                  <Picker
                    selectedValue={time}
                    onValueChange={(itemValue) => setTime(itemValue)}
                    style={styles.picker_}
                  >
                    <Picker.Item label="Chưa gửi" value="Doing" />
                    <Picker.Item label="Đã gửi" value="Done" />
                  </Picker>
                </View>
              </View>
            </View>
            
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>Người thực hiện <Text style={styles.required}>*</Text></Text>
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
                    <Picker.Item label="Tùy chọn thời gian" value="custom" />
                  </Picker>
                </View>              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Thời hạn hoàn thành</Text>
                {Platform.OS === "web" ? (
                <input
                    type="datetime-local"
                    value={date.toISOString().slice(0, 16)} // format YYYY-MM-DDTHH:mm
                    onChange={(e) => setDate(new Date(e.target.value))}
                    style={{
                      fontSize: 15,
                      color: "#1E2633",
                      fontWeight: "500",
                      padding: 8,
                      
                      borderRadius: 6,
                      border: "1px solid #ebebef",
                    }}
                  />

              ) : (
                <>
                  <TouchableOpacity onPress={() => setShow(true)}>
                    <Text>{date.toLocaleString()}</Text>
                  </TouchableOpacity>

                  {show && (
                    <>
                      <DateTimePicker
                        value={date}
                        mode="date"   // chọn ngày
                        display="default"
                        onChange={(event, selectedDate) => {
                          if (selectedDate) {
                            const newDate = new Date(date);
                            newDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
                            setDate(newDate);
                          }
                          setShow(false);
                          setShowTime(true); // mở tiếp time picker
                        }}
                      />
                    </>
                  )}

                  {showTime && (
                    <DateTimePicker
                      value={date}
                      mode="time"   // chọn giờ
                      display="default"
                      onChange={(event, selectedTime) => {
                        if (selectedTime) {
                          const newDate = new Date(date);
                          newDate.setHours(selectedTime.getHours());
                          newDate.setMinutes(selectedTime.getMinutes());
                          setDate(newDate);
                        }
                        setShowTime(false);
                      }}
                    />
                  )}

                </>
              )}              
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Ứng viên liên quan</Text>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
                <Text>Ứng viên liên quan</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row_}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => setChecked(!checked)}
            />
              <Text style={styles.label}>Nhắc nhở trước thời hạn hoàn thành</Text>
          </View>
          {checked && (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={time}
            onValueChange={(itemValue) => setTime(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Trước 15 phút" value="15" />
            <Picker.Item label="Trước 30 phút" value="30" />
            <Picker.Item label="Trước 1 tiếng" value="60" />
            <Picker.Item label="Trước 1 ngày" value="1440" />
            <Picker.Item label="Tùy chọn thời gian" value="custom" />
          </Picker>
        </View>
      )}
          </ScrollView>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={[styles.buttonText, { color: '#fff' }]}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '60%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
  },
  closeButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#aaa',
  },
  content: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontWeight: 500,
    fontSize: 14,
  },
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#EBEBEF',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  inputFocused: {
    // Style sẽ được áp dụng khi input được focus
    borderColor: 'blue', // Thay đổi màu viền khi focus
    borderWidth: 2, // Có thể làm viền dày hơn một chút
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    marginTop: 10,
    overflow: 'hidden',
  },
  picker: {
    width: '35%',
    height: 40,
    borderWidth: 1.5,
    borderColor: '#EBEBEF',
    borderRadius: 6,
  },
   pickerContainer_: {
    flex: 1,
    overflow: 'hidden',
  },
  picker_: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#EBEBEF',
    borderRadius: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  row_:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  addButtonText: {
    fontSize: 18,
    marginRight: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checked: {
    color: 'green',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: 400,
    fontSize: 15,
  },
});

export default CreateTaskModal;