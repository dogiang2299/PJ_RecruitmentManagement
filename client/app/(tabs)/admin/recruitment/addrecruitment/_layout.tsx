import React, {useState} from "react";
import { useRouter, usePathname, Slot, router } from "expo-router";
import { View, TouchableOpacity, Text } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { ScrollView } from "react-native";
import { SvgProps } from "react-native-svg";
import Octicons from '@expo/vector-icons/Octicons';
import Edit from '../../../../../assets/images/edit.svg';
import MauUngTuyen from '../../../../../assets/images/mauungt2.svg';
import KeHoach from '../../../../../assets/images/kehoachthuchien.svg';
import TaoTrangTin from '../../../../../assets/images/taotrangtin.svg';
import KenhTuyenDung from '../../../../../assets/images/kenhtd2.svg';
import QuyTrinhTuyenDung from '../../../../../assets/images/quytrinhtuyendung.svg';
import HoiDongTuyenDung from '../../../../../assets/images/hoidongtuyendung.svg';
import ChiPhiTuyenDung from '../../../../../assets/images/chiphi2.svg';
import AntDesign from '@expo/vector-icons/AntDesign';

// Khai báo kiểu dữ liệu cho options
interface OptionStatus {
  key: string;
  label: string;
  desc: string;
  color: string;
}
export default function LayoutAddRecruitment(){
    
const pathname = usePathname();
    const [isStatusDropdownVisible, setIsStatusDropdownVisible] = useState(false);    const navLeftRecruitment = [
        { path: "/(tabs)/admin/recruitment/addrecruitment/addRecruitment", icon: Edit, label: 'Thông tin tuyển dụng'},
        { path: "/(tabs)/admin/recruitment/addrecruitment/implementation_plan", icon: KeHoach, label: 'Kế hoạch thực hiện'},
        { path: "/(tabs)/admin/recruitment/addrecruitment/application_form", icon: MauUngTuyen, label: 'Mẫu ứng tuyển'},
        { path: "/(tabs)/admin/recruitment/addrecruitment/recruitment_channel", icon: KenhTuyenDung, label: 'Kênh tuyển dụng'},
        { path: "/(tabs)/admin/recruitment/addrecruitment/recruitment_process", icon: QuyTrinhTuyenDung, label: 'Quy trình tuyển dụng'},
        { path: "/(tabs)/admin/recruitment/addrecruitment/recruitment_board", icon: HoiDongTuyenDung, label: 'Hội đồng tuyển dụng'},
        { path: "/(tabs)/admin/recruitment/addrecruitment/recruitment_costs", icon: ChiPhiTuyenDung, label: 'Chi phí tuyển dụng'}        
    ]
    // ⚠️ CHÚ Ý: Mảng options này đã có sẵn trong file của bạn, tôi chỉ định nghĩa lại kiểu OptionStatus
    const options: OptionStatus[] = [
    {
      key: "public",
      label: "Công khai",
      desc: "Hiển thị công khai trên các kênh tuyển dụng đã thiết lập.",
      color: "#48BB56",
    },
    {
      key: "internal",
      label: "Nội bộ",
      desc: "Có thể xem trực tiếp được liên kết nhưng không hiển thị trên kênh tuyển dụng.",
      color: "#2680eb",
    },
    {
      key: "hold",
      label: "Ngừng nhận hồ sơ",
      desc: "Tin sẽ được gỡ khỏi các kênh tuyển dụng. Không cho phép nộp đơn ứng tuyển.",
      color: "#E54848",
    },
    {
      key: "closed",
      label: "Đóng",
      desc: "Tin tuyển dụng đã được hoàn tất.",
      color: "#646464",
    },
    ];
  // Logic lọc trạng thái dựa trên pathname (giả lập Add vs Edit)
    const filteredOptions = options.filter(opt => {
        // Nếu path chứa addRecruitment (trang Thêm mới), chỉ hiện Công khai/Nội bộ
        if (pathname.includes('/addRecruitment')) {
            return opt.key === 'public' || opt.key === 'internal';
        }
        // Các trang con khác (hoặc Edit), hiện tất cả
        return true; 
    });

  const [currentStatus, setCurrentStatus] = useState<OptionStatus>(options[0]);
    return(
        <View style={{flex: 1}}>
                <View>
        {/* Navbar_top */}
        <View style={{flex: 1, flexDirection: 'row',
          top: 0,
          left: 0,
          right: 0,  height: 64, width: '100%', position: 'sticky',shadowColor: "#00000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          
          shadowRadius: 4, padding: 10, justifyContent: 'space-between',  backgroundColor: '#FFFFFF'}}>
            <View>
                <TouchableOpacity style={{flex: 1, flexDirection: 'row', gap: 10, alignItems: 'center'}} onPress={() => router.push("/(tabs)/admin/recruitment/recruiment_news")}>
                    <AntDesign name="arrowleft" size={24} color="#7A8188" />
                    <Text style={{fontWeight: 600, fontSize: 20, color: "#1E2623"}}>Thêm mới</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={{flex: 1, paddingVertical: 10, borderRadius: 5, paddingHorizontal: 10, borderWidth: 1, borderColor: '#E0E6EC', flexDirection: 'row', gap: 10, alignItems: 'center'}} onPress={() => router.push("/(tabs)/admin/recruitment/recruiment_news")}>
                    <Octicons name="copy" size={20} color="#7A8188" />
                    <Text style={{fontWeight: 600, fontSize: 14, color: "#7A8188"}}>Sao chép nội dung từ tin tuyển khác</Text>
                    <AntDesign name="down" size={10} color="#7A8188" />
                </TouchableOpacity>

            </View>
        </View>
       
        </View>

            <View style={{flexDirection: 'row', gap: 20, flex: 1, paddingTop: 15, justifyContent:'space-between'}}>
                {/* MenuNavbar */}
                <View style={{flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 10, width: 210, height: '100%'}}>
                    { navLeftRecruitment.map((item) => {
                        const isActive = pathname === item.path.replace("/(tabs)", "");
                        return(
                            <TouchableOpacity key={item.path} onPress={() => router.push(item.path as any)} style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 12,
                        borderRadius: 8,
                        marginBottom: 8,
                        backgroundColor: isActive ? "#E1EEFFCC" : "transparent",
                        }}>
                            
                            <item.icon width={20} height={20} style={{ marginRight: 8 }}></item.icon>
                            <Text style={{fontSize: 14, fontWeight: 400, color : isActive ? "#2680EB" : "#1E2633"}}>{item.label}</Text>
                        </TouchableOpacity>
                        );
                        })}
                </View>
                    {/* Contain */}
                    <View style={{flex: 1,  height: '100%'}}>
                        <ScrollView>
                            <Slot></Slot>
                        </ScrollView>
                    </View>
                {/* ButtonUp */}
                <View style={{width: 200, padding: 10, flexDirection: 'column', backgroundColor: '#FFFFFF',  height: '100%'}}>
                    {/* NƠI HIỂN THỊ BUTTON LƯU VÀ ĐĂNG TIN VÀ TRẠNG THÁI CỦA TIN TUYỂN DỤNG */}
             
                </View>
            </View>
            
        </View>
    );
}