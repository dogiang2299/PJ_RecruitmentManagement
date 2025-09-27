// app/(tabs)/index.tsx - Trang chủ

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal
} from "react-native";
const suggestedJobs = [
  {
    id: 1,
    title: "Front End Developer (React.JS)",
    salary: "700 - 2,000 USD",
    company: "CÔNG TY CỔ PHẦN STRINGEE",
    location: "Hà Nội",
    logo: require("../../../assets/images/Banner.jpg"),
    verified: true,
  "description": "Tham gia vào toàn bộ quá trình phát triển các ứng dụng web phức tạp, từ việc lên ý tưởng, thiết kế đến triển khai và bảo trì. Bạn sẽ:\n• Chịu trách nhiệm chính trong việc xây dựng các giao diện người dùng (UI) hiệu quả và đẹp mắt.\n• Viết mã JavaScript, React.JS, HTML5 và CSS3 chất lượng cao, có cấu trúc rõ ràng và dễ bảo trì.\n• Phối hợp chặt chẽ với các thành viên trong đội ngũ Backend, UI/UX Designer và QA để đảm bảo sản phẩm được hoàn thiện một cách trơn tru.\n• Luôn cập nhật và nghiên cứu các công nghệ, framework, và thư viện mới nhất trong hệ sinh thái React.\n• Tối ưu hóa hiệu suất của ứng dụng bằng các kỹ thuật như lazy loading, code splitting, và tối ưu hóa hình ảnh.\n• Chủ động tìm kiếm, phân tích và sửa các lỗi phát sinh trong quá trình phát triển và sau khi triển khai sản phẩm.",
"requirements": "• Có ít nhất 2 năm kinh nghiệm thực tế với React.JS và các thư viện liên quan như Redux/Redux Toolkit, MobX.\n• Thành thạo việc sử dụng HTML5, CSS3/SASS, và JavaScript (ES6+).\n• Có kinh nghiệm làm việc với các RESTful APIs và xử lý dữ liệu JSON.\n• Hiểu biết về các công cụ quản lý trạng thái, router và các thư viện xây dựng giao diện người dùng như Material-UI, Ant Design.\n• Có kinh nghiệm với Git để quản lý mã nguồn.\n• Ưu tiên ứng viên có kiến thức về Next.js, TypeScript và testing (Jest, React Testing Library).",
"benefits": "• Lương và thưởng: Mức lương cạnh tranh, hấp dẫn và tương xứng với năng lực. Xét duyệt tăng lương định kỳ 2 lần/năm.\n• Chế độ bảo hiểm: Đầy đủ các chế độ Bảo hiểm xã hội, Bảo hiểm y tế, Bảo hiểm thất nghiệp theo luật định.\n• Sức khỏe: Khám sức khỏe định kỳ hàng năm và hưởng gói bảo hiểm sức khỏe cao cấp.\n• Du lịch và hoạt động tập thể: Du lịch công ty hàng năm, các buổi team building sôi động, liên hoan hàng tháng.\n• Môi trường làm việc: Môi trường làm việc trẻ trung, năng động, thoải mái. Lộ trình thăng tiến rõ ràng, được tạo điều kiện phát triển tối đa.",    otherInfo: {
      degree: "Cao đẳng trở lên",
      experience: "1 năm kinh nghiệm",
      workType: "Toàn thời gian",
    },
  },
  // Thêm các job khác với thông tin chi tiết tương tự
  {
    id: 2,
    title: "Fresher Backend Java",
    salary: "15 - 30 triệu",
    company: "Công ty Cổ phần Falcon Technology",
    location: "Hà Nội",
    logo: require("../../../assets/images/bg9.jpg"),
    verified: true,
    description: "Phát triển và duy trì các hệ thống backend bằng Java. Tối ưu hóa hiệu suất và độ tin cậy của ứng dụng.",
    requirements: "Có kiến thức vững về Java, Spring Boot. Hiểu biết về database (SQL, NoSQL).",
    benefits: "Lương hấp dẫn, thưởng dự án, lộ trình thăng tiến rõ ràng, được đào tạo bài bản.",
    otherInfo: {
      degree: "Đại học",
      experience: "0 năm kinh nghiệm",
      workType: "Toàn thời gian",
    },
  }
];// Thêm đoạn code này vào đầu file của bạn
interface Job {
  id: number;
  title: string;
  salary: string;
  company: string;
  location: string;
  logo: string;
  verified?: boolean; // Dấu '?' cho biết thuộc tính này là tùy chọn
  description?: string;
  requirements?: string;
  benefits?: string;
  otherInfo?: {
    degree: string;
    experience: string;
    workType: string;
  };
}
export default function TrangChuScreen() {
  const jobsPerPage = 4;
const [selectedJob, setSelectedJob] = useState<Job | null>(null);  
const handlePressJob = (job: Job) => {
    setSelectedJob(job);
  };
  const handleCloseDetail = () => {
    setSelectedJob(null);
  };
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(suggestedJobs.length / jobsPerPage);
  const startIndex = currentPage * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const jobsToShow = suggestedJobs.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const jobCategories = [
    { title: "Việc làm", icon: "💼", color: "#4CAF50" },
    { title: "Công ty", icon: "🏢", color: "#2196F3" },
    { title: "Tạo CV", icon: "📄", color: "#FF9800" },
    { title: "Blog", icon: "📰", color: "#8BC34A" },
    { title: "Công cụ", icon: "🛠️", color: "#FF5722" },
  ];


  const topJobs = [
    {
      id: 9,
      title: "Java Engineer",
      salary: "800 - 3,500 USD",
      company: "Khối Công nghệ thông tin - Viettel Telecom",
      location: "Hà Nội",
    },
    {
      id: 10,
      title: "Chuyên Viên Phát Triển Kênh Truyền Thông - Kinh Nghiệm 2 Năm",
      salary: "10 - 15 triệu",
      company: "CÔNG TY CỔ PHẦN MEGA SUN",
      location: "Hà Nội",
    },
    {
    id: 9,
    title: "Java Engineer",
    salary: "800 - 3,500 USD",
    company: "Khối Công nghệ thông tin - Viettel Telecom",
    location: "Hà Nội",
  },
  {
    id: 10,
    title: "Chuyên Viên Phát Triển Kênh Truyền Thông - Kinh Nghiệm 2 Năm",
    salary: "10 - 15 triệu",
    company: "CÔNG TY CỔ PHẦN MEGA SUN",
    location: "Hà Nội",
  },
  // 8 mẫu dữ liệu mới được thêm vào
  {
    id: 11,
    title: "Product Manager",
    salary: "1,500 - 2,500 USD",
    company: "Công ty Cổ phần Techcombank",
    location: "TP. Hồ Chí Minh",
  },
  {
    id: 12,
    title: "Front End Developer (Vue.js)",
    salary: "15 - 25 triệu",
    company: "Công ty Cổ phần Vietcombank",
    location: "Đà Nẵng",
  },
  {
    id: 13,
    title: "Backend Engineer (Node.js)",
    salary: "1,200 - 2,000 USD",
    company: "Tập đoàn Vingroup",
    location: "Hà Nội",
  },
  {
    id: 14,
    title: "Data Scientist",
    salary: "1,800 - 3,000 USD",
    company: "FPT Software",
    location: "TP. Hồ Chí Minh",
  },
  {
    id: 15,
    title: "Business Analyst",
    salary: "12 - 20 triệu",
    company: "Công ty Cổ phần FPT",
    location: "Hà Nội",
  },
  {
    id: 16,
    title: "Mobile Developer (iOS/Swift)",
    salary: "18 - 30 triệu",
    company: "Công ty TNHH TMA Solutions",
    location: "TP. Hồ Chí Minh",
  },
  {
    id: 17,
    title: "HR Specialist",
    salary: "8 - 14 triệu",
    company: "Công ty Cổ phần Viettel",
    location: "Hà Nội",
  },
  {
    id: 18,
    title: "Graphic Designer",
    salary: "9 - 16 triệu",
    company: "Công ty TNHH Gameloft",
    location: "TP. Hồ Chí Minh",
  }
  ];

  const topCompanies = [
    {
      name: "Ngân Hàng TMCP Việt Nam Thịnh Vượng (VPBank)",
      category: "Ngân hàng",
      logo: require("../../../assets/images/react-logo.png"),
    },
    {
      name: "NGÂN HÀNG THƯƠNG MẠI CỔ PHẦN KỸ THƯƠNG VIỆT NAM (TECHCOMBANK)",
      category: "Ngân hàng",
      logo: require("../../../assets/images/react-logo.png"),
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/images/react-logo.png")}
            style={styles.logoImg}
          />
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarWrap}>
        <Ionicons
          name="search"
          size={20}
          color="#4CAF50"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="thực tập sinh công nghệ thông tin"
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
      </View>

      {/* Job Categories */}
      <View style={styles.categoriesRow}>
        {jobCategories.map((category, idx) => (
          <View key={idx} style={styles.categoryCol}>
            <View
              style={[styles.categoryCircle, { backgroundColor: "#E6F4EA" }]}
            >
              <Text style={{ fontSize: 28 }}>{category.icon}</Text>
            </View>
            <Text style={styles.categoryLabel}>{category.title}</Text>
          </View>
        ))}
      </View>

      {/* Discover Jobs Button */}
      <TouchableOpacity style={styles.discoverBtn}>
        <Ionicons
          name="map"
          size={18}
          color="#3B82F6"
          style={{ marginRight: 6 }}
        />
        <Text style={styles.discoverBtnText}>Khám phá việc làm gần bạn</Text>
      </TouchableOpacity>

      {/* Gợi ý việc làm phù hợp */}
      <View style={styles.sectionBlock}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Gợi ý việc làm phù hợp</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        {/* Danh sách công việc */}
        {/* Nút điều hướng */}
      <View style={styles.paginationControls}>
        <TouchableOpacity onPress={handlePrevPage} disabled={currentPage === 0}>
          <Text style={{ color: currentPage === 0 ? '#ccc' : '#007bff' }}>{'<'} Trang trước</Text>
        </TouchableOpacity>
        <Text style={styles.pageNumber}>
          Trang {currentPage + 1} / {totalPages}
        </Text>
        <TouchableOpacity onPress={handleNextPage} disabled={currentPage === totalPages - 1}>
          <Text style={{ color: currentPage === totalPages - 1 ? '#ccc' : '#007bff' }}>Trang sau {'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách công việc */}
      {/* Danh sách công việc */}
      {jobsToShow.map((job) => (
        <TouchableOpacity key={job.id} onPress={() => handlePressJob(job)}>
          <View style={styles.jobCard}>
            <View style={styles.jobCardRow}>
              <Image source={{ uri: job.logo }} style={styles.jobLogo} />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  {job.verified && (
                    <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={{ marginLeft: 4 }} />
                  )}
                </View>
                <Text style={styles.jobCompany}>{job.company}</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="heart-outline" size={20} color="#3B82F6" />
              </TouchableOpacity>
            </View>
            <View style={styles.jobCardFooter}>
              <View style={styles.salaryTag}>
                <Text style={styles.salaryText}>{job.salary}</Text>
              </View>
              <View style={styles.locationTag}>
                <Text style={styles.locationText}>{job.location}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      </View>

      {/* /* Modal chi tiết công việc */}
      {/* Modal hiển thị chi tiết */}
      <Modal
        animationType="slide"
        visible={selectedJob !== null}
        onRequestClose={handleCloseDetail}
      >
        <View style={styles.detailContainer}>
          <View style={styles.detailHeader}>
            <TouchableOpacity onPress={handleCloseDetail}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.detailTitle}>{selectedJob?.title}</Text>
            <TouchableOpacity>
              <Ionicons name="ellipsis-vertical" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.detailContent}>
        <Image source={{ uri: selectedJob?.logo }} style={styles.detailLogo} />            <Text style={styles.detailJobTitle}>{selectedJob?.title}</Text>
            <Text style={styles.detailCompany}>{selectedJob?.company}</Text>
            <View style={styles.infoTags}>
              <View style={styles.infoTag}>
                <Ionicons name="cash-outline" size={20} color="#333" />
                <Text style={styles.infoText}>{selectedJob?.salary}</Text>
              </View>
              <View style={styles.infoTag}>
                <Ionicons name="location-outline" size={20} color="#333" />
                <Text style={styles.infoText}>{selectedJob?.location}</Text>
              </View>
              <View style={styles.infoTag}>
                <Ionicons name="star-outline" size={20} color="#333" />
                <Text style={styles.infoText}>{selectedJob?.otherInfo?.experience}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Mô tả công việc</Text>
              <Text style={styles.sectionText}>{selectedJob?.description}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Yêu cầu ứng viên</Text>
              <Text style={styles.sectionText}>{selectedJob?.requirements}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quyền lợi</Text>
              <Text style={styles.sectionText}>{selectedJob?.benefits}</Text>
            </View>
          <View style={{flexDirection: 'column',backgroundColor: '#FFFFFF', padding: 15, borderRadius: 8}}>
            <View>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 16}}>Việc làm tốt nhất</Text>
            </View>
            {topJobs.map((job, idx) => (
          <View key={job.id} style={styles.jobCard}>
            <View style={styles.jobCardRow}>
              <View style={styles.jobLogoPlaceholder} />
              <View style={{ flex: 1 }}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.jobCompany}>{job.company}</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="heart-outline" size={20} color="#3B82F6" />
              </TouchableOpacity>
            </View>
            <View style={styles.jobCardFooter}>
              <View style={styles.salaryTag}>
                <Text style={styles.salaryText}>{job.salary}</Text>
              </View>
              <View style={styles.locationTag}>
                <Text style={styles.locationText}>{job.location}</Text>
              </View>
            </View>
          </View>
        ))}
          </View>
        

          </ScrollView>

          <View style={styles.applyFooter}>
            <TouchableOpacity style={styles.saveButton}>
              <Ionicons name="heart-outline" size={24} color="#22C55E" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Ứng tuyển ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Việc làm tốt nhất */}
      <View style={styles.sectionBlock}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Việc làm tốt nhất</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        {topJobs.map((job, idx) => (
          <View key={job.id} style={styles.jobCard}>
            <View style={styles.jobCardRow}>
              <View style={styles.jobLogoPlaceholder} />
              <View style={{ flex: 1 }}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.jobCompany}>{job.company}</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="heart-outline" size={20} color="#3B82F6" />
              </TouchableOpacity>
            </View>
            <View style={styles.jobCardFooter}>
              <View style={styles.salaryTag}>
                <Text style={styles.salaryText}>{job.salary}</Text>
              </View>
              <View style={styles.locationTag}>
                <Text style={styles.locationText}>{job.location}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Thương hiệu lớn tiêu biểu */}
      <View style={styles.sectionBlock}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Thương hiệu lớn tiêu biểu</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.companyGrid}>
          {topCompanies.map((company, idx) => (
            <View key={idx} style={styles.companyCard}>
              <View style={styles.companyLogoWrap}>
                <Image source={company.logo} style={styles.companyLogoImg} />
              </View>
              <Text style={styles.companyNameCard} numberOfLines={2}>
                {company.name}
              </Text>
              <Text style={styles.companyCategoryCard}>{company.category}</Text>
              <TouchableOpacity style={styles.followBtn}>
                <Ionicons name="add" size={16} color="#3B82F6" />
                <Text style={styles.followBtnText}>Theo dõi</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Banner dưới cùng */}
      <View style={styles.bottomBanner}>
        <Text style={styles.bannerTitle}>100+ Mẫu</Text>
        <TouchableOpacity style={styles.bannerBtn}>
          <Ionicons
            name="map"
            size={18}
            color="#3B82F6"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.bannerBtnText}>Việc làm gần bạn</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: "#F3F4F6",
    paddingTop: 8,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
    backgroundColor: "#F3F4F6",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 8,
  },
  logoImg: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  searchBarWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 24,
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#222",
    paddingVertical: 4,
  },
  categoriesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 10,
  },
  categoryCol: {
    alignItems: "center",
    flex: 1,
  },
  categoryCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  categoryLabel: {
    fontSize: 13,
    color: "#222",
    marginTop: 2,
  },
  discoverBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  discoverBtnText: {
    color: "#3B82F6",
    fontWeight: "600",
    fontSize: 15,
  },
  sectionBlock: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },
  sectionAction: {
    color: "#22C55E",
    fontWeight: "600",
    fontSize: 14,
  },
  jobCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0E7EF",
  },
  jobCardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  jobLogo: {
    width: 38,
    height: 38,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E7EF",
  },
  jobLogoPlaceholder: {
    width: 38,
    height: 38,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: "#E5E7EB",
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    flexShrink: 1,
  },
  jobCompany: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  jobCardFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  salaryTag: {
    backgroundColor: "#E6F4EA",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginRight: 8,
  },
  salaryText: {
    color: "#22C55E",
    fontWeight: "600",
    fontSize: 13,
  },
  locationTag: {
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  locationText: {
    color: "#64748B",
    fontSize: 13,
  },
  companyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 6,
  },
  companyCard: {
    width: "48%",
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E7EF",
  },
  companyLogoWrap: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E7EF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  companyLogoImg: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  companyNameCard: {
    fontSize: 13,
    color: "#222",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 2,
  },
  companyCategoryCard: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 6,
  },
  followBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#3B82F6",
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  followBtnText: {
    color: "#3B82F6",
    fontWeight: "600",
    fontSize: 13,
    marginLeft: 4,
  },
  bottomBanner: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginRight: 12,
  },
  bannerBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6F4EA",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  bannerBtnText: {
    color: "#22C55E",
    fontWeight: "600",
    fontSize: 14,
  },
  paginationControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  pageNumber: {
    fontWeight: 'bold',
  },
  
  footer: { height: 100 },
  // Styles for Job Detail Modal
  detailContainer: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  detailContent: {
    flex: 1,
    padding: 15,
  },
  detailLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 10,
  },
  detailJobTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  detailCompany: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  infoTags: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  infoTag: {
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  sectionText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  applyFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  saveButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginRight: 15,
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#22C55E',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
