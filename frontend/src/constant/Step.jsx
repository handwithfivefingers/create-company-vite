const CREATE_COMPANY_STEP = [
  {
    title: 'Bước 1',
    desc: 'Chọn loại hình doanh nghiệp',
    field: ['category'],
  },
  {
    title: 'Bước 2',
    desc: 'Vốn điều lệ',
    field: ['create_company', 'approve', 'base_val'],
  },
  {
    title: 'Bước 3',
    desc: 'Thành viên góp vốn',
    field: ['create_company', 'approve', 'origin_person'],
  },
  {
    title: 'Bước 4',
    desc: 'Người đại diện pháp luật',
    field: ['create_company', 'approve', 'legal_respon'],
  },
  {
    title: 'Bước 5',
    desc: 'Tên công ty',
    field: ['create_company', 'approve', 'core', 'name'],
  },
  {
    title: 'Bước 6',
    desc: 'Địa chỉ đặt trụ sở',
    field: ['create_company', 'approve', 'core', 'address'],
  },
  {
    title: 'Bước 7',
    desc: 'Ngành nghề đăng kí',
    field: ['create_company', 'approve', 'company_main_career'],
  },
  {
    title: 'Bước 8',
    desc: 'Xem lại',
    field: ['create_company', 'preview'],
  },
]

const PENDING_STEP = [
  {
    title: 'Bước 1',
    desc: 'Chọn loại hình doanh nghiệp',
    field: ['category'],
  },
  {
    title: `Bước 2`,
    desc: 'Nhập thông tin',
    field: ['pending', 'approve'],
  },
  {
    title: `Bước 3`,
    desc: 'Xem lại',
    field: ['pending', 'preview'],
  },
]

const DISSOLUTION_STEP = [
  {
    title: 'Bước 1',
    desc: 'Chọn loại hình doanh nghiệp',
    field: ['category'],
  },
  {
    title: `Bước 2`,
    desc: 'Giải thể',
    field: ['dissolution', 'approve'],
  },
  {
    title: `Bước 3`,
    desc: 'Xem lại',
    field: ['dissolution', 'preview'],
  },
]

const CHANGE_INFO_BASE_STEP = [
  {
    title: 'Bước 1',
    desc: 'Chọn loại hình doanh nghiệp',
    field: ['category'],
  },
  {
    title: `Bước 2`,
    desc: 'Thông tin chung',
    field: ['change_info', 'base_inform'],
  },
  {
    title: `Bước 3`,
    desc: 'Xem lại',
    field: ['change_info', 'preview'],
  },
]

export { CREATE_COMPANY_STEP, PENDING_STEP, DISSOLUTION_STEP, CHANGE_INFO_BASE_STEP }
