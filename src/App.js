import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  LayoutDashboard,
  Building2,
  Users,
  UserCog,
  GraduationCap,
  TrendingUp,
  Settings,
  FileSpreadsheet,
  Map,
  LogIn,
  ChevronDown,
  ChevronRight,
  Briefcase,
  Activity,
  Database,
  Presentation,
  Search,
  Filter,
  UploadCloud,
  Edit,
  Trash2,
  LogOut,
  CheckCircle2,
  FileDown,
  HeartPulse,
  Globe,
  BookOpen,
} from "lucide-react";

// ==========================================
// 1. DATA BASE MOCKUP (ฐานข้อมูลตั้งต้น)
// ข้อมูลชุดนี้จำลองมาจากการดึงฐานข้อมูลจริง สพม.
// ==========================================
const SUMMARY_KPI_BASE = {
  schools: 81,
  students: 71710,
  teachers: 4520,
  dropouts: 38,
  rooms: 2211,
};

const SCHOOL_SIZE_OBEC_BASE = [
  { name: "ขนาดเล็ก (<120)", value: 3, color: "#ef4444" },
  { name: "ขนาดเล็ก (121-600)", value: 34, color: "#f97316" },
  { name: "ขนาดกลาง (601-1500)", value: 29, color: "#eab308" },
  { name: "ขนาดใหญ่ (1501-2500)", value: 8, color: "#3b82f6" },
  { name: "ขนาดใหญ่พิเศษ (>2500)", value: 7, color: "#8b5cf6" },
];

const SCHOOL_SIZE_OTEPC_BASE = [
  { name: "ขนาดเล็ก (<=119)", value: 3, color: "#ef4444" },
  { name: "ขนาดกลาง (120-719)", value: 47, color: "#eab308" },
  { name: "ขนาดใหญ่ (720-1679)", value: 17, color: "#3b82f6" },
  { name: "ขนาดใหญ่พิเศษ (>=1680)", value: 14, color: "#8b5cf6" },
];

const DEMOGRAPHICS_BASE = [
  {
    grade: "ม.1",
    ชาย: 6272,
    หญิง: 7088,
    รวม: 13360,
    ห้อง: 390,
    level: "ม.ต้น",
  },
  {
    grade: "ม.2",
    ชาย: 6101,
    หญิง: 7144,
    รวม: 13245,
    ห้อง: 394,
    level: "ม.ต้น",
  },
  {
    grade: "ม.3",
    ชาย: 5776,
    หญิง: 6640,
    รวม: 12416,
    ห้อง: 378,
    level: "ม.ต้น",
  },
  {
    grade: "ม.4",
    ชาย: 4336,
    หญิง: 6405,
    รวม: 10741,
    ห้อง: 342,
    level: "ม.ปลาย",
  },
  {
    grade: "ม.5",
    ชาย: 4142,
    หญิง: 6562,
    รวม: 10704,
    ห้อง: 352,
    level: "ม.ปลาย",
  },
  {
    grade: "ม.6",
    ชาย: 4391,
    หญิง: 6853,
    รวม: 11244,
    ห้อง: 355,
    level: "ม.ปลาย",
  },
];

const SPATIAL_PROVINCE_BASE = [
  {
    name: "อุบลราชธานี",
    schools: 59,
    students: 55857,
    color: "#eff6ff",
    textColor: "#1d4ed8",
    borderColor: "#bfdbfe",
  },
  {
    name: "อำนาจเจริญ",
    schools: 22,
    students: 15853,
    color: "#ecfdf5",
    textColor: "#047857",
    borderColor: "#a7f3d0",
  },
];

const SPATIAL_CONSORTIUM_BASE = [
  { name: "เมืองม่วงสามสิบ", โรงเรียน: 7, นักเรียน: 8256, ห้องเรียน: 250 },
  { name: "เมืองดอกบัว", โรงเรียน: 7, นักเรียน: 6463, ห้องเรียน: 210 },
  { name: "พระใหญ่เขื่องใน", โรงเรียน: 6, นักเรียน: 3482, ห้องเรียน: 125 },
  { name: "เขมราฎร์ธานี", โรงเรียน: 5, นักเรียน: 4190, ห้องเรียน: 140 },
  { name: "อำนาจเจริญ", โรงเรียน: 7, นักเรียน: 7121, ห้องเรียน: 215 },
];

const SPATIAL_AMPHOE_BASE = [
  { name: "เมืองอุบลฯ", โรงเรียน: 11, นักเรียน: 10842, ห้องเรียน: 350 },
  { name: "เขื่องใน", โรงเรียน: 8, นักเรียน: 3482, ห้องเรียน: 120 },
  { name: "เมืองอำนาจฯ", โรงเรียน: 7, นักเรียน: 7121, ห้องเรียน: 215 },
  { name: "วารินชำราบ", โรงเรียน: 6, นักเรียน: 5430, ห้องเรียน: 175 },
  { name: "เดชอุดม", โรงเรียน: 5, นักเรียน: 4890, ห้องเรียน: 160 },
];

const WEIGHT_DATA_BASE = [
  { name: "ผอม", value: 2382, color: "#f87171" },
  { name: "ค่อนข้างผอม", value: 4114, color: "#fb923c" },
  { name: "สมส่วน", value: 56154, color: "#10b981" },
  { name: "ท้วม", value: 3079, color: "#fbbf24" },
  { name: "เริ่มอ้วน", value: 3388, color: "#f97316" },
  { name: "อ้วน", value: 1950, color: "#ef4444" },
];

const HEIGHT_DATA_BASE = [
  { name: "เตี้ย", value: 3428, color: "#f87171" },
  { name: "ค่อนข้างเตี้ย", value: 3365, color: "#fb923c" },
  { name: "สูงตามเกณฑ์", value: 57951, color: "#10b981" },
  { name: "ค่อนข้างสูง", value: 4058, color: "#3b82f6" },
  { name: "สูง", value: 2807, color: "#6366f1" },
];

const EDUCATION_CONTINUE_BASE = {
  m3: [
    { name: "ม.4 รร.เดิม", value: 8022, fill: "#3b82f6" },
    { name: "ม.4 ในจังหวัด", value: 668, fill: "#60a5fa" },
    { name: "อาชีวศึกษา", value: 1120, fill: "#10b981" },
    { name: "ไม่เรียนต่อ", value: 84, fill: "#ef4444" },
  ],
  m6: [
    { name: "ม.รัฐบาล", value: 6606, fill: "#3b82f6" },
    { name: "ม.ราชภัฏฯ", value: 845, fill: "#60a5fa" },
    { name: "ม.เอกชน", value: 55, fill: "#a855f7" },
    { name: "ไม่เรียนต่อ", value: 24, fill: "#ef4444" },
  ],
};

const DROPOUTS_REASON_BASE = [
  { reason: "ปัญหาในการปรับตัว", value: 2 },
  { reason: "สมรส", value: 1 },
  { reason: "หาเลี้ยงครอบครัว", value: 8 },
  { reason: "อพยพตามผู้ปกครอง", value: 3 },
  { reason: "อื่นๆ", value: 14 },
];

export default function App() {
  // ==========================================
  // 2. STATE MANAGEMENT (จัดการสถานะของแอพ)
  // ==========================================
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [expandedMenus, setExpandedMenus] = useState({
    general: false,
    analytics: false,
    admin: true,
  });

  const [filters, setFilters] = useState({
    year: "2568",
    semester: "1",
    province: "All",
    consortium: "All",
    amphoe: "All",
    school: "All",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username && loginData.password) {
      setIsLoggedIn(true);
      setShowLoginModal(false);
    }
  };

  const toggleMenu = (menu) =>
    setExpandedMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));

  // ==========================================
  // HANDLERS สำหรับการดาวน์โหลดต้นแบบและอัปโหลดไฟล์
  // ==========================================
  const downloadTemplate = (type) => {
    let csvContent = "";
    let fileName = "";
    if (type === "student") {
      csvContent =
        "ปีการศึกษา,ภาคเรียน,รหัสโรงเรียน,ชื่อโรงเรียน,ระดับชั้น,นักเรียนชาย,นักเรียนหญิง,รวม,ห้องเรียน\n2568,1,34012001,เบ็ญจะมะมหาราช,ม.1,292,302,594,16\n";
      fileName = "ต้นแบบนักเรียน.csv";
    } else if (type === "personnel") {
      csvContent =
        "ปีการศึกษา,ภาคเรียน,รหัสโรงเรียน,ชื่อโรงเรียน,จำนวนครูผู้สอน,พนักงานราชการ,ลูกจ้าง\n2568,1,34012001,เบ็ญจะมะมหาราช,172,3,1\n";
      fileName = "ต้นแบบบุคลากร.csv";
    } else if (type === "health") {
      csvContent =
        "ปีการศึกษา,ภาคเรียน,รหัสโรงเรียน,ชื่อโรงเรียน,รหัสG,สัญชาติ_ไทย,สัญชาติ_กัมพูชา,พุทธ,คริสต์,อิสลาม,ผอม,สมส่วน,อ้วน,เตี้ย,สูงตามเกณฑ์\n2568,1,34012001,เบ็ญจะมะมหาราช,0,3200,2,3190,10,2,150,2800,250,100,3000\n";
      fileName = "ต้นแบบสุขภาวะและประชากร.csv";
    } else if (type === "academic") {
      csvContent =
        "ปีการศึกษา,ภาคเรียน,รหัสโรงเรียน,ชื่อโรงเรียน,ONET_ไทย,ONET_คณิต,จบม3_ต่อเดิม,จบม3_อาชีวะ,จบม6_รัฐบาล,ออกกลางคัน_ปรับตัว,ออกกลางคัน_ครอบครัว\n2568,1,34012001,เบ็ญจะมะมหาราช,65.5,58.2,500,20,550,0,1\n";
      fileName = "ต้นแบบวิชาการและสถานภาพ.csv";
    }
    // ใช้ BOM (\ufeff) เพื่อให้ Excel อ่านภาษาไทยได้ถูกต้อง
    const blob = new Blob(["\ufeff" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(
        `อัปโหลดไฟล์ "${file.name}" สำเร็จ!\nระบบ (จำลอง) ได้ทำการอ่านคอลัมน์ "ปีการศึกษา" และ "ภาคเรียน" เพื่อจัดเก็บฐานข้อมูลเรียบร้อยแล้ว`
      );
      e.target.value = null;
    }
  };

  // ==========================================
  // 3. DYNAMIC DATA FILTERING LOGIC (ตัวกรองอัจฉริยะ)
  // ==========================================
  const appData = useMemo(() => {
    let f = 1.0;

    // คำนวณสัดส่วนการย่อ-ขยายข้อมูล ตามตัวกรองส่วนกลางที่ผู้ใช้เลือก
    if (filters.year === "2567") f *= 0.95;
    if (filters.province === "อุบลราชธานี") f *= 0.778;
    else if (filters.province === "อำนาจเจริญ") f *= 0.222;
    if (filters.amphoe === "เมืองอุบลราชธานี") f *= 0.15;
    else if (filters.amphoe === "เขื่องใน") f *= 0.05;
    if (filters.consortium === "เมืองม่วงสามสิบ") f *= 0.115;
    else if (filters.consortium === "เมืองดอกบัว") f *= 0.09;
    if (filters.school !== "All") f *= 0.03; // ถ้าระบุโรงเรียนจำลองให้เหลือข้อมูลน้อยลง

    // ฟังก์ชันคำนวณสเกลตัวเลข
    const scale = (val) => Math.max(1, Math.round(val * f));
    const scaleArr = (arr, keys) =>
      arr.map((item) => {
        let res = { ...item };
        keys.forEach((k) => (res[k] = scale(item[k])));
        return res;
      });

    const kpi = {
      schools: scale(SUMMARY_KPI_BASE.schools),
      students: scale(SUMMARY_KPI_BASE.students),
      teachers: scale(SUMMARY_KPI_BASE.teachers),
      dropouts: scale(SUMMARY_KPI_BASE.dropouts),
      rooms: scale(SUMMARY_KPI_BASE.rooms),
    };

    const scaledDemographics = scaleArr(DEMOGRAPHICS_BASE, [
      "ชาย",
      "หญิง",
      "รวม",
      "ห้อง",
    ]);
    const totalMton = scaledDemographics
      .slice(0, 3)
      .reduce((sum, d) => sum + d.รวม, 0);
    const totalMplay = scaledDemographics
      .slice(3, 6)
      .reduce((sum, d) => sum + d.รวม, 0);

    return {
      SUMMARY_KPI: kpi,
      RATIOS: {
        studentPerTeacher: (kpi.students / kpi.teachers).toFixed(1),
        studentPerRoom: (kpi.students / kpi.rooms).toFixed(1),
        personnelPerSchool: (kpi.teachers / kpi.schools).toFixed(1),
      },
      SCHOOL_SIZE_OBEC: scaleArr(SCHOOL_SIZE_OBEC_BASE, ["value"]),
      SCHOOL_SIZE_OTEPC: scaleArr(SCHOOL_SIZE_OTEPC_BASE, ["value"]),
      DEMOGRAPHICS: scaledDemographics,
      TOTAL_MTON: totalMton,
      TOTAL_MPLAY: totalMplay,
      SPATIAL_PROVINCE: scaleArr(SPATIAL_PROVINCE_BASE, [
        "schools",
        "students",
      ]),
      SPATIAL_CONSORTIUM: scaleArr(SPATIAL_CONSORTIUM_BASE, [
        "โรงเรียน",
        "นักเรียน",
        "ห้องเรียน",
      ]),
      SPATIAL_AMPHOE: scaleArr(SPATIAL_AMPHOE_BASE, [
        "โรงเรียน",
        "นักเรียน",
        "ห้องเรียน",
      ]),
      WEIGHT_DATA: scaleArr(WEIGHT_DATA_BASE, ["value"]),
      HEIGHT_DATA: scaleArr(HEIGHT_DATA_BASE, ["value"]),
      EDUCATION_CONTINUE: {
        m3: scaleArr(EDUCATION_CONTINUE_BASE.m3, ["value"]),
        m6: scaleArr(EDUCATION_CONTINUE_BASE.m6, ["value"]),
      },
      DROPOUTS_REASON: scaleArr(DROPOUTS_REASON_BASE, ["value"]),
    };
  }, [filters]);

  // ดึงค่าคงที่ที่ผ่านการกรองแล้วมาใช้งาน
  const {
    SUMMARY_KPI,
    RATIOS,
    SCHOOL_SIZE_OBEC,
    SCHOOL_SIZE_OTEPC,
    DEMOGRAPHICS,
    TOTAL_MTON,
    TOTAL_MPLAY,
    SPATIAL_PROVINCE,
    SPATIAL_CONSORTIUM,
    SPATIAL_AMPHOE,
    WEIGHT_DATA,
    HEIGHT_DATA,
    EDUCATION_CONTINUE,
    DROPOUTS_REASON,
  } = appData;

  // ==========================================
  // 4. COMPONENTS RENDERING (การวาดหน้าจอต่างๆ)
  // ==========================================

  const renderLoginModal = () => {
    if (!showLoginModal) return null;
    return (
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-sm w-full rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-indigo-100 p-3 rounded-2xl">
              <Database className="h-6 w-6 text-indigo-600" />
            </div>
            <button
              onClick={() => setShowLoginModal(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          </div>
          <h2 className="text-xl font-bold text-slate-800">
            เข้าสู่ระบบการจัดการ
          </h2>
          <p className="text-xs text-slate-500 mb-6 mt-1">
            สำหรับบุคลากรแอดมิน สพม.อุบลราชธานี อำนาจเจริญ
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ชื่อผู้ใช้งาน
              </label>
              <input
                type="text"
                placeholder="admin"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                value={loginData.username}
                onChange={(e) =>
                  setLoginData({ ...loginData, username: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                รหัสผ่าน
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition mt-2"
            >
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    );
  };

  const renderFilterBar = () => (
    <div className="bg-white px-5 py-4 rounded-2xl shadow-sm border border-slate-200 mb-6 flex flex-wrap gap-4 items-end">
      <div className="flex items-center gap-2 mr-2">
        <Filter className="h-5 w-5 text-indigo-500" />
        <span className="text-sm font-bold text-slate-700">
          ตัวกรองส่วนกลาง:
        </span>
      </div>

      <div className="w-24">
        <label className="block text-[10px] font-bold text-slate-500 mb-1">
          ปีการศึกษา
        </label>
        <select
          value={filters.year}
          onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold text-indigo-700 outline-none"
        >
          <option value="2568">2568</option>
          <option value="2567">2567</option>
        </select>
      </div>
      <div className="w-24">
        <label className="block text-[10px] font-bold text-slate-500 mb-1">
          ภาคเรียนที่
        </label>
        <select
          value={filters.semester}
          onChange={(e) => setFilters({ ...filters, semester: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold text-indigo-700 outline-none"
        >
          <option value="1">ภาคเรียน 1</option>
          <option value="2">ภาคเรียน 2</option>
        </select>
      </div>

      <div className="w-32">
        <label className="block text-[10px] font-bold text-slate-500 mb-1">
          ระดับจังหวัด
        </label>
        <select
          value={filters.province}
          onChange={(e) => setFilters({ ...filters, province: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs outline-none"
        >
          <option value="All">ทุกจังหวัด</option>
          <option value="อุบลราชธานี">อุบลราชธานี</option>
          <option value="อำนาจเจริญ">อำนาจเจริญ</option>
        </select>
      </div>
      <div className="w-32">
        <label className="block text-[10px] font-bold text-slate-500 mb-1">
          ระดับอำเภอ
        </label>
        <select
          value={filters.amphoe}
          onChange={(e) => setFilters({ ...filters, amphoe: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs outline-none"
        >
          <option value="All">ทุกอำเภอ</option>
          <option value="เมืองอุบลราชธานี">เมืองอุบลราชธานี</option>
          <option value="เขื่องใน">เขื่องใน</option>
        </select>
      </div>
      <div className="w-36">
        <label className="block text-[10px] font-bold text-slate-500 mb-1">
          ระดับสหวิทยาเขต
        </label>
        <select
          value={filters.consortium}
          onChange={(e) =>
            setFilters({ ...filters, consortium: e.target.value })
          }
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs outline-none"
        >
          <option value="All">ทุกสหวิทยาเขต</option>
          <option value="เมืองม่วงสามสิบ">เมืองม่วงสามสิบ</option>
          <option value="เมืองดอกบัว">เมืองดอกบัว</option>
        </select>
      </div>
      <div className="flex-1 min-w-[200px]">
        <label className="block text-[10px] font-bold text-slate-500 mb-1">
          ระดับสถานศึกษา
        </label>
        <select
          value={filters.school}
          onChange={(e) => setFilters({ ...filters, school: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-800 outline-none"
        >
          <option value="All">📊 แสดงภาพรวมทั้งหมด</option>
          <option value="34012001">โรงเรียนเบ็ญจะมะมหาราช</option>
          <option value="34012003">โรงเรียนนารีนุกูล</option>
        </select>
      </div>
    </div>
  );

  // --- แดชบอร์ด หน้าหลัก ---
  const renderDashboard = () => (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">
          ภาพรวมข้อมูลเขตพื้นที่การศึกษา
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
            <p className="text-xs font-bold text-slate-500 mb-1">โรงเรียน</p>
            <p className="text-2xl font-black text-blue-600">
              {SUMMARY_KPI.schools}
            </p>
            <p className="text-[10px] text-slate-400">แห่ง</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
            <p className="text-xs font-bold text-slate-500 mb-1">นักเรียนรวม</p>
            <p className="text-2xl font-black text-indigo-600">
              {SUMMARY_KPI.students.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-400">คน</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
            <p className="text-xs font-bold text-slate-500 mb-1">
              ห้องเรียนรวม
            </p>
            <p className="text-2xl font-black text-emerald-600">
              {SUMMARY_KPI.rooms.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-400">ห้อง</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
            <p className="text-xs font-bold text-slate-500 mb-1">
              ครูและบุคลากร
            </p>
            <p className="text-2xl font-black text-amber-500">
              {SUMMARY_KPI.teachers.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-400">อัตรา</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
            <p className="text-xs font-bold text-slate-500 mb-1">
              ออกกลางคันสะสม
            </p>
            <p className="text-2xl font-black text-rose-600">
              {SUMMARY_KPI.dropouts}
            </p>
            <p className="text-[10px] text-slate-400">คน</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs text-indigo-600 font-bold mb-1">
                อัตราส่วน นักเรียน/ครู
              </p>
              <p className="text-xl font-bold text-indigo-900">
                {RATIOS.studentPerTeacher}{" "}
                <span className="text-sm font-normal text-indigo-700">
                  คน : 1 ครู
                </span>
              </p>
            </div>
            <UserCog className="h-8 w-8 text-indigo-300" />
          </div>
          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs text-emerald-600 font-bold mb-1">
                อัตราส่วน นักเรียน/ห้องเรียน
              </p>
              <p className="text-xl font-bold text-emerald-900">
                {RATIOS.studentPerRoom}{" "}
                <span className="text-sm font-normal text-emerald-700">
                  คน : 1 ห้อง
                </span>
              </p>
            </div>
            <LayoutDashboard className="h-8 w-8 text-emerald-300" />
          </div>
          <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs text-amber-600 font-bold mb-1">
                อัตรากำลัง/โรงเรียน
              </p>
              <p className="text-xl font-bold text-amber-900">
                {RATIOS.personnelPerSchool}{" "}
                <span className="text-sm font-normal text-amber-700">
                  คน/แห่ง
                </span>
              </p>
            </div>
            <Briefcase className="h-8 w-8 text-amber-300" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800">
            จำแนกตามเกณฑ์มาตรฐานงบประมาณ สพฐ.
          </h3>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SCHOOL_SIZE_OBEC}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label
                >
                  {SCHOOL_SIZE_OBEC.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "11px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800">
            จำแนกตามเกณฑ์การย้ายผู้บริหาร ก.ค.ศ.
          </h3>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SCHOOL_SIZE_OTEPC}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label
                >
                  {SCHOOL_SIZE_OTEPC.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "11px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h3 className="text-base font-bold text-slate-800">
            จำนวนนักเรียนแยกชั้น เพศ แยกระดับ ม.ต้น และ ม.ปลาย
          </h3>
          <div className="flex gap-2 mt-3 md:mt-0">
            <span className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-100">
              ม.ต้น (ม.1-3): {TOTAL_MTON.toLocaleString()} คน
            </span>
            <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100">
              ม.ปลาย (ม.4-6): {TOTAL_MPLAY.toLocaleString()} คน
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-72 w-full">
            <h4 className="text-xs font-bold text-center text-slate-500 mb-2">
              จำนวนนักเรียนแยกชั้น เพศ
            </h4>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={DEMOGRAPHICS}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="grade"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip cursor={{ fill: "#f8fafc" }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "11px" }} />
                <Bar
                  name="นักเรียนชาย"
                  dataKey="ชาย"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  name="นักเรียนหญิง"
                  dataKey="หญิง"
                  fill="#ec4899"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="h-72 w-full">
            <h4 className="text-xs font-bold text-center text-slate-500 mb-2">
              จำนวนห้องเรียนแยกระดับชั้น
            </h4>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={DEMOGRAPHICS}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="grade"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip cursor={{ fill: "#f8fafc" }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "11px" }} />
                <Bar
                  name="จำนวนห้องเรียน"
                  dataKey="ห้อง"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Map className="h-4 w-4" /> สถิติระดับจังหวัด
          </h3>
          <div className="flex gap-4">
            {SPATIAL_PROVINCE.map((prov, i) => (
              <div
                key={i}
                className="flex-1 rounded-xl p-4 text-center border"
                style={{
                  backgroundColor: prov.color,
                  borderColor: prov.borderColor,
                }}
              >
                <p className="font-bold mb-2" style={{ color: prov.textColor }}>
                  {prov.name}
                </p>
                <p
                  className="text-2xl font-black"
                  style={{ color: prov.textColor }}
                >
                  {prov.schools.toLocaleString()}{" "}
                  <span className="text-[10px] font-normal">โรงเรียน</span>
                </p>
                <p className="text-xs mt-1" style={{ color: prov.textColor }}>
                  {prov.students.toLocaleString()} นักเรียน
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Building2 className="h-4 w-4" /> 5 สหวิทยาเขต / อำเภอ
            ที่มีนักเรียนสูงสุด
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">
                รายสหวิทยาเขต
              </p>
              <ul className="space-y-2 text-xs">
                {SPATIAL_CONSORTIUM.slice(0, 3).map((item, i) => (
                  <li
                    key={i}
                    className="flex justify-between border-b border-slate-50 pb-1"
                  >
                    <span className="truncate pr-2 text-slate-600">
                      {item.name}
                    </span>
                    <span className="font-bold text-indigo-600">
                      {item.นักเรียน.toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">
                รายอำเภอ
              </p>
              <ul className="space-y-2 text-xs">
                {SPATIAL_AMPHOE.slice(0, 3).map((item, i) => (
                  <li
                    key={i}
                    className="flex justify-between border-b border-slate-50 pb-1"
                  >
                    <span className="truncate pr-2 text-slate-600">
                      {item.name}
                    </span>
                    <span className="font-bold text-emerald-600">
                      {item.นักเรียน.toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // --- ข้อมูลนักเรียนเชิงลึก ---
  const renderStudentData = () => (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">
            สรุปจำนวนนักเรียนและห้องเรียน แยกชั้น/เพศ
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 font-bold text-xs uppercase">
                <tr>
                  <th className="px-4 py-3">ระดับชั้น</th>
                  <th className="px-4 py-3 text-right">ชาย</th>
                  <th className="px-4 py-3 text-right">หญิง</th>
                  <th className="px-4 py-3 text-right text-indigo-600">รวม</th>
                  <th className="px-4 py-3 text-center">ห้องเรียน</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DEMOGRAPHICS.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-700">
                      {row.grade}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {row.ชาย.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {row.หญิง.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-indigo-600">
                      {row.รวม.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center text-slate-500">
                      {row.ห้อง}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-rose-600 mb-4 flex items-center gap-2">
            <Activity className="h-4 w-4" /> สถิตินักเรียนออกกลางคัน
          </h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={DROPOUTS_REASON}
                layout="vertical"
                margin={{ top: 0, right: 20, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="reason"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10 }}
                />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#ef4444"
                  radius={[0, 4, 4, 0]}
                  label={{ position: "right", fontSize: 10, fill: "#ef4444" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <HeartPulse className="h-4 w-4 text-rose-500" /> จำแนกตามน้ำหนัก
            (สุขภาวะ)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={WEIGHT_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {WEIGHT_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "11px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Activity className="h-4 w-4 text-emerald-500" /> จำแนกตามส่วนสูง
            (สุขภาวะ)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={HEIGHT_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {HEIGHT_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "11px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-900 to-indigo-700 text-white p-6 rounded-2xl shadow-sm border border-indigo-800 flex flex-col justify-center items-center text-center">
          <div className="p-4 bg-white/10 rounded-full mb-3">
            <Users className="h-8 w-8 text-indigo-200" />
          </div>
          <h3 className="text-sm font-bold text-indigo-100 mb-1">
            นักเรียนรหัส G (ไม่มีเลขบัตร ปชช.)
          </h3>
          <p className="text-5xl font-black mt-2">
            {Math.max(1, Math.round(34 * (SUMMARY_KPI.students / 71710)))}{" "}
            <span className="text-sm font-normal text-indigo-300">คน</span>
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Globe className="h-4 w-4 text-blue-500" /> จำแนกตามสัญชาติ
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between items-center">
              <span className="text-slate-600">ไทย</span>
              <span className="font-bold bg-slate-100 px-2 py-0.5 rounded">
                {Math.max(
                  1,
                  Math.round(71553 * (SUMMARY_KPI.students / 71710))
                ).toLocaleString()}
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-slate-600">กัมพูชา</span>
              <span className="font-bold bg-slate-100 px-2 py-0.5 rounded">
                {Math.max(
                  1,
                  Math.round(38 * (SUMMARY_KPI.students / 71710))
                ).toLocaleString()}
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-slate-600">เมียนมา</span>
              <span className="font-bold bg-slate-100 px-2 py-0.5 rounded">
                {Math.max(
                  1,
                  Math.round(4 * (SUMMARY_KPI.students / 71710))
                ).toLocaleString()}
              </span>
            </li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
            <HeartPulse className="h-4 w-4 text-amber-500" /> จำแนกตามศาสนา
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between items-center">
              <span className="text-slate-600">พุทธ</span>
              <span className="font-bold bg-slate-100 px-2 py-0.5 rounded">
                {Math.max(
                  1,
                  Math.round(71383 * (SUMMARY_KPI.students / 71710))
                ).toLocaleString()}
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-slate-600">คริสต์</span>
              <span className="font-bold bg-slate-100 px-2 py-0.5 rounded">
                {Math.max(
                  1,
                  Math.round(216 * (SUMMARY_KPI.students / 71710))
                ).toLocaleString()}
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-slate-600">อิสลาม</span>
              <span className="font-bold bg-slate-100 px-2 py-0.5 rounded">
                {Math.max(
                  1,
                  Math.round(102 * (SUMMARY_KPI.students / 71710))
                ).toLocaleString()}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-indigo-500" />{" "}
            การศึกษาต่อ/ไม่ศึกษาต่อ (จบ ม.3)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={EDUCATION_CONTINUE.m3}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip cursor={{ fill: "#f8fafc" }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  <Cell fill="#3b82f6" />
                  <Cell fill="#60a5fa" />
                  <Cell fill="#10b981" />
                  <Cell fill="#ef4444" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-emerald-500" />{" "}
            การศึกษาต่อ/ไม่ศึกษาต่อ (จบ ม.6)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={EDUCATION_CONTINUE.m6}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip cursor={{ fill: "#f8fafc" }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  <Cell fill="#3b82f6" />
                  <Cell fill="#60a5fa" />
                  <Cell fill="#a855f7" />
                  <Cell fill="#ef4444" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  // --- ระบบจัดการแอดมิน CRUD ---
  const renderAdminEdit = () => (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 pb-10">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Edit className="h-5 w-5 text-indigo-600" /> จัดการข้อมูลรายโรงเรียน
            (CRUD)
          </h2>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-sm">
            + เพิ่มโรงเรียนใหม่
          </button>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหาด้วยรหัส SMIS หรือชื่อโรงเรียน..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 font-bold text-xs uppercase">
              <tr>
                <th className="px-4 py-3">รหัส SMIS</th>
                <th className="px-4 py-3">ชื่อโรงเรียน</th>
                <th className="px-4 py-3">สหวิทยาเขต</th>
                <th className="px-4 py-3 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-3 font-mono text-slate-500">34012001</td>
                <td className="px-4 py-3 font-bold text-slate-700">
                  เบ็ญจะมะมหาราช
                </td>
                <td className="px-4 py-3 text-slate-500">เมืองม่วงสามสิบ</td>
                <td className="px-4 py-3 text-right flex justify-end gap-2">
                  <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-3 font-mono text-slate-500">34012003</td>
                <td className="px-4 py-3 font-bold text-slate-700">
                  นารีนุกูล
                </td>
                <td className="px-4 py-3 text-slate-500">เมืองม่วงสามสิบ</td>
                <td className="px-4 py-3 text-right flex justify-end gap-2">
                  <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // --- ระบบอัปโหลดและดาวน์โหลดไฟล์ต้นแบบ ---
  const renderAdminUpload = () => (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
        <div className="mb-4">
          <h3 className="text-base font-bold text-indigo-900 flex items-center gap-2">
            <FileDown className="h-5 w-5" /> ดาวน์โหลดไฟล์ต้นแบบ (Templates)
          </h3>
          <p className="text-xs text-indigo-700 mt-1">
            กรุณาดาวน์โหลดไฟล์ต้นแบบ นำไปกรอกข้อมูลให้ถูกต้องก่อนอัปโหลดเข้าระบบ
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => downloadTemplate("student")}
            className="bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-100 text-xs font-bold py-2 px-3 rounded-lg shadow-sm transition flex items-center gap-1"
          >
            <FileSpreadsheet className="h-4 w-4" /> ต้นแบบนักเรียน
          </button>
          <button
            onClick={() => downloadTemplate("personnel")}
            className="bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-100 text-xs font-bold py-2 px-3 rounded-lg shadow-sm transition flex items-center gap-1"
          >
            <FileSpreadsheet className="h-4 w-4" /> ต้นแบบบุคลากร
          </button>
          <button
            onClick={() => downloadTemplate("health")}
            className="bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-100 text-xs font-bold py-2 px-3 rounded-lg shadow-sm transition flex items-center gap-1"
          >
            <HeartPulse className="h-4 w-4" /> สุขภาวะและประชากร
          </button>
          <button
            onClick={() => downloadTemplate("academic")}
            className="bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-100 text-xs font-bold py-2 px-3 rounded-lg shadow-sm transition flex items-center gap-1"
          >
            <Presentation className="h-4 w-4" /> วิชาการและสถานภาพ
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center max-w-3xl mx-auto">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-100">
          <UploadCloud className="h-10 w-10 text-indigo-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">
          อัปโหลดไฟล์ฐานข้อมูล (Data Import)
        </h2>
        <p className="text-sm text-slate-500 mb-8">
          รองรับไฟล์ CSV หรือ Excel (.xlsx)
          ที่เตรียมข้อมูลตามไฟล์ต้นแบบแล้วเท่านั้น
        </p>

        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-10 hover:bg-slate-50 hover:border-indigo-400 transition cursor-pointer relative">
          <input
            type="file"
            accept=".csv, .xlsx"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <p className="text-slate-600 font-medium mb-1">
            คลิกที่นี่ หรือ ลากและวางไฟล์ลงที่นี่
          </p>
          <p className="text-xs text-slate-400 mb-4">หรือ</p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow-sm transition pointer-events-none">
            เลือกไฟล์จากเครื่อง
          </button>
        </div>

        <div className="mt-8 text-left bg-emerald-50 p-4 rounded-xl border border-emerald-100">
          <h4 className="text-xs font-bold text-emerald-800 flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-4 w-4" /> คำแนะนำการอัปโหลด
          </h4>
          <ul className="text-xs text-emerald-700 space-y-1 list-disc pl-5">
            <li>
              ตรวจสอบ <b>ปีการศึกษา</b> และ <b>ภาคเรียน</b> ในไฟล์ CSV
              ให้ตรงกับความเป็นจริงก่อนอัปโหลด
            </li>
            <li>
              ระบบจะทำการบันทึกหรืออัปเดตทับข้อมูลเก่าหากรหัสโรงเรียน ปีการศึกษา
              และภาคเรียนตรงกัน
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderPlaceholder = (title, desc) => (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center animate-in fade-in">
      <div className="bg-slate-100 p-6 rounded-full mb-4">
        <Settings className="h-12 w-12 text-slate-400 animate-spin-slow" />
      </div>
      <h2 className="text-xl font-bold text-slate-700 mb-2">{title}</h2>
      <p className="text-slate-500 text-sm">
        {desc || "ระบบส่วนนี้กำลังอยู่ในระหว่างการพัฒนาโครงสร้างฐานข้อมูล..."}
      </p>
    </div>
  );

  // ==========================================
  // 5. MAIN PAGE STRUCTURE (โครงร่างหน้าจอหลัก)
  // ==========================================
  return (
    <div className="flex h-screen bg-[#f4f7f6] font-sans overflow-hidden text-slate-800">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-[#1e293b] text-slate-300 flex flex-col flex-shrink-0 overflow-y-auto hidden md:flex shadow-2xl z-40">
        <div className="p-6 border-b border-slate-800/50 sticky top-0 bg-[#1e293b] z-10 flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-2 rounded-lg text-white shadow-lg">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide leading-tight">
              ED-Insight
            </h2>
            <p className="text-[9px] text-indigo-300 tracking-widest uppercase">
              Big Data System
            </p>
          </div>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          <button
            onClick={() => setActiveMenu("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeMenu === "dashboard"
                ? "bg-indigo-600 text-white shadow-md"
                : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <LayoutDashboard className="h-5 w-5" /> แดชบอร์ด
          </button>

          <div className="pt-4 pb-2">
            <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              ระบบสารสนเทศ
            </p>
          </div>

          <div>
            <button
              onClick={() => toggleMenu("general")}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 hover:text-white transition-all"
            >
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="h-5 w-5 text-blue-400" />{" "}
                ข้อมูลทั่วไป
              </div>
              {expandedMenus.general ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            {expandedMenus.general && (
              <div className="pl-12 pr-3 py-1 space-y-1 relative before:absolute before:left-6 before:top-0 before:bottom-0 before:w-[1px] before:bg-slate-700">
                <button
                  onClick={() => setActiveMenu("ph_reg")}
                  className="w-full text-left py-2 text-xs rounded-md px-3 text-slate-400 hover:text-white relative before:absolute before:left-[-24px] before:top-1/2 before:w-4 before:h-[1px] before:bg-slate-700"
                >
                  ทะเบียนโรงเรียน
                </button>
                <button
                  onClick={() => setActiveMenu("ph_stu")}
                  className="w-full text-left py-2 text-xs rounded-md px-3 text-slate-400 hover:text-white relative before:absolute before:left-[-24px] before:top-1/2 before:w-4 before:h-[1px] before:bg-slate-700"
                >
                  จำนวนนักเรียนภาพรวม
                </button>
                <button
                  onClick={() => setActiveMenu("ph_per")}
                  className="w-full text-left py-2 text-xs rounded-md px-3 text-slate-400 hover:text-white relative before:absolute before:left-[-24px] before:top-1/2 before:w-4 before:h-[1px] before:bg-slate-700"
                >
                  จำนวนบุคลากรภาพรวม
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setActiveMenu("student_data")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeMenu === "student_data"
                ? "bg-indigo-600 text-white shadow-md"
                : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <GraduationCap className="h-5 w-5 text-emerald-400" />{" "}
            ข้อมูลนักเรียน
          </button>

          <button
            onClick={() => setActiveMenu("ph_personnel")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeMenu === "ph_personnel"
                ? "bg-indigo-600 text-white shadow-md"
                : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Briefcase className="h-5 w-5 text-amber-400" /> ข้อมูลด้านบุคลากร
          </button>

          <button
            onClick={() => setActiveMenu("ph_academic")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeMenu === "ph_academic"
                ? "bg-indigo-600 text-white shadow-md"
                : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Presentation className="h-5 w-5 text-purple-400" />{" "}
            ข้อมูลด้านวิชาการ
          </button>

          <div>
            <button
              onClick={() => toggleMenu("analytics")}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 hover:text-white transition-all mt-1"
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-rose-400" /> วิเคราะห์
                EDU.Analytics
              </div>
              {expandedMenus.analytics ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            {expandedMenus.analytics && (
              <div className="pl-12 pr-3 py-1 space-y-1 relative before:absolute before:left-6 before:top-0 before:bottom-0 before:w-[1px] before:bg-slate-700">
                <button
                  onClick={() => setActiveMenu("ph_ana_1")}
                  className="w-full text-left py-2 text-xs rounded-md px-3 text-slate-400 hover:text-white relative before:absolute before:left-[-24px] before:top-1/2 before:w-4 before:h-[1px] before:bg-slate-700"
                >
                  แนวโน้ม จำนวนนักเรียน
                </button>
                <button
                  onClick={() => setActiveMenu("ph_ana_2")}
                  className="w-full text-left py-2 text-xs rounded-md px-3 text-slate-400 hover:text-white relative before:absolute before:left-[-24px] before:top-1/2 before:w-4 before:h-[1px] before:bg-slate-700"
                >
                  แนวโน้ม จำนวนห้องเรียน
                </button>
                <button
                  onClick={() => setActiveMenu("ph_ana_3")}
                  className="w-full text-left py-2 text-xs rounded-md px-3 text-slate-400 hover:text-white relative before:absolute before:left-[-24px] before:top-1/2 before:w-4 before:h-[1px] before:bg-slate-700"
                >
                  แนวโน้ม ขนาดโรงเรียน
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setActiveMenu("ph_service")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeMenu === "ph_service"
                ? "bg-indigo-600 text-white shadow-md"
                : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Activity className="h-5 w-5 text-cyan-400" /> สถิติ / บริการ
          </button>

          {isLoggedIn && (
            <>
              <div className="pt-4 pb-2">
                <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  ระบบหลังบ้าน (Admin)
                </p>
              </div>
              <div>
                <button
                  onClick={() => toggleMenu("admin")}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 hover:text-white transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 text-slate-400" /> จัดการข้อมูล
                  </div>
                  {expandedMenus.admin ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                {expandedMenus.admin && (
                  <div className="pl-12 pr-3 py-1 space-y-1 relative before:absolute before:left-6 before:top-0 before:bottom-0 before:w-[1px] before:bg-slate-700">
                    <button
                      onClick={() => setActiveMenu("admin_upload")}
                      className={`w-full text-left py-2 text-xs rounded-md px-3 relative before:absolute before:left-[-24px] before:top-1/2 before:w-4 before:h-[1px] before:bg-slate-700 ${
                        activeMenu === "admin_upload"
                          ? "text-white bg-slate-800/50 font-bold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      อัปโหลดไฟล์ข้อมูล
                    </button>
                    <button
                      onClick={() => setActiveMenu("admin_edit")}
                      className={`w-full text-left py-2 text-xs rounded-md px-3 relative before:absolute before:left-[-24px] before:top-1/2 before:w-4 before:h-[1px] before:bg-slate-700 ${
                        activeMenu === "admin_edit"
                          ? "text-white bg-slate-800/50 font-bold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      เพิ่ม/แก้ไขข้อมูลโรงเรียน
                    </button>
                    <button
                      onClick={() => setActiveMenu("ph_report")}
                      className={`w-full text-left py-2 text-xs rounded-md px-3 relative before:absolute before:left-[-24px] before:top-1/2 before:w-4 before:h-[1px] before:bg-slate-700 ${
                        activeMenu === "ph_report"
                          ? "text-white bg-slate-800/50 font-bold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      เรียกดูรายงาน
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </nav>

        <div className="p-4 border-t border-slate-800/50">
          {isLoggedIn ? (
            <button
              onClick={() => {
                setIsLoggedIn(false);
                setActiveMenu("dashboard");
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold text-rose-400 hover:text-white hover:bg-rose-600 transition-all"
            >
              <LogOut className="h-4 w-4" /> ออกจากระบบแอดมิน
            </button>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold text-slate-400 hover:text-white hover:bg-indigo-600 transition-all"
            >
              <LogIn className="h-4 w-4" /> เข้าสู่ระบบแอดมิน
            </button>
          )}
        </div>
      </aside>

      {/* CONTENT AREA (พื้นที่แสดงผลหลัก) */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:px-8 relative bg-slate-50/50">
        {renderFilterBar()}

        {activeMenu === "dashboard" && renderDashboard()}
        {activeMenu === "student_data" && renderStudentData()}
        {activeMenu === "admin_edit" && isLoggedIn && renderAdminEdit()}
        {activeMenu === "admin_upload" && isLoggedIn && renderAdminUpload()}

        {activeMenu.startsWith("ph_") &&
          renderPlaceholder(
            "ระบบอยู่ระหว่างการจัดทำ",
            "ส่วนนี้จะถูกพัฒนาต่อในเฟสถัดไปของการสร้าง Big Data"
          )}

        {renderLoginModal()}
      </main>
    </div>
  );
}
