import React, { createContext, useState, useContext, ReactNode } from 'react';

// ====================================================
// 1. INTERFACE CHO DỮ LIỆU CỐT LÕI (Bảng tintuyendung)
// ====================================================

/**
 * Interface chứa tất cả các trường dữ liệu cần thiết từ bảng tintuyendung
 * để thực hiện chức năng Thêm mới/Chỉnh sửa cơ bản.
 */
export interface RecruitmentData {
  // --- Dữ liệu văn bản và số ---
  TieuDeNoiBo: string;
  TieuDeTinDang: string;
  MucLuongTu: number | null;
  MucLuongDen: number | null;
  SoLuongHienThiTrenWebsite: number | null;
  TuKhoaTimKiem: string | null;

  // --- Dữ liệu chọn (IDs và ENUM/String) ---
  MaDonVi_ID: number | null; 
  MaCapBac: number | null;
  MaViTriCongViec_ID: number | null;
  LoaiHinhCongViec: string; 
  LoaiTien: string;
  HienThiMucDoTrenTinTuyen: string; 
  NgonNgu: string; 
  MaQuyTrinhTuyenDung_ID: number | null; 
  
  // --- Dữ liệu Mô tả/File/Ngày tháng ---
  HanNopHoSo: string | null; // Cần định dạng YYYY-MM-DD
  AnhMoTaCongViec: string | null; 
  FileTaiLieuDinhKem: string | null; 

  // --- Trường cần thiết cho API ---
  MaTinTuyenDung?: number; // Mã PK, chỉ có khi Chỉnh sửa (Edit)
  MaNguoiDung_ID: number; // ID người tạo (Giả định lấy từ session)
}


// ====================================================
// 2. INTERFACE CHO CONTEXT PROPS (Hàm và State)
// ====================================================

interface RecruitmentContextProps {
  formData: RecruitmentData;
  /** Cập nhật một trường dữ liệu (key) với giá trị mới (value) */
  updateFormData: (key: keyof RecruitmentData, value: any) => void;
  /** ID tin tuyển dụng (PK) hiện tại, dùng để phân biệt Thêm mới/Chỉnh sửa */
  recruitmentId: number | null;
  /** Hàm dùng để nạp ID tin tuyển dụng khi vào chế độ Chỉnh sửa */
  setRecruitmentId: (id: number | null) => void;
  /** Hàm nạp toàn bộ dữ liệu khi vào chế độ Chỉnh sửa */
  setInitialData: (data: RecruitmentData) => void;
}

// ====================================================
// 3. KHỞI TẠO VÀ PROVIDER
// ====================================================

// Khởi tạo giá trị mặc định ban đầu
const defaultData: RecruitmentData = {
    TieuDeNoiBo: '', TieuDeTinDang: '',
    MaDonVi_ID: null, MaCapBac: null, MaViTriCongViec_ID: null, 
    LoaiHinhCongViec: 'Toàn thời gian', LoaiTien: 'VND', HienThiMucDoTrenTinTuyen: 'Thoả mãn', 
    NgonNgu: 'Tiếng Việt', MaQuyTrinhTuyenDung_ID: null, 
    MucLuongTu: null, MucLuongDen: null, SoLuongHienThiTrenWebsite: null, 
    HanNopHoSo: null, AnhMoTaCongViec: null, FileTaiLieuDinhKem: null, 
    TuKhoaTimKiem: null, 
    MaNguoiDung_ID: 1, // GIẢ ĐỊNH: ID người dùng hiện tại là 1
};

const RecruitmentFormContext = createContext<RecruitmentContextProps | undefined>(undefined);

// Component Provider chính
export const RecruitmentFormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<RecruitmentData>(defaultData);
  const [recruitmentId, setRecruitmentId] = useState<number | null>(null);

  // Hàm cập nhật dữ liệu
  const updateFormData = (key: keyof RecruitmentData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };
  
  // Hàm nạp dữ liệu (cho Chế độ Chỉnh sửa)
  const setInitialData = (data: RecruitmentData) => {
      setFormData(data);
      setRecruitmentId(data.MaTinTuyenDung || null); // Đảm bảo ID được set
  }

  return (
    <RecruitmentFormContext.Provider value={{ 
        formData, 
        updateFormData, 
        recruitmentId, 
        setRecruitmentId,
        setInitialData
    }}>
      {children}
    </RecruitmentFormContext.Provider>
  );
};

// ====================================================
// 4. CUSTOM HOOK
// ====================================================

/**
 * Hook tùy chỉnh để truy cập dữ liệu và hàm cập nhật của Form Tuyển dụng.
 */
export const useRecruitmentForm = () => {
  const context = useContext(RecruitmentFormContext);
  if (!context) {
    throw new Error('useRecruitmentForm must be used within a RecruitmentFormProvider. Vui lòng kiểm tra _layout.tsx đã bọc Provider chưa.');
  }
  return context;
};