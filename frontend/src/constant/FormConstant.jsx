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
}

const DAI_DIEN_PHAP_LUAT_FORM = {
  title: 'Đăng ký thay đổi người đại diện theo pháp luật',
  fields: {
    exclude: {
      label: 'Bỏ bớt người đại diện',
      fields: {
        name: 'Họ và tên',
        title: 'Chức danh',
      },
    },
    includes: {
      label: 'Thêm mới người đại diện',
      fields: {
        name: 'Họ và tên',
        gender: 'Giới tính',
        title: 'Chức danh',
        birth_day: 'Ngày sinh',
        per_type: 'Dân tộc',
        national: 'Quốc tịch',
        doc_type: 'Loại giấy tờ pháp lý',
        doc_code: 'Số CMND/ CCCD/ Hộ chiếu',
        doc_time_provide: 'Ngày cấp',
        doc_place_provide: 'Nơi cấp',
        contact: {
          label: 'Địa chỉ thường trú',
          fields: {
            address: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn',
            city: 'Tỉnh/Thành phố',
            district: 'Quận/Huyện/Thị xã/Thành phố thuộc tỉnh',
            town: 'Xã/Phường/Thị trấn',
          },
        },
        current: {
          label: 'Địa chỉ hiện tại',
          fields: {
            address: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn',
            city: 'Tỉnh/Thành phố',
            district: 'Quận/Huyện/Thị xã/Thành phố thuộc tỉnh',
            town: 'Xã/Phường/Thị trấn',
          },
        },
      },
    },
    after_change: {
      label: 'Danh sách người đại diện pháp luật sau khi thay đổi',
      fields: {
        name: 'Họ và tên',
        gender: 'Giới tính',
        title: 'Chức danh',
        birth_day: 'Ngày sinh',
        per_type: 'Dân tộc',
        national: 'Quốc tịch',
        doc_type: 'Loại giấy tờ pháp lý',
        doc_code: 'Số CMND/ CCCD/ Hộ chiếu',
        doc_time_provide: 'Ngày cấp',
        doc_place_provide: 'Nơi cấp',
        contact: {
          label: 'Địa chỉ thường trú',
          fields: {
            address: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn',
            city: 'Tỉnh/Thành phố',
            district: 'Quận/Huyện/Thị xã/Thành phố thuộc tỉnh',
            town: 'Xã/Phường/Thị trấn',
          },
        },
        current: {
          label: 'Địa chỉ hiện tại',
          fields: {
            address: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn',
            city: 'Tỉnh/Thành phố',
            district: 'Quận/Huyện/Thị xã/Thành phố thuộc tỉnh',
            town: 'Xã/Phường/Thị trấn',
          },
        },
      },
    },
    // company_name: 'Tên doanh nghiệp',
    // mst: 'Mã số doanh nghiệp/ mã số thuế',
    // old_name: 'Tên người đại diện pháp luật cũ',
    // old_title: 'Chức danh',
    // new_name: 'Họ và tên',
    // gender: 'Giới tính',
    // new_title: 'Chức danh',
    // birth_day: 'Ngày sinh',
    // per_type: 'Dân tộc',
    // national: 'Quốc tịch',
    // doc_type: 'Loại giấy tờ pháp lý',
    // doc_code: 'Số CMND/ CCCD/ Hộ chiếu',
    // doc_time_provide: 'Ngày cấp',
    // doc_place_provide: 'Nơi cấp',
    // reg_address: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn',
    // town: 'Xã/Phường/Thị Trấn',
    // district: 'Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh',
    // city: 'Tỉnh/Thành phố',
    // contact_reg_address: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn',
    // contact_town: 'Xã/Phường/Thị Trấn',
    // contact_district: 'Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh',
    // contact_city: 'Tỉnh/Thành phố',
  },
}

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
}

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

        company_model: 'Mô hình công ty',

        capital_contribution: {
          label: 'Phần vốn góp',
          fields: {
            capital_current: {
              label: 'Vốn góp',
              field: {
                num: 'Bằng số',
                char: 'Bằng chữ',
                percent: 'Chiếm % vốn điều lệ',
              },
            },
            capital_contribution: {
              label: 'Vốn góp',
              field: {
                num: 'Bằng số',
                char: 'Bằng chữ',
                percent: 'Chiếm % vốn điều lệ',
              },
            },
          },
        },
      },
    },
  },
}

const CHU_SO_HUU_FORM = {
  title: 'Người đại diện theo ủy quyền của chủ sở hữu là tổ chức',
  fields: {
    company_name: 'Tên doanh nghiệp',
    mst: 'Mã số doanh nghiệp/ mã số thuế',
  },
}

const GIAM_VON_DIEU_LE_FORM = {
  title: 'Đăng kí thay đổi vốn điều lệ',
  fields: {
    company_name: 'Tên doanh nghiệp',
    mst: 'Mã số doanh nghiệp/ mã số thuế',
    base_val: {
      label: 'Vốn điều lệ đã đăng ký',
      fields: {
        num: 'Vốn điều lệ đã đăng ký (bằng số)',
        char: 'Vốn điều lệ đã đăng ký (bằng chữ)',
      },
    },
    new_base_val: {
      label: 'Vốn điều lệ sau khi giảm',
      fields: {
        num: 'Vốn điều lệ sau khi giảm (bằng số)',
        char: 'Vốn điều lệ sau khi giảm (bằng chữ)',
      },
    },
    type: 'Hình thức giảm vốn',
  },
}

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
}

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
}

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
}

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
}

const BASE_INFORMATION_FORM = {
  title: 'Thông tin doanh nghiệp',
  fields: {
    company_name: 'Tên doanh nghiệp',
    mst: 'Mã số doanh nghiệp/ mã số thuế',
    time_provide: 'Ngày cấp',
    place_provide: 'Nơi cấp',
    contribute_members: {
      label: 'Hội đồng thành viên',
      fields: {
        name: 'Họ và Tên',
        capital: 'Vốn góp',
        capital_percent: 'Chiếm % vốn điều lệ',
      },
    },
  },
}
const CHANGE_INFO_FORM = {
  // Thông tin cơ bản
  base_inform: BASE_INFORMATION_FORM,

  // Đăng ký thay đổi người đại diện theo pháp luật
  legal_representative: DAI_DIEN_PHAP_LUAT_FORM,

  // Người đại diện theo ủy quyền của chủ sở hữu là tổ chức
  present_change: CHU_SO_HUU_FORM,

  // Đăng ký thay đổi địa chỉ trụ sở chính
  location: DIA_CHI_TRU_SO_CHINH_FORM,

  // Giảm vốn điều lệ
  down_authorized_capital: GIAM_VON_DIEU_LE_FORM,

  // Tăng vốn điều lệ
  up_authorized_capital: TANG_VON_DIEU_LE_FORM,

  // Hợp đồng chuyển nhượng
  transfer_contract: HOP_DONG_CHUYEN_NHUONG_FORM,

  // Thay đổi ngành nghề kinh doanh
  company_career: THAY_DOI_NGANH_NGHE_FORM,

  // Thay đổi tên doanh nghiệp
  name: THAY_DOI_TEN_DOANH_NGHIEP_FORM,

  // Thay đổi thông tin đăng kí thuế
  tax: THAY_DOI_THONG_TIN_DANG_KI_THUE_FORM,
}

const CREATE_COMPANY_FORM = {
  approve: {
    title: 'Thành lập doanh nghiệp',
    fields: {
      base_val: {
        label: 'Vốn điều lệ',
        fields: {
          num: 'Vốn điều lệ (bằng số)',
          char: 'Vốn điều lệ (bằng chữ)',
        },
      },
      origin_person: {
        label: 'Thành viên góp vốn',
        fields: {
          capital: 'Số tiền góp vốn',
          name: 'Thành viên góp vốn',
          gender: 'Giới tính',
          birth_day: 'Ngày sinh',
          per_type: 'Dân tộc',
          doc_type: 'Loại giấy tờ',
          doc_code: 'Mã doanh nghiệp',
          doc_time_provide: 'Ngày cấp',
          doc_place_provide: ' Nơi cấp',
          contact: {
            label: 'Địa chỉ thường trú',
            fields: {
              address: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn',
              city: 'Tỉnh/Thành phố',
              district: 'Quận/Huyện/Thị xã/Thành phố thuộc tỉnh',
              town: 'Xã/Phường/Thị trấn',
            },
          },
          current: {
            label: 'Địa chỉ hiện tại',
            fields: {
              address: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn',
              city: 'Tỉnh/Thành phố',
              district: 'Quận/Huyện/Thị xã/Thành phố thuộc tỉnh',
              town: 'Xã/Phường/Thị trấn',
            },
          },
          organization: {
            label: 'Tổ Chức',
            fields: {
              name: 'Tên tổ chức',
              mst: 'Mã số doanh nghiệp hoặc Mã số thuế',
              doc_place_provide: 'Ngày cấp',
              doc_time_provide: 'Nơi cấp',
            },
          },
        },
      },
      present_person: 'Người đại diện',
      company_value: 'Giá trị góp vốn',
      legal_respon: {
        label: 'Người đại diện pháp luật',
        fields: {
          name: 'Họ và tên',
          gender: 'Giới tính',
          birth_day: 'Ngày sinh',
          per_type: 'Dân tộc',
          doc_type: 'Loại giấy tờ',
          doc_code: 'Số CMND/ CCCD/ Hộ chiếu',
          doc_time_provide: 'Ngày cấp',
          doc_place_provide: 'Nơi cấp',
          title: 'Chức danh',
          current: {
            label: 'Địa chỉ thường trú',
            fields: {
              address: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn',
              city: 'Tỉnh/Thành phố',
              district: 'Quận/Huyện/Thị xã/Thành phố thuộc tỉnh',
              town: 'Xã/Phường/Thị trấn',
            },
          },
          contact: {
            label: 'Địa chỉ hiện tại',
            fields: {
              address: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn',
              city: 'Tỉnh/Thành phố',
              district: 'Quận/Huyện/Thị xã/Thành phố thuộc tỉnh',
              town: 'Xã/Phường/Thị trấn',
            },
          },
        },
      },

      core: {
        label: 'Thông tin doanh nghiệp',
        fields: {
          name: 'Tên công ty bằng Tiếng Việt',
          name_en: 'Tên công ty bằng Tiếng Anh (nếu có)',
          name_vn: 'Tên công ty viết tắt (nếu có)',
          address: {
            label: 'Địa chỉ trụ sở chính',
            fields: {
              address: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn',
              city: 'Tỉnh/Thành phố',
              district: 'Quận/Huyện/Thị xã/Thành phố thuộc tỉnh',
              town: 'Xã/Phường/Thị trấn',
            },
          },
          address_opt_1: 'Địa chỉ chi nhánh (nếu có)',
          address_opt_2: 'Địa chỉ văn phòng đại diện (nếu có)',
          contact: {
            email: 'Email liên hệ (nếu có)',
            phone: 'Số điện thoại liên hệ',
          },
        },
      },

      company_main_career: {
        label: 'Ngành nghề chính',
        fields: {
          name: 'Tên ngành',
          code: 'Mã ngành',
        },
      },

      company_opt_career: {
        label: 'Ngành nghề phụ',
        fields: {
          name: 'Tên ngành',
          code: 'Mã ngành',
        },
      },
    },
  },
}

const PENDING_FORM = {
  approve: {
    // Tạm ngưng kinh doanh
    title: 'Tạm ngưng kinh doanh',
    fields: {
      company_name: 'Tên doanh nghiệp',
      mst: 'Mã số doanh nghiệp hoặc Mã số thuế',
      time_provide: 'Ngày cấp',
      place_provide: 'Nơi cấp',
      obj: 'Đối tượng tạm ngưng',
      location: {
        label: 'Địa chỉ trụ sở chính',
        fields: {
          address: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn',
          city: 'Tỉnh/Thành phố',
          district: 'Quận/Huyện/Thị xã/Thành phố thuộc tỉnh',
          town: 'Xã/Phường/Thị trấn',
        },
      },
      main_legal: 'Người đại diện pháp luật',
      branch_name: 'Tên chi nhánh hoặc văn phòng đại diện hoặc địa điểm kinh doanh',
      resp_office: 'Mã số chi nhánh hoặc Mã số thuế của chi nhánh',

      list_president: {
        president: 'Tên thành viên',
      },
      contribute_members: {
        label: 'Hội đồng thành viên',
        fields: {
          name: 'Họ và Tên',
          capital: 'Vốn góp',
          capital_percent: 'Chiếm % vốn điều lệ',
          doc_code: 'Số giấy chứng nhận góp vốn',
          time_provide: 'Ngày cấp giấy chứng nhận góp vốn',
        },
      },
      branch: {
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
      org_person: 'Người đại diện pháp luật',
    },
  },
}

const DISSOLUTION_FORM = {
  approve: {
    title: 'Giải thể',
    fields: {
      company_name: 'Tên doanh nghiệp',
      mst: 'Mã số doanh nghiệp hoặc Mã số thuế',
      org_person: 'Người đại diện pháp luật',
      location: {
        label: 'Địa chỉ trụ sở chính',
        fields: {
          address: 'Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn',
          city: 'Tỉnh/Thành phố',
          district: 'Quận/Huyện/Thị xã/Thành phố thuộc tỉnh',
          town: 'Xã/Phường/Thị trấn',
        },
      },
      list_president: {
        label: 'Hội đồng quản trị',
        fields: {
          president: 'Họ và Tên',
        },
      },
      contribute_members: {
        label: 'Hội đồng thành viên',
        fields: {
          name: 'Họ và Tên',
          capital: 'Vốn góp',
          capital_percent: 'Chiếm % vốn điều lệ',
        },
      },
      total_capital: 'Tổng vốn điều lệ',
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
}

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
}

const NEWLABEL = (pathName) =>
  ({
    // Thay đổi thông tin
    change_info: { ...CHANGE_INFO_FORM },
    // Thành lập công ty
    create_company: { ...CREATE_COMPANY_FORM },
    // Tạm hoãn
    pending: { ...PENDING_FORM },
    // Giải thể
    dissolution: { ...DISSOLUTION_FORM },

    uy_quyen: { ...UY_QUYEN },
  }[pathName])

export {
  LABEL,
  CREATE_COMPANY_FORM,
  PENDING_FORM,
  DISSOLUTION_FORM,
  CHANGE_INFO_FORM,
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
  NEWLABEL,
}
