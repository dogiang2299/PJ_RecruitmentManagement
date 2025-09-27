import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; 
import { Checkbox } from 'react-native-paper';
import { Link, usePathname } from "expo-router";
const { width } = Dimensions.get('window');

// =======================================================
// 1. INTERFACES VÀ DỮ LIỆU MẪU
// =======================================================

interface UserObject {
    id: string;
    initials: string; // VD: BT
    fullName: string;
    mobilePhone: string;
    personalEmail: string;
    accountEmail: string;
    laborStatus: 'Đang hoạt động' | 'Tạm dừng';
}

interface UserTableProps {
    data: UserObject[];
    onAction: (action: string) => void;
}

const SAMPLE_DATA: UserObject[] = [
    { id: '1', initials: 'BT', fullName: 'Đỗ Tiểu Tuấn Thị', mobilePhone: '0862183019', personalEmail: 'dogiang2902@gmail.com', accountEmail: 'dogiang2902@gmail.com', laborStatus: 'Đang hoạt động' },
    { id: '2', initials: 'NV', fullName: 'Nguyễn Văn A', mobilePhone: '0901234567', personalEmail: 'vana@company.com', accountEmail: 'nvana@company.com', laborStatus: 'Đang hoạt động' },
    { id: '3', initials: 'LV', fullName: 'Lê Thị B', mobilePhone: '0987654321', personalEmail: 'thib@company.com', accountEmail: 'lthib@company.com', laborStatus: 'Tạm dừng' },
    // Thêm dòng thứ 4 để kiểm tra cuộn dọc
    { id: '4', initials: 'PV', fullName: 'Phạm Văn C', mobilePhone: '0912345678', personalEmail: 'vanc@company.com', accountEmail: 'pvanc@company.com', laborStatus: 'Đang hoạt động' },
];

// Định nghĩa chiều rộng cho từng cột
const COLUMN_WIDTHS = [
    { label: 'Họ và tên', flex: 3, minWidth: 200 },
    { label: 'Điện thoại di động', flex: 2, minWidth: 150 },
    { label: 'Email cá nhân', flex: 3, minWidth: 200 },
    { label: 'Email tài khoản', flex: 3, minWidth: 200 },
    { label: 'Trạng thái lao động', flex: 2, minWidth: 150 },
];
const TOTAL_MIN_WIDTH = COLUMN_WIDTHS.reduce((sum, col) => sum + col.minWidth, 0) + 70; // + 70 cho cột checkbox/thao tác

// Màu sắc
const COLORS = {
    primary: '#1E90FF', // Xanh dương
    white: '#FFFFFF',
    text: '#333333',
    label: '#666666',
    background: '#F0F2F5', // Nền
    border: '#DDDDDD',
    greenStatus: '#E6F7D8', // Nền xanh nhạt cho trạng thái Đang hoạt động
    greenText: '#52C41A',
    orangeStatus: '#FFF7E6', // Nền cam nhạt cho Tạm dừng
    orangeText: '#FAAD14',
    initialsBg: '#FFA500', // Màu nền chữ cái viết tắt (ví dụ)
};

// =======================================================
// 2. COMPONENT CHÍNH
// =======================================================

const UserObjectTable: React.FC<UserTableProps> = ({ 
    data = SAMPLE_DATA, // 🔥 Cung cấp giá trị mặc định để tránh lỗi map
    onAction 
}) => {

    const [activeTab, setActiveTab] = useState<'Người dùng' | 'Nhân viên'>('Người dùng');
   
    // Component render cho từng ô trạng thái
    const StatusCell: React.FC<{ status: UserObject['laborStatus'] }> = ({ status }) => (
        <View style={[
            styles.statusBadge, 
            status === 'Đang hoạt động' 
                ? { backgroundColor: COLORS.greenStatus } 
                : { backgroundColor: COLORS.orangeStatus }
        ]}>
            <Text style={[
                styles.statusText,
                status === 'Đang hoạt động' 
                    ? { color: COLORS.greenText } 
                    : { color: COLORS.orangeText }
            ]}>
                {status}
            </Text>
        </View>
    );
      const [checked, setChecked] = React.useState(false);

    // Render từng hàng dữ liệu
    const renderRow = (item: UserObject) => (
        <View key={item.id} style={styles.tableRow}>
            {/* Cột Checkbox */}
            <View style={styles.checkboxCell}>
                 <Checkbox
                              status={checked ? 'checked' : 'unchecked'}
                              onPress={() => setChecked(!checked)}
                            /> 
            </View>

            {/* Họ và tên (Có Initial) */}
           <View
                style={[
                    styles.dataCell,
                    {
                    flex: COLUMN_WIDTHS[0].flex,
                    minWidth: COLUMN_WIDTHS[0].minWidth,
                    flexDirection: 'row',
                    alignItems: 'flex-start', // 👈 bắt text và icon dính trên cùng cell
                    },
                ]}
                >
                <View style={[styles.initialsCircle, { marginRight: 8 }]}>
                    <Text style={styles.initialsText}>{item.initials}</Text>
                </View>

                <Text
                    style={[
                    styles.cellText,
                    {
                        textAlignVertical: 'top',
                        includeFontPadding: false,
                    },
                    ]}
                >
                    {item.fullName}
                </Text>
                </View>

            
            {/* Các cột còn lại */}
            <View style={[styles.dataCell, { flex: COLUMN_WIDTHS[1].flex, minWidth: COLUMN_WIDTHS[1].minWidth }]}>
                <Text style={styles.cellText}>{item.mobilePhone}</Text>
            </View>
            <View style={[styles.dataCell, { flex: COLUMN_WIDTHS[2].flex, minWidth: COLUMN_WIDTHS[2].minWidth }]}>
                <Text style={styles.cellText}>{item.personalEmail}</Text>
            </View>
            <View style={[styles.dataCell, { flex: COLUMN_WIDTHS[3].flex, minWidth: COLUMN_WIDTHS[3].minWidth }]}>
                <Text style={styles.cellText}>{item.accountEmail}</Text>
            </View>
            
            {/* Trạng thái lao động */}
            <View style={[styles.dataCell, { flex: COLUMN_WIDTHS[4].flex, minWidth: COLUMN_WIDTHS[4].minWidth }]}>
                <StatusCell status={item.laborStatus} />
            </View>

            {/* Cột hành động (Mặc định ẩn) */}
            <View style={styles.actionIconCell}>
                <Text style={{color: COLORS.label}}>...</Text>
            </View>
        </View>
    );

    // Render Header Row
    const renderHeaderRow = (
        <View style={[styles.tableRow, styles.tableHeader]}>
            {/* Cột Checkbox Header */}
            <View style={styles.checkboxCell}>
                <View style={styles.checkbox}></View>
            </View>
            
            {/* Các cột dữ liệu */}
            {COLUMN_WIDTHS.map((col, index) => (
                <View key={index} style={[styles.headerCell, { flex: col.flex, minWidth: col.minWidth }]}>
                    <Text style={styles.headerText}>{col.label}</Text>
                </View>
            ))}

            {/* Cột hành động Header */}
             <View style={styles.actionIconCell}>
                <Text style={{color: COLORS.label}}>!</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header Cố Định (Tiêu đề và Nút) */}
            <View style={styles.fixedHeader}>
                <View style={styles.headerRow}>
                    <Text style={styles.title}>Đối tượng</Text>
                    
                    <View style={styles.actionButtons}>
                         {/* Nút thêm mới */}
                        <TouchableOpacity style={styles.addIcon} onPress={() => onAction('add')}>
                            <Ionicons name="add-outline" size={24} color={COLORS.label} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButtonPrimary} onPress={() => onAction('add')}>
                            <Ionicons name="add-outline" size={20} color={COLORS.white} />
                            <Text style={styles.buttonTextPrimary}>Thêm đối tượng</Text>
                            <Ionicons name="chevron-down-outline" size={16} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                </View>
                
                
            </View>
            {/* Nội dung chính */}
            <View style={{backgroundColor: COLORS.white, flex: 1, padding: 20, borderRadius: 8, overflow: 'hidden'}}>
            {/* Tab và Thanh hành động */}
                <View style={styles.tabBar}>
                    {/* Tabs */}
                    <View style={styles.tabGroup}>
                        {['Người dùng', 'Nhân viên'].map(tab => (
                            <TouchableOpacity 
                                key={tab} 
                                style={[styles.tabButton, activeTab === tab && styles.activeTab]}
                                onPress={() => setActiveTab(tab as any)}
                            >
                                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Thanh Tìm kiếm và Bộ lọc */}
                    <View style={styles.filterBar}>
                        <View style={styles.searchBox}>
                            <Ionicons name="search-outline" size={18} color={COLORS.label} />
                            <TextInput 
                                style={styles.searchText} 
                                placeholder="Tìm kiếm theo tên, email, số điện thoại..."
                                placeholderTextColor={COLORS.label}
                            />
                        </View>
                        
                        <View style={styles.filterGroup}>
                            <Text style={styles.filterText}>Trạng thái: **Tất cả**</Text>
                            <Ionicons name="chevron-down-outline" size={14} color={COLORS.label} style={{ marginRight: 15 }} />
                            <TouchableOpacity style={styles.settingsButton}>
                                <Ionicons name="settings-outline" size={20} color={COLORS.label} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* Vùng Bảng dữ liệu (Cuộn ngang và dọc) */}
            <ScrollView style={styles.tableVerticalScroll}>
                <ScrollView horizontal={true}>
                    <View style={{ width: Math.max(width, TOTAL_MIN_WIDTH) }}>
                        
                        {/* Header của bảng */}
                        {renderHeaderRow}

                        {/* Body của bảng */}
                        {data.map(renderRow)}
                    </View>
                </ScrollView>
            </ScrollView>

            {/* Footer Phân trang */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Tổng số bản ghi: **{data.length}**</Text>
                
                <View style={styles.paginationGroup}>
                    <Text style={styles.footerText}>**20 bản ghi trên trang**</Text>
                    <Ionicons name="chevron-down-outline" size={14} color={COLORS.label} style={{ marginLeft: 8, marginRight: 20 }} />
                    <Text style={styles.footerText}>**1 đến 1**</Text>
                    <Ionicons name="chevron-back-outline" size={16} color={COLORS.label} style={styles.paginationArrow} />
                    <Ionicons name="chevron-forward-outline" size={16} color={COLORS.label} style={styles.paginationArrow} />
                </View>
            </View>
            </View>
            
        </View>
    );
};

// =======================================================
// 3. STYLESHEET
// =======================================================

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#E8E8E8',
        paddingTop: 0,
        padding:15
        },
    fixedHeader: {
        paddingHorizontal: 15,
        paddingTop: 15,
        // borderBottomWidth: 1,
        // borderBottomColor: COLORS.border,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    
    // --- Nút Hành động ---
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
     addIcon: {
        padding: 5,
        marginRight: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 4,
    },
    actionButtonPrimary: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
    },
    buttonTextPrimary: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 4,
        marginRight: 4,
    },

    // --- Tab Bar & Filter Bar ---
    tabBar: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.background,
        paddingBottom: 15,
    },
    tabGroup: {
        flexDirection: 'row',
    },
    tabButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginRight: 15,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: COLORS.primary,
    },
    tabText: {
        fontSize: 16,
        color: COLORS.label,
        fontWeight: '500',
    },
    activeTabText: {
        color: COLORS.primary,
    },
    filterBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    },
    searchBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 4,
        padding: 8,
        marginRight: 10,
        maxWidth: width * 0.45,
    },
    searchText: {
        marginLeft: 8,
        color: COLORS.text,
        fontSize: 14,
        flex: 1,
        paddingVertical: 0,
    },
    filterGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterText: {
        fontSize: 14,
        color: COLORS.label,
        marginRight: 5,
    },
    settingsButton: {
        padding: 5,
        marginLeft: 5,
    },

    // --- Bảng Dữ liệu ---
    tableVerticalScroll: {
        flex: 1,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.background,
        alignItems: 'stretch', // Đảm bảo các ô kéo dài bằng nhau
    },
    tableHeader: {
        backgroundColor: COLORS.background,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.border,
    },
    headerCell: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        justifyContent: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 13,
        color: COLORS.label,
    },
    dataCell: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        // justifyContent: 'center',
        alignItems: 'flex-start'
    },
    cellText: {
        fontSize: 14,
        color: COLORS.text,
    },
    checkboxCell: {
        width: 40, // Cố định chiều rộng cột Checkbox
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkbox: {
        width: 16,
        height: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 3,
    },
    actionIconCell: {
        width: 30, // Cố định chiều rộng cột Hành động
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    // --- Initials Circle ---
    initialsCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.initialsBg,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    initialsText: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: 'bold',
    },
    
    // --- Status Badge ---
    statusBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
    },

    // --- Footer ---
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: COLORS.background,
    },
    footerText: {
        fontSize: 13,
        color: COLORS.label,
        fontWeight: '600',
    },
    paginationGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paginationArrow: {
        marginLeft: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 3,
    }
});

export default UserObjectTable;