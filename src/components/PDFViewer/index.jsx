import React from 'react'
import WebViewer, { getInstance } from '@pdftron/webviewer'
import { Button, Card, Drawer, Form, Input, List, message, Modal, Space, Typography, Radio } from 'antd'
import { useEffect, useRef, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import { RiPlayList2Fill } from 'react-icons/ri'
import { BiDownload } from 'react-icons/bi'
import { useParams } from 'react-router-dom'
import { memo } from 'react'

const localUrl = `${import.meta.env.VITE_BASEHOST_DEV}/public`

const BASE_URL = import.meta.env.MODE === 'development' ? localUrl : '/public'

const PDFViewer = (props) => {
  const [initialDoc, setInitialDoc] = useState(null)

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
      console.error('Error rendering PDF', err)
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

  return <div className="webviewer" ref={refViewer} style={{ height: 'calc(100vh - 100px)' }} />
}

export default memo(PDFViewer)
