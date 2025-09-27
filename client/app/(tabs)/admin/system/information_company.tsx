import React from "react";
import { TouchableOpacity, Text, View, ScrollView, Dimensions, StyleSheet } from "react-native";
import { Appbar } from 'react-native-paper';
// Import các thư viện khác nếu bạn đã cài đặt chúng (giữ nguyên từ code của bạn)
// import { useRouter, usePathname, Slot } from "expo-router";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { ImageBackground } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get('window');

// =======================================================
// 1. INTERFACES VÀ DỮ LIỆU
// =======================================================

interface CompanyInfo {
  // Phần CÔNG TY
  fullName: string;
  shortName: string;
  businessType: string;
  taxCode: string;
  companyCode: string;
  establishmentDate: string;
  logoStatus: string; 

  // Phần ĐĂNG KÝ KINH DOANH
  dkkdCode: string; // Mã số ĐKKD
  issueDate: string; // Ngày cấp
  issuePlace: string; // Nơi cấp
  legalRepresentative: string; // Người đại diện pháp luật
  position: string; // Chức danh

  // Phần LIÊN HỆ
  address: string;
  phone: string;
  fax: string;
  email: string;
  website: string;
}

interface CompanyProfileProps {
  companyData?: CompanyInfo; // Props là optional vì ta có giá trị mặc định
  onEdit: () => void;
}

// DỮ LIỆU MẪU ĐẦY ĐỦ (Dùng làm giá trị mặc định)
const FULL_SAMPLE_COMPANY_DATA: CompanyInfo = {
  // CÔNG TY
  fullName: 'Tiểu Tuấn Thị Đỗ',
  shortName: 'Tiểu Tuấn Thị Đỗ',
  businessType: 'Doanh nghiệp',
  taxCode: '1122122111',
  companyCode: 'I993zurm',
  establishmentDate: '-',
  logoStatus: 'Chưa có ảnh',
  // ĐĂNG KÝ KINH DOANH
  dkkdCode: '-',
  issueDate: '-',
  issuePlace: '-',
  legalRepresentative: 'Đỗ Tiểu Tuấn Thị',
  position: '-',
  // LIÊN HỆ
  address: '-',
  phone: '0862183019',
  fax: '-',
  email: 'dogiang2902@gmail.com',
  website: '-',
};

// =======================================================
// 2. MÀU SẮC
// =======================================================

const COLORS = {
  primary: '#1E90FF', // Màu xanh dương cho nút
  white: '#FFFFFF',    
  text: '#333333',
  label: '#666666',
  background: '#F0F2F5', // Màu nền phân cách mờ
  border: '#DDDDDD',
  lightGray: '#F9F9F9', // Màu dải phân cách section
};

// =======================================================
// 3. COMPONENT CON: SimpleInfoRow
// =======================================================

interface SimpleInfoRowProps {
  label: string;
  value: string;
}

const SimpleInfoRow: React.FC<SimpleInfoRowProps> = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

// =======================================================
// 4. COMPONENT CHÍNH: CompanyProfileFull
// =======================================================

const CompanyProfileFull: React.FC<CompanyProfileProps> = ({ 
    // 🔥 SỬA LỖI: Cung cấp giá trị mặc định cho companyData
    companyData = FULL_SAMPLE_COMPANY_DATA, 
    onEdit 
}) => {
    
    // Định nghĩa LogoDisplay (JSX Element)
    const LogoDisplay = (
        <View style={styles.logoContainer}>
            <Text style={styles.logoStatus}>{companyData.logoStatus}</Text> 
        </View>
    );

    return (
        // View lớn nhất bao ngoài màn hình
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            {/* Navbar trên cùng (dùng cho thiết kế toàn màn hình) */}
           
            <View style={styles.navbar}>
                <Text style={styles.navbarTitle}>Thông tin công ty</Text>
            </View>
            
            <ScrollView style={styles.scrollView}>
                {/* Header (Phần mô tả và nút Chỉnh sửa) */}
                <View style={styles.headerContainer}> 
                    <View style={styles.header}>
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.description}>
                                Khai báo và cập nhật thông tin của công ty để hệ thống tự động lấy lên các báo cáo, tài liệu,...
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
                            <Text style={styles.editButtonText}>Chỉnh sửa</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Nội dung chính */}
                <View style={styles.body}>

                    {/* === PHẦN 1: CÔNG TY === */}
                    <Text style={styles.sectionTitle}>CÔNG TY</Text>
                    <View style={styles.infoBlock}>
                        <SimpleInfoRow label="Tên đầy đủ" value={companyData.fullName} />
                        <SimpleInfoRow label="Tên giao dịch/viết tắt" value={companyData.shortName} />
                        <SimpleInfoRow label="Loại hình kinh doanh" value={companyData.businessType} />
                        <SimpleInfoRow label="Mã số thuế" value={companyData.taxCode} />
                        <SimpleInfoRow label="Mã công ty" value={companyData.companyCode} />
                        <SimpleInfoRow label="Ngày thành lập" value={companyData.establishmentDate} />
                        
                        {/* Xử lý Logo (Component JSX) */}
                        <View style={styles.row}>
                            <Text style={styles.label}>Logo công ty</Text>
                            {LogoDisplay} 
                        </View>
                    </View>

                    {/* Dải phân cách */}
                    <View style={styles.divider} />

                    {/* === PHẦN 2: ĐĂNG KÝ KINH DOANH === */}
                    <Text style={styles.sectionTitle}>ĐĂNG KÝ KINH DOANH</Text>
                    <View style={styles.infoBlock}>
                        <SimpleInfoRow label="Mã số ĐKKD" value={companyData.dkkdCode} />
                        <SimpleInfoRow label="Ngày cấp" value={companyData.issueDate} />
                        <SimpleInfoRow label="Nơi cấp" value={companyData.issuePlace} />
                        <SimpleInfoRow label="Người đại diện pháp luật" value={companyData.legalRepresentative} />
                        <SimpleInfoRow label="Chức danh" value={companyData.position} />
                    </View>

                    <View style={styles.divider} />

                    {/* === PHẦN 3: LIÊN HỆ === */}
                    <Text style={styles.sectionTitle}>LIÊN HỆ</Text>
                    <View style={styles.infoBlock}>
                        <SimpleInfoRow label="Địa chỉ" value={companyData.address} />
                        <SimpleInfoRow label="Điện thoại" value={companyData.phone} />
                        <SimpleInfoRow label="Fax" value={companyData.fax} />
                        <SimpleInfoRow label="Email" value={companyData.email} />
                        <SimpleInfoRow label="Website" value={companyData.website} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};


// =======================================================
// 5. STYLESHEET
// =======================================================

const styles = StyleSheet.create({
    // Style cho thanh Navbar mới thêm
    navbar: {
        backgroundColor: '#E2E2E2',
        padding: 20
    },
    navbarTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    headerContainer: {
        paddingHorizontal: 15, 
        paddingTop: 15,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.background,
    },
    headerTextContainer: {
        flex: 1,
        paddingRight: 10,
    },
    description: {
        fontSize: 13,
        color: COLORS.label,
        lineHeight: 18,
    },
    editButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 4,
        minWidth: 100,
        alignSelf: 'flex-start',
        alignItems: 'center',
    },
    editButtonText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: '600',
    },
    scrollView: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.white,
    },
    body: {
        paddingHorizontal: 15,
        paddingBottom: 20, 
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.text,
        marginTop: 20,
        marginBottom: 15,
    },
    infoBlock: {
        // ...
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 10,
        // borderBottomWidth: 1,
        borderBottomColor: COLORS.background,
        alignItems: 'center',
    },
    label: {
        // Giữ cố định chiều rộng cho cột Label
        width: width * 0.35,
        fontSize: 14,
        color: COLORS.label,
    },
    value: {
        // Chiếm phần còn lại
        flex: 1,
        fontSize: 14,
        color: COLORS.text,
        fontWeight: '500',
    },
    divider: {
        height: 10,
        backgroundColor: COLORS.lightGray,
        marginHorizontal: -15, // Kéo dải phân cách ra sát lề
        marginTop: 10,
    },
    logoContainer: {
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 20,
        minHeight: 80,
        minWidth: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoStatus: {
        color: COLORS.label,
        fontSize: 12,
    }
});

export default CompanyProfileFull;