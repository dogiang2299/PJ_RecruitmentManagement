import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Modal, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// ---------------------------------------------------------------------------------------------------
// Định nghĩa Interfaces để sử dụng TypeScript
// ---------------------------------------------------------------------------------------------------
interface AddCandidateModalProps {
  isVisible: boolean;
  onClose: () => void;
}

interface WorkExperience {
  id: number;
  workplace: string;
  timeFrom: string;
  timeTo: string;
  position: string;
  description: string;
}

interface Education {
  id: number;
  level: string;
  place: string;
  major: string;
}

// ---------------------------------------------------------------------------------------------------
// Component AddCandidateModal chính
// ---------------------------------------------------------------------------------------------------
const AddCandidateModal = ({ isVisible, onClose }: AddCandidateModalProps) => {
  const [education, setEducation] = useState<Education[]>([
    { id: 1, level: '', place: '', major: '' }
  ]);
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([
    { id: 1, workplace: '', timeFrom: '', timeTo: '', position: '', description: '' }
  ]);
  const [form, setForm] = useState({
    fullName: '',
    dob: '',
    gender: '',
    area: '',
    phone: '',
    email: '',
    address: '',
    applyDate: new Date().toISOString().split('T')[0],
    source: '',
    exploiter: '',
    collaborator: ''
  });

  const handleAddEducation = () => {
    const newId = education.length > 0 ? Math.max(...education.map(edu => edu.id)) + 1 : 1;
    setEducation([...education, { id: newId, level: '', place: '', major: '' }]);
  };

  const handleRemoveEducation = (id: number) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const handleAddExperience = () => {
    const newId = workExperiences.length > 0 ? Math.max(...workExperiences.map(exp => exp.id)) + 1 : 1;
    setWorkExperiences([...workExperiences, { id: newId, workplace: '', timeFrom: '', timeTo: '', position: '', description: '' }]);
  };

  const handleRemoveExperience = (id: number) => {
    setWorkExperiences(workExperiences.filter(exp => exp.id !== id));
  };

  const renderEducation = (edu: Education, index: number) => (
    <View key={edu.id}>
      <View style={styles.eduInputGroup}>
        <View style={styles.eduLabelContainer}>
          <View style={styles.eduBullet} />
          <Text style={styles.label}>Trình độ đào tạo</Text>
        </View>
        <View style={styles.inputWithIcon}>
          <TextInput style={styles.input} placeholder="Nhập trình độ đào tạo" />
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>▼</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.eduInputGroup}>
        <View style={styles.eduLabelContainer}>
          <View style={styles.eduBullet} />
          <Text style={styles.label}>Nơi đào tạo</Text>
        </View>
        <View style={styles.inputWithIcon}>
          <TextInput style={styles.input} placeholder="Nhập nơi đào tạo" />
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>▼</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.eduInputGroup}>
        <View style={styles.eduLabelContainer}>
          <View style={styles.eduBullet} />
          <Text style={styles.label}>Chuyên ngành</Text>
        </View>
        <View style={styles.inputWithIcon}>
          <TextInput style={styles.input} placeholder="Nhập chuyên ngành" />
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>▼</Text>
          </TouchableOpacity>
        </View>
      </View>
      {index > 0 && (
        <TouchableOpacity onPress={() => handleRemoveEducation(edu.id)} style={styles.removeEducationButton}>
          <Text style={styles.removeText}>-</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderWorkExperience = (exp: WorkExperience) => (
    <View key={exp.id} style={styles.sectionItem}>
      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nơi làm việc</Text>
          <TextInput style={styles.input} placeholder="Nhập nơi làm việc" />
        </View>
        <TouchableOpacity onPress={() => handleRemoveExperience(exp.id)} style={styles.removeExperienceButton}>
          <Text style={styles.removeExperienceText}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Thời gian</Text>
          <View style={styles.timeInputContainer}>
            <TextInput style={styles.timeInput} placeholder="MM/yyyy" />
            <Text style={styles.timeSeparator}>-</Text>
            <TextInput style={styles.timeInput} placeholder="MM/yyyy" />
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Vị trí công việc</Text>
          <TextInput style={styles.input} placeholder="Nhập vị trí công việc" />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mô tả công việc</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Nhập mô tả công việc"
            multiline
          />
        </View>
      </View>
    </View>
  );

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Thêm ứng viên</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.formScrollView}>
            {/* Upload CV */}
            <View style={styles.uploadSection}>
              <Text style={styles.uploadText}>Kéo thả hoặc <Text style={styles.linkText}>bấm vào đây để tải CV lên</Text></Text>
              <Text style={styles.uploadNote}>Chấp nhận file .doc, .docx, .pdf, .jpg, .jpeg, .png (Dung lượng 15 Mb)</Text>
            </View>
            {/* Thông tin cơ bản */}
            <View style={styles.section}>
              <View style={styles.avatarSection}>
                <View style={styles.avatarPlaceholder}><Text>Ảnh</Text></View>
                <View style={styles.inputGroupFullWidth}>
                  <Text style={styles.label}>Họ và tên <Text style={styles.required}>*</Text></Text>
                  <TextInput style={styles.input} placeholder="Nhập họ và tên" />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Ngày sinh</Text>
                  <TextInput style={styles.input} placeholder="dd/MM/yyyy" />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Giới tính</Text>
                  <TextInput style={styles.input} placeholder="Chọn giới tính" />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Số điện thoại</Text>
                  <TextInput style={styles.input} placeholder="Nhập số điện thoại" keyboardType="phone-pad" />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput style={styles.input} placeholder="Nhập Email" keyboardType="email-address" />
                </View>
              </View>
              <View style={styles.section}>
                <Text style={styles.label}>Vị trí công việc <Text style={styles.required}>*</Text></Text>
                <TextInput style={styles.input} placeholder="Nhập vị trí công việc" />
              </View>
              <View style={styles.section}>
                <Text style={styles.label}>Tên công ty <Text style={styles.required}>*</Text></Text>
                <TextInput style={styles.input} placeholder="Nhập tên công ty" />
              </View>
            </View>

            {/* Học vấn */}
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>HỌC VẤN</Text>
              {education.map((edu, index) => (
                <View key={edu.id}>
                  <View style={styles.eduInputGroup}>
                    <View style={styles.eduLabelContainer}>
                      <View style={styles.eduBullet} />
                      <Text style={styles.label}>Trình độ đào tạo</Text>
                    </View>
                    <View style={styles.inputWithIcon}>
                      <TextInput style={styles.input} placeholder="Nhập trình độ đào tạo" />
                      <TouchableOpacity style={styles.iconButton}>
                        <Text style={styles.iconText}>+</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.iconButton}>
                        <Text style={styles.iconText}>▼</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.eduInputGroup}>
                    <View style={styles.eduLabelContainer}>
                      <View style={styles.eduBullet} />
                      <Text style={styles.label}>Nơi đào tạo</Text>
                    </View>
                    <View style={styles.inputWithIcon}>
                      <TextInput style={styles.input} placeholder="Nhập nơi đào tạo" />
                      <TouchableOpacity style={styles.iconButton}>
                        <Text style={styles.iconText}>+</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.iconButton}>
                        <Text style={styles.iconText}>▼</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.eduInputGroup}>
                    <View style={styles.eduLabelContainer}>
                      <View style={styles.eduBullet} />
                      <Text style={styles.label}>Chuyên ngành</Text>
                    </View>
                    <View style={styles.inputWithIcon}>
                      <TextInput style={styles.input} placeholder="Nhập chuyên ngành" />
                      <TouchableOpacity style={styles.iconButton}>
                        <Text style={styles.iconText}>+</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.iconButton}>
                        <Text style={styles.iconText}>▼</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {education.length > 1 && (
                    <TouchableOpacity onPress={() => handleRemoveEducation(edu.id)} style={styles.removeEducationButton}>
                      <Text style={styles.removeText}>-</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
              <TouchableOpacity onPress={handleAddEducation} style={styles.addSectionButton}>
                <Text style={styles.addSectionButtonText}>+ Thêm học vấn</Text>
              </TouchableOpacity>
            </View>

            {/* Các thông tin khác */}
            <View style={styles.section}>
              <View style={styles.row}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Ngày ứng tuyển <Text style={styles.required}>*</Text></Text>
                  <TextInput style={styles.input} value={form.applyDate} />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Nguồn ứng viên</Text>
                  <TextInput style={styles.input} placeholder="Chọn nguồn ứng viên" />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Nhân sự khai thác</Text>
                  <TextInput style={styles.input} placeholder="Đỗ Tiểu Tuấn Thị" />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Cộng tác viên</Text>
                  <TextInput style={styles.input} placeholder="Chọn cộng tác viên" />
                </View>
              </View>
              <View style={styles.checkboxContainer}>
                <TouchableOpacity style={styles.checkbox}>
                  <Text>✓</Text>
                </TouchableOpacity>
                <Text style={styles.checkboxText}>Thêm nhanh người tham chiếu vào kho ứng viên</Text>
              </View>
              <TouchableOpacity style={styles.addSectionButton}>
                <Text style={styles.addSectionButtonText}>+ Thêm người giới thiệu</Text>
              </TouchableOpacity>
              <View style={styles.section}>
                <Text style={styles.label}>Nơi làm việc gần đây</Text>
                <TextInput style={styles.input} placeholder="Nhập nơi làm việc gần đây" />
              </View>
            </View>

            {/* Kinh nghiệm làm việc */}
            <View style={styles.section}>
              <TouchableOpacity onPress={handleAddExperience} style={styles.addSectionButton}>
                <Text style={styles.addSectionButtonText}>+ Thêm kinh nghiệm làm việc</Text>
              </TouchableOpacity>
              {workExperiences.map(renderWorkExperience)}
            </View>
          </ScrollView>

          {/* Footer Buttons */}
          <View style={styles.modalFooter}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// ---------------------------------------------------------------------------------------------------
// StyleSheet cho Component
// ---------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '60%',
    height: '95%',
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 24,
    color: '#888',
  },
  formScrollView: {
    padding: 20,
  },
  uploadSection: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadText: {
    color: '#888',
    marginBottom: 5,
  },
  linkText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  uploadNote: {
    fontSize: 12,
    color: '#999',
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  inputGroupFullWidth: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    outline: 'none',
    outlineWidth: 0,
    padding: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10,
  },
  inputGroup: {
    flex: 1,
  },
  eduInputGroup: {
    marginBottom: 15,
  },
  eduLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  eduBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#000',
    marginRight: 8,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  iconButton: {
    padding: 10,
  },
  iconText: {
    fontSize: 18,
    color: '#007bff',
  },
  addSectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  addSectionButtonText: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  removeExperienceButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e6e6e6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 5,
    right: 5,
  },
  removeExperienceText: {
    color: '#888',
    fontSize: 20,
  },
  removeEducationButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e6e6e6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  removeText: {
    color: '#888',
    fontSize: 18,
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  timeInput: {
    flex: 1,
    padding: 10,
  },
  timeSeparator: {
    paddingHorizontal: 5,
    fontSize: 16,
    color: '#555',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxText: {
    fontSize: 14,
    color: '#555',
  },
  modalFooter: {
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
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cancelButtonText: {
    color: '#555',
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddCandidateModal;