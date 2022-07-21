export const FormControl = [
  {
    type: 1,
    name: "Công ty TNHH 1 thành viên",
  },
  {
    type: 2,
    name: "Công ty TNHH 2 thành viên trở lên",
  },
  {
    type: 3,
    name: "Công ty Cổ phần",
  },
];

export const FormFieldText = {
  selectProduct: "Loại hình doanh nghiệp",
  base_val: {
    char: "Vốn điều lệ (bằng chữ)",
    num: "Vốn điều lệ (bằng số)",
  },
  company_core: {
    address: "Địa chỉ trụ sở chính",
    address_opt_1: "Địa chỉ chi nhánh (nếu có)",
    address_opt_2: "Địa chỉ văn phòng đại diện (nếu có)",
    name: "Tên công ty",
    name_en: "Tên công ty bằng Tiếng Anh (Nếu có)",
    name_vn: "Tên công ty viết tắt (Nếu có)",
  },
  legal_respon: "Người đại diện pháp lý",
  company_main_career: "Ngành nghề chính",
  company_opt_career: "Ngành nghề khác",
  company_value: "Giá trị góp vốn",
  origin_person: "Thành viên góp vốn",
  per_main: "Chủ tịch công ty/chủ tịch Hội đồng thành viên",
  // present_person: "Thành viên góp vốn",
};

export const BaseFieldText = {
  birth_day: "Ngày sinh",
  current_address: "Địa chị nơi ở hiện tại",
  doc_code: "Mã số",
  doc_place_provide: "Nơi cấp",
  doc_time_provide: "Ngày cấp",
  doc_type: "Loại giấy tờ",
  gender: "Giới tính",
  name: "Họ và tên",
  per_type: "Chức danh",
  reg_address: "Nơi đăng kí hộ khẩu thường trú",
};

export const SELECT = {
  GENDER: [
    {
      name: "Nữ",
      value: "Nữ",
    },
    {
      name: "Nam",
      value: "Nam",
    },
  ],
  DOC_TYPE: [
    {
      name: "Chứng minh nhân dân",
      value: "Chứng minh nhân dân",
    },
    { name: "Căn cước công dân", value: "Căn cước công dân" },
    { name: "Hộ chiếu", value: "Hộ chiếu" },
  ],
  CONTRIBUTE: [
    { name: "Chuyển nhượng toàn bộ phần vốn góp", value: "Chuyển nhượng toàn bộ phần vốn góp" },
    { name: "Chuyển nhượng một phần vốn góp", value: "Chuyển nhượng một phần vốn góp" },
  ],
  OWNER: [
    {
      name: "Trường hợp chủ sở hữu là cá nhân",
      value: "personal",
    },
    {
      name: "Trường hợp chủ sở hữu là tổ chức",
      value: "organization",
    },
  ],
  BUSINESS_OBJECT: [
    {
      name: "Toàn bộ công ty",
      value: "Toàn bộ công ty",
    },
    {
      name: "Chi nhánh hoặc Văn phòng đại diện hoặc Địa điểm kinh doanh",
      value: "Chi nhánh hoặc Văn phòng đại diện hoặc Địa điểm kinh doanh",
    },
  ],
  BUSINESS_LOCATION: [
    {
      name: "Khu Công Nghiệp",
      value: "Khu Công Nghiệp",
    },
    {
      name: "Khu Chế Xuất",
      value: "Khu Chế Xuất",
    },
    {
      name: "Khu Kinh Tế",
      value: "Khu Kinh Tế",
    },
    {
      name: "Khu Công Nghệ Cao",
      value: "Khu Công Nghệ Cao",
    },
  ],
  TITLE: [
    {
      value: "Chủ tịch công ty",
      name: "Chủ tịch công ty",
    },
    {
      value: "Giám đốc",
      name: "Giám đốc",
    },
    {
      value: "Tổng giám đốc",
      name: "Tổng giám đốc",
    },
  ],
  COMPANY_MODEL: [
    {
      name: "Hội đồng thành viên, Giám đốc hoặc Tổng Giám đốc",
      value: "Hội đồng thành viên, Giám đốc hoặc Tổng Giám đốc",
    },
    {
      name: "Chủ tịch công ty, Giám đốc hoặc Tổng Giám đốc",
      value: "Chủ tịch công ty, Giám đốc hoặc Tổng Giám đốc",
    },
  ],
};
