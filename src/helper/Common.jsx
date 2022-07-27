import { Skeleton, Col } from 'antd';
import ProductCard from '../components/Products';
import { BaseFieldText } from './../constant/Common';
import moment from 'moment';

const number_format = (number) => {
	// console.log(number)
	return new Intl.NumberFormat().format(number);
};

const renderSkeleton = (number) => {
	let xhtml = [];
	for (let i = 0; i < number; i++) {
		xhtml.push(
			<Col key={i} lg={6} md={12} sm={24} xs={24}>
				<ProductCard type='loading' />
			</Col>
		);
	}
	return xhtml;
};

const flattenObject = (obj) => {
	const _template = {};
	Object.keys(obj).forEach((item) => {
		if (typeof obj[item] !== 'object') {
			_template[item] = obj[item]; // create exist value for Number || String field
		} else {
			// Handle with Object field
			// 2 case : Array || Object

			if (obj[item].length > 0) {
				// Handle with Array
				_template[item] = obj[item].map((elmt, i) => {
					if (typeof elmt !== 'string') {
						return { ...elmt };
					} else {
						return elmt;
					}
				});
			} else {
				Object.keys(obj[item]).forEach((field) => {
					let newField = [item, field].join('_');
					_template[newField] = obj[item][field];
				});
			}
		}
	});
	return _template;
};

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
  `;
};

const setLink = (editor) => {
	const previousUrl = editor.getAttributes('link').href;
	const url = window.prompt('URL', previousUrl);

	// cancelled
	if (url === null) {
		return;
	}

	// empty
	if (url === '') {
		editor.chain().focus().extendMarkRange('link').unsetLink().run();

		return;
	}

	// update link
	editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
};

const checkMoment = (date) => {
	if (!date.isValid) {
		console.log('this is not a moment object');
	} else {
		console.log('this is a moment object');
	}
};

const log = (...rest) => {
	let stringLog = '';
	// return rest.map(item => )
	if (typeof rest !== 'string' || typeof rest !== 'number') {
		// return console.log(rest)
		stringLog = rest;
	} else {
		for (let item in rest) {
			stringLog += `${[item]}, ${rest[item]} <--->`;
		}
	}
	return stringLog;
};

const makeid = (length) => {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

const checkVariable = (val) => {
	if (typeof val === 'string' || typeof val === 'number') {
		return 'String';
	} else if (Array.isArray(val)) {
		return 'Array';
	} else if (moment.isMoment(val)) {
		return 'Moment';
	} else if (typeof val === 'object' && Object.keys(val).length > 0) {
		return 'Object';
	} else return typeof val;
};

const num2Word2 = () => {
	var t = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'],
		r = function (r, n) {
			var o = '',
				a = Math.floor(r / 10),
				e = r % 10;
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
			);
		},
		n = function (n, o) {
			var a = '',
				e = Math.floor(n / 100),
				n = n % 100;
			return o || e > 0 ? ((a = ' ' + t[e] + ' trăm'), (a += r(n, !0))) : (a = r(n, !1)), a;
		},
		o = function (t, r) {
			var o = '',
				a = Math.floor(t / 1e6),
				t = t % 1e6;
			a > 0 && ((o = n(a, r) + ' triệu'), (r = !0));
			var e = Math.floor(t / 1e3),
				t = t % 1e3;
			return e > 0 && ((o += n(e, r) + ' ngàn'), (r = !0)), t > 0 && (o += n(t, r)), o;
		};
	return {
		convert: function (r) {
			if (0 == r) return t[0];
			var n = '',
				a = '';
			do (ty = r % 1e9), (r = Math.floor(r / 1e9)), (n = r > 0 ? o(ty, !0) + a + n : o(ty, !1) + a + n), (a = ' tỷ');
			while (r > 0);
			return n.trim();
		},
	};
};

const to_vietnamese = (number) => {
	const dvBlock = '1 nghìn triệu tỷ'.split(' ');

	var str = parseInt(number) + '';
	var i = 0;
	var arr = [];
	var index = str.length;
	var result = [];
	var rsString = '';

	if (index == 0 || str == 'NaN') {
		return '';
	}

	// Chia chuỗi số thành một mảng từng khối có 3 chữ số
	while (index >= 0) {
		arr.push(str.substring(index, Math.max(index - 3, 0)));
		index -= 3;
	}

	// Lặp từng khối trong mảng trên và convert từng khối đấy ra chữ Việt Nam
	for (i = arr.length - 1; i >= 0; i--) {
		if (arr[i] != '' && arr[i] != '000') {
			result.push(convert_block_three(arr[i]));

			// Thêm đuôi của mỗi khối
			if (dvBlock[i]) {
				result.push(dvBlock[i]);
			}
		}
	}

	// Join mảng kết quả lại thành chuỗi string
	rsString = result.join(' ');

	// Trả về kết quả kèm xóa những ký tự thừa
	return rsString.replace(/[0-9]/g, '').replace(/ /g, ' ').replace(/ $/, '');
};
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
};
