/**
 *
 * @param {* type danh mục} type danh mục sản phẩm -> 1tv || 2tv || cổ phần
 * @param {*keys  loại sản phẩm} pathName tên sản phẩm -> change_info
 * @param {* key loại hình sản phẩm} key child products ở sản phẩm -> name || tax ...
 * @param {* condition điều kiện thêm} opt điều kiện áp dụng cho 1 số field đặc biệt
 * @returns {* Array file} list file từ server
 */
const getFileByPathName = (type, pathName, key, opt) =>
  ({
    // create_company
    create_company: getCreateCompanyFiles(type, key, opt),

    // change_info
    change_info: getChangeInfoFiles(type, key, opt),

    // pending
    pending: getPendingFiles(type, key),

    // dissolution
    dissolution: getDissolutionFiles(type, key),
  }?.[pathName]);

const a = (pathName) => (
  (type, key, opt) => {
    return {
      // create_company
      create_company: getCreateCompanyFiles(type, key, opt),

      // change_info
      change_info: getChangeInfoFiles(type, key, opt),

      // pending
      pending: getPendingFiles(type, key),

      // dissolution
      dissolution: getDissolutionFiles(type, key),
    };
  },
  [pathName]
);

/**
 *
 * @param {*} type
 * @param {*} key
 * @returns { Files Array}
 */
const getPendingFiles = (type, key) => {
  const allFiles = {
    // 1 thành viên
    pending_quyetdinh: {
      name: 'Quyết định',
      path: '/files/pending/pending_File_1_quyetdinh.docx',
    }, // uy quyen
    pending_uyquyen: {
      name: 'Ủy quyền',
      path: '/files/pending/pending_uyquyen.docx',
    }, // uy quyen
    pending_a_b: {
      name: 'Phụ lục II - 19',
      path: '/files/pending/pending_File_A_B_Phuluc_II_19.docx',
    }, // phu luc 19

    // 2 thành viên
    pending_quyetdinh_twoPerson: {
      name: 'QUYẾT ĐỊNH TẠM NGỪNG KINH DOANH CỦA HỘI ĐỒNG THÀNH VIÊN',
      path: '/files/pending/2tv/pending_quyet_dinh_tam_ngung_kinh_doanh.docx',
    },

    pending_bienban_twoPerson: {
      name: 'BIÊN BẢN HỌP TẠM NGỪNG KINH DOANH CỦA HỘI ĐỒNG THÀNH VIÊN',
      path: '/files/pending/2tv/pending_bien_ban_hop_tam_ngung_kinh_doanh.docx',
    },

    // cổ phần
    pending_quyetdinh_cp: {
      name: 'Quyết định tạm nhưng kinh doanh',
      path: '/files/pending/cp/pending_quyet_dinh_tam_ngung_kinh_doanh.docx',
    },
    pending_bienban_cp: {
      name: 'Biên bản họp tạm nhưng kinh doanh',
      path: '/files/pending/cp/pending_bien_ban_hop_tam_ngung_kinh_doanh.docx',
    },
  };
  // pending_uyquyen, pending_quyetdinh, pending_a_b -> Quyết định tạm ngưng 1 tv
  // pending_quyetdinh_twoPerson, pending_bienban_twoPerson, pending_uyquyen, pending_a_b -> Quyết định tạm ngưng 2 tv
  // pending_quyetdinh_cp, pending_bienban_cp, pending_uyquyen, pending_a_b -> Quyết định tạm ngưng cổ phần

  // allFiles.pending_uyquyen, allFiles.pending_a_b -> Hủy bỏ tạm ngưng kinh doanh 1tv

  switch (type) {
    case '1':
      return {
        approve: [allFiles.pending_uyquyen, allFiles.pending_quyetdinh, allFiles.pending_a_b],
      }?.[key];
    case '2':
      return {
        approve: [
          allFiles.pending_uyquyen,
          allFiles.pending_quyetdinh_twoPerson,
          allFiles.pending_a_b,
          allFiles.pending_bienban_twoPerson,
        ],
      }?.[key];
    case '3':
      return {
        approve: [
          allFiles.pending_uyquyen,
          allFiles.pending_quyetdinh_cp,
          allFiles.pending_a_b,
          allFiles.pending_bienban_cp,
        ],
      }?.[key];
    // case này tạm bỏ
    // case 'cancel':
    //   if (type === '1') {
    //     return [allFiles.pending_uyquyen, allFiles.pending_a_b];
    //   } else if (type === '2') {
    //   } else if (type === '3') {
    //   }
    default:
      return null;
  }
};
/**
 *
 * @param {*} type
 * @param {*} key
 * @param {*} opt Field dành riêng cho Create Company bao gồm 2 loại : 1 là personal , 2 là organization
 * @returns { Files Array}
 */
const getCreateCompanyFiles = (type, key, opt = null) => {
  const allFiles = {
    // 1 thành viên
    create_company_uyquyen: {
      name: 'Ủy quyền',
      path: '/files/create_company/create_company_uyquyen.docx',
    },
    create_company_dieuleA: {
      name: 'Điều lệ cá nhân',
      path: '/files/create_company/create_company_File_1A_DieuLeCaNhan.docx',
    },
    create_company_dieuleB: {
      name: 'Điều lệ tổ chức',
      path: '/files/create_company/create_company_File_1B_DieuLeToChuc.docx',
    },
    create_company_phu_luc_2: {
      name: 'Phụ lục I - 2',
      path: '/files/create_company/create_company_File_2_PhuLuc_I_2_GiayDeNghiDangKiMTV.docx',
    },
    create_company_phu_luc_4: {
      name: 'Phụ lục I - 10',
      path: '/files/create_company/create_company_File_4_PhuLuc_I_10_DanhSachNguoiDaiDien.docx',
    },
    // 2 thành viên
    // pending_quyetdinh_twoPerson: {
    //   name: 'BIÊN BẢN HỌP TẠM NGỪNG KINH DOANH CỦA HỘI ĐỒNG THÀNH VIÊN',
    //   path: '/files/pending/2tv/pending_quyet_dinh_tam_ngung_kinh_doanh.docx',
    // },
    // pending_bienban_twoPerson: {
    //   name: 'QUYẾT ĐỊNH TẠM NGỪNG KINH DOANH CỦA HỘI ĐỒNG THÀNH VIÊN',
    //   path: '/files/pending/2tv/pending_quyet_dinh.docx',
    // },
    // cổ phần
    // pending_quyetdinh_cp: {
    //   name: 'Quyết định tạm nhưng kinh doanh',
    //   path: '/files/pending/cp/pending_quyet_dinh_tam_ngung_kinh_doanh.docx',
    // },
    // pending_bienban_cp: {
    //   name: 'Biên bản tạm nhưng kinh doanh',
    //   path: '/files/pending/cp/pending_bien_ban_tam_ngung_kinh_doanh.docx',
    // },
  };
  // 1 thanh vien
  //
  //   personal: [
  //     allFiles.create_company_dieuleA,
  //     allFiles.create_company_phu_luc_2,
  //     allFiles.create_company_uyquyen,
  //   ],
  //   organization: [
  //     allFiles.create_company_dieuleB,
  //     allFiles.create_company_phu_luc_2,
  //     allFiles.create_company_uyquyen,
  //     allFiles.create_company_phu_luc_4,
  //   ],
  //

  switch (key) {
    case 'approve':
      if (type === '1') {
        // return [allFiles.pending_uyquyen, allFiles.pending_quyetdinh, allFiles.pending_a_b];
        if (opt === 'organization') {
          return [
            allFiles.create_company_dieuleB,
            allFiles.create_company_phu_luc_2,
            allFiles.create_company_uyquyen,
            allFiles.create_company_phu_luc_4,
          ];
        } else if (opt === 'personal') {
          return [allFiles.create_company_dieuleA, allFiles.create_company_phu_luc_2, allFiles.create_company_uyquyen];
        }
      } else if (type === '2') {
        return [];
      } else if (type === '3') {
        return [];
      }

    default:
      return null;
  }
};

/**
 * @param {*} type
 * @param {*} key
 * @returns { Files Array}
 */
const getChangeInfoFiles = (type, key) => {
  const allFiles = {
    // 1 thành viên
    change_info_hop_dong_chuyen_nhuong: {
      name: 'Hợp đồng chuyển nhượng',
      path: '/files/change_info/change_info_File_B_hopdong.docx',
    },
    change_info_quyetdinh: {
      name: 'Quyết định',
      path: '/files/change_info/change_info_quyetdinh.docx',
    },
    change_info_phu_luc_2: {
      name: 'Đăng kí MTV',
      path: '/files/change_info/change_info_File_2_PhuLuc_I_2_GiayDeNghiDangKiMTV.docx',
    },
    change_info_phu_luc_4: {
      name: 'Danh sách người đại diện',
      path: '/files/change_info/change_info_File_4_PhuLuc_I_10_DanhSachNguoiDaiDien.docx',
    },
    change_info_phu_luc_2_4: {
      name: 'Danh sách người đại diện',
      path: '/files/change_info/change_info_File_3_PhuLuc_II_4_ChuSoHuu.docx',
    },
    change_info_uyquyen: {
      // ??
      name: 'Ủy quyền',
      path: '/files/change_info/change_info_uyquyen.docx',
    },
    // 2 thành viên
    // pending_quyetdinh_twoPerson: {
    //   name: 'BIÊN BẢN HỌP TẠM NGỪNG KINH DOANH CỦA HỘI ĐỒNG THÀNH VIÊN',
    //   path: '/files/pending/2tv/pending_quyet_dinh_tam_ngung_kinh_doanh.docx',
    // },
    // pending_bienban_twoPerson: {
    //   name: 'QUYẾT ĐỊNH TẠM NGỪNG KINH DOANH CỦA HỘI ĐỒNG THÀNH VIÊN',
    //   path: '/files/pending/2tv/pending_quyet_dinh.docx',
    // },
    // cổ phần
    // pending_quyetdinh_cp: {
    //   name: 'Quyết định tạm nhưng kinh doanh',
    //   path: '/files/pending/cp/pending_quyet_dinh_tam_ngung_kinh_doanh.docx',
    // },
    // pending_bienban_cp: {
    //   name: 'Biên bản tạm nhưng kinh doanh',
    //   path: '/files/pending/cp/pending_bien_ban_tam_ngung_kinh_doanh.docx',
    // },
  };

  switch (type) {
    case '1':
      return {
        legal_representative: [
          allFiles.change_info_quyetdinh,
          allFiles.change_info_phu_luc_4,
          allFiles.change_info_uyquyen,
        ],

        // Người đại diện theo ủy quyền của chủ sở hữu là tổ chức: "Phụ lục II-1","File_3_UyQuyen.doc",
        present_change: [allFiles.change_info_phu_luc_4, allFiles.change_info_uyquyen],

        // Địa chỉ trụ sở chính: "Quyết định thay đổi", "Phụ lục II-1","File_3_UyQuyen.doc",
        location: [allFiles.change_info_quyetdinh, allFiles.change_info_phu_luc_4, allFiles.change_info_uyquyen],

        // Giảm vốn điều lệ: "Quyết định thay đổi", "Phụ lục II-1","File_3_UyQuyen.doc",
        down_authorized_capital: [
          allFiles.change_info_quyetdinh,
          allFiles.change_info_phu_luc_2_4,
          allFiles.change_info_uyquyen,
        ],

        // Chủ sở hữu: "Hợp đồng chuyển nhượng", "Phụ lục II-4","File_3_UyQuyen.doc",
        transfer_contract: [
          allFiles.change_info_hop_dong_chuyen_nhuong,
          allFiles.change_info_phu_luc_2_4,
          allFiles.change_info_uyquyen,
        ],

        // Ngành nghề kinh doanh:"Quyết định thay đổi", "Phụ lục II-1","File_3_UyQuyen.doc",
        company_career: [allFiles.change_info_quyetdinh, allFiles.change_info_phu_luc_4, allFiles.change_info_uyquyen],

        // Tăng vốn điều lệ:"Quyết định thay đổi", "Phụ lục II-1","File_3_UyQuyen.doc",
        up_authorized_capital: [
          allFiles.change_info_quyetdinh,
          allFiles.change_info_phu_luc_4,
          allFiles.change_info_uyquyen,
        ],

        // Tên doanh nghiệp:"Quyết định thay đổi", "Phụ lục II-1","File_3_UyQuyen.doc",
        name: [allFiles.change_info_quyetdinh, allFiles.change_info_phu_luc_4, allFiles.change_info_uyquyen],

        // Nội dung đăng ký thuế: "Phụ lục II-1","File_3_UyQuyen.doc",
        tax: [allFiles.change_info_phu_luc_4, allFiles.change_info_uyquyen],
      }?.[key];
    case '2':
      return {
        legal_representative: [
          allFiles.change_info_quyetdinh,
          allFiles.change_info_phu_luc_4,
          allFiles.change_info_uyquyen,
        ],

        // Người đại diện theo ủy quyền của chủ sở hữu là tổ chức: "Phụ lục II-1","File_3_UyQuyen.doc",
        present_change: [allFiles.change_info_phu_luc_4, allFiles.change_info_uyquyen],

        // Địa chỉ trụ sở chính: "Quyết định thay đổi", "Phụ lục II-1","File_3_UyQuyen.doc",
        location: [allFiles.change_info_quyetdinh, allFiles.change_info_phu_luc_4, allFiles.change_info_uyquyen],

        // Giảm vốn điều lệ: "Quyết định thay đổi", "Phụ lục II-1","File_3_UyQuyen.doc",
        down_authorized_capital: [
          allFiles.change_info_quyetdinh,
          allFiles.change_info_phu_luc_2_4,
          allFiles.change_info_uyquyen,
        ],

        // Chủ sở hữu: "Hợp đồng chuyển nhượng", "Phụ lục II-4","File_3_UyQuyen.doc",
        transfer_contract: [
          allFiles.change_info_hop_dong_chuyen_nhuong,
          allFiles.change_info_phu_luc_2_4,
          allFiles.change_info_uyquyen,
        ],

        // Ngành nghề kinh doanh:"Quyết định thay đổi", "Phụ lục II-1","File_3_UyQuyen.doc",
        company_career: [allFiles.change_info_quyetdinh, allFiles.change_info_phu_luc_4, allFiles.change_info_uyquyen],

        // Tăng vốn điều lệ:"Quyết định thay đổi", "Phụ lục II-1","File_3_UyQuyen.doc",
        up_authorized_capital: [
          allFiles.change_info_quyetdinh,
          allFiles.change_info_phu_luc_4,
          allFiles.change_info_uyquyen,
        ],

        // Tên doanh nghiệp:"Quyết định thay đổi", "Phụ lục II-1","File_3_UyQuyen.doc",
        name: [allFiles.change_info_quyetdinh, allFiles.change_info_phu_luc_4, allFiles.change_info_uyquyen],

        // Nội dung đăng ký thuế: "Phụ lục II-1","File_3_UyQuyen.doc",
        tax: [allFiles.change_info_phu_luc_4, allFiles.change_info_uyquyen],
      }?.[key];
    case '3':
      return {
        legal_representative: [
          allFiles.change_info_quyetdinh,
          allFiles.change_info_phu_luc_4,
          allFiles.change_info_uyquyen,
        ],
        // Người đại diện theo ủy quyền của chủ sở hữu là tổ chức: "Phụ lục II-1","File_3_UyQuyen.doc",
        present_change: [allFiles.change_info_phu_luc_4, allFiles.change_info_uyquyen],
        // Địa chỉ trụ sở chính: "Quyết định thay đổi", "Phụ lục II-1","File_3_UyQuyen.doc",
        location: [allFiles.change_info_quyetdinh, allFiles.change_info_phu_luc_4, allFiles.change_info_uyquyen],
        // Giảm vốn điều lệ: "Quyết định thay đổi", "Phụ lục II-1","File_3_UyQuyen.doc",
        down_authorized_capital: [
          allFiles.change_info_quyetdinh,
          allFiles.change_info_phu_luc_2_4,
          allFiles.change_info_uyquyen,
        ],
        // Chủ sở hữu: "Hợp đồng chuyển nhượng", "Phụ lục II-4","File_3_UyQuyen.doc",
        transfer_contract: [
          allFiles.change_info_hop_dong_chuyen_nhuong,
          allFiles.change_info_phu_luc_2_4,
          allFiles.change_info_uyquyen,
        ],
        // Ngành nghề kinh doanh:"Quyết định thay đổi", "Phụ lục II-1","File_3_UyQuyen.doc",
        company_career: [allFiles.change_info_quyetdinh, allFiles.change_info_phu_luc_4, allFiles.change_info_uyquyen],
        // Tăng vốn điều lệ:"Quyết định thay đổi", "Phụ lục II-1","File_3_UyQuyen.doc",
        up_authorized_capital: [
          allFiles.change_info_quyetdinh,
          allFiles.change_info_phu_luc_4,
          allFiles.change_info_uyquyen,
        ],
        // Tên doanh nghiệp:"Quyết định thay đổi", "Phụ lục II-1","File_3_UyQuyen.doc",
        name: [allFiles.change_info_quyetdinh, allFiles.change_info_phu_luc_4, allFiles.change_info_uyquyen],
        // Nội dung đăng ký thuế: "Phụ lục II-1","File_3_UyQuyen.doc",
        tax: [allFiles.change_info_phu_luc_4, allFiles.change_info_uyquyen],
      }?.[key];
    default:
      return null;
  }
};

/**
 * @param {*} type
 * @param {*} key
 * @returns { Files Array}
 */
const getDissolutionFiles = (type, key) => {
  const allFiles = {
    dissolution_1: {
      name: 'Quyết định',
      path: '/files/dissolution/dissolution_File_1_Quyetdinh.docx',
    },
    dissolution_Phuluc: {
      name: 'A - Phụ lục - 22',
      path: '/files/dissolution/dissolution_File_A_Phuluc_22.docx',
    },
    dissolution_B: {
      name: 'A - Phụ lục - 23',
      path: '/files/dissolution/dissolution_File_B_Phuluc_23.docx',
    },
    dissolution_uy_quyen: {
      name: 'Ủy quyền',
      path: '/files/dissolution/dissolution_uyquyen.docx',
    },
    // TwoPerson
    dissolution_bienban_twoPerson: {
      name: 'Biên bản họp của HĐTV',
      path: '',
    },
    dissolution_quyetdinh_twoPerson: {
      name: 'Quyết định họp của HĐTV',
      path: '',
    },
    // Cooperation
    dissolution_bienban_cp: {
      name: 'Biên bản họp của HĐQT',
      path: '',
    },
    dissolution_quyetdinh_cp: {
      name: 'Quyết định họp của HĐQT',
      path: '',
    },
  };

  // approve: [allFiles.giai_the_1, allFiles.giai_the_A, allFiles.giai_the_uy_quyen],
  // cancel: [allFiles.giai_the_B, allFiles.giai_the_uy_quyen],
  switch (type) {
    case '1':
      return {
        approve: [allFiles.dissolution_1, allFiles.dissolution_Phuluc, allFiles.dissolution_uy_quyen],
        cancel: [allFiles.dissolution_B, allFiles.dissolution_uy_quyen],
      }?.[key];
    case '2':
      return {
        approve: [
          allFiles.dissolution_Phuluc,
          allFiles.dissolution_uy_quyen,
          allFiles.dissolution_bienban_twoPerson,
          allFiles.dissolution_quyetdinh_twoPerson,
        ],
        cancel: null,
      }?.[key];
    case '3':
      return {
        approve: [
          allFiles.dissolution_Phuluc,
          allFiles.dissolution_uy_quyen,
          allFiles.dissolution_bienban_cp,
          allFiles.dissolution_quyetdinh_cp,
        ],
        cancel: null,
      }?.[key];
    default:
      return null;
  }
};
exports.getListFiles = (pathName) =>
  ({
    create_company: {
      approve: (type, props, keys, opt) => getFileByPathName(type, props, keys, opt),
    },
    change_info: {
      legal_representative: (type, props, keys, opt) => getFileByPathName(type, props, keys, opt),

      present_change: (type, props, keys, opt) => getFileByPathName(type, props, keys, opt),

      location: (type, props, keys, opt) => getFileByPathName(type, props, keys, opt),

      down_authorized_capital: (type, props, keys, opt) => getFileByPathName(type, props, keys, opt),

      transfer_contract: (type, props, keys, opt) => getFileByPathName(type, props, keys, opt),

      company_career: (type, props, keys, opt) => getFileByPathName(type, props, keys, opt),

      up_authorized_capital: (type, props, keys, opt) => getFileByPathName(type, props, keys, opt),

      name: (type, props, keys, opt) => getFileByPathName(type, props, keys, opt),

      tax: (type, props, keys, opt) => getFileByPathName(type, props, keys, opt),
    },

    pending: {
      approve: (type, props, keys) => getFileByPathName(type, props, keys),
      cancel: (type, props, keys) => getFileByPathName(type, props, keys),
    },
    dissolution: {
      approve: (type, props, keys) => getFileByPathName(type, props, keys),
      cancel: (type, props, keys) => getFileByPathName(type, props, keys),
    },
  }?.[pathName]);
