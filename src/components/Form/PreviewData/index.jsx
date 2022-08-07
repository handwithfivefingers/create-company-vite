import React from 'react';
import moment from 'moment';
import { LABEL } from '@/constant/FormConstant';
import CCDescription from '@/components/CCDescription';
import { checkVariable } from '@/helper/Common';

const listOfFields = [
  'company_opt_career',
  'include',
  'exclude',
  'detail_after',
  'company_main_career',
  'list_president',
  'contribute_members',
];

const PreviewData = ({ data }) => {
  console.log(data)
  const renderTitle = (newData, label) => {
    let xhtml = '';
    for (let property in label) {
      xhtml = [newData && label?.title];
    }
    return xhtml;
  };

  const checkData = (newData, label) => {
    let xhtml = [];
    if (newData) {
      xhtml.push(getDataFromObj(newData, label));
    }
    return xhtml;
  };

  const getDataFromObj = (objData, label) => {
    let xhtml = [];
    xhtml.push(
      Object.keys(objData)
        .map((key, index) => {
          let currentPath = objData[key];
          if (currentPath) {
            return renderDescription(currentPath, label?.[key], key, index);
          }
          return null;
        })
        .filter((item) => item)
    );
    return xhtml;
  };

  const checkTitle = (keys, index = null) => {
    switch (keys) {
      case 'legal_respon':
        return `Người Đại Diện Pháp Luật ${index + 1}`;
      case 'company_opt_career':
        return `Ngành nghề phụ ${index + 1}`;
      case 'company_main_career':
        return `Ngành nghề chính`;
      case 'detail_after':
        return `Sửa đổi chi tiết ngành, nghề ${index + 1}`;
      case 'exclude':
        return `Bỏ ngành, nghề ${index + 1}`;
      case 'include':
        return `Ngành nghề bổ sung ${index + 1}`;
      case 'list_president':
        if (index < 1) {
          return `Tên Chủ tịch HĐQT ${index + 1}`;
        } else {
          return `Tên thành viên HĐQT ${index + 1}`;
        }
      case 'contribute_members':
        if (index < 1) {
          return `Tên Chủ tịch HĐTV ${index + 1}`;
        } else {
          return `Tên thành viên góp vốn thứ ${index + 1}`;
        }
      default:
        return '';
    }
    // return "";
  };
  /**
   *
   * @param {current Obj || Array || String} item
   * @param {current Label Path} label
   * @param {field Name} keys
   * @param {*} index1
   * @param {*} index2
   * @returns
   */

  const renderDescription = (item, label, keys = null, index1 = null, index2 = null) => {
    let itemVariable = checkVariable(item);

    let isSpecial = handleSpecialFields(keys);

    let subLabel = [label, index2 > 0 ? [' - ', index2 + 1] : ''];

    if (itemVariable === 'String') {
      return (
        <CCDescription.DescItem key={subLabel} label={subLabel || null}>
          {[item]}
        </CCDescription.DescItem>
      );
    } else if (itemVariable === 'Array') {
      return item.map((arrayItem, arrayIndex) => {
        // Special Fields ....

        if (isSpecial) {
          let specialObject = [arrayItem || arrayItem.name];
          // console.log('arrayItem', specialObject);
          return (
            <CCDescription.DescListItem title={checkTitle(keys, arrayIndex)}>
              {renderDescription(specialObject, label, index1, arrayIndex)}
            </CCDescription.DescListItem>
          );
        } else
          return (
            <CCDescription.DescListItem title={checkTitle(keys, arrayIndex)}>
              {renderDescription(arrayItem, label, index1, arrayIndex)}
            </CCDescription.DescListItem>
          );
      });
    } else if (itemVariable === 'Moment') {
      return (
        <CCDescription.DescItem key={[label, index1]} label={subLabel}>
          {moment(item).format('DD/MM/YYYY')}
        </CCDescription.DescItem>
      );
    } else if (itemVariable === 'Object') {
      if (isSpecial) {
        // console.log(item);
        return (
          <CCDescription.DescItem key={subLabel} label={subLabel}>
            {[item.name || item]}
          </CCDescription.DescItem>
        );
      }
      return getDataFromObj(item, label);
    } else {
      console.log('item', item);
      return null;
    }
  };

  const handleSpecialFields = (field) => {
    return listOfFields.some((item) => item === field);
  };

  if (data) {
    let xhtml = [];
    for (var property in data) {
      for (let props in LABEL[property]) {
        let label = LABEL[property][props].fields;
        let newData = data[property][props];
        xhtml.push(
          newData && (
            <CCDescription.Desc layout="vertical" bordered title={renderTitle(newData, LABEL[property][props])}>
              {checkData(newData, label)}
            </CCDescription.Desc>
          )
        );
      }
    }
    return xhtml;
  }

  return null;
};

export default PreviewData;
