const { flattenObject, convertFile, removeListFiles } = require('@common/helper')
const { generateDocs } = require('@common/odt.template')
const moment = require('moment')
module.exports = class ConvertService {
  onConvert = async ({ _id: docId, products, data, category, files }) => {
    try {
      console.log('files', data)
      let nextData = {
        ...data,
        date: moment().format('DD'),
        month: moment().format('MM'),
        year: moment().format('YYYY'),
      }

      if (nextData?.create_company) {
        nextData = this.getCreateCompanyData(nextData)
      }
      console.log('nextData', JSON.stringify(nextData, null, 4))
      for (let file of files) {
        const { fileName, fileOriginalName, path: filePath } = file
        await generateDocs({ filePath: filePath, data: nextData, fileName: fileOriginalName, docId: docId })
      }

      return true
    } catch (error) {
      throw error
    }
  }
  getCreateCompanyData = (data) => {
    const result = { ...data }
    const getDocString = (item, isPersonal) => {
      if (isPersonal) {
        return `${item.doc_code} Ngày cấp: ${moment(item.doc_time_provide).format('DD/MM/YYYY')} Nơi cấp: ${
          item.doc_place_provide
        }`
      }
      return `${item.organization.mst}   Ngày cấp: ${moment(item.organization.doc_time_provide).format(
        'DD/MM/YYYY',
      )}   Nơi cấp: Sở kế hoạch và đầu tư ${item.organization.doc_place_provide.city}`
    }

    if (result?.create_company?.approve) {
      result.create_company.approve.company_opt_career = result?.create_company?.approve?.company_opt_career?.map(
        (item, i) => {
          return {
            i: i + 2,
            name: item.name,
            code: item.code,
            content: '',
          }
        },
      )
    }

    if (result?.create_company?.approve?.origin_person) {
      result.create_company.approve.origin_person = result?.create_company?.approve?.origin_person?.map((item, i) => {
        const isPersonal = item.present_person === 'personal'
        const isOrg = item.present_person === 'organization'
        return {
          ...item,
          index: i + 1,
          originName: isPersonal ? item.name : isOrg ? item.organization?.name : '',
          originGender: isPersonal ? item.gender : '',
          originBirthday: isPersonal ? item.birth_day : '',
          originNational: isPersonal ? 'Việt Nam' : '',
          originPertype: isPersonal ? item.per_type : '',
          originContact: isPersonal ? item.contact : isOrg ? item.organization.doc_place_provide : '',
          originDocCode: getDocString(item, isPersonal),
          originCapitalQuantity: item.capital / 10000,
          originCapitalPercent: `${(item.capital / result?.create_company?.approve?.base_val?.num) * 100}%`,
          originTimeProvide: isOrg ? moment(item.organization.doc_time_provide).format('DD/MM/YYYY') : '',
        }
      })
    }

    if (result?.create_company?.approve?.legal_respon) {
      const len = result.create_company.approve.legal_respon.length
      result.create_company.approve.legal_respon = result.create_company.approve.legal_respon?.map((item, i) => {
        return {
          ...item,
          index: i + 1,
          indexString: len > 1 ? indexString[i] : '',
        }
      })
      result.create_company.approve.legalLength = result.create_company.approve.legal_respon.length
    }
    return result
  }
}
