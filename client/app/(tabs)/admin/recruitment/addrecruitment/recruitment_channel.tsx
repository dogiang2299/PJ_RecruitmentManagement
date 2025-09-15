import React, { useState, useRef } from "react";
import { useRouter, usePathname, Slot } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { Dimensions } from "react-native";
import { Checkbox } from "react-native-paper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Button , Switch } from "react-native";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";
import {
  TouchableOpacity,
  TextInput,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { SvgProps } from "react-native-svg";
import Website from "../../../../../assets/images/globel2.svg";
import Facebook from "../../../../../assets/images/facebook5.svg";
import In from "../../../../../assets/images/in.svg";
import tOPcv from "../../../../../assets/images/topcv.svg";
import DropDownPicker from "react-native-dropdown-picker";
import Octicons from "@expo/vector-icons/Octicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ScrollArea } from "@mantine/core";

interface ToggleRecruitments {
  icon: React.FC<SvgProps>;
  label: string;
}
const value = [
    { id: 1, icon: Website, label: "Website tuyển dụng", active: true },
    { id: 2, icon: Facebook, label: "Facebook", active: false },
    { id: 3, icon: In, label: "LinkedIn", active: false },
    { id: 4, icon: tOPcv, label: "TopCV", active: false },
];
export default function RecruitemntChannel(){
// Sử dụng useState để quản lý mảng dữ liệu
    const [channelData, setChannelData] = useState(value);

    // Hàm xử lý khi người dùng bật/tắt Switch
    const toggleSwitch = (index: number) => {
        // Tạo một bản sao của mảng để tránh thay đổi state trực tiếp
        const newData = [...channelData];
        // Đảo ngược giá trị 'active' của phần tử tại vị trí index
        newData[index].active = !newData[index].active;
        // Cập nhật lại state
        setChannelData(newData);
    };



    return (
        // View tổng
        <View style={{
                gap: 20,
                marginBottom: 20,
                backgroundColor: "#FFFFFF",
                padding: 20,
                borderRadius: 6,
            }}>
              {/* Thanh trên cùng */}
            <View >
                <Text style={{ fontWeight: 700, fontSize: 17, marginBottom: 10 }}>
                  Kênh tuyển dụng
                </Text>
                <Text style={{ color: "#6C757D" }}>
                Lựa chọn kênh đăng tin tuyển dụng để thu hút ứng viên   
                </Text>
            </View>
            {/* Nội dung bên dưới */}
           <View style={styles.container}>
            {channelData.map((item, index) => {
                return (
                    <View key={item.id} style={styles.channelRow}>
                        <Text style={styles.label}>{item.label}</Text>
                        <Switch
                            trackColor={{ false: "#2680EB", true: "#CECECE" }}
                            thumbColor={item.active ? "#f5dd4b" : "#FFFFFF"}
                            ios_backgroundColor="#3e3e3e"
                            // Gắn giá trị của Switch với biến trạng thái 'active'
                            value={item.active}
                            // Gắn hàm xử lý khi giá trị thay đổi
                            onValueChange={() => toggleSwitch(index)}
                        />
                    </View>
                );
            })}
        </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 8,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
    },
    channelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    channelInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconWrapper: {
        marginRight: 12,
    },
    label: {
        fontSize: 16,
    },
    addTagsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 'auto',
        marginLeft: 10,
    },
    addTagsText: {
        color: '#2680EB',
        marginLeft: 4,
    },
});