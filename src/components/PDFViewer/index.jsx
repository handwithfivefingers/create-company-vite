import React from 'react'
import WebViewer, { getInstance } from '@pdftron/webviewer'
import { Button, Card, Drawer, Form, Input, List, message, Modal, Space, Typography, Radio } from 'antd'
import { useEffect, useRef, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import { RiPlayList2Fill } from 'react-icons/ri'
import { BiDownload } from 'react-icons/bi'
import { useParams } from 'react-router-dom'

const BASE_URL = import.meta.env.NODE_ENV === 'production' ? '/public' : 'http://localhost:3001/public'

const PDFViewer = (props) => {
  const [visible, setVisible] = useState(false)

  const [initialDoc, setInitialDoc] = useState(null)

  const [filePath, setFilePath] = useState('')

  const [childModal, setChildModal] = useState({
    visible: false,
    component: null,
    width: 0,
  })

  const refViewer = useRef()

  useEffect(() => {
    return () => {
      let instance = getInstance()
      if (instance) {
        instance?.dispose()
      }
    }
  }, [])

  useEffect(() => {
    let instance = getInstance()
    if (!instance) renderPDF(refViewer, initialDoc, props?.data?.files)
    else updateFiles()
  }, [initialDoc, props])

  const handleCheckFile = async (files) => {
    Modal.confirm({
      closable: true,
      icon: '',
      content: (
        <Radio.Group buttonStyle="solid" style={{ width: '100%' }}>
          <List
            header={<div>List files</div>}
            bordered
            dataSource={files}
            renderItem={(item) => (
              <List.Item
                onClick={(e) => {
                  setInitialDoc(`${BASE_URL}${item.path}`)
                  Modal.destroyAll()
                }}
              >
                <List.Item.Meta
                  description={
                    <Radio.Button value={item.path} className="inline">
                      [Files] {item.name}
                    </Radio.Button>
                  }
                />
              </List.Item>
            )}
          />
        </Radio.Group>
      ),
      footer: null,
    })
  }

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
    } = instance.UI

    if (NodeList && !NodeList.prototype.forEach) {
      NodeList.prototype.forEach = Array.prototype.forEach
    }

    if (HTMLCollection && !HTMLCollection.prototype.forEach) {
      HTMLCollection.prototype.forEach = Array.prototype.forEach
    }

    instance.UI?.disableElements(['ribbons']) //
    instance.UI?.disableElements(['viewControlsButton']) //
    // instance.UI?.disableElements(["searchButton"]);
    instance.UI?.disableElements(['panToolButton']) //
    instance.UI?.disableElements(['pageNavOverlay']) //

    instance.UI?.disableFeatures(Feature.Download) //
    instance.UI?.disableFeatures(Feature.TextSelection) //
    // instance.UI?.disableFeatures(Feature.Annotations);
    instance.UI?.disableFeatures(Feature.NotesPanel) //
    instance.UI?.disableFeatures(Feature.FilePicker) //
    // instance.UI?.disableFeatures([Feature.Print]);
  }

  const handleDownloadfile = async (documentViewer, annotationManager) => {
    const insRef = getInstance()
    insRef.UI.setPrintQuality(2)
    insRef.UI.useEmbeddedPrint(true)
    insRef.UI.print()
  }

  const renderPDF = async (ref, initialDoc = null, listDoc = null) => {
    // console.log('renderPDF');
    // console.log(props);
    try {
      let files = props.data.files

      if (!ref?.current?.hasChildNodes()) {
        let params = {
          path: '/lib',
          initialDoc,
          // extension: 'docx',
          // showLocalFilePicker: true,
          fullAPI: true,
          // loadAsPDF: true,
        }

        let instance = await WebViewer(params, ref.current)

        if (instance) {
          // insRef.current = instance; // Set ins to handle when re-render
          //Add new Button
          // console.log(files);
          const { documentViewer, annotationManager, PDFNet } = instance.Core

          createButton({
            instance,
            documentViewer,
            annotationManager,
            files,
          })

          documentViewer.addEventListener('documentLoaded', async () => {
            // await PDFNet.initialize();
            // const doc = documentViewer.getDocument();
            // const pdfDoc = await doc.getPDFDoc();
            // Ensure that we have our first page.
            // await pdfDoc.requirePage(1);

            // Run our main function using 'runWithCleanup'
            // await PDFNet.runWithCleanup(async () => console.log('Running main function...'));

            // Refresh the cache with the newly updated document
            documentViewer.refreshAll()
            // Update viewer with new document
            documentViewer.updateView()
          })
          // Handle Plugin
          handlePluginPDFTron(instance) //
        }
      }
    } catch (err) {
      // console.error('Error rendering PDF', err);
    }
  }

  const createButton = ({ documentViewer, annotationManager, instance, files }) => {
    const newButton = [
      {
        type: 'actionButton',
        toolName: 'actionButton',
        dataElement: 'actionButton',
        className: 'list-btn',
        hidden: ['mobile'],
        onClick: () => handleCheckFile(files),
      },
      {
        type: 'actionButton',
        toolName: 'actionButton',
        dataElement: 'actionButton',
        className: 'list-btn',
        hidden: ['mobile'],
        onClick: () => handleDownloadfile(documentViewer, annotationManager),
      },
    ]

    instance.setHeaderItems(function (header) {
      let currentHeader = header.headers[header.headerGroup]
      header.update([...currentHeader, ...newButton])
    })

    const iframeDoc = instance.UI.iframeWindow.document

    const btn = iframeDoc.querySelectorAll('.list-btn')

    btn.forEach((item, i) => {
      if (i === 1) {
        item.innerHTML = ReactDOMServer.renderToString(<BiDownload style={{ fontSize: '16px' }} />)
      } else {
        item.innerHTML = ReactDOMServer.renderToString(<RiPlayList2Fill style={{ fontSize: '16px' }} />)
      }
    })
  }
  const updateFiles = () => {
    const insRef = getInstance()
    if (insRef) {
      insRef.UI.loadDocument(initialDoc)
    }
  }
  // console.log('viewer', props?.data?.files);

  return <div className="webviewer" ref={refViewer} style={{ height: 'calc(100vh - 100px)' }} />
}

export default PDFViewer
