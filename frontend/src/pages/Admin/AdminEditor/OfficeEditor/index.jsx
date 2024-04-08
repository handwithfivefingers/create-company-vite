import { DocumentEditor } from '@onlyoffice/document-editor-react'
import React, { useEffect, useRef, useState } from 'react'
import OfficeServices from '../../../../service/OfficeService'
import { notification } from 'antd'
import styles from './styles.module.scss'
const MODIFY_ENUM = {
  PREVIEW: 1,
  MODIFY: 2,
}
const OfficeEditor = ({ url, fileKey, documentType }) => {
  const ref = useRef()
  const [token, setToken] = useState(undefined)
  const onDocumentReady = (event) => {
    try {
      console.log('Document is loaded')
      const iframe = ref.current.querySelector('iframe')
      const innerDoc = iframe.contentDocument || iframe.contentWindow.document
      console.log('ref.current', innerDoc)
      console.log('innerDoc', innerDoc)
    } catch (error) {
      console.log('error', error)
    }
  }
  const onLoadComponentError = (errorCode, errorDescription) => {
    switch (errorCode) {
      case -1: // Unknown error loading component
        console.log(errorDescription)
        break

      case -2: // Error load DocsAPI from http://documentserver/
        console.log(errorDescription)
        break

      case -3: // DocsAPI is not defined
        console.log(errorDescription)
        break
    }
  }
  const onDocumentStateChange = async (event) => {
    console.log('event', event)
    const isSaved = !event.data // true => data editing, false => data saved
  }
  const configs = {
    documentType: documentType,
    document: {
      fileType: 'docx',
      key: fileKey,
      title: 'Example Document Title.docx',
      url,
    },
    editorConfig: {
      customization: {
        anonymous: {
          request: true,
          label: 'Guest',
        },
        autosave: true,
        comments: true,
        compactHeader: false,
        compactToolbar: false,
        compatibleFeatures: false,
        forcesave: true,
        help: true,
        hideRightMenu: false,
        hideRulers: false,
        integrationMode: 'embed',
        macros: true,
        macrosMode: 'Warn',
        mentionShare: true,
        mobileForceView: true,
        plugins: true,
        toolbarHideFileName: false,
        toolbarNoTabs: false,
        uiTheme: 'theme-dark',
        unit: 'cm',
        zoom: 100,
        logo: {
          image: 'https://app.thanhlapcongtyonline.vn/logo_1.png',
          imageDark: 'https://app.thanhlapcongtyonline.vn/logo_1.png',
          url: 'https://app.thanhlapcongtyonline.vn/',
        },
      },
    },
  }
  useEffect(() => {
    if (fileKey && url) {
      getBrowserToken()
    }
  }, [url])

  const getBrowserToken = async () => {
    try {
      const resp = await OfficeServices.getBrowserToken({ options: configs })
      setToken(resp.data.data)
    } catch (error) {
      console.log('resp')
      notification.error({
        message: 'Get Office token failed',
      })
    }
  }
  if (!url || !token) return
  const onAppReady = () => {}
  return (
    <div style={{ height: '80vh' }} ref={ref}>
      <div className={styles.innerLogo}>
        <img src={import.meta.env.VITE_BASEHOST_PROD + '/logo_1.png'} />
      </div>
      <DocumentEditor
        id="docxEditor"
        documentServerUrl={import.meta.env.OFFICE_URL}
        config={{ ...configs, token }}
        events_onDocumentReady={onDocumentReady}
        onLoadComponentError={onLoadComponentError}
        events_onAppReady={onAppReady}
      />
    </div>
  )
}

export default OfficeEditor
