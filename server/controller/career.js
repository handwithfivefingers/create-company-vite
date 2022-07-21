const { Career } = require("./../model");
const {
  updatedHandler,
  errHandler,
  successHandler,
  createdHandler,
  existHandler,
  deletedHandler,
} = require("../response");

exports.createCareer = async (req, res) => {
  try {
    const career = await Career.findOne({
      code: req.body.code,
    });

    if (career) return existHandler(career, res);

    const obj = {
      name: req.body.name,
      code: req.body.code,
    };

    const _career = new Career(obj);
    const data = await _career.save();

    return createdHandler(data, res);
  } catch (err) {
    return errHandler(err, res);
  }
};

exports.fetchCareer = async (req, res) => {
  try {
    let _career = await Career.find();
    return successHandler(_career, res);
  } catch (err) {
    return errHandler(err, res);
  }
};
let careerData = [
  {
    name: "Trồng lúa",
    code: "0111",
  },
  {
    name: "Trồng ngô và cây lương thực có hạt khác",
    code: "0112",
  },
  {
    name: "Trồng cây lấy củ có chất bột",
    code: "0113",
  },
  {
    name: "Trồng cây mía",
    code: "0114",
  },
  {
    name: "Trồng cây thuốc lá, thuốc lào",
    code: "0115",
  },
  {
    name: "Trồng cây lấy sợi",
    code: "0116",
  },
  {
    name: "Trồng cây có hạt chứa dầu",
    code: "0117",
  },
  {
    name: "Trồng rau, đậu các loại và trồng hoa",
    code: "0118",
  },
  {
    name: "Trồng cây hàng năm khác",
    code: "0119",
  },
  {
    name: "Trồng cây ăn quả",
    code: "0121",
  },
  {
    name: "Trồng cây lấy quả chứa dầu",
    code: "0122",
  },
  {
    name: "Trồng cây hồ tiêu",
    code: "0124",
  },
  {
    name: "Trồng cây cao su",
    code: "0125",
  },
  {
    name: "Trồng cây cà phê",
    code: "0126",
  },
  {
    name: "Trồng cây chè",
    code: "0127",
  },
  {
    name: "Trồng cây gia vị, cây dược liệu, cây hương liệu lâu năm",
    code: "0128",
  },
  {
    name: "Trồng cây lâu năm khác",
    code: "0129",
  },
  {
    name: "Nhân và chăm sóc cây giống hàng năm",
    code: "0131",
  },
  {
    name: "Nhân và chăm sóc cây giống lâu năm",
    code: "0132",
  },
  {
    name: "Chăn nuôi trâu, bò và sản xuất giống trâu, bò",
    code: "0141",
  },
  {
    name: "Chăn nuôi ngựa, lừa, la và sản xuất giống ngựa, lừa",
    code: "0142",
  },
  {
    name: "Chăn nuôi dê, cừu và sản xuất giống dê, cừu, hươu, nai",
    code: "0144",
  },
  {
    name: "Chăn nuôi lợn và sản xuất giống lợn",
    code: "0145",
  },
  {
    name: "Chăn nuôi gia cầm",
    code: "0146",
  },
  {
    name: "Chăn nuôi khác",
    code: "0149",
  },
  {
    name: "Trồng trọt, chăn nuôi hỗn hợp",
    code: "0150",
  },
  {
    name: "Hoạt động dịch vụ trồng trọt",
    code: "0161",
  },
  {
    name: "Hoạt động dịch vụ chăn nuôi",
    code: "0162",
  },
  {
    name: "Hoạt động dịch vụ sau thu hoạch",
    code: "0163",
  },
  {
    name: "Xử lý hạt giống để nhân giống",
    code: "0164",
  },
  {
    name: "Săn bắt, đánh bẫy và hoạt động dịch vụ có liên quan",
    code: "0170",
  },
  {
    name: "Trồng rừng, chăm sóc rừng và ươm giống cây lâm nghiệp",
    code: "0210",
  },
  {
    name: "Khai thác gỗ",
    code: "0220",
  },
  {
    name: "Khai thác lâm sản khác trừ gỗ",
    code: "0231",
  },
  {
    name: "Thu nhặt lâm sản khác trừ gỗ",
    code: "0232",
  },
  {
    name: "Hoạt động dịch vụ lâm nghiệp",
    code: "0240",
  },
  {
    name: "Khai thác thủy sản biển",
    code: "0311",
  },
  {
    name: "Khai thác thủy sản nội địa",
    code: "0312",
  },
  {
    name: "Nuôi trồng thủy sản biển",
    code: "0321",
  },
  {
    name: "Nuôi trồng thủy sản nội địa",
    code: "0322",
  },
  {
    name: "Khai thác và thu gom than cứng",
    code: "0510",
  },
  {
    name: "Khai thác và thu gom than non",
    code: "0520",
  },
  {
    name: "Khai thác dầu thô",
    code: "0610",
  },
  {
    name: "Khai thác khí đốt tự nhiên",
    code: "0620",
  },
  {
    name: "Khai thác quặng sắt",
    code: "0710",
  },
  {
    name: "Khai thác quặng uranium và quặng thorium",
    code: "0721",
  },
  {
    name: "Khai thác quặng kim loại khác không chứa sắt",
    code: "0722",
  },
  {
    name: "Khai thác quặng kim loại quý hiếm",
    code: "0730",
  },
  {
    name: "Khai thác đá, cát, sỏi, đất sét",
    code: "0810",
  },
  {
    name: "Khai thác khoáng hoá chất và khoáng phân bón",
    code: "0891",
  },
  {
    name: "Khai thác và thu gom than bùn",
    code: "0892",
  },
  {
    name: "Khai thác muối",
    code: "0893",
  },
  {
    name: "Khai khoáng khác chưa được phân vào đâu",
    code: "0899",
  },
  {
    name: "Hoạt động dịch vụ hỗ trợ khai thác dầu thô và khí tự nhiên",
    code: "0910",
  },
  {
    name: "Hoạt động dịch vụ hỗ trợ khai khoáng khác",
    code: "0990",
  },
];

exports.editCareer = async (req, res) => {
  try {
    let { id } = req.params;

    const _update = {
      name: req.body.name,
      code: req.body.code,
    };

    let _updated = await Career.updateOne({ _id: id }, _update, { new: true });
    return updatedHandler(_updated, res);
  } catch (e) {
    console.log("editCareer error");
    return errHandler(e, res);
  }
};

exports.deleteCareer = async (req, res) => {
  try {
    let { id } = req.params;

    await Career.findOneAndDelete({ _id: id });

    return deletedHandler("", res);
  } catch (e) {
    console.log("deleteCareer error");
    return errHandler(e, res);
  }
};
