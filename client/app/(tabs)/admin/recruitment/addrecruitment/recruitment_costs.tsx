import React, { useState, useMemo } from 'react'; //Sử dụng useMemo để tự động tính lại tổng chi phí mỗi khi có thay đổi.
import { useRouter, usePathname, Slot } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { Dimensions } from "react-native";
import { Checkbox } from "react-native-paper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Picker } from '@react-native-picker/picker';
import { Button, Switch } from "react-native";
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
// Định nghĩa kiểu dữ liệu cho từng dòng chi phí
interface CostItem {
    id: number;
    channel?: string;
    account?: string;
    cost: string;
}

const initialChannels = [
    'Chọn nguồn ứng viên',
    'Website',
    'Facebook',
    'LinkedIn',
    'TopCV',
    'CareerViet',
];

export default function RecruitemntCosts() {
    const [channelCosts, setChannelCosts] = useState<CostItem[]>([
        { id: 1, channel: initialChannels[0], cost: '' }
    ]);
    const [otherCosts, setOtherCosts] = useState<CostItem[]>([
        { id: 1, account: '', cost: '' }
    ]);

    const handleAddRow = (type: 'channel' | 'other') => {
        const newId = Date.now();
        if (type === 'channel') {
            const newRow: CostItem = { id: newId, channel: initialChannels[0], cost: '' };
            setChannelCosts(prev => [...prev, newRow]);
        } else {
            const newRow: CostItem = { id: newId, account: '', cost: '' };
            setOtherCosts(prev => [...prev, newRow]);
        }
    };

    const handleUpdateRow = (type: 'channel' | 'other', id: number, field: 'channel' | 'account' | 'cost', value: string) => {
        const setState = type === 'channel' ? setChannelCosts : setOtherCosts;
        setState(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const handleRemoveRow = (type: 'channel' | 'other', id: number) => {
        const setState = type === 'channel' ? setChannelCosts : setOtherCosts;
        setState(prev => prev.filter(item => item.id !== id));
    };

    const totalCost = useMemo(() => {
        const channelSum = channelCosts.reduce((sum, item) => sum + (Number(item.cost) || 0), 0);
        const otherSum = otherCosts.reduce((sum, item) => sum + (Number(item.cost) || 0), 0);
        return channelSum + otherSum;
    }, [channelCosts, otherCosts]);
  return (
<ScrollView style={styles.container}>
      <Text style={styles.title}>Chi phí tuyển dụng</Text>
      <Text style={styles.subtitle}>Đơn vị: VND</Text>

      {/* Chi phí tuyển dụng theo kênh */}
      <Text style={styles.sectionTitle}>CHI PHÍ TUYỂN DỤNG THEO KÊNH</Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, { flex: 2, textAlign: 'left' }]}>Kênh tuyển dụng</Text>
        <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'right' }]}>Chi phí dự kiến</Text>
      </View>
      {channelCosts.map((item) => (
        <View key={item.id} style={styles.row}>
          <View style={[styles.inputContainer, { flex: 2 }]}>
            <Picker
              selectedValue={item.channel}
              onValueChange={(value) => handleUpdateRow('channel', item.id, 'channel', value)}
                style={styles.picker} // Áp dụng style cho Picker
    itemStyle={styles.pickerItem} // Áp dụng style cho từng item (tùy chọn)
            >
              {initialChannels.map((channel, i) => (
                <Picker.Item key={i} label={channel} value={channel} />
              ))}
            </Picker>
          </View>
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <TextInput
              style={styles.input}
              placeholder="Nhập số tiền"
              keyboardType="numeric"
              value={item.cost}
              onChangeText={(text) => handleUpdateRow('channel', item.id, 'cost', text)}
            />
          </View>
          {channelCosts.length > 1 && (
            <TouchableOpacity onPress={() => handleRemoveRow('channel', item.id)} style={styles.removeButton}>
              <AntDesign name="minuscircleo" size={20} color="red" />
            </TouchableOpacity>
          )}
        </View>
      ))}
      <TouchableOpacity onPress={() => handleAddRow('channel')} style={styles.addButton}>
        <AntDesign name="plus" size={15} color="#007bff" />
        <Text style={styles.addButtonText}>Thêm dòng</Text>
      </TouchableOpacity>

      {/* Chi phí khác */}
      <Text style={styles.sectionTitle}>CHI PHÍ KHÁC</Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, { flex: 2, textAlign: 'left' }]}>Tài khoản chi</Text>
        <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'right' }]}>Chi phí dự kiến</Text>
      </View>
      {otherCosts.map((item) => (
        <View key={item.id} style={styles.row}>
          <View style={[styles.inputContainer, { flex: 2 }]}>
            <TextInput
              style={styles.input}
              placeholder="Nhập tên khoản chi"
              value={item.account}
              onChangeText={(text) => handleUpdateRow('other', item.id, 'account', text)}
            />
          </View>
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <TextInput
              style={styles.input}
              placeholder="Nhập số tiền"
              keyboardType="numeric"
              value={item.cost}
              onChangeText={(text) => handleUpdateRow('other', item.id, 'cost', text)}
            />
          </View>
          {otherCosts.length > 1 && (
            <TouchableOpacity onPress={() => handleRemoveRow('other', item.id)} style={styles.removeButton}>
              <AntDesign name="minuscircleo" size={20} color="red" />
            </TouchableOpacity>
          )}
        </View>
      ))}
      <TouchableOpacity onPress={() => handleAddRow('other')} style={styles.addButton}>
        <AntDesign name="plus" size={15} color="#007bff" />
        <Text style={styles.addButtonText}>Thêm dòng</Text>
      </TouchableOpacity>

      {/* Tổng chi phí */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tổng</Text>
        <Text style={styles.totalAmount}>{totalCost.toLocaleString('vi-VN')} VND</Text>
      </View>
    </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        borderRadius: 4,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1E2623',
        marginTop: 10,
        marginBottom: 5,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        marginBottom: 5,
        borderBottomColor: '#d1d5db',
    },
    tableHeaderText: {
        fontWeight: 'bold',
        color: '#666',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
    },
    inputContainer: {
        height: 40,
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 5,
        backgroundColor: 'white',
        marginRight: 10,
        justifyContent: 'center',
    },
    input: {
        height: 40,
        paddingHorizontal: 10,
    },
    removeButton: {
        padding: 5,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    addButtonText: {
        color: '#007bff',
        fontSize: 14,
        marginLeft: 5,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        paddingTop: 15,
        borderTopWidth: 2,
        borderTopColor: '#000',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    pickerContainer: {
    borderWidth: 0, // Bạn có thể tùy chỉnh viền cho view bao quanh
    borderColor: '#d1d5db',
    outline: 'none',
    borderRadius: 8, // Thêm bo góc nếu cần
    overflow: 'hidden', // Quan trọng: ẩn phần viền thừa của Picker
  },
  picker: {
    width: '100%',
    height: 40, // Đặt chiều cao mong muốn
    color: '#333',
    // backgroundColor: 'transparent',
  },
   pickerItem: {
    color: 'blue', // Đặt màu chữ cho các lựa chọn
    fontSize: 16, // Đặt kích thước font
    fontWeight: 'bold', // In đậm chữ
  },
});

