import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Switch, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; 
import FontAwesome from '@expo/vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

// =======================================================
// 1. INTERFACES VÀ MÀU SẮC
// =======================================================

interface ListHeaderProps {
    title: string;
    description: string;
    showSwitch?: boolean; // Hiển thị Switch "Tự động đồng bộ"
    switchLabel?: string;
    onRefresh?: () => void; // Lấy lại dữ liệu
    onExport?: () => void; // Xuất khẩu
    onAddNew?: () => void; // Thêm mới
    hasDropdown?: boolean; // Nút Thêm mới có mũi tên dropdown không
    // Các phần tử tùy chỉnh cho thanh hành động (ví dụ: Thanh tìm kiếm, Bộ lọc)
    customActions?: React.ReactNode; 
}

const COLORS = {
    primary: '#1E90FF', // Xanh dương
    white: '#FFFFFF',
    text: '#333333',
    label: '#666666',
    background: '#F0F2F5', 
    border: '#DDDDDD',
    lightGray: '#F9F9F9',
};

// =======================================================
// 2. COMPONENT CHÍNH
// =======================================================

const ListHeaderActions: React.FC<ListHeaderProps> = ({ 
    title, 
    description, 
    showSwitch = false,
    switchLabel = 'Tự động đồng bộ từ Hệ thống',
    onRefresh, 
    onExport, 
    onAddNew, 
    hasDropdown = false,
    customActions 
}) => {
    const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);

    // --- Component Nút đơn giản ---
    const ActionButton: React.FC<{ 
        iconName: string; 
        label: string; 
        onPress: () => void;
        isPrimary?: boolean;
    }> = ({ iconName, label, onPress, isPrimary = false }) => (
        <TouchableOpacity 
            style={[
                styles.button,
                isPrimary ? styles.buttonPrimary : styles.buttonSecondary,
                isPrimary && hasDropdown && { paddingRight: 0 } // Bỏ padding cho nút chính nếu có dropdown
            ]} 
            onPress={onPress}
        >
            <Ionicons 
                name={iconName as any} 
                size={16} 
                color={isPrimary ? COLORS.white : COLORS.text} 
                style={isPrimary ? { marginRight: 4 } : {}}
            />
            <Text style={isPrimary ? styles.buttonTextPrimary : styles.buttonTextSecondary}>{label}</Text>
        </TouchableOpacity>
    );

    // --- Component Nút Thêm Mới có Dropdown ---
    const AddNewButton: React.FC = () => {
        if (!onAddNew) return null;
        
        if (hasDropdown) {
            return (
                <View style={styles.buttonGroup}>
                    {/* Phần Nút chính */}
                    <TouchableOpacity style={[styles.buttonPrimary, styles.buttonGroupLeft]} onPress={onAddNew}>
                        <Ionicons name="add-outline" size={20} color={COLORS.white} style={{ marginRight: 4 }}/>
                        <Text style={styles.buttonTextPrimary}>Thêm mới</Text>
                    </TouchableOpacity>
                    {/* Phần Dropdown */}
                    <TouchableOpacity style={[styles.buttonPrimary, styles.buttonGroupRight]} onPress={() => onAddNew()}> 
                        <Ionicons name="chevron-down-outline" size={16} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <ActionButton 
                iconName="add-outline" 
                label="Thêm mới" 
                onPress={onAddNew} 
                isPrimary={true}
            />
        );
    };

    return (
        <View style={styles.container}>
            {/* Hàng 1: Tiêu đề và Switch */}
            <View style={styles.row}>
                <Text style={styles.title}>{title}</Text>
                
                {showSwitch && (
                    <View style={styles.switchContainer}>
                        <Switch
                            trackColor={{ false: COLORS.border, true: COLORS.primary }}
                            thumbColor={COLORS.white}
                            onValueChange={() => setIsSwitchEnabled(previousState => !previousState)}
                            value={isSwitchEnabled}
                        />
                        <Text style={styles.switchLabel}>{switchLabel}</Text>
                    </View>
                )}
            </View>

            {/* Hàng 2: Mô tả và Các nút hành động */}
            <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'flex-end' }]}>
                {/* Mô tả */}
                <Text style={styles.description}>{description}</Text>

                {/* Các nút Hành động */}
                <View style={styles.actionButtons}>
                    {/* 1. Lấy lại dữ liệu */}
                    {onRefresh && (
                        <ActionButton 
                            iconName="refresh-outline" 
                            label="Lấy lại dữ liệu" 
                            onPress={onRefresh} 
                        />
                    )}
                    
                    {/* 2. Xuất khẩu */}
                    {onExport && (
                        <ActionButton 
                            iconName="download-outline" 
                            label="Xuất khẩu" 
                            onPress={onExport} 
                        />
                    )}

                    {/* 3. Thêm mới (có/không dropdown) */}
                    <AddNewButton />
                </View>
            </View>

            {/* Hàng 3: Các hành động tùy chỉnh (Tìm kiếm, Bộ lọc cho Cơ cấu tổ chức) */}
            {customActions && (
                <View style={styles.customActionsContainer}>
                    {customActions}
                </View>
            )}

        </View>
    );
};

// =======================================================
// 3. STYLESHEET
// =======================================================

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.background,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
        marginRight: 15, // Khoảng cách với switch
    },
    description: {
        fontSize: 14,
        color: COLORS.label,
        flex: 1, // Chiếm hết phần không gian còn lại
    },

    // --- Switch ---
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    switchLabel: {
        fontSize: 14,
        color: COLORS.text,
        marginLeft: 8,
    },

    // --- Buttons ---
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 4,
        marginLeft: 8,
    },
    buttonSecondary: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    buttonPrimary: {
        backgroundColor: COLORS.primary,
    },
    buttonTextSecondary: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 4,
    },
    buttonTextPrimary: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: '600',
    },
    
    // --- Button Group (Thêm mới + Dropdown) ---
    buttonGroup: {
        flexDirection: 'row',
        marginLeft: 8,
        borderRadius: 4,
        overflow: 'hidden', // Quan trọng để bo góc
    },
    buttonGroupLeft: {
        paddingRight: 8,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    buttonGroupRight: {
        paddingHorizontal: 8,
        borderLeftWidth: 1,
        borderLeftColor: 'rgba(255, 255, 255, 0.3)', // Đường kẻ phân cách
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },

    // --- Custom Actions (Dành cho Tìm kiếm/Bộ lọc) ---
    customActionsContainer: {
        marginTop: 15,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 4,
        padding: 8,
        flex: 1,
    },
    searchText: {
        marginLeft: 8,
        color: COLORS.label,
        fontSize: 14,
    }
});

export default ListHeaderActions;