const UY_QUYEN = {
  approve: {
    title: 'Ủy quyền',
    fields: {
      name: 'Họ và tên',
      birth_day: 'Ngày tháng năm sinh',
      per_type: 'Dân tộc',
      national: 'Quốc tịch',
      doc_code: 'CMND/CCCD/Hộ chiếu số',
      doc_time_provide: 'Cấp ngày',
      doc_place_provide: 'Nơi cấp',
      reg_address: 'Nơi đăng ký hộ khẩu thường trú',
    },
  },
};

const DAI_DIEN_PHAP_LUAT_FORM = {
  title: 'Đăng ký thay đổi người đại diện theo pháp luật',
  fields: {
    company_name: 'Tên doanh nghiệp',
    mst: 'Mã số doanh nghiệp/ mã số thuế',
    old_name: 'Tên người đại diện pháp luật cũ',
    old_title: 'Chức danh',
    new_name: 'Họ và tên',
    gender: 'Giới tính',
    new_title: 'Chức danh',
    birth_day: 'Ngày sinh',
    per_type: 'Dân tộc',
    national: 'Quốc tịch',
    doc_type: 'Loại giấy tờ pháp lý',
    doc_code: 'Số CMND/ CCCD/ Hộ chiếu',
    doc_time_provide: 'Ngày cấp',
    doc_place_provide: 'Nơi cấp',
    reg_address: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn',
    town: 'Xã/Phường/Thị Trấn',
    district: 'Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh',
    city: 'Tỉnh/Thành phố',
    contact_reg_address: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn',
    contact_town: 'Xã/Phường/Thị Trấn',
    contact_district: 'Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh',
    contact_city: 'Tỉnh/Thành phố',
  },
};

const DIA_CHI_TRU_SO_CHINH_FORM = {
  title: 'Đăng ký thay đổi địa chỉ trụ sở chính',
  fields: {
    company_name: 'Tên doanh nghiệp',
    mst: 'Mã số doanh nghiệp/ mã số thuế',
    old: {
      address: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn cũ',
      town: 'Xã/Phường/Thị Trấn cũ',
      district: 'Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh cũ',
      city: 'Tỉnh/Thành phố cũ',
    },
    new_location: {
      address: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn mới',
      town: 'Xã/Phường/Thị Trấn mới',
      district: 'Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh mới',
      city: 'Tỉnh/Thành phố mới',
    },
    phone: 'Số điện thoại',
    inside: 'Doanh nghiệp nằm trong',
    legal_person: 'Tên người đại diện pháp luật',
  },
};

const HOP_DONG_CHUYEN_NHUONG_FORM = {
  title: 'Đăng ký thay đổi hợp đồng chuyển nhượng phần góp vốn',
  fields: {
    company_name: 'Tên doanh nghiệp',
    mst: 'Mã số doanh nghiệp',
    A_side: {
      owner: 'Chủ sở hữu',
      personal: {
        name: 'Họ và tên',
        birth_day: 'Ngày sinh',
        doc_type: 'Loại giấy tờ pháp lý',
        doc_code: 'Số giấy tờ pháp lý',
        doc_time_provide: 'Ngày cấp',
        doc_place_provide: 'Nơi cấp',
        contact_address: 'Địa chỉ liên lạc',
      },
      organization: {
        company_name: 'Tên doanh nghiệp',
        mst: 'Mã số doanh nghiệp',
        company_address: {
          street: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn',
          town: 'Xã/Phường/Thị trấn',
          district: 'Quận/Huyện/Thị xã/Thành phố thuộc tỉnh',
          city: 'Tỉnh/Thành phố',
        },
        legal_representative: 'Người đại diện theo pháp luật của công ty',
      },
    },
    B_side: {
      owner: 'Chủ sở hữu',
      personal: {
        name: 'Họ và tên',
        birth_day: 'Ngày sinh',
        doc_type: 'Loại giấy tờ pháp lý',
        doc_code: 'Số giấy tờ pháp lý',
        doc_time_provide: 'Ngày cấp',
        doc_place_provide: 'Nơi cấp',
        reg_address: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn',
        town: 'Xã/Phường/Thị Trấn',
        district: 'Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh',
        city: 'Tỉnh/Thành phố',
        contact_reg_address: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn',
        contact_town: 'Xã/Phường/Thị Trấn',
        contact_district: 'Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh',
        contact_city: 'Tỉnh/Thành phố',
      },
      organization: {
        company_name: 'Tên doanh nghiệp',
        mst: 'Mã số doanh nghiệp',
        time_provide: 'Ngày cấp',
        place_proive: 'Nơi cấp',
        company_address: {
          street: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn',
          town: 'Xã/Phường/Thị trấn',
          district: 'Quận/Huyện/Thị xã/Thành phố thuộc tỉnh',
          city: 'Tỉnh/Thành phố',
        },
        legal_representative: 'Người đại diện theo pháp luật của công ty',
        legal_title: 'Chức danh',
        capital_contribution: {
          current_value: 'Vốn sở hữu',
          type: 'Loại chuyển nhượng',
          will: 'Phần vốn góp bên A muốn chuyển nhượng',
          current_A_percent: 'Chiếm tỉ lệ',
          transfer_price: 'Giá chuyển nhượng',
          time_end: 'Thời điểm hoàn thành việc chuyển nhượng (Chọn Ngày/ tháng/ năm)',
        },
        company_model: 'Mô hình công ty',
      },
    },
  },
};

const CHU_SO_HUU_FORM = {
  title: 'Người đại diện theo ủy quyền của chủ sở hữu là tổ chức',
  fields: {
    company_name: 'Tên doanh nghiệp',
    mst: 'Mã số doanh nghiệp/ mã số thuế',
  },
};

const GIAM_VON_DIEU_LE_FORM = {
  title: 'Đăng kí thay đổi vốn điều lệ',
  fields: {
    company_name: 'Tên doanh nghiệp',
    mst: 'Mã số doanh nghiệp/ mã số thuế',
    base_val: {
      num: 'Vốn điều lệ đã đăng ký (bằng số)',
      char: 'Vốn điều lệ đã đăng ký (bằng chữ)',
    },
    new_base_val: {
      num: 'Vốn điều lệ sau khi giảm (bằng số)',
      char: 'Vốn điều lệ sau khi giảm (bằng chữ)',
    },
    type: 'Hình thức giảm vốn',
  },
};

const TANG_VON_DIEU_LE_FORM = {
  title: 'Đăng kí thay đổi vốn điều lệ',
  fields: {
    company_name: 'Tên doanh nghiệp',
    mst: 'Mã số doanh nghiệp/ mã số thuế',
    base_val: {
      num: 'Vốn điều lệ đã đăng ký (bằng số)',
      char: 'Vốn điều lệ đã đăng ký (bằng chữ)',
    },
    new_base_val: {
      num: 'Vốn điều lệ sau khi tăng (bằng số)',
      char: 'Vốn điều lệ sau khi tăng (bằng chữ)',
    },
    type: 'Hình thức tăng vốn',
  },
};

const THAY_DOI_NGANH_NGHE_FORM = {
  title: 'Đăng ký thay đổi ngành nghề kinh doanh',
  fields: {
    company_name: 'Tên doanh nghiệp',
    mst: 'Mã số doanh nghiệp',
    include: 'Bổ sung ngành, nghề kinh doanh',
    exclude: 'Bỏ ngành, nghề kinh doanh',
    legal_person: 'Tên người Đại diện pháp luật',
    detail_after: 'Sửa đổi chi tiết ngành, nghề kinh doanh sau',
  },
};

const THAY_DOI_TEN_DOANH_NGHIEP_FORM = {
  title: 'Đăng ký thay đổi tên doanh nghiệp',
  fields: {
    company_name: 'Tên doanh nghiệp',
    mst: 'Mã số doanh nghiệp/ mã số thuế',
    base_type: 'Doanh nghiệp đăng ký thay đổi tên cơ sở',
    name_vi: 'Tên công ty bằng tiếng Việt',
    name_en: 'Tên công ty bằng tiếng nước ngoài',
    name_etc: 'Tên công ty viết tắt',
    legal_person: 'Tên người đại diện pháp luật',
  },
};

const THAY_DOI_THONG_TIN_DANG_KI_THUE_FORM = {
  title: 'Đăng ký thay đổi thông tin đăng ký thuế',
  fields: {
    company_name: 'Tên doanh nghiệp',
    mst: 'Mã số doanh nghiệp',
    address: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn',
    town: 'Xã/Phường/Thị trấn',
    district: 'Quận/Huyện/Thị xã/Thành phố thuộc tỉnh',
    city: 'Tỉnh/Thành phố',
    start_active: 'Ngày bắt đầu hoạt động',
    accounting: 'Hình thức hạch toán',
    start_date: 'Bắt đầu từ ngày (chọn ngày/ tháng)',
    end_date: 'Đến ngày (chọn ngày/ tháng)',
    employee: 'Tổng số lao động',
    active_BOT: 'Có hoạt động theo dự án BOT/BTO/BT/BOO, BLT, BTL, O&M không',
  },
};

const CHANGE_INFO_FORM = {
  base_inform: {
    title: 'Thông tin doanh nghiệp',
    fields: {
      company_name: 'Tên doanh nghiệp',
      mst: 'Mã số doanh nghiệp/ mã số thuế',
      time_provide: 'Ngày cấp',
      place_provide: 'Nơi cấp',
    },
  },

  // Đăng ký thay đổi người đại diện theo pháp luật
  legal_representative: { ...DAI_DIEN_PHAP_LUAT_FORM },

  // Người đại diện theo ủy quyền của chủ sở hữu là tổ chức
  present_change: { ...CHU_SO_HUU_FORM },

  // Đăng ký thay đổi địa chỉ trụ sở chính
  location: { ...DIA_CHI_TRU_SO_CHINH_FORM },

  // Giảm vốn điều lệ
  down_authorized_capital: { ...GIAM_VON_DIEU_LE_FORM },

  // Tăng vốn điều lệ
  up_authorized_capital: { ...TANG_VON_DIEU_LE_FORM },

  // Hợp đồng chuyển nhượng
  transfer_contract: { ...HOP_DONG_CHUYEN_NHUONG_FORM },

  // Thay đổi ngành nghề kinh doanh
  company_career: { ...THAY_DOI_NGANH_NGHE_FORM },

  // Thay đổi tên doanh nghiệp
  name: { ...THAY_DOI_TEN_DOANH_NGHIEP_FORM },

  // Thay đổi thông tin đăng kí thuế
  tax: { ...THAY_DOI_THONG_TIN_DANG_KI_THUE_FORM },
};

const CREATE_COMPANY_FORM = {
  approve: {
    title: 'Thành lập doanh nghiệp',
    fields: {
      base_val: {
        num: 'Vốn điều lệ (bằng số)',
        char: 'Vốn điều lệ (bằng chữ)',
      },
      origin_person: {
        name: 'Thành viên góp vốn',
        gender: 'Giới tính',
        birth_day: 'Ngày sinh',
        current_address: 'Chỗ ở hiện tại',
        national: 'Quốc tịch',
        per_type: 'Dân tộc',
        reg_address: 'Nơi đăng kí hộ khẩu thường trú',
        doc_type: 'Loại giấy tờ',
        doc_code: 'Mã doanh nghiệp',
        doc_time_provide: 'Ngày cấp',
        doc_place_provide: ' Nơi cấp',
        contact: {
          address: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn',
          town: 'Xã/Phường/Thị trấn',
          district: 'Quận/Huyện/Thị xã/Thành phố thuộc tỉnh',
          city: 'Tỉnh/Thành phố',
          phone: 'Số điện thoại',
        },
        company: {
          address: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn',
          town: 'Xã/Phường/Thị trấn',
          district: 'Quận/Huyện/Thị xã/Thành phố thuộc tỉnh',
          city: 'Tỉnh/Thành phố',
          national: 'Quốc gia',
        },
      },
      present_person: 'Người đại diện',
      company_value: 'Giá trị góp vốn',
      legal_respon: {
        name: 'Họ và tên',
        gender: 'Giới tính',
        birth_day: 'Ngày sinh',
        per_type: 'Dân tộc',
        reg_address: 'Nơi đăng kí hộ khẩu thường trú',
        current_address: 'Nơi ở hiện tại',
        doc_type: 'Loại giấy tờ',
        doc_code: 'Số CMND/ CCCD/ Hộ chiếu',
        doc_time_provide: 'Ngày cấp',
        doc_place_provide: ' Nơi cấp',
        title: 'Chức danh',
        national: 'Quốc tịch',
      },
      per_main: {
        name: 'Họ và tên',
        gender: 'Giới tính',
        birth_day: 'Ngày sinh',
        per_type: 'Dân tộc',
        reg_address: 'Nơi đăng kí hộ khẩu thường trú',
        current_address: 'Chỗ ở hiện tại',
        doc_type: 'Loại giấy tờ pháp lý',
        doc_code: 'Số giấy tờ pháp lý',
        doc_time_provide: 'Ngày cấp',
        doc_place_provide: ' Nơi cấp',
      },
      core: {
        name: 'Tên công ty bằng Tiếng Việt',
        name_en: 'Tên công ty bằng Tiếng Anh (nếu có)',
        name_vn: 'Tên công ty viết tắt (nếu có)',
        address: {
          street: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn',
          town: 'Xã/Phường/Thị trấn',
          district: 'Quận/Huyện/Thị xã/Thành phố thuộc tỉnh',
          city: 'Tỉnh/Thành phố',
        },
        address_opt_1: 'Địa chỉ chi nhánh (nếu có)',
        address_opt_2: 'Địa chỉ văn phòng đại diện (nếu có)',
      },
      company_main_career: 'Ngành nghề chính',
      company_opt_career: 'Ngành nghề phụ',
    },
  },
};

const PENDING_FORM = {
  cancel: {
    title: 'Kinh doanh lại trước thời hạn',
    fields: {
      company_name: 'Tên doanh nghiệp (ghi bằng chữ in hoa)',
      mst: 'Mã số doanh nghiệp/Mã số thuế',
      opt_code: 'Số Giấy chứng nhận đăng ký kinh doanh (chỉ kê khai nếu không có mã số doanh nghiệp/mã số thuế)',
      time_provide: 'Ngày cấp',

      place_provide: 'Nơi cấp',
      obj: 'Đối tượng tạm ngưng',
      branch: {
        branch_name: 'Tên chi nhánh/văn phòng đại diện/địa điểm kinh doanh (ghi bằng chữ in hoa)',
        resp_office: 'Mã số thuế chi nhánh/văn phòng đại diện/địa điểm kinh doanh',
        branch_name_opt: 'Tên chi nhánh (optional)',
        branch_mst_opt: 'Mã số chi nhánh/Mã số thuế của chi nhánh  (optional)',
      },
      time_range: {
        start: 'Thời gian đăng ký tạm ngưng từ',
        end: 'Thời gian đăng ký tạm ngưng đến',
      },
      reason: 'Lý do tạm ngưng',
      org_person: 'Tên người đại diện pháp luật/người đứng đầu chi nhánh',
    },
    // Kinh doanh lại trước thời hạn
  },
  approve: {
    // Tạm ngưng kinh doanh
    title: 'Tạm ngưng kinh doanh',
    fields: {
      company_name: 'Tên doanh nghiệp (ghi bằng chữ in hoa)',
      mst: 'Mã số doanh nghiệp/Mã số thuế',
      time_provide: 'Ngày cấp',
      place_provide: 'Nơi cấp',
      opt_code: 'Số Giấy chứng nhận đăng ký kinh doanh (chỉ kê khai nếu không có mã số doanh nghiệp/mã số thuế)',
      obj: 'Đối tượng tạm ngưng',
      location: 'Địa chỉ trụ sở chính',
      main_legal: 'Người đại diện pháp luật (nhập đầy đủ họ và tên)',
      list_president: {
        president: 'Tên thành viên',
      },
      contribute_members: {
        name: 'Nhập tên Chủ tịch HĐTV',
        capital: 'Vốn góp',
        capital_percent: 'chiếm % vốn điều lệ',
      },
      branch: {
        branch_name: 'Tên chi nhánh/văn phòng đại diện/địa điểm kinh doanh (ghi bằng chữ in hoa)',
        resp_office: 'Mã số thuế chi nhánh/văn phòng đại diện/địa điểm kinh doanh',
        branch_name_opt: 'Tên chi nhánh (optional)',
        branch_mst_opt: 'Mã số chi nhánh/Mã số thuế của chi nhánh  (optional)',
        time_range: {
          start: 'Thời gian đăng ký tạm ngưng từ',
          end: 'Thời gian đăng ký tạm ngưng đến',
        },
      },
      time_range: {
        start: 'Thời gian đăng ký tạm ngưng từ',
        end: 'Thời gian đăng ký tạm ngưng đến',
      },
      reason: 'Lý do tạm ngưng',
      org_person: 'Người đại diện pháp luật (nhập đầy đủ họ và tên)',
    },
  },
};

const DISSOLUTION_FORM = {
  approve: {
    title: 'Giải thể',
    fields: {
      company_name: 'Tên doanh nghiệp',
      mst: 'Mã số doanh nghiệp/Mã số thuế',
      org_person: 'Người đại diện pháp luật',
      location: 'Địa chỉ trụ sở chính',
      list_president: {
        president: 'Tên thành viên',
      },
      contribute_members: {
        name: 'Nhập tên Chủ tịch HĐTV',
        capital: 'Vốn góp',
        capital_percent: 'chiếm % vốn điều lệ',
      },
    },
    // Giải thể
  },
  cancel: {
    title: 'Hủy bỏ giải thể',
    fields: {
      company_name: 'Tên doanh nghiệp (ghi bằng chữ in hoa)',
      mst: 'Mã số doanh nghiệp/Mã số thuế',
    },
  },
};

// const getChangeInfoFields = (pathName) =>
//   ({
//     base_inform: {
//       title: 'Thông tin doanh nghiệp',
//       fields: {
//         company_name: 'Tên doanh nghiệp',
//         mst: 'Mã số doanh nghiệp/ mã số thuế',
//         time_provide: 'Ngày cấp',
//         place_provide: 'Nơi cấp',
//       },
//     },

//     // Đăng ký thay đổi người đại diện theo pháp luật
//     legal_representative: { ...DAI_DIEN_PHAP_LUAT_FORM },

//     // Người đại diện theo ủy quyền của chủ sở hữu là tổ chức
//     present_change: { ...CHU_SO_HUU_FORM },

//     // Đăng ký thay đổi địa chỉ trụ sở chính
//     location: { ...DIA_CHI_TRU_SO_CHINH_FORM },

//     // Giảm vốn điều lệ
//     down_authorized_capital: { ...GIAM_VON_DIEU_LE_FORM },

//     // Tăng vốn điều lệ
//     up_authorized_capital: { ...TANG_VON_DIEU_LE_FORM },

//     // Hợp đồng chuyển nhượng
//     transfer_contract: { ...HOP_DONG_CHUYEN_NHUONG_FORM },

//     // Thay đổi ngành nghề kinh doanh
//     company_career: { ...THAY_DOI_NGANH_NGHE_FORM },

//     // Thay đổi tên doanh nghiệp
//     name: { ...THAY_DOI_TEN_DOANH_NGHIEP_FORM },

//     // Thay đổi thông tin đăng kí thuế
//     tax: { ...THAY_DOI_THONG_TIN_DANG_KI_THUE_FORM },
//   }?.[pathName]);

// const getCreateCompanyFields = (key,pathName) =>
//   ({
//     approve: {
//       title: 'Thành lập doanh nghiệp',
//       fields: {
//         base_val: {
//           num: 'Vốn điều lệ (bằng số)',
//           char: 'Vốn điều lệ (bằng chữ)',
//         },
//         origin_person: {
//           name: 'Thành viên góp vốn',
//           gender: 'Giới tính',
//           birth_day: 'Ngày sinh',
//           current_address: 'Chỗ ở hiện tại',
//           national: 'Quốc tịch',
//           per_type: 'Dân tộc',
//           reg_address: 'Nơi đăng kí hộ khẩu thường trú',
//           doc_type: 'Loại giấy tờ',
//           doc_code: 'Mã doanh nghiệp',
//           doc_time_provide: 'Ngày cấp',
//           doc_place_provide: ' Nơi cấp',
//           contact: {
//             address: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn',
//             town: 'Xã/Phường/Thị trấn',
//             district: 'Quận/Huyện/Thị xã/Thành phố thuộc tỉnh',
//             city: 'Tỉnh/Thành phố',
//             phone: 'Số điện thoại',
//           },
//           company: {
//             address: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn',
//             town: 'Xã/Phường/Thị trấn',
//             district: 'Quận/Huyện/Thị xã/Thành phố thuộc tỉnh',
//             city: 'Tỉnh/Thành phố',
//             national: 'Quốc gia',
//           },
//         },
//         present_person: 'Người đại diện',
//         company_value: 'Giá trị góp vốn',
//         legal_respon: {
//           name: 'Họ và tên',
//           gender: 'Giới tính',
//           birth_day: 'Ngày sinh',
//           per_type: 'Dân tộc',
//           reg_address: 'Nơi đăng kí hộ khẩu thường trú',
//           current_address: 'Nơi ở hiện tại',
//           doc_type: 'Loại giấy tờ',
//           doc_code: 'Số CMND/ CCCD/ Hộ chiếu',
//           doc_time_provide: 'Ngày cấp',
//           doc_place_provide: ' Nơi cấp',
//           title: 'Chức danh',
//           national: 'Quốc tịch',
//         },
//         per_main: {
//           name: 'Họ và tên',
//           gender: 'Giới tính',
//           birth_day: 'Ngày sinh',
//           per_type: 'Dân tộc',
//           reg_address: 'Nơi đăng kí hộ khẩu thường trú',
//           current_address: 'Chỗ ở hiện tại',
//           doc_type: 'Loại giấy tờ pháp lý',
//           doc_code: 'Số giấy tờ pháp lý',
//           doc_time_provide: 'Ngày cấp',
//           doc_place_provide: ' Nơi cấp',
//         },
//         core: {
//           name: 'Tên công ty bằng Tiếng Việt',
//           name_en: 'Tên công ty bằng Tiếng Anh (nếu có)',
//           name_vn: 'Tên công ty viết tắt (nếu có)',
//           address: {
//             street: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn',
//             town: 'Xã/Phường/Thị trấn',
//             district: 'Quận/Huyện/Thị xã/Thành phố thuộc tỉnh',
//             city: 'Tỉnh/Thành phố',
//           },
//           address_opt_1: 'Địa chỉ chi nhánh (nếu có)',
//           address_opt_2: 'Địa chỉ văn phòng đại diện (nếu có)',
//         },
//         company_main_career: 'Ngành nghề chính',
//         company_opt_career: 'Ngành nghề phụ',
//       },
//     },
//   }?.[pathName]);

// const getPendingFields = (key,pathName) =>
//   ({
//     cancel: {
//       title: 'Kinh doanh lại trước thời hạn',
//       fields: {
//         company_name: 'Tên doanh nghiệp (ghi bằng chữ in hoa)',
//         mst: 'Mã số doanh nghiệp/Mã số thuế',
//         opt_code: 'Số Giấy chứng nhận đăng ký kinh doanh (chỉ kê khai nếu không có mã số doanh nghiệp/mã số thuế)',
//         time_provide: 'Ngày cấp',

//         place_provide: 'Nơi cấp',
//         obj: 'Đối tượng tạm ngưng',
//         branch: {
//           branch_name: 'Tên chi nhánh/văn phòng đại diện/địa điểm kinh doanh (ghi bằng chữ in hoa)',
//           resp_office: 'Mã số thuế chi nhánh/văn phòng đại diện/địa điểm kinh doanh',
//           branch_name_opt: 'Tên chi nhánh (optional)',
//           branch_mst_opt: 'Mã số chi nhánh/Mã số thuế của chi nhánh  (optional)',
//         },
//         time_range: {
//           start: 'Thời gian đăng ký tạm ngưng từ',
//           end: 'Thời gian đăng ký tạm ngưng đến',
//         },
//         reason: 'Lý do tạm ngưng',
//         org_person: 'Tên người đại diện pháp luật/người đứng đầu chi nhánh',
//       },
//       // Kinh doanh lại trước thời hạn
//     },
//     approve: {
//       // Tạm ngưng kinh doanh
//       title: 'Tạm ngưng kinh doanh',
//       fields: {
//         company_name: 'Tên doanh nghiệp (ghi bằng chữ in hoa)',
//         mst: 'Mã số doanh nghiệp/Mã số thuế',
//         time_provide: 'Ngày cấp',
//         place_provide: 'Nơi cấp',
//         opt_code: 'Số Giấy chứng nhận đăng ký kinh doanh (chỉ kê khai nếu không có mã số doanh nghiệp/mã số thuế)',
//         obj: 'Đối tượng tạm ngưng',
//         location: 'Địa chỉ trụ sở chính',
//         list_president: {
//           president: 'Tên Chủ tịch HĐQT',
//           president_2: 'Tên thành viên HĐQT thứ 2',
//           president_3: 'Tên thành viên HĐQT thứ 3',
//         },
//         contribute_members: {
//           type:'Array',
//           name: 'Nhập tên Chủ tịch HĐTV',
//           capital: 'Vốn góp',
//           capital_percent: 'chiếm % vốn điều lệ',
//         },
//         branch: {
//           branch_name: 'Tên chi nhánh/văn phòng đại diện/địa điểm kinh doanh (ghi bằng chữ in hoa)',
//           resp_office: 'Mã số thuế chi nhánh/văn phòng đại diện/địa điểm kinh doanh',
//           branch_name_opt: 'Tên chi nhánh (optional)',
//           branch_mst_opt: 'Mã số chi nhánh/Mã số thuế của chi nhánh  (optional)',
//           time_range: {
//             start: 'Thời gian đăng ký tạm ngưng từ',
//             end: 'Thời gian đăng ký tạm ngưng đến',
//           },
//         },
//         time_range: {
//           start: 'Thời gian đăng ký tạm ngưng từ',
//           end: 'Thời gian đăng ký tạm ngưng đến',
//         },
//         reason: 'Lý do tạm ngưng',
//         org_person: 'Người đại diện pháp luật (nhập đầy đủ họ và tên)',
//       },
//     },
//   }?.[key]);

// const getDissolutionFields = (key, pathName) => {
//   let Obj = {
//     approve: {
//       title: 'Giải thể',
//       fields: {
//         company_name: 'Tên doanh nghiệp',
//         mst: 'Mã số doanh nghiệp/Mã số thuế',
//         org_person: 'Người đại diện pháp luật',
//         location: 'Địa chỉ trụ sở chính',
//       },
//       // Giải thể
//     },
//     cancel: {
//       title: 'Hủy bỏ giải thể',
//       fields: {
//         company_name: 'Tên doanh nghiệp (ghi bằng chữ in hoa)',
//         mst: 'Mã số doanh nghiệp/Mã số thuế',
//       },
//     },
//   };
//   return Obj?.[key];
// };

const LABEL = {
  // Thay đổi thông tin
  change_info: { ...CHANGE_INFO_FORM },
  // Thành lập công ty
  create_company: { ...CREATE_COMPANY_FORM },
  // Tạm hoãn
  pending: { ...PENDING_FORM },
  // Giải thể
  dissolution: { ...DISSOLUTION_FORM },

  uy_quyen: { ...UY_QUYEN },
};
// const LABEL = (pathName) =>
//   ({
//     // Thay đổi thông tin
//     change_info: () => getChangeInfoFields(pathName),
//     // Thành lập công ty
//     create_company: () => getCreateCompanyFields(pathName),
//     // Tạm hoãn
//     pending: (key) => getPendingFields(key, pathName),
//     // Giải thể
//     dissolution: (key) => getDissolutionFields(key, pathName),
//     uy_quyen: { ...UY_QUYEN },
//   }?.[pathName]);

export {
  LABEL,
  CREATE_COMPANY_FORM,
  PENDING_FORM,
  DISSOLUTION_FORM,
  UY_QUYEN,
  DAI_DIEN_PHAP_LUAT_FORM,
  DIA_CHI_TRU_SO_CHINH_FORM,
  HOP_DONG_CHUYEN_NHUONG_FORM,
  CHU_SO_HUU_FORM,
  GIAM_VON_DIEU_LE_FORM,
  TANG_VON_DIEU_LE_FORM,
  THAY_DOI_NGANH_NGHE_FORM,
  THAY_DOI_TEN_DOANH_NGHIEP_FORM,
  THAY_DOI_THONG_TIN_DANG_KI_THUE_FORM,
};
