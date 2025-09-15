import React, { useState, useRef } from "react";
import { useRouter, usePathname, Slot } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { Dimensions } from "react-native";
import { Checkbox } from "react-native-paper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
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
import { Feather } from '@expo/vector-icons';
import { SvgProps } from "react-native-svg";
import Website from "../../../../../assets/images/globel2.svg";
import Facebook from "../../../../../assets/images/facebook5.svg";
import In from "../../../../../assets/images/in.svg";
import tOPcv from "../../../../../assets/images/topcv.svg";
import DropDownPicker from "react-native-dropdown-picker";
import Octicons from "@expo/vector-icons/Octicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ScrollArea } from "@mantine/core";
// Định nghĩa kiểu dữ liệu cho đối tượng thành viên
interface Member {
  id: number;
  name: string;
  email: string;
  notifyNewCandidate: boolean;
  viewNewHireInfo: boolean;
}
export default function RecruitemntBoard() {
  const [members, setMembers] = useState<Member[]>([
    // Khai báo rõ ràng state là mảng các đối tượng Member
    {
      id: 1,
      name: "Đỗ Thị Giang Khánh",
      email: "dothitieutun@gmail.com",
      notifyNewCandidate: true,
      viewNewHireInfo: true,
    },
  ]);

  const handleAddMember = () => {
    const newMember = {
      id: members.length + 1,
      name: "Thành viên mới",
      email: "email@example.com",
      notifyNewCandidate: false,
      viewNewHireInfo: false,
    };
    setMembers([...members, newMember]);
  };

  // Hàm xử lý với các kiểu dữ liệu rõ ràng
  const handleToggleCheckbox = (
    memberId: number,
    checkboxType: keyof Member
  ) => {
    const updatedMembers = members.map((member) => {
      if (member.id === memberId) {
        // Kiểm tra thuộc tính là boolean
        const updatedMember = { ...member };
        if (typeof updatedMember[checkboxType] === "boolean") {
          (updatedMember[checkboxType] as boolean) =
            !updatedMember[checkboxType];
        }
        return updatedMember;
      }
      return member;
    });
    setMembers(updatedMembers);
  };
  const handleRemoveMember = (memberId: number) => {
    const filteredMembers = members.filter(member => member.id !== memberId);
    setMembers(filteredMembers);
  };
  return (
<ScrollView style={styles.container}>
      <Text style={styles.header}>Hội đồng tuyển dụng</Text>
      
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, { flex: 2 }]}>Tên thành viên</Text>
        <Text style={styles.tableHeaderText}>Nhận thông báo khi có ứng viên mới</Text>
        <Text style={styles.tableHeaderText}>Xem thông tin mới nhận việc</Text>
      </View>

      {members.map((member) => (
        <View key={member.id} style={styles.memberRow}>
          <View style={styles.memberInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{member.name.slice(0, 2).toUpperCase()}</Text>
            </View>
            <View>
              <Text style={styles.name}>{member.name}</Text>
              <Text style={styles.email}>{member.email}</Text>
            </View>
          </View>

          <View style={styles.checkboxContainer}>
            <Checkbox.Android
              status={member.notifyNewCandidate ? 'checked' : 'unchecked'}
              onPress={() => handleToggleCheckbox(member.id, 'notifyNewCandidate')}
            />
          </View>

          <View style={styles.checkboxContainer}>
            <Checkbox.Android
              status={member.viewNewHireInfo ? 'checked' : 'unchecked'}
              onPress={() => handleToggleCheckbox(member.id, 'viewNewHireInfo')}
            />
          </View>

          <TouchableOpacity onPress={() => handleRemoveMember(member.id)} style={styles.removeButton}>
            <Feather name="trash-2" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity onPress={handleAddMember} style={styles.addButton}>
        <AntDesign name="plus" size={15} color="#007bff" />
        <Text style={styles.addButtonText}>Thêm thành viên</Text>
      </TouchableOpacity>
    </ScrollView>  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 4
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tableHeaderText: {
        flex: 1,
        fontWeight: 'bold',
        color: '#666',
        textAlign: 'center',
    },
    memberRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    memberInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 2,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ff69b4',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    avatarText: {
        color: 'white',
        fontWeight: 'bold',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 12,
        color: '#666',
    },
    checkboxContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeButton: {
        padding: 5,
        marginLeft: 10,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: '#007bff',
        fontSize: 16,
        marginLeft: 5,
    },
});