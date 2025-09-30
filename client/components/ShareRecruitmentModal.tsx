import React, { useState } from 'react';
import { Checkbox } from "react-native-paper";
import * as Clipboard from 'expo-clipboard'; // Thư viện Clipboard của Expo
import { 
    Modal, 
    View, 
    Text, 
    Pressable, 
    StyleSheet, 
    Dimensions, 
    TextInput, 
    ScrollView,
    TouchableOpacity, 
    Alert,
    Platform, // Import Platform để xử lý lỗi ellipsizeMode (nếu cần)
    GestureResponderEvent // Import cho kiểu dữ liệu onPress
} from 'react-native';

import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');

// --- Khai báo Interface để Fix lỗi Implicit 'any' (ts(7031)) ---

interface RadioButtonProps {
    selected: boolean;
    onPress: (event: GestureResponderEvent) => void;
    label: string;
}

interface ShareModalProps {
    visible: boolean;
    onClose: (event: GestureResponderEvent) => void;
    shareLink: string;
}

// --- Component Radio Button tùy chỉnh (Fix ts(7031) cho 'selected') ---
const RadioButton: React.FC<RadioButtonProps> = ({ selected, onPress, label }) => (
    <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
        <View style={styles.radioCircle}>
            {selected && <View style={styles.selectedRadioCircle} />}
        </View>
        <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
);

// --- Component Modal Chia sẻ tin (Fix ts(7031) cho 'visible') ---

const ShareRecruitmentModal: React.FC<ShareModalProps> = ({ visible, onClose, shareLink }) => {
    const [selectedSource, setSelectedSource] = useState("VietnamWorks");
    const [isShortened, setIsShortened] = useState(false);
    const [shortenedLink, setShortenedLink] = useState('');
    const [selectedRecruiter, setSelectedRecruiter] = useState("Đỗ Tiểu Tun");
    const [selectedCollaborator, setSelectedCollaborator] = useState<string | null>(null);
    const [useCustomTemplate, setUseCustomTemplate] = useState(false);
    const [isLinkShortened, setIsLinkShortened] = useState(false);

    const handleCopy = async (textToCopy: string) => {
    if (Platform.OS === 'web') {
        // Đối với Web, dùng API Clipboard của trình duyệt
        await navigator.clipboard.writeText(textToCopy);
    } else {
        // Đối với Mobile, dùng expo-clipboard
        await Clipboard.setStringAsync(textToCopy);
    }
    
    // ✅ HIỂN THỊ THÔNG BÁO COPY THÀNH CÔNG (Toast/Snackbar)
    console.log("Đã sao chép:", textToCopy);
    // Ví dụ: Toast.show('Đã sao chép link!'); 
};  
    // Giả định hàm xử lý rút gọn link (bạn sẽ cần gọi API để lấy link rút gọn thật)
    const handleShortenLink = (fullLink: string) => {
        if (isShortened) {
            // Trả về link đầy đủ nếu người dùng bỏ chọn
            setShortenedLink('');
            setIsShortened(false);
        } else {
            // *** GỌI API RÚT GỌN LINK Ở ĐÂY ***
            // Giả lập kết quả rút gọn
            const simulatedShortLink = "https://mis.a/abcxyz123"; 
            setShortenedLink(simulatedShortLink);
            setIsShortened(true);
        }
    };
    // Chọn link đang được hiển thị
    const currentLink = isShortened && shortenedLink ? shortenedLink : shareLink; 

        const handleCopyQR = () => {
            Alert.alert("Thông báo", "Chức năng Lấy mã QR được kích hoạt.");
        };

    const socialMediaIcons = [
        { name: 'facebook', color: '#4267B2' },
        { name: 'google', color: '#DB4437' },
        { name: 'zalo', color: '#008CFF' }, 
        { name: 'skype', color: '#00AFF0' },
        { name: 'linkedin', color: '#0077B5' },
        { name: 'xing', color: '#006567' }, 
    ];
    
    // Khắc phục lỗi ellipsizeMode bằng cách dùng Platform (chỉ áp dụng nếu lỗi còn tồn tại)
const ellipsizeModeProp = (Platform.OS === 'web') 
    ? {} 
    : { ellipsizeMode: 'tail' as const };

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={[styles.modalContent, { width: width * 0.85, maxWidth: 850 }]}>
                    
                    {/* Header: Tiêu đề và nút đóng */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Chia sẻ tin</Text>
                        <Pressable onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color="#888" />
                        </Pressable>
                    </View>
                    
                    <View style={styles.divider} />
                    <ScrollView>
                    {/* Nội dung Modal */}
                    <View style={styles.body}>
                        <Text style={styles.description}>
                            Hệ thống sẽ sinh ra đường dẫn tương ứng với các tùy chọn của bạn để việc chia sẻ tin tuyển dụng lên các kênh khác nhau có hiệu quả hơn.
                        </Text>

                        {/* Dropdown Section */}
                        <View style={styles.dropdownSection}>
                            {/* Cột 1: Nguồn ứng viên */}
                            <View style={styles.dropdownColumn}>
                                <Text style={styles.label}>Nguồn ứng viên</Text>
                                <View style={styles.pickerWrapper}>
                                    {/* ... Picker cho Nguồn ứng viên ... */}
                                    <Picker
                                        selectedValue={selectedSource}
                                        onValueChange={(itemValue) => setSelectedSource(itemValue)}
                                        style={styles.picker}
                                        dropdownIconColor="#888"
                                    >
                                        <Picker.Item label="VietnamWorks" value="VietnamWorks" />
                                        <Picker.Item label="TopCV" value="TopCV" />
                                    </Picker>
                                    <Ionicons name="chevron-down" size={16} color="#888" style={styles.pickerIcon} />
                                </View>
                            </View>

                            {/* Cột 2: Nhân sự khai thác */}
                            <View style={styles.dropdownColumn}>
                                <Text style={styles.label}>Nhân sự khai thác</Text>
                                <View style={styles.pickerWrapper}>
                                    {/* ... Picker cho Nhân sự khai thác ... */}
                                    <Picker
                                        selectedValue={selectedRecruiter}
                                        onValueChange={(itemValue) => setSelectedRecruiter(itemValue)}
                                        style={styles.picker}
                                    >
                                        <Picker.Item label="Đỗ Tiểu Tun" value="Đỗ Tiểu Tun" />
                                        <Picker.Item label="Nguyễn Văn A" value="Nguyễn Văn A" />
                                    </Picker>
                                    <Ionicons name="chevron-down" size={16} color="#888" style={styles.pickerIcon} />
                                </View>
                            </View>
                            
                            {/* Cột 3: Cộng tác viên */}
                            <View style={styles.dropdownColumn}>
                                <Text style={styles.label}>Cộng tác viên</Text>
                                <View style={styles.pickerWrapper}>
                                    {/* ... Picker cho Cộng tác viên ... */}
                                    <Picker
                                        selectedValue={selectedCollaborator}
                                        onValueChange={(itemValue) => setSelectedCollaborator(itemValue)}
                                        style={styles.picker}
                                    >
                                        <Picker.Item label="Chọn cộng tác viên" value={null} />
                                        <Picker.Item label="Cộng tác viên X" value="CTX" />
                                    </Picker>
                                    <Ionicons name="chevron-down" size={16} color="#888" style={styles.pickerIcon} />
                                </View>
                            </View>
                        </View>
                        
                        {/* Biểu mẫu ứng tuyển Section */}
                        <Text style={styles.sectionTitle}>Biểu mẫu ứng tuyển</Text>
                        <RadioButton 
                            selected={!useCustomTemplate} 
                            onPress={() => setUseCustomTemplate(false)} 
                            label="Sử dụng mẫu ứng tuyển của tin" 
                        />
                        <RadioButton 
                            selected={useCustomTemplate} 
                            onPress={() => setUseCustomTemplate(true)} 
                            label="Chọn mẫu khác" 
                        />

                            <Text style={styles.sectionTitle}>Đường dẫn chia sẻ</Text>

                            {/* KHỐI HIỂN THỊ LINK VÀ NÚT COPY */}
                            <View style={styles.linkRow}> 
                                <TextInput
                                    style={styles.linkInput}
                                    value={currentLink} // ✅ Sử dụng link đang được chọn
                                    editable={false} // Không cho phép chỉnh sửa
                                />
                                
                                {/* NÚT COPY MỚI */}
                                <TouchableOpacity
                                    style={styles.copyButton}
                                    onPress={() => handleCopy(currentLink)} // ✅ Gọi hàm sao chép
                                >
                                    {/* Có thể dùng icon Copy của bạn hoặc text "Lấy mã QR" */}
                                    <Text style={styles.copyButtonText}>Copy</Text> 
                                    {/* Nếu bạn muốn thay thế nút "Lấy mã QR" (xem ảnh) */}
                                    {/* {isShortened ? <Text>Copy</Text> : <Text>Lấy mã QR</Text>} */}
                                    
                                </TouchableOpacity>
                            </View>

                            {/* Checkbox Rút gọn link */}
                            <Pressable style={styles.checkboxRow} onPress={() => handleShortenLink(shareLink)}>
                                <Checkbox status={isShortened ? "checked" : "unchecked"} />
                                <Text>Rút gọn link</Text>
                            </Pressable>                        
                        {/* Checkbox Rút gọn link */}
                        <TouchableOpacity style={styles.checkboxContainer} onPress={() => setIsLinkShortened(!isLinkShortened)}>
                            <MaterialCommunityIcons 
                                name={isLinkShortened ? "checkbox-marked" : "checkbox-blank-outline"}
                                size={24}
                                color={isLinkShortened ? "#3B82F6" : "#888"}
                            />
                            <Text style={styles.checkboxLabel}>Rút gọn link</Text>
                        </TouchableOpacity>

                        {/* Chia sẻ lên mạng xã hội Section */}
                        <Text style={styles.sectionTitle}>Chia sẻ lên mạng xã hội</Text>
                        <View style={styles.socialIconsContainer}>
                            {socialMediaIcons.map((icon, index) => (
                                <TouchableOpacity 
                                    key={index} 
                                    style={[styles.socialIconCircle, { backgroundColor: icon.color }]}
                                    onPress={() => Alert.alert("Chia sẻ", `Chia sẻ lên ${icon.name}`)}
                                >
                                    {/* ... Icons ... */}
                                    {icon.name === 'google' ? (
                                        <FontAwesome name="google-plus" size={18} color="white" />
                                    ) : icon.name === 'zalo' ? (
                                        <MaterialCommunityIcons name="comment-text-multiple" size={18} color="white" />
                                    ) : icon.name === 'xing' ? (
                                        <FontAwesome name="building" size={18} color="white" />
                                    ) : (
                                        <FontAwesome name={icon.name as any} size={18} color="white" />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>

                    </View>
                    </ScrollView>
                    
                    
                    {/* Footer: Nút Đóng */}
                    <View style={styles.footer}>
                        <Pressable onPress={onClose} style={styles.closeModalButton}>
                            <Text style={styles.closeModalButtonText}>Đóng</Text>
                        </Pressable>
                    </View>

                </View>
            </View>
        </Modal>
    );
};

// ... (Giữ nguyên phần Stylesheet) ...
const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "white",
        maxHeight: '85%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#333',
    },
    closeButton: {
        padding: 5,
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
    },
    body: {
        padding: 20,
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 20,
    },
    dropdownSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    dropdownColumn: {
        flex: 1,
        marginHorizontal: 5,
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
        fontWeight: '500',
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        overflow: 'hidden',
        height: 40,
        justifyContent: 'center',
    },
    linkRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1D5DB', 
        borderRadius: 8,
        overflow: 'hidden', // Quan trọng để nút copy nằm sát bên trong
        marginBottom: 10,
    },
    linkInput: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: '#F9FAFB', // Màu nền nhẹ cho ô input
        outline: 'none',
        fontSize: 14,
        color: '#1E2633',
    },
    copyButton: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#EBF4FF', // Màu nền nút Copy
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%', // Kéo dài hết chiều cao
        borderLeftWidth: 1,
        borderColor: '#D1D5DB',
    },
    copyButtonText: {
        color: '#2680EB',
        fontWeight: 'bold',
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    picker: {
        width: '100%',
        height: 40,
        opacity: 0, 
        position: 'absolute',
    },
    pickerIcon: {
        position: 'absolute',
        right: 10,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 5,
        marginBottom: 10,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    selectedRadioCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#3B82F6', 
    },
    radioLabel: {
        fontSize: 15,
        color: '#333',
    },
    linkWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        overflow: 'hidden',
    },
    
    qrButton: {
        padding: 10,
        backgroundColor: '#fff', 
        borderLeftWidth: 1,
        borderLeftColor: '#ddd',
    },
    qrButtonText: {
        color: '#3B82F6', 
        fontSize: 14,
        fontWeight: 'bold',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 14,
        color: '#555',
    },
    socialIconsContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    socialIconCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    footer: {
        padding: 15,
        alignItems: 'flex-end',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    closeModalButton: {
        backgroundColor: '#3B82F6', 
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    closeModalButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
    }
});

export default ShareRecruitmentModal;