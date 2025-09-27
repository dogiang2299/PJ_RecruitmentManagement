// import React, { useState, useEffect  } from "react";
// import { TouchableOpacity, Text, View, ScrollView , Dimensions  } from "react-native";
// import { useRouter, usePathname, Slot } from "expo-router";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { ImageBackground } from "react-native";
// import { Image } from "expo-image";
// import { LinearGradient } from "expo-linear-gradient";
// import Logo from "../../../assets/images/logo_recruit.svg";
// import MessengeIcon from '../../../assets/images/messenge.svg';
// import ClippathIcon from '../../../assets/images/Clippathgroup.svg';
// import WebCruit from '../../../assets/images/website_recruit.svg';
// import Phone from '../../../assets/images/phone.svg';
// import Question from '../../../assets/images/question.svg';
// import Bell from '../../../assets/images/bell.svg';
// import User from '../../../assets/images/user.svg';
// // Định nghĩa kiểu dữ liệu cho các mục menu con
// interface MenuItemChild {
//   titles: string;
//   path: string;
// }

// // Định nghĩa kiểu dữ liệu cho các mục menu cha
// interface MenuItem {
//   title: string;
//   path?: string; // `path?` nghĩa là trường này có thể có hoặc không
//   children?: MenuItemChild[]; // `children?` là một mảng các MenuItemChild và cũng có thể không có
// }
// interface OpenMenusState {
//   [key: string]: boolean;
// }
// // Kích thước màn hình
// const { width } = Dimensions.get('window');
// const isWeb = width >= 768;
// const backgroundShibar =
//   "https://amisplatform.misacdn.net/apps/recruit/sidebar-2.9.31300457ad0aaf7d.png";
// const menuNavRight : MenuItem[] =  [
//   {
//     title: "Sản phẩm",
//     path: ""
//   },
//   {
//     title: "Giải pháp",
//     children: [
//       {
//         titles: "Cho hộ kinh doanh",
//         path: ""
//       },
//       {
//         titles: "Cho Doanh nghiệp",
//         path: ""
//       },
//       {
//         titles: "Cho Giáo dục",
//         path: ""
//       },
//       {
//         titles: "Cho Cơ quan nhà nước",
//         path: ""
//       },
//       {
//         titles: "Cho Cá nhân",
//         path: ""
//       },

//     ]
//   },
//   {
//     title: "Hợp tác",
//     children: [
//       {
//         titles: "Giới thiệu nhận thưởng",
//         path: ""
//       },
//       {
//         titles: "Hợp tác đào tạo",
//         path: ""
//       },
//       {
//         titles: "Trở thành đối tác của MISA",
//         path: ""
//       }
//     ]
//   },
//   {
//     title: "Tin tuyển dụng",
//     children: [
//       {
//         titles: "Tin tuyển dụng",
//         path: ""
//       },
//       {
//         titles: "Nhịp sống MISA",
//         path: ""
//       },
//       {
//         titles: "Môi trường làm việc",
//         path: ""
//       },
//       {
//         titles: "Quyền lợi",
//         path: ""
//       },
//       {
//         titles: "Đào tạo phát triển",
//         path: ""
//       }
//     ]
//   },
//   {
//     title: "Hỗ trợ",
//     children: [
//       {
//         titles: "Kênh tư vấn hỗ trợ",
//         path: ""
//       },
//       {
//         titles: "Lịch đào tạo - chia sẻ",
//         path: ""
//       },
      
//     ]
//   },
//   {
//     title: "Tin tức",
//     path: ""
//   },
//   {
//     title: "Công ty",
//     children: [
//       {
//         titles: "Thông tin liên hệ",
//         path: ""
//       },
//       {
//         titles: "Cơ cấu tổ chức",
//         path: ""
//       },
//        {
//         titles: "Giới thiệu công ty",
//         path: ""
//       },
//       {
//         titles: "Công ty thành viên & liên kết",
//         path: ""
//       },
      
//     ]
//   }
// ]
// const gradientColors = ['rgba(0, 0, 0, 0.8)', 'rgba(255, 255, 255, 0.4)'] as const;

// export default function HomeMS(){

// const router = useRouter();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
// const [openMenus, setOpenMenus] = useState<OpenMenusState>({});
//   const toggleMenu = (title: string) => {
//     setOpenMenus(prevState => ({
//       ...prevState,
//       [title]: !prevState[title],
//     }));
//   }; 
//   const renderMenu = (menuItems: MenuItem[]) => {
//     return (
//     <View style={{ flex: 1, flexDirection: 'column' }}>
//       {/* Navbar trên cùng */}
//       <View style={{ height: 60, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 12, backgroundColor: "#fff", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, elevation: 4 }}>
//         <View>
//           <Image style={{ maxWidth: 100, height: 60, maxHeight: 60, paddingVertical: 10 }} source={{ uri: "https://www.misaus.com/wp-content/uploads/2021/03/logo.svg" }} contentFit="cover" />
//         </View>

//         {isWeb ? (
//           renderMenu(menuNavRight)
//         ) : (
//           <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)}>
//             <Text>☰</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Menu cho mobile */}
//       {!isWeb && isMenuOpen && (
//         <View style={{ position: 'absolute', top: 60, left: 0, right: 0, backgroundColor: '#fff', zIndex: 99 }}>
//           <ScrollView>
//             {renderMenu(menuNavRight)}
//           </ScrollView>
//         </View>
//       )}

//       {/* Nội dung chính của trang */}
//       <ScrollView>
//         <Slot />
//       </ScrollView>
//     </View>   
//      );
//   };
  
//   const logoCompany = 'https://www.misaus.com/wp-content/uploads/2021/03/logo.svg';
//     return(
//        <ScrollView>
//         <View style={{flex: 1, flexDirection: 'column'}}>
//           {/* Navbar trên cùng */}
//           <View style={{ height: 60, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 12, backgroundColor: "#fff", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, elevation: 4, }}>
//             <View>
//               <Image
//                 style={{ maxWidth: 100, height: 60, maxHeight: 60, paddingVertical: 10 }} // Đặt kích thước cho ảnh
//                 source={{ uri: backgroundShibar }} // Chỉ định nguồn ảnh là URL
//                 contentFit="cover" // Đảm bảo ảnh vừa với kích thước đã đặt
//                 />;
//             </View>
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               {menuNavRight.map((itemleft, index) => (
//                 <TouchableOpacity
//                   key={itemleft.path || index}
//                   onPress={() => itemleft.path && router.push(itemleft.path as any)}
//                   style={{
//                     paddingHorizontal: 8,
//                     paddingVertical: 4,
//                     marginRight: index < menuNavRight.length - 1 ? 10 : 0,
//                   }}
//                 >
//                   {itemleft.title && (
//                     <Text
//                       style={{
//                         fontSize: 16,
//                         fontWeight: "500",
//                         color: "#1e2633",
//                       }}
//                     >
//                       {itemleft.title}
//                     </Text>
//                   )}
//                 </TouchableOpacity>
//               ))}
//             </View>          
//             </View>

//           {/* Content */}
//           <View>
//             <Slot></Slot>
//           </View>
//         </View>
//        </ScrollView>
//     )
// }






import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function LayoutUser() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#22C55E", // xanh lá
        tabBarInactiveTintColor: "#6B7280",
        tabBarStyle: {
          backgroundColor: "#F3F4F6",
          paddingVertical: 5,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      {/* 5 tab chính */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="taoCV"
        options={{
          title: "Tạo CV",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="topConnect"
        options={{
          title: "Top Connect",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="thongBao"
        options={{
          title: "Thông báo",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="taiKhoan"
        options={{
          title: "Tài khoản",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
     
    </Tabs>
  );
}
