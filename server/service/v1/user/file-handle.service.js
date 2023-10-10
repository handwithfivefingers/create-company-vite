const { Order, File } = require('@model')
const path = require('path')
const fs = require('fs')
const moment = require('moment')
module.exports = class FileHandleService {
  // legal_representative
  onUploadFiles = async (req) => {
    let filesStorage
    try {
      const { categoryName, files: listFiles } = req.body

      const files = req.files.uploadFiles

      const uploadPath = path.join(global.__basedir, 'uploads', 'document', categoryName)

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath)
      }

      filesStorage = await this.convertFiles({ files, uploadPath: ['document', categoryName] })

      const _files = await File.findOne({ categoryName })
      if (!_files) {
        const _filesModels = new File({
          categoryName,
          files: filesStorage,
        })
        await _filesModels.save()
      } else {
        _files.files = [...listFiles, filesStorage]
        await _files.save()
      }

      return true
    } catch (error) {
      // fs.unlinkSync(attach.path)
      if (filesStorage) {
        for (let file of filesStorage) {
          if (file.path) {
            fs.unlinkSync(path.join(global.__basedir, 'uploads', file.path))
          }
        }
      }
      console.log('onUploadFiles error', error)
      throw error
    }
  }
  convertFiles = ({ files, uploadPath }) => {
    try {
      let result = []

      result = files.map(({ originalname, buffer }) => {
        const ext = originalname.split('.').pop()
        const ref = `${moment().format('YYYYMMDDHHmm')}-${originalname}.${ext}`
        // fs.createWriteStream(path.join(global.__basedir, 'uploads', ...uploadPath, ref)).write(buffer)
        fs.writeFileSync(path.join(global.__basedir, 'uploads', ...uploadPath, ref), buffer)
        return {
          path: path.join(...uploadPath, ref),
          fileName: originalname,
        }
      })
      return result
    } catch (error) {
      throw error
    }
  }
}

// changeInfoListFiles = {
//   // 1 thành viên
//   HopDongChuyenNhuong: {
//     name: 'Hợp đồng chuyển nhượng',
//     fileName: 'change_info_File_B_hopdong.docx',
//   },
//   QuyetDinh: {
//     name: 'Quyết định',
//     fileName: 'change_info_quyetdinh.docx',
//   },
//   PhuLuc2: {
//     name: 'Đăng kí MTV',
//     fileName: 'change_info_File_2_PhuLuc_I_2_GiayDeNghiDangKiMTV.docx',
//   },
//   PhuLuc4: {
//     name: 'Danh sách người đại diện',
//     fileName: 'change_info_File_4_PhuLuc_I_10_DanhSachNguoiDaiDien.docx',
//   },
//   PhucLuc2_4: {
//     name: 'Danh sách người đại diện',
//     fileName: 'change_info_File_3_PhuLuc_II_4_ChuSoHuu.docx',
//   },
//   UyQuyen: {
//     name: 'Ủy quyền',
//     fileName: 'change_info_uyquyen.docx',
//   },

//   PhuLuc2_5: {
//     name: 'Thông báo về việc bổ sung cập nhật thông tin đăng kí Doang nghiệp',
//     fileName: 'change_info_File_PhuLuc_II_5_ThongBaoVeViecBoSungCapNhatThongTinDangKiDoanhNghiep-13.docx',
//   },

//   // 2tv
//   QuyetDinhThayDoiHDTV: {
//     name: 'Quyết định thay đổi HDTV',
//     fileName: 'change_info_File_quyetdinh_thaydoi_hdtv.docx',
//   },

//   BienBanHopHDTV: {
//     name: 'Biên bản họp thay đổi HDTV',
//     fileName: 'change_info_File_bienbanhop_hdtv.docx',
//   },

//   PhuLucI_6: {
//     name: 'Phụ lục I - 6',
//     fileName: 'change_info_File_Phuluc_I_6.docx',
//   },

//   // cp

//   QuyetDinhThayDoiHDCD: {
//     name: 'Quyết định thay đổi HDTV',
//     fileName: 'change_info_File_quyetdinh_thaydoi_hdcd.docx',
//   },

//   BienBanHopHDCD: {
//     name: 'Biên bản họp thay đổi HDTV',
//     fileName: 'change_info_File_bienban_hdcd.docx',
//   },
// }

// constructor() {}

// getOrder = async (_id) => {
//   try {
//     const _order = await Order.findOne({ _id }).populate('products category')
//     const isChangeInfo = _order.data.hasOwnProperty('change_info')
//     const categoryType = _order.category.type
//     console.log('isChangeInfo', isChangeInfo)
//     return _order
//   } catch (error) {
//     throw error
//   }
// }

// getFileByTypeAndName = ({ type, name, productType }) => {
//   try {
//     const subPath = ['uploads', 'files', ...name]
//     // if(productType) {
//     // subPath.
//     // }
//     const result = []
//     // if (type === 1) {
//     //   // result.push()
//     //   if (productType) {
//     //     result.push(path.join(global.__basedir, subPath.join('/')))
//     //   }
//     // }
//     // switch (type) {
//     //   case 1:
//     //     if (productType) {
//     //     }
//     //     return
//     //   default:
//     //     return null
//     // }
//   } catch (error) {}
// }

// getChangeInfoOnePerson = () => {}
// getChangeInfoLegarePresentative = (type) => {
//   switch (type) {
//     case 1:
//       return [this.changeInfoListFiles.QuyetDinh, this.changeInfoListFiles.PhuLuc2, this.changeInfoListFiles.UyQuyen]
//     case 2:
//       //         change_info_2tv_quyetdinh_thaydoi_HDTV
//       // change_info_phu_luc_2
//       // change_info_2tv_bienbanhop_HDTV
//       // change_info_uyquyen
//       return [
//         this.changeInfoListFiles.BienBanHopHDCD,
//         this.changeInfoListFiles.QuyetDinhThayDoiHDCD,
//         this.changeInfoListFiles.PhuLuc4,
//         this.changeInfoListFiles.UyQuyen,
//       ]
//     case 3:
//       return [
//         this.changeInfoListFiles.BienBanHopHDCD,
//         this.changeInfoListFiles.QuyetDinhThayDoiHDCD,
//         this.changeInfoListFiles.PhuLuc4,
//         this.changeInfoListFiles.UyQuyen,
//       ]
//     default:
//       return null
//   }
// }
// getChangeInfoPresentChange = (type) => {
//   switch (type) {
//     case 1:
//       return [this.changeInfoListFiles.QuyetDinh, this.changeInfoListFiles.PhuLuc2, this.changeInfoListFiles.UyQuyen]
//     case 2:
//       return [this.changeInfoListFiles.QuyetDinh, this.changeInfoListFiles.PhuLuc2, this.changeInfoListFiles.UyQuyen]
//     case 3:
//       return [this.changeInfoListFiles.QuyetDinh, this.changeInfoListFiles.PhuLuc2, this.changeInfoListFiles.UyQuyen]
//     default:
//       return null
//   }
// }
// getChangeInfoLocation = () => {}
// getChangeInfoDecreaseCapital = () => {}
// getChangeInfoIncreaseCapital = () => {}
// getChangeInfoTransferContract = () => {}
// getChangeInfoCareer = () => {}
// getChangeInfoCompanyName = () => {}
// getChangeInfoCompanyTax = () => {}
// getChangeInfoCompanyInformation = () => {}
