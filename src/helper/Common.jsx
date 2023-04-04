import { Skeleton, Col } from 'antd'
import ProductCard from '../components/Products'
import moment from 'moment'
import { default as VNnum2words } from '@/assets/js/convertNumber'

/**
 *
 * @param {*} pathName Array field name
 * @param {*} val value
 * @param {*} ref reference form
 * @param {*} upper Boolean
 */
const onSetFields = (pathName, val, ref, upper = false) => {
  ref.current?.setFields([
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
  return date.isValid
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
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
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

const numToWord = (val) => VNnum2words(val)

const htmlContent = (content) => (
  <div
    dangerouslySetInnerHTML={{
      __html: content,
    }}
  />
)
export {
  number_format,
  renderSkeleton,
  // renderField,
  flattenObject,
  setLink,
  checkMoment,
  log,
  makeid,
  checkVariable,
  onSetFields,
  numToWord,
  htmlContent,
}
