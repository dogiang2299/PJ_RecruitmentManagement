import React, { useState, useRef } from "react";
import { useRouter, usePathname, Slot } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { Dimensions } from "react-native";
import { Button } from "react-native";
import { RadioButton } from "react-native-paper";
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
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Octicons from "@expo/vector-icons/Octicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ScrollArea } from "@mantine/core";
export default function AddRecruitment() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // chứa nội dung mô tả
  const router = useRouter();
  const [value, setValue] = React.useState("Tiếng Việt");
  const [openStatus, setOpenStatus] = useState(false);
  const [valueStatus, setValueStatus] = useState("Chọn đơn vị cần chọn");
  const [statusRecruitment, setStatusRecruitment] = useState([
    { label: "Tất cả", value: "Tất cả" },
    { label: "Đang tuyển dụng", value: "Đang tuyển dụng" },
    { label: "Công khai", value: "Công khai" },
    { label: "Nội bộ", value: "Nội bộ" },
    { label: "Ngừng nhận hồ sơ", value: "Ngừng nhận hồ sơ" },
    { label: "Nháp", value: "Nháp" },
    { label: "Đóng", value: "Đóng" },
  ]);

  // Cho Loại tiền
  const [openCurrency, setOpenCurrency] = useState(false);
  const [valueCurrency, setValueCurrency] = useState(null);
  const [itemsCurrency, setItemsCurrency] = useState([
    { label: "VND", value: "vnd" },
    { label: "USD", value: "usd" },
  ]);

  // Cho Hiển thị trên tin tuyển
  const [openDisplay, setOpenDisplay] = useState(false);
  const [valueDisplay, setValueDisplay] = useState(null);
  const [itemsDisplay, setItemsDisplay] = useState([
    { label: "Có", value: "yes" },
    { label: "Không", value: "no" },
  ]);
  const descriptionRef = useRef<RichEditor>(null);
  const requirementRef = useRef<RichEditor>(null);
  const pickDocuments = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      multiple: true, // Cho phép nhiều file
    });

    if (!result.canceled) {
      console.log("Các file đã chọn:", result.assets);
    }
  };

  return (
    // View tổng toàn trang
    <View style={{ gap: 20, marginBottom: 20, height: '100%',    }}>
      {/* View thông tin chung */}
      <View
        style={{
          flexDirection: "column",
          backgroundColor: "#FFFFFF",
          paddingHorizontal: 20,
          paddingVertical: 20,
          borderRadius: 7,
          flex: 1,
          
          gap: 10,
        }}
      >
        <Text style={{ fontWeight: 700, fontSize: 17, marginBottom: 10 }}>
          THÔNG TIN CHUNG
        </Text>

        {/* Tiêu đề nội bộ */}
        <View style={{ flexDirection: "column", gap: 7 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={{ fontWeight: 500 }}>Tiêu đề nội bộ</Text>
            <FontAwesome5 name="star-of-life" size={5} color="#E54848" />
          </View>
          <Text style={{ color: "#6C757D" }}>
            Tiêu đề hiển thị trên các chức năng và báo cáo của phần mềm
          </Text>
          <TextInput
            style={{
              paddingHorizontal: 8,
              paddingVertical: 10,
              borderColor: "#d1d5db",
              borderWidth: 1,
              borderRadius: 4,
              height: 40,
              color: "#6C757D",
              outline: "none",
            }}
            placeholder="Tiêu đề nội bộ"
            placeholderTextColor={"#6C757D"}
          ></TextInput>
        </View>

        {/* Tiêu đề tin đăng */}
        <View style={{ flexDirection: "column", gap: 7 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={{ fontWeight: 500 }}>Tiêu đề tin đăng</Text>
            <FontAwesome5 name="star-of-life" size={5} color="#E54848" />
          </View>
          <Text style={{ color: "#6C757D" }}>
            Tiêu đề hiển thị của tin đăng trên các kênh tuyển dụng (Website,
            Facebook, Linkedin, ...)
          </Text>
          <TextInput
            style={{
              height: 40,
              paddingHorizontal: 8,
              paddingVertical: 10,
              borderColor: "#d1d5db",
              borderWidth: 1,
              borderRadius: 4,
              color: "#6C757D",
              outline: "none",
            }}
            placeholder="Tiêu đề tin đăng"
            placeholderTextColor={"#6C757D"}
          ></TextInput>
        </View>

        {/* Phòng ban + Cấp bậc*/}
        <View style={{ flexDirection: "row", gap: 15, flex: 1 }}>
          <View style={{ flexDirection: "column", gap: 7, flex: 1 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Text style={{ fontWeight: 500 }}>Phòng ban</Text>
              <FontAwesome5 name="star-of-life" size={5} color="#E54848" />
            </View>
            <DropDownPicker
              open={openStatus}
              value={valueStatus}
              items={statusRecruitment}
              setOpen={setOpenStatus}
              setValue={setValueStatus}
              setItems={setStatusRecruitment}
              placeholder="Choose"
              style={{
                minHeight: 40, // 👈 ép lại minHeight
                height: 40,
                borderRadius: 4,
                borderColor: "#ccc",
                paddingHorizontal: 10,
              }}
              containerStyle={{
                minHeight: 40,
                height: 40,
              }}
              dropDownContainerStyle={{
                minHeight: 40,
                borderRadius: 8,
                borderColor: "#ccc",
              }}
              listItemContainerStyle={{
                minHeight: 40, // 👈 mỗi item cũng 40px
              }}
              textStyle={{
                fontSize: 15,
              }}
            />
          </View>
          <View style={{ flexDirection: "column", gap: 7, flex: 1 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Text style={{ fontWeight: 500 }}>Cấp bậc</Text>
            </View>
            <DropDownPicker
              open={openStatus}
              value={valueStatus}
              items={statusRecruitment}
              setOpen={setOpenStatus}
              setValue={setValueStatus}
              setItems={setStatusRecruitment}
              placeholder="Choose"
              style={{
                minHeight: 40, // 👈 ép lại minHeight
                height: 40,
                borderRadius: 4,
                borderColor: "#ccc",
                paddingHorizontal: 10,
              }}
              containerStyle={{
                minHeight: 40,
                height: 40,
              }}
              dropDownContainerStyle={{
                minHeight: 40,
                borderRadius: 8,
                borderColor: "#ccc",
              }}
              listItemContainerStyle={{
                minHeight: 40, // 👈 mỗi item cũng 40px
              }}
              textStyle={{
                fontSize: 15,
              }}
            />
          </View>
        </View>

        {/* Vị trí tuyển dụng */}
        <View style={{ flexDirection: "column", gap: 7 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={{ fontWeight: 500 }}>Vị trí tuyển dụng</Text>
            <FontAwesome5 name="star-of-life" size={5} color="#E54848" />
          </View>
          <DropDownPicker
            open={openStatus}
            value={valueStatus}
            items={statusRecruitment}
            setOpen={setOpenStatus}
            setValue={setValueStatus}
            setItems={setStatusRecruitment}
            placeholder="Choose"
            style={{
              minHeight: 40, // 👈 ép lại minHeight
              height: 40,
                borderRadius: 4,
              borderColor: "#ccc",
              paddingHorizontal: 10,
            }}
            containerStyle={{
              minHeight: 40,
              height: 40,
            }}
            dropDownContainerStyle={{
              minHeight: 40,
              borderRadius: 8,
              borderColor: "#ccc",
            }}
            listItemContainerStyle={{
              minHeight: 40, // 👈 mỗi item cũng 40px
            }}
            textStyle={{
              fontSize: 15,
            }}
          />
        </View>

        {/* Ngành nghề */}
        <View style={{ flexDirection: "column", gap: 7 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={{ fontWeight: 500 }}>Ngành nghề</Text>
          </View>
          <DropDownPicker
            open={openStatus}
            value={valueStatus}
            items={statusRecruitment}
            setOpen={setOpenStatus}
            setValue={setValueStatus}
            setItems={setStatusRecruitment}
            placeholder="Choose"
            style={{
              minHeight: 40, // 👈 ép lại minHeight
              height: 40,
                borderRadius: 4,
              borderColor: "#ccc",
              paddingHorizontal: 10,
            }}
            containerStyle={{
              minHeight: 40,
              height: 40,
            }}
            dropDownContainerStyle={{
              minHeight: 40,
              borderRadius: 8,
              borderColor: "#ccc",
            }}
            listItemContainerStyle={{
              minHeight: 40, // 👈 mỗi item cũng 40px
            }}
            textStyle={{
              fontSize: 15,
            }}
          />
        </View>

        {/* Địa điểm làm việc */}
        <View style={{ flexDirection: "column", gap: 7 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={{ fontWeight: 500 }}>Địa điểm làm việc</Text>
            <FontAwesome5 name="star-of-life" size={5} color="#E54848" />
          </View>
          <DropDownPicker
            open={openStatus}
            value={valueStatus}
            items={statusRecruitment}
            setOpen={setOpenStatus}
            setValue={setValueStatus}
            setItems={setStatusRecruitment}
            placeholder="Choose"
            style={{
              minHeight: 40, // 👈 ép lại minHeight
              height: 40,
                borderRadius: 4,
              borderColor: "#ccc",
              paddingHorizontal: 10,
            }}
            containerStyle={{
              minHeight: 40,
              height: 40,
            }}
            dropDownContainerStyle={{
              minHeight: 40,
              borderRadius: 8,
              borderColor: "#ccc",
            }}
            listItemContainerStyle={{
              minHeight: 40, // 👈 mỗi item cũng 40px
            }}
            textStyle={{
              fontSize: 15,
            }}
          />
        </View>

        {/* Loại hình CV + Hạn nộp + Số lượng*/}
        <View style={{ flexDirection: "row", gap: 15, flex: 1 }}>
          <View style={{ flexDirection: "column", gap: 7, flex: 1 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Text style={{ fontWeight: 500 }}>Loại hình công việc</Text>
              <FontAwesome5 name="star-of-life" size={5} color="#E54848" />
            </View>
            <DropDownPicker
              open={openStatus}
              value={valueStatus}
              items={statusRecruitment}
              setOpen={setOpenStatus}
              setValue={setValueStatus}
              setItems={setStatusRecruitment}
              placeholder="Choose"
              style={{
                minHeight: 40, // 👈 ép lại minHeight
                height: 40,
                borderRadius: 4,
                borderColor: "#ccc",
                paddingHorizontal: 10,
              }}
              containerStyle={{
                minHeight: 40,
                height: 40,
              }}
              dropDownContainerStyle={{
                minHeight: 40,
                borderRadius: 8,
                borderColor: "#ccc",
              }}
              listItemContainerStyle={{
                minHeight: 40, // 👈 mỗi item cũng 40px
              }}
              textStyle={{
                fontSize: 15,
              }}
            />
          </View>
          <View style={{ flexDirection: "column", gap: 7, flex: 1 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Text style={{ fontWeight: 500 }}>Hạn nộp hồ sơ</Text>
              <FontAwesome5 name="star-of-life" size={5} color="#E54848" />
            </View>
            <DropDownPicker
              open={openStatus}
              value={valueStatus}
              items={statusRecruitment}
              setOpen={setOpenStatus}
              setValue={setValueStatus}
              setItems={setStatusRecruitment}
              placeholder="Choose"
              style={{
                minHeight: 40, // 👈 ép lại minHeight
                height: 40,
                borderRadius: 4,
                borderColor: "#ccc",
                paddingHorizontal: 10,
              }}
              containerStyle={{
                minHeight: 40,
                height: 40,
              }}
              dropDownContainerStyle={{
                minHeight: 40,
                borderRadius: 8,
                borderColor: "#ccc",
              }}
              listItemContainerStyle={{
                minHeight: 40, // 👈 mỗi item cũng 40px
              }}
              textStyle={{
                fontSize: 15,
              }}
            />
          </View>
          <View style={{ flexDirection: "column", gap: 7, flex: 1 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Text style={{ fontWeight: 500 }}>SL hiển thị trên website</Text>
              <FontAwesome5 name="star-of-life" size={5} color="#E54848" />
            </View>
            <TextInput
              style={{
                paddingHorizontal: 8,
                paddingVertical: 10,
                borderColor: "#d1d5db",
                borderWidth: 1,
                borderRadius: 4,
                color: "#6C757D",
                outline: "none",
              }}
              placeholder="0"
              placeholderTextColor={"#6C757D"}
            ></TextInput>
          </View>
        </View>

        {/* Mức lương*/}
        <View style={{ flexDirection: "column", flex: 1 }}>
          <Text style={{ marginBottom: 10 }}>Mức lương</Text>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              flex: 1,
              alignItems: "flex-start",
            }}
          >
            {/* Từ */}
            <View style={{ flexDirection: "column", gap: 7, flex: 1 }}>
              <Text style={{ fontWeight: 500 }}>Từ</Text>
              <TextInput
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderColor: "#d1d5db",
                  borderWidth: 1,
                  borderRadius: 4,
                  color: "#6C757D",
                  outline: "none",
                }}
                placeholder="0"
                placeholderTextColor={"#6C757D"}
              ></TextInput>
            </View>
            {/* Đến */}
            <View style={{ flexDirection: "column", gap: 7, flex: 1 }}>
              <Text style={{ fontWeight: 500 }}>Đến</Text>
              <TextInput
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderColor: "#d1d5db",
                  borderWidth: 1,
                  borderRadius: 4,
                  color: "#6C757D",
                  outline: "none",
                }}
                placeholder="0"
                placeholderTextColor={"#6C757D"}
              ></TextInput>
            </View>
            {/* Loại tiền */}
            <View style={{ flexDirection: "column", gap: 10, flex: 1 }}>
              <Text style={{ fontWeight: 500 }}>Loại tiền</Text>
              <View style={{ flex: 1, zIndex: 2000 }}>
                <DropDownPicker
                  open={openCurrency}
                  value={valueCurrency}
                  items={itemsCurrency}
                  setOpen={setOpenCurrency}
                  setValue={setValueCurrency}
                  setItems={setItemsCurrency}
                  style={{ minHeight: 40, height: 40, borderColor: "#ccc" }}
                  dropDownContainerStyle={{ borderColor: "#ccc" }}
                />
              </View>
            </View>
            {/* Hiển thị trên tin tuyển */}
            <View style={{ flexDirection: "column", gap: 10, flex: 1 }}>
              <Text style={{ fontWeight: 500 }}>Hiển thị trên tin tuyển</Text>
              <View style={{ flex: 1, zIndex: 1000 }}>
                <DropDownPicker
                  open={openDisplay}
                  value={valueDisplay}
                  items={itemsDisplay}
                  setOpen={setOpenDisplay}
                  setValue={setValueDisplay}
                  setItems={setItemsDisplay}
                  style={{ minHeight: 40, height: 40, borderColor: "#ccc" }}
                  dropDownContainerStyle={{ borderColor: "#ccc" }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    borderColor: "#d1d5db",
    height: 30,
    zIndex: 2000, // iOS
    elevation: 2000, // Android,
  },
  container: {
    maxWidth: 900,
    alignSelf: "center",
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },

  label: {
    marginBottom: 8,
    fontWeight: "bold",
    fontSize: 15,
    outline: "none",
    outlineColor: "transparent",
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 15,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    backgroundColor: "#007bff",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});
