import { Skeleton, Col } from 'antd'
import ProductCard from '../components/Products'
import { BaseFieldText } from './../constant/Common'
import moment from 'moment'
/**
 * 
 * @param {*} pathName Array field name
 * @param {*} val value
 * @param {*} ref reference form
 * @param {*} upper Boolean
 */
const onSetFields = (pathName, val, ref, upper = false) => {
  ref.current.setFields([
    {
      name: [...pathName],
      value: upper ? val.toUpperCase() : val,
    },
  ])
}

const number_format = (number) => {
  // console.log(number)
  return new Intl.NumberFormat().format(number)
}

const renderSkeleton = (number) => {
  let xhtml = []
  for (let i = 0; i < number; i++) {
    xhtml.push(
      <Col key={i} lg={6} md={12} sm={24} xs={24}>
        <ProductCard type="loading" />
      </Col>,
    )
  }
  return xhtml
}

const flattenObject = (obj) => {
  const _template = {}
  Object.keys(obj).forEach((item) => {
    if (typeof obj[item] !== 'object') {
      _template[item] = obj[item] // create exist value for Number || String field
    } else {
      // Handle with Object field
      // 2 case : Array || Object

      if (obj[item].length > 0) {
        // Handle with Array
        _template[item] = obj[item].map((elmt, i) => {
          if (typeof elmt !== 'string') {
            return { ...elmt }
          } else {
            return elmt
          }
        })
      } else {
        Object.keys(obj[item]).forEach((field) => {
          let newField = [item, field].join('_')
          _template[newField] = obj[item][field]
        })
      }
    }
  })
  return _template
}

const getPageMargins = () => {
  // return `@page { margin: 24px !important; }`;
  return `@page {
    padding:24px !important;
    display:block;
    box-sizing:border-box;
    break-after: always !important;
    page-break-after: always !important;
    page-break-inside: avoid !important;
  }
  @media all {
    .pagebreak {
      display: none;
    }
  }

  @media print {
    .pagebreak {
      page-break-before: always;
    }
    div {
      display: grid;
      page-break-inside: avoid;
    }
    .ant-typography {
      display: grid;
      page-break-inside: avoid;
    }
    h3 {
      display: grid;
      page-break-inside: avoid;
    }
  }
  `
}

const setLink = (editor) => {
  const previousUrl = editor.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)

  // cancelled
  if (url === null) {
    return
  }

  // empty
  if (url === '') {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()

    return
  }

  // update link
  editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

const checkMoment = (date) => {
  if (!date.isValid) {
    console.log('this is not a moment object')
  } else {
    console.log('this is a moment object')
  }
}

const log = (...rest) => {
  let stringLog = ''
  // return rest.map(item => )
  if (typeof rest !== 'string' || typeof rest !== 'number') {
    // return console.log(rest)
    stringLog = rest
  } else {
    for (let item in rest) {
      stringLog += `${[item]}, ${rest[item]} <--->`
    }
  }
  return stringLog
}

const makeid = (length) => {
  var result = ''
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const checkVariable = (val) => {
  if (typeof val === 'string' || typeof val === 'number') {
    return 'String'
  } else if (Array.isArray(val)) {
    return 'Array'
  } else if (moment.isMoment(val)) {
    return 'Moment'
  } else if (typeof val === 'object' && Object.keys(val).length > 0) {
    return 'Object'
  } else return typeof val
}

const num2Word2 = (ty) => {
  var t = [
      'không',
      'một',
      'hai',
      'ba',
      'bốn',
      'năm',
      'sáu',
      'bảy',
      'tám',
      'chín',
    ],
    r = function (r, n) {
      var o = '',
        a = Math.floor(r / 10),
        e = r % 10
      return (
        a > 1
          ? ((o = ' ' + t[a] + ' mươi'), 1 == e && (o += ' mốt'))
          : 1 == a
          ? ((o = ' mười'), 1 == e && (o += ' một'))
          : n && e > 0 && (o = ' lẻ'),
        5 == e && a >= 1
          ? (o += ' lăm')
          : 4 == e && a >= 1
          ? (o += ' tư')
          : (e > 1 || (1 == e && 0 == a)) && (o += ' ' + t[e]),
        o
      )
    },
    n = function (n, o) {
      var a = '',
        e = Math.floor(n / 100),
        n = n % 100
      return (
        o || e > 0
          ? ((a = ' ' + t[e] + ' trăm'), (a += r(n, !0)))
          : (a = r(n, !1)),
        a
      )
    },
    o = function (t, r) {
      var o = '',
        a = Math.floor(t / 1e6),
        t = t % 1e6
      a > 0 && ((o = n(a, r) + ' triệu'), (r = !0))
      var e = Math.floor(t / 1e3),
        t = t % 1e3
      return (
        e > 0 && ((o += n(e, r) + ' ngàn'), (r = !0)),
        t > 0 && (o += n(t, r)),
        o
      )
    }
  return {
    convert: function (r) {
      if (0 == r) return t[0]
      var n = '',
        a = ''
      do
        (ty = r % 1e9),
          (r = Math.floor(r / 1e9)),
          (n = r > 0 ? o(ty, !0) + a + n : o(ty, !1) + a + n),
          (a = ' tỷ')
      while (r > 0)
      return n.trim()
    },
  }
}

const defaultNumbers = ' hai ba bốn năm sáu bảy tám chín'
const chuHangDonVi = ('1 một' + defaultNumbers).split(' ')
const chuHangChuc = ('lẻ mười' + defaultNumbers).split(' ')
const chuHangTram = ('không một' + defaultNumbers).split(' ')
const dvBlock = '1 nghìn triệu tỷ'.split(' ')

const to_vietnamese = (number) => {
  var str = parseInt(number) + ''
  var i = 0
  var arr = []
  var index = str.length
  var result = []
  var rsString = ''

  if (index == 0 || str == 'NaN') {
    return ''
  }

  // Chia chuỗi số thành một mảng từng khối có 3 chữ số
  while (index >= 0) {
    // ['000', '000', '000', '000', '000', '000', '000']
    arr.push(str.substring(index, Math.max(index - 3, 0)))
    index -= 3
  }

  // Lặp từng khối trong mảng trên và convert từng khối đấy ra chữ Việt Nam

  for (i = arr.length - 1; i >= 0; i--) {
    if (arr[i] != '' && arr[i] != '000') {
      result.push(convert_block_three(arr[i]))

      // Thêm đuôi của mỗi khối
      if (dvBlock[i]) {
        result.push(dvBlock[i])
      }
    }
  }

  // Join mảng kết quả lại thành chuỗi string
  rsString = result.join(' ')

  // Trả về kết quả kèm xóa những ký tự thừa
  return rsString.replace(/[0-9]/g, '').replace(/ /g, ' ').replace(/ $/, '')
}
const convert_block_two = (number) => {
  var dv = chuHangDonVi[number[1]]
  var chuc = chuHangChuc[number[0]]
  var append = ''

  // Nếu chữ số hàng đơn vị là 5
  if (number[0] > 0 && number[1] == 5) {
    dv = 'lăm'
  }

  // Nếu số hàng chục lớn hơn 1
  if (number[0] > 1) {
    append = ' mươi'

    if (number[1] == 1) {
      dv = ' mốt'
    }
  }

  return chuc + '' + append + ' ' + dv
}

const convert_block_three = (number) => {
  if (number == '000') return ''
  var _a = number + '' //Convert biến 'number' thành kiểu string

  //Kiểm tra độ dài của khối
  switch (_a.length) {
    case 0:
      return ''
    case 1:
      return chuHangDonVi[_a]
    case 2:
      return convert_block_two(_a)
    case 3:
      var chuc_dv = ''
      if (_a.slice(1, 3) != '00') {
        chuc_dv = convert_block_two(_a.slice(1, 3))
      }
      var tram = chuHangTram[_a[0]] + ' trăm'
      return tram + ' ' + chuc_dv
  }
}

/**
  3 Trăm
  6 Nghìn
  9 Triệu
  12 Tỉ
  15 Trăm Tỉ
  18 Nghìn Tỉ
  21 Triệu Tỉ
  24 Tỉ Tỉ
 */

// const howToConvert = (number) => {
// 	let str = number.toString();

// 	let perBill = str.length % 12;
// 	let perMill = str.length % 9;
// 	let perThou = str.length % 6;
// 	let perHund = str.length % 3;

// };

class howToConvert {
  constructor(props) {
    this.props = props
  }

  str = this.props.number.toString()
  perBill = str.length % 12
  perMill = str.length % 9
  perThou = str.length % 6
  perHund = str.length % 3

  getBil = () => {
    let num = this.str % 12
    let newStr = [].fill('Tỉ ', 0, num)
    return this
  }
  getMill = () => {
    return this
  }
  getThou = () => {
    return this
  }
  getHnd = () => {
    return this
  }
}

export {
  number_format,
  renderSkeleton,
  // renderField,
  flattenObject,
  getPageMargins,
  setLink,
  checkMoment,
  log,
  makeid,
  checkVariable,
  to_vietnamese,
  num2Word2,
  onSetFields,
}
