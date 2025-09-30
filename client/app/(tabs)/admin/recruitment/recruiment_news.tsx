import React, { useState, useEffect } from "react";
import { Modal } from "react-native";
import { Checkbox } from "react-native-paper";
import {
  TouchableOpacity,
  TextInput,
  Text,
  View,
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import ShareRecruitmentModal from '../../../../components/ShareRecruitmentModal';
import { SvgProps } from "react-native-svg";
import { Image } from "expo-image";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { useRouter, usePathname, Slot } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Label } from "@react-navigation/elements";
import WatchRecruitment from "../../../../assets/images/watchRe.svg";
import Share from "../../../../assets/images/share.svg";
import Copy from "../../../../assets/images/copy.svg";
import Delete from "../../../../assets/images/delete.svg";
import Edit from "../../../../assets/images/edit.svg";
import Border from "../../../../assets/images/border.svg";

import DropDownPicker from "react-native-dropdown-picker";
interface OptionStatus {
  label: string;
  desc: string;
  color: string;
}
interface OptionFunction {
  icon: React.FC<SvgProps>;
  label: string;
}
export default function RecruitmentNewsPage() {
  //#region KHAI BÁO CÁC BIẾN
    const router = useRouter();
    const [isShareModalVisible, setIsShareModalVisible] = useState(false);
    // ✅ BASE URL để tạo link chia sẻ
    const BASE_SHARE_URL = "https://www.misa.vn/tin-tuyen-dung/"; 
  const [openStatus, setOpenStatus] = useState(false);
  const [valueStatus, setValueStatus] = useState("Đang tuyển dụng");
  const [statusRecruitment, setStatusRecruitment] = useState([
    { label: "Tất cả", value: "Tất cả" },
    { label: "Đang tuyển dụng", value: "Đang tuyển dụng" },
    { label: "Công khai", value: "Công khai" },
    { label: "Nội bộ", value: "Nội bộ" },
    { label: "Ngừng nhận hồ sơ", value: "Ngừng nhận hồ sơ" },
    { label: "Nháp", value: "Nháp" },
    { label: "Đóng", value: "Đóng" },
  ]);
  const [status, setStatus] = useState("Công khai");
  const [statusColor, setStatusColor] = useState("#48BB56");
  const [visibleStatus, setVisibleStatus] = useState<number | null>(null);
    const [visibleFunction, setVisibleFunction] = useState<number | null>(null);
    const [confirmDeleteIndex, setConfirmDeleteIndex] = useState<number | null>(null);
const optionFunction: OptionFunction[] = [
    { icon: Edit, label: "Sửa tin" },
    { icon: Share, label: "Chia sẻ" },
    { icon: WatchRecruitment, label: "Xem tin tuyển dụng" },
    { icon: Delete, label: "Xoá" },
  ];

  const [checkedStates, setCheckedStates] = React.useState<{
    [key: number]: boolean;
  }>({});

  const [functions, setFunctions] = useState<string>("");
  const [hovered, setHovered] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [openArrange, setOpenArrange] = useState(false);
  const [valueArrange, setValueArrange] = useState("Ngày tạo");
  const [arrangeFollow, setArrangeFollow] = useState([
    { label: "Ngày tạo", value: "Ngày tạo" },
    { label: "Tiêu đề tin", value: "Tiêu đề tin" },
    { label: "Đơn vị sử dụng", value: "Đơn vị sử dụng" },
  ]);
  // ✅ Không cần selectedRecruitment, chỉ cần link
  // const [selectedRecruitment, setSelectedRecruitment] = useState<any | null>(null);
  const [dynamicShareLink, setDynamicShareLink] = useState("");
  const optionsStatus: OptionStatus[] = [
    {
      label: "Công khai",
      desc: "Mọi người đều có thể xem tin tuyển dụng.",
      color: "#48BB56",
    },
    {
      label: "Nội bộ",
      desc: "Có thể xem trực tiếp được liên kết nhưng không hiển thị trên kênh tuyển dụng.",
      color: "#2680eb",
    },
    {
      label: "Ngừng nhận hồ sơ",
      desc: "Tin sẽ được gỡ khỏi các kênh tuyển dụng. Không cho phép nộp đơn ứng tuyển.",
      color: "#E54848",
    },
    {
      label: "Đóng",
      desc: "Tin tuyển dụng đã được hoàn tất.",
      color: "#646464",
    },
  ];
  //#endregion

  //#region TIN TUYỂN DỤNG - CONNECT API
  const [recruitments, setRecruitments] = useState<any[]>([]); // khai báo cho tin tuyển dụng
  // Khi load dữ liệu từ API
    useEffect(() => {
      axios.get("http://localhost:3007/api/tintuyendung_with_names")
        .then((res) => {
          // Gắn trạng thái mặc định cho mỗi item
          const dataWithStatus = res.data.map((item: any) => ({
            ...item,
            status: item.TrangThaiTinTuyenDung || "Công khai", // default
            statusColor: "#48BB56", // default màu Công khai
          }));
          setRecruitments(dataWithStatus);
        })
        .catch((err) => console.error("Lỗi API:", err));
    }, []);

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("vi-VN"); // ví dụ: 29/10/2025
  };
  //#region XÓA TIN TUYỂN DỤNG
  const handleConfirmDelete = async () => {
    if (confirmDeleteIndex !== null) {
      const id = recruitments[confirmDeleteIndex].MaTinTuyenDung; // giả sử API key là MaTin
      try {
        setLoading(true);

        await axios.delete(`http://localhost:3007/api/tintuyendung/${id}`);

        // Xoá khỏi state
        const newList = recruitments.filter((_, i) => i !== confirmDeleteIndex);
        setRecruitments(newList);

        console.log("Đã xoá tin:", id);
      } catch (err) {
        console.error("Lỗi xoá tin:", err);
        alert("Không thể xoá tin, vui lòng thử lại!");
      } finally {
        setLoading(false);
        setConfirmDeleteIndex(null);
        setVisibleFunction(null);
      }
    }
  };


  //#region CÁC HÀM XỬ LÝ
  const handleSelect = (optionStatus: OptionStatus, index: number) => {
  const updated = [...recruitments];
  updated[index].status = optionStatus.label;
  updated[index].statusColor = optionStatus.color;
  setRecruitments(updated);

  setVisibleStatus(null); // ✅ đóng dropdown
};
// ✅ Sửa hàm này để xử lý chức năng "Chia sẻ"
const handleSelectFunction = (optionFunction: OptionFunction, index: number) => {
    setVisibleFunction(null); // Luôn đóng dropdown sau khi chọn

    const selectedRecruitment = recruitments[index];
    
    switch (optionFunction.label) {
        case "Xoá":
            setConfirmDeleteIndex(index);
            break;
        case "Chia sẻ":
            // Lấy mã tin duy nhất (MaTinTuyenDung)
            const uniqueId = selectedRecruitment.MaTinTuyenDung;
            
            // 1. TẠO LINK RIÊNG BIỆT cho tin này
            // Link được tạo bằng cách nối BASE_SHARE_URL với mã tin duy nhất
            const specificLink = `${BASE_SHARE_URL}${uniqueId}`;
            
            // 2. Cập nhật state link
            setDynamicShareLink(specificLink);
            
            // 3. Mở Modal
            setIsShareModalVisible(true);
            break;
        default:
            console.log("Thực hiện:", optionFunction.label, "cho tin:", selectedRecruitment.TieuDeNoiBo);
            break;
    }
  };
  // ✅ Tạo hàm xử lý khi nhấn vào checkbox của một tin**
  const handleCheckboxToggle = (index: number) => {
    setCheckedStates((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index], // Đảo ngược trạng thái của checkbox đó
    }));
  };

  // ✅ Hàm tính toán số lượng tin đang được chọn
  const countChecked = Object.values(checkedStates).filter(
    (state) => state
  ).length; // ✅ Hàm Bỏ chọn tất cả

  const handleDeselectAll = () => {
    setCheckedStates({}); // Đặt lại state về rỗng (tất cả đều un-checked)
  }; // ✅ Hàm Chọn tất cả DS (Chỉ những tin đang được hiển thị)
  const handleSelectAll = () => {
    const newCheckedStates: { [key: number]: boolean } = {};
    recruitments.forEach((_, index) => {
      newCheckedStates[index] = true;
    });
    setCheckedStates(newCheckedStates);
  };
  // Component Action Bar hiển thị khi có tin được chọn
  const SelectionActionBar = () => {
    if (countChecked === 0) return null;

    return (
      <View style={styles.selectionBar}>
        <Text style={styles.selectionText}>{countChecked} đang chọn</Text>
        {/* Nút Bỏ chọn */}
        <TouchableOpacity
          style={styles.selectionButton}
          onPress={handleDeselectAll}
        >
          <Text style={{ color: "#FC1600", fontWeight: 500 }}>Bỏ chọn</Text>
        </TouchableOpacity>

        {/* Nút Chọn tất cả DS */}
        {countChecked < recruitments.length && (
          <TouchableOpacity
            style={styles.selectionButton}
            onPress={handleSelectAll}
          >
            <Text style={styles.selectionButtonText}>Chọn tất cả DS</Text>
          </TouchableOpacity>
        )}
        
        {/* Nút Xuất khẩu danh sách ứng viên (ví dụ) */}
        <TouchableOpacity
        style={[styles.selectionButton, styles.selectionButton_]}
          onPress={() => console.log("Xuất khẩu danh sách ứng viên")}
        >
          <MaterialCommunityIcons name="export" size={18} color="#6A727D" />
          <Text style={styles.selectionButtonText}>Xuất khẩu DS ứng viên</Text>
        </TouchableOpacity>

        {/* Nút Xuất khẩu tin (ví dụ) */}
        <TouchableOpacity
          style={[styles.selectionButton, styles.selectionButton_]}
          onPress={() => console.log("Xuất khẩu tin")}
        >
          <MaterialCommunityIcons name="export" size={18} color="#6A727D" />
          <Text style={styles.selectionButtonText}>Xuất khẩu tin</Text>
        </TouchableOpacity>
      </View>
    );
  };
  //#endregion
    return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#f5f5f5", paddingTop: 10 }}
    >
      <View
        style={{
          flexDirection: "column",
          gap: 5,
          paddingVertical: 0,
          paddingHorizontal: 15,
        }}
      >
        {/* Header */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 0,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 700 }}>Tin tuyển dụng</Text>
          <TouchableOpacity
            style={{
              paddingHorizontal: 15,
              backgroundColor: "#2680EB",
              paddingVertical: 6,
              flexDirection: "row",
              gap: 6,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
            }}
            onPress={() =>
              router.push(
                "/(tabs)/admin/recruitment/addrecruitment/addRecruitment"
              )
            }
          >
            <Ionicons name={"add" as any} size={20} color={"#FFFFFF"} />
            <Text style={{ color: "#FFFFFF", fontWeight: 500 }}>Thêm mới</Text>
          </TouchableOpacity>
        </View>
        {/* NavButton */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between", // giãn đều 2 bên
            marginBottom: 10,
          }}
        >
          {/* NavSearchLeft hoặc SelectionActionBar */}
          <View style={{ flex: 1, flexDirection: "row", gap: 5 }}>
            {countChecked > 0 ? (
              <SelectionActionBar />
            ) : (
              <>
                <View>
                  <DropDownPicker
                    open={openStatus}
                    value={valueStatus}
                    items={statusRecruitment}
                    setOpen={setOpenStatus}
                    setValue={setValueStatus}
                    setItems={setStatusRecruitment}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    textStyle={styles.text}
                    listItemLabelStyle={styles.itemText}
                  />
                </View>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <Text style={{ fontSize: 14, color: "#1e2633" }}>
                    Sắp xếp theo:
                  </Text>
                  <View style={{ flex: 1 }}>
                    <DropDownPicker
                      open={openArrange}
                      value={valueArrange}
                      items={arrangeFollow}
                      setOpen={setOpenArrange}
                      setValue={setValueArrange}
                      setItems={setArrangeFollow}
                      style={styles.dropdowns}
                      dropDownContainerStyle={styles.dropdownContainer}
                      textStyle={styles.text}
                      listItemLabelStyle={styles.itemText}
                    />
                  </View>
                </View>
              </>
            )}
          </View>

          {/* NavSearchRight */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              flexShrink: 0, // ⬅️ không cho co giãn
            }}
          >
            <View
              style={{
                flexDirection: "row",
                borderRadius: 10,
                backgroundColor: "#FFFFFF",
                paddingHorizontal: 10,
                paddingVertical: 8,
                gap: 7,
                width: 350, // ⬅️ fix width search bar
              }}
            >
              <Ionicons
                name="search"
                size={20}
                color={"#7A8188"}
                style={{ marginRight: 8 }}
              />
              <TextInput
                style={{ outline: "none", flex: 1, padding: 0 }}
                placeholder="Tìm kiếm nhanh trong danh sách"
                placeholderTextColor="#7A8188"
              />
            </View>

            {/* Ẩn 2 nút này khi có checkbox được chọn */}
            {countChecked === 0 && (
              <>
                <TouchableOpacity style={styles.buttonNavRight}>
                  <AntDesign name="filter" size={20} color="#7A8188" />
                  <Text>Bộ lọc</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonNavRight}>
                  <Ionicons name="share-outline" size={20} color={"#7A8188"} />
                  <Text>Xuất khẩu tin</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>


        {/* Main contain */}
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: 20,
          paddingHorizontal: 15,
          paddingTop: 0,
        }}
      >
        {recruitments.map((item, index) => (
          <View key={index} style={[ styles.card, { zIndex: recruitments.length - index }  ]}>
            {/* Header */}
            <View style={styles.header}>
              <Checkbox
                status={checkedStates[index] ? "checked" : "unchecked"}
                onPress={() => handleCheckboxToggle(index)}
              />
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={styles.title}>{item.TieuDeNoiBo}</Text>
                <View style={styles.subInfo}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 6,
                    }}
                  >
                    <Text style={styles.subText}>{item.TenViTriCongViec}</Text>
                    <Text style={styles.subText}>• {item.TenDayDu}</Text>
                    <Text style={styles.subText}>
                      • SL cần tuyển: {item.SoLuongHienThiTrenWebsite}
                    </Text>

                    <Text style={styles.subText}>
                      • Hạn nộp hồ sơ:{" "}
                      <Text style={styles.dark}>
                        {formatDate(item.HanNopHoSo)}
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 7 }}
              >
                {/* Phần button Công khai */}
                <View style={styles.container}>
                {/* Trạng thái riêng cho từng tin */}
                <TouchableOpacity
                  style={[styles.mainButton, { borderColor: item.statusColor }]}
                  onPress={() => setVisibleStatus(index)}
                >
                  <Octicons name="dot-fill" size={15} color={item.statusColor} />
                  <Text style={[styles.mainButtonText, { color: item.statusColor }]}>
                    {item.status}
                  </Text>
                  <AntDesign name="down" size={10} color={item.statusColor} />
                </TouchableOpacity>                
                </View>

                {/* Phần button chức năng */}
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={{ borderColor: "transparent", flexDirection: "row" }}
                    onPress={() => setVisibleFunction(visibleFunction === index ? null : index)}
                  >
                    <MaterialCommunityIcons
                      style={{
                        paddingLeft: 6,
                        paddingRight: 6,
                        color: "#7A8188",
                      }}
                      name="dots-vertical"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Stats row */}
            <View style={styles.statsRow}>
              <TouchableOpacity style={[styles.statItem]}>
                <Text style={styles.statNumber}>2</Text>
                <Text style={styles.statLabel}>Ứng tuyển</Text>
              </TouchableOpacity>
              <Border />

              <TouchableOpacity style={[styles.statItem]}>
                <Text style={styles.statNumber}>3</Text>
                <Text style={styles.statLabel}>Phỏng vấn</Text>
              </TouchableOpacity>
              <Border />

              <TouchableOpacity style={[styles.statItem]}>
                <Text style={styles.statNumber}>1</Text>
                <Text style={styles.statLabel}>Offer</Text>
              </TouchableOpacity>
              <Border />

              <TouchableOpacity style={[styles.statItem]}>
                <Text style={styles.statNumber}>1</Text>
                <Text style={styles.statLabel}>Đã tuyển</Text>
              </TouchableOpacity>
            </View>
            {/* Dropdown hiển thị riêng cho item */}
              {visibleStatus === index && (
                <View style={styles.dropdownWrapper}>
                  <View style={styles.dropdownSF}>
                    {optionsStatus.map((opt, i) => (
                      <Pressable
                        key={i}
                        onHoverIn={() => setHovered(i)}
                        onHoverOut={() => setHovered(null)}
                        onPress={() => handleSelect(opt, index)}
                        style={[
                          styles.options,
                          hovered === i && { backgroundColor: "#EBF4FF" } // hover nền xanh nhạt
                        ]}
                      >
                        <Text style={[styles.optionLabels, { color: opt.color }]}>
                          {opt.label}
                        </Text>
                        <Text style={styles.optionDescs}>{opt.desc}</Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              )}


              {visibleFunction === index && (
                <View style={styles.dropdownWrapperFucn}>
                  
                      {optionFunction.map((opt, i) => (
                      <Pressable
                        key={i}
                        onHoverIn={() => setHovered(i)}
                        onHoverOut={() => setHovered(null)}
                        onPress={() => handleSelectFunction(opt, index)}
                        style={[
                          styles.option,
                          hovered === i && { backgroundColor: "#EBF4FF" }
                        ]}
                      >
                        <opt.icon width={17} height={17} />
                        <Text>{opt.label}</Text>
                      </Pressable>
                    ))}

                  
                </View>
              )}
          </View>
        ))}
      </ScrollView>
      
      {/* -------------------------------------------------------- */}
      {/* MODALS: Đặt ở đây (sau ScrollView) để tránh xung đột */}
      {/* -------------------------------------------------------- */}

      {/* Modal xác nhận XÓA (đã di chuyển ra khỏi ScrollView) */}
      <Modal
        transparent={true}
        visible={confirmDeleteIndex !== null}
        animationType="fade"
        onRequestClose={() => setConfirmDeleteIndex(null)}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}>
          <View style={{ backgroundColor: "white", borderRadius: 12, padding: 20, width: "50%" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 12, color:'#FC1600' }}>XÓA TIN TUYỂN DỤNG</Text>
            <Text style={{ fontSize: 15, color: "#1e2633", lineHeight: 30 }}>
              Nếu bạn xóa:{" "}
              <Text style={{ fontWeight: "bold" }}>
                {confirmDeleteIndex !== null && recruitments[confirmDeleteIndex]?.TieuDeNoiBo}
              </Text>
              {" "}tất cả các dữ liệu liên quan sẽ bị xóa và không thể phục hồi lại được. Tin tuyển dụng này cũng sẽ không hiển thị trên các báo cáo.
            </Text>

            <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 20 }}>
              <Pressable onPress={() => setConfirmDeleteIndex(null)} style={{ marginRight: 15 }}>
                <Text style={{ color: "gray" }}>Không</Text>
              </Pressable>
              <Pressable onPress={handleConfirmDelete} disabled={loading}>
                <Text style={{ color: "red", fontWeight: "bold" }}>
                  {loading ? "Đang xoá..." : "Có, xóa dữ liệu"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* ✅ MODAL CHIA SẺ (Đã thêm vào và truyền link động) */}
      <ShareRecruitmentModal
        visible={isShareModalVisible}
        onClose={() => setIsShareModalVisible(false)}
        shareLink={dynamicShareLink}
        // Đảm bảo modal luôn ở trên cùng
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... (Phần Stylesheet giữ nguyên) ...
  dropdown: {
    width: 170,
    borderWidth: 0,
    backgroundColor: "transparant",
  },
  dropdowns: {
    width: 150,
    borderWidth: 0,
    backgroundColor: "transparant",
  },
  dropdownContainer: {
    borderRadius: 12,
    borderColor: "#d1d5db",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  text: {
    fontSize: 14,
    color: "#1e2633",
    fontWeight: "500",
  },
  itemText: {
    fontSize: 14,
    color: "#1e2633",
    fontWeight: "400",
  },
  buttonNavRight: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 7,
    color: "#1E2633",
    gap: 6,
    alignItems: "center",
    fontWeight: 500,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    gap: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  checkbox: {
    marginTop: 4,
    marginRight: 8,
  },
  title: {
    fontSize: 19,
    fontWeight: "600",
    color: "#1e2633",
    marginBottom: 8,
  },
  subInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    gap: 6, // React Native chưa hỗ trợ gap, có thể dùng marginRight
  },
  subText: {
    fontSize: 14,
    color: "#1e2633",
    marginRight: 6,
  },
  status: {
    borderWidth: 1,
    borderColor: "#48bb56",
    borderRadius: 6,
    paddingHorizontal: 13,
    paddingVertical: 4,
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
    marginLeft: 8,
  },
  statusText: {
    fontSize: 14,
    color: "#48bb56",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    padding: 4,
  },
  statNumber: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1e2633",
  },
 dropdownWrapper: {
  position: "absolute",
  top: 50,
  right: 0,
  backgroundColor: "#fff",
  borderRadius: 8,
  zIndex: 9999,     // 👈 cao thật cao
  elevation: 20,    // 👈 cho Android
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3.84,
},
  dropdownWrapperFucn: {
position: "absolute",
  top: 50,
  right: 0,
  padding: 15,
  backgroundColor: "#fff",
  borderRadius: 8,
  zIndex: 9999,     // 👈 cao thật cao
  elevation: 20,    // 👈 cho Android
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3.84,
  },
  dropdownFunc: {
    flexDirection: "row",
    width: 200,
    backgroundColor: "#FFFFFF", // nền trắng đặc
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownSF: {
    width: 220,
    backgroundColor: "#FFFFFF", // nền trắng đặc
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },

  statLabel: {
    color: "#6a727d",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
    textOverflow: "ellipsis",
    overflow: "hidden",
    marginTop: 8,
  },

  dark: {
    fontWeight: "700",
  },
 container: {
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  position: "relative",
},

  mainButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    flexDirection: "row",
    gap: 7,
    borderColor: "#48BB56",
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignItems: "center",
    borderRadius: 8,
  },
  mainButtonText: {
    color: "#48BB56",
    fontWeight: "500",
    fontSize: 14,
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  option: {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 6,
  cursor: "pointer",   // 👈 để có hiệu ứng chuột như web
},
  optionLabel: { fontSize: 15, fontWeight: "bold", marginBottom: 3 },
  optionDesc: { fontSize: 14, color: "#555" },
  options: {
  paddingVertical: 10,
  paddingHorizontal: 14,
  borderRadius: 6,
  cursor: "pointer",
},
  optionLabels: { fontSize: 15, fontWeight: "bold", marginBottom: 3 },
  optionDescs: { fontSize: 14, color: "#555" },
  // **Styles MỚI cho Thanh hành động**
  selectionBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectionText: {
    fontSize: 14,
    color: "#1E2633",
    marginRight: 10,
    fontWeight: "700",
  },
  selectionButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    marginRight: 15,
  },
   selectionButton_: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#FFFFFF",
    gap: 6
  },
  selectionButtonText: {
    color: "#2680EB",
    fontWeight: "500",
    fontSize: 14,
  },
});