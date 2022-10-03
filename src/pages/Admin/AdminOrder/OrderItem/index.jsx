// import WebViewer from "@pdftron/webviewer";
import WebViewer from '@pdftron/webviewer';
import { Button, Card, Drawer, Form, Input, message, Modal, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { RiPlayList2Fill } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import PDFViewer from '@/components/PDFViewer';
import AdminOrderService from '@/service/AdminService/AdminOrderService';
const allFiles = {
  create_company: {
    personal: [
      {
        name: 'Test',
        path: '/files/File_1A_DieuLeCaNhanTest.docx',
      },
      {
        name: 'File_1A_DieuLeCaNhan',
        path: '/files/File_1A_DieuLeCaNhan.docx',
      },
      {
        name: 'File_1B_DieuLeToChuc',
        path: '/files/File_1B_DieuLeToChuc.docx',
      },
      {
        name: 'File_2_PhuLucI_2_GiayDeNghiDangKiMTV',
        path: '/files/File_2_PhuLucI_2_GiayDeNghiDangKiMTV.docx',
      },
      {
        name: 'File_3_UyQuyen',
        path: '/files/File_3_UyQuyen.doc',
      },
      {
        name: 'File_4_PhuLucI_10_DanhSachNguoiDaiDien',
        path: '/files/File_4_PhuLucI_10_DanhSachNguoiDaiDien.docx',
      },
    ],
    original: [
      {
        name: 'File_1B_DieuLeCaNhan',
        path: '/files/File_1B_DieuLeCaNhan.docx',
      },
      {
        name: 'File_2_PhuLucI_2_GiayDeNghiDangKiMTV',
        path: '/files/File_2_PhuLucI_2_GiayDeNghiDangKiMTV.docx',
      },
      {
        name: 'File_3_UyQuyen',
        path: '/files/File_3_UyQuyen.docx',
      },
      {
        name: 'File_4_PhuLucI_10_DanhSachNguoiDaiDien',
        path: '/files/File_4_PhuLucI_10_DanhSachNguoiDaiDien.docx',
      },
    ],
  },
  change_info: {},
};

export default function ClassComponentText(props) {
  const refViewer = useRef();
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState();
  const [initialDoc, setInitialDoc] = useState('/files/dieulecanhan.docx');
  // const [jsonData, setJsonData] = useState([]);
  // const [instance, setInstance] = useState();
  const slug = useParams();
  const insRef = useRef();

  useEffect(() => {
    getScreenData(slug);
    // console.log(slug);
  }, []);

  // useEffect(() => {
  //   renderPDF(refViewer, initialDoc);
  // }, [initialDoc]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const getScreenData = (slug) => {
    AdminOrderService.getOrderBySlug(slug)
      .then((res) => {
        if (res.data.status === 200) {
          // console.log(res);
          let { data } = res.data;
          setData(data);
        }
      })
      .catch((err) => console.log(err));
  };

  const filledJson = async (val) => {
    // console.log(val);
    const { documentViewer } = insRef?.current.Core;
    const doc = documentViewer.getDocument();
    await doc.documentCompletePromise();
    documentViewer.updateView();
    await doc.applyTemplateValues(val);
  };

  const handleCheckFile = () => {
    // console.log("handle check file");
    Modal.confirm({
      content: (
        <Space direction="vertical">
          {allFiles.create_company.personal.map((item) => (
            <Button key={item.name} onClick={() => setInitialDoc(item.path)}>
              {item.name}
            </Button>
          ))}
        </Space>
      ),
      onOk() {
        message.success('Ready to load files');
      },
    });
  };

  const handlePluginPDFTron = (instance) => {
    const {
      setHeaderItems,
      enableElements,
      disableElements,
      enableFeatures,
      disableFeatures,
      setTheme,
      Feature,
      Theme,
    } = instance.UI;

    if (NodeList && !NodeList.prototype.forEach) {
      NodeList.prototype.forEach = Array.prototype.forEach;
    }

    if (HTMLCollection && !HTMLCollection.prototype.forEach) {
      HTMLCollection.prototype.forEach = Array.prototype.forEach;
    }

    instance.UI?.disableElements(['ribbons']); //
    instance.UI?.disableElements(['viewControlsButton']); //
    // instance.UI?.disableElements(["searchButton"]);
    instance.UI?.disableElements(['panToolButton']); //
    instance.UI?.disableElements(['pageNavOverlay']); //

    instance.UI?.disableFeatures(Feature.Download); //
    instance.UI?.disableFeatures(Feature.TextSelection); //
    // instance.UI?.disableFeatures(Feature.Annotations);
    instance.UI?.disableFeatures(Feature.NotesPanel); //
    instance.UI?.disableFeatures(Feature.FilePicker); //
    // instance.UI?.disableFeatures([Feature.Print]);
  };

  const handleDownloadfile = async (documentViewer, annotationManager) => {
    insRef?.current.UI.setPrintQuality(2);
    insRef?.current.UI.useEmbeddedPrint(true);
    insRef?.current.UI.print();
  };

  const renderPDF = async (ref, initialDoc = null) => {
    if (!ref?.current?.hasChildNodes()) {
      let params = {
        path: '/lib',
        initialDoc,
      };
      WebViewer(params, ref.current).then((instance) => {
        insRef.current = instance; // Set ins to handle when re-render
        //Add new Button
        const { documentViewer, annotationManager } = instance.Core;

        instance.setHeaderItems(function (header) {
          // console.log(header);
          let currentHeader = header.headers[header.headerGroup];
          const newButton = [
            {
              type: 'actionButton',
              toolName: 'actionButton',
              dataElement: 'actionButton',
              className: 'list-btn',
              hidden: ['mobile'],
              onClick: () => handleCheckFile(documentViewer),
            },
            {
              type: 'actionButton',
              img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///8AAAClpaVTU1P09PTLy8thYWHw8PAYGBiUlJS2trb5+flISEiwsLDz8/P8/Pzd3d1NTU0LCwt7e3vX19eCgoIeHh5aWlpnZ2fl5eWOjo6ioqJ4eHhEREQ9PT2YmJhQIQIRAAACI0lEQVR4nO3ci07CQBRFUS71gVJ8oKgo6P//pWQSU7EtncpwrjPu9QHEnZyMdFAmEwAAAAAAAAAAAAAAAAAAAAAAAIy3eL6QerlRF16Z1vKy9MIZhRRSSCGFFFJIIYUUUkghhRS6FM5vzrTUgQAAAAAA/BPrc7FbdeGr+J7GuImikEIKKaSQQgoppJBCCimk0KWw/Cfg87ep1lxdCAAAAAAAyrCoq0Tq6/arT+W3Mm0J79qm7VevbaFP+uG0hZVZfaeP2nPyQrON738CCQrNd6qSQrt/1Jd90RSaPbjdBKsK/aaqK7TaZ6rCwt1UPU5VaaHLVMWFtpVPVV24m6r4+8z0hbbUTtWh0OxdOVWXQrOVbqpOhTaTTdWrcDdV0WPVh80SGVuoOlXnl8l0vLc+XKg+VU9hoND3sSqJwUKzTd5/YBNR6HwDcKyoQq/HqiTiCj1vAI4VW5jvVOMLc53qiEL9Y1USowqt9v5xf2FM4VPHJzt/34jCVZ7fAhZd6P75zW9FFi6zHGgQV7jK9vd9XGGV60CDiMJ8BxoMFq7kX7GQ2EDhfdYDDQ4WZnyCNg4VZj/QoL8w7xO00Vc4K2GgQU9hpu9Bu3QW1mvvHyuhjsKnXO8rurULX8sZaPCzcFvICdrYLyznBG3sFRZ0gja+FRbwHrRLU1jgQIOvwpyf4g+rSh5oUJU80KAq5SGp17bkgQZ5fp4EAAAAAAAAAAAAAADQ9gmIezIe1y4tuQAAAABJRU5ErkJggg==',
              toolName: 'actionButton',
              dataElement: 'actionButton',
              className: 'list-btn',
              hidden: ['mobile'],
              onClick: () => handleDownloadfile(documentViewer, annotationManager),
            },
          ];
          header.update([...currentHeader, ...newButton]);
        });

        const iframeDoc = instance.UI.iframeWindow.document;
        const btn = iframeDoc.querySelectorAll('.list-btn');
        btn.forEach(
          (item) => (item.innerHTML = ReactDOMServer.renderToString(<RiPlayList2Fill style={{ fontSize: '16px' }} />))
        );
        // Handle Plugin
        handlePluginPDFTron(instance);
      });
    } else {
      insRef?.current.UI.loadDocument(initialDoc);
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showDrawer}
        style={{
          position: 'fixed',
          top: ' 50%',
          right: 0,
          transform: ' translate(0,-50%)',
        }}
      >
        Edit
      </Button>

      {/* <div className="webviewer" ref={refViewer} style={{ height: "calc(100vh - 100px)" }} /> */}
      <PDFViewer data={data} />
      {/* {data && <UserEditDrawer onClose={onClose} visible={visible} data={data} filledJson={(val) => filledJson(val)} />} */}
    </>
  );
}

const UserEditDrawer = ({ onClose, visible, data, filledJson }) => {
  const [template, setTemplate] = useState([]);
  const formRef = useRef();
  useEffect(() => {
    let fields = splitData();
    setTemplate(fields);
  }, [data]);

  const splitData = () => {
    const _template = {};
    Object.keys(data).forEach((item) => {
      if (typeof data[item] !== 'object') {
        _template[item] = data[item]; // create exist value for Number || String field
      } else {
        // Handle with Object field
        // 2 case : Array || Object

        if (data[item].length > 0) {
          // Handle with Array
          _template[item] = data[item].map((elmt, i) => ({ name: elmt.name, code: elmt.code, index: `${i + 1}` }));
        } else {
          // Handle with object

          Object.keys(data[item]).forEach((field) => {
            let newField = [item, field].join('_');
            _template[newField] = data[item][field];
          });
        }
      }
    });
    return _template;
    // filledJson(_template);
  };

  const renderFormItem = () => {
    let xhtml = null;
    xhtml = Object.keys(template).map((keys) => {
      return (
        <Form.Item name={keys} key={keys}>
          <Input />
        </Form.Item>
      );
    });

    Object.keys(template).map((keys) => {
      formRef?.current?.setFieldsValue({
        [keys]: template[keys],
      });
    });

    return xhtml;
  };
  const onFinish = (val) => {
    console.log(val);
  };
  return (
    <Drawer title="Edit Information" placement="right" onClose={onClose} open={visible}>
      {
        <Card className="card-boxShadow" title="Loại hình doanh nghiệp">
          <Form ref={formRef} onFinish={filledJson}>
            {renderFormItem()}
            <Button htmlType="submit">Edit content</Button>
          </Form>
        </Card>
      }
    </Drawer>
  );
};
