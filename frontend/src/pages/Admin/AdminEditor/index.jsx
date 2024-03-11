import React, { useEffect, useRef, useState } from 'react'
import { DocumentEditor } from '@onlyoffice/document-editor-react'
import { Button } from 'antd'

const AdminEditor = () => {
  const ref = useRef()
  const [state, setState] = useState(null)
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

    // const resp = await fetch('http://localhost:3001/api/admin/offices')

  }
  return (
    <div style={{ height: '80vh' }} ref={ref}>
      <div>
        <Button></Button>
      </div>
      <DocumentEditor
        id="docxEditor"
        documentServerUrl="http://localhost:6969/"
        config={{
          documentType: 'word',
          document: {
            fileType: 'docx',
            key: 'truyenpro',
            title: 'Example Document Title.docx',
            url: 'http://127.0.0.1:3001/public/files/change_info/change_info_uyquyen.docx',
            // token: 'YTIn2Cg46SYUsOzLKPwQDonMygwqH85A',
          },
          editorConfig: {
            // coEditing: {
            //   mode: 'fast',
            //   change: true,
            // },
            // customization: {
            //   anonymous: {
            //     request: true,
            //     label: 'Guest',
            //   },
            //   autosave: true,
            //   comments: true,
            //   compactHeader: false,
            //   compactToolbar: false,
            //   compatibleFeatures: false,
            //   customer: {
            //     address: 'My City, 123a-45',
            //     info: 'Some additional information',
            //     logo: 'https://example.com/logo-big.png',
            //     logoDark: 'https://example.com/dark-logo-big.png',
            //     mail: 'john@example.com',
            //     name: 'John Smith and Co.',
            //     phone: '123456789',
            //     www: 'example.com',
            //   },
            //   features: {
            //     spellcheck: {
            //       mode: true,
            //       change: true,
            //     },
            //   },
            //   // feedback: {
            //   //   url: 'https://example.com',
            //   //   visible: true,
            //   // },
            //   // forcesave: false,
            //   // goback: {
            //   //   blank: true,
            //   //   requestClose: false,
            //   //   text: 'Open file location',
            //   //   url: 'https://example.com',
            //   // },
            //   // help: true,
            //   // hideNotes: false,
            //   // hideRightMenu: false,
            //   // hideRulers: false,
            //   // integrationMode: 'embed',
            //   logo: {
            //     image: 'http://localhost:3003/logo_1.png',
            //     imageDark: 'http://localhost:3003/logo_1.png',
            //     url: 'http://localhost:3003/',
            //   },
            //   mentionShare: true,
            //   mobileForceView: true,
            //   review: {
            //     hideReviewDisplay: false,
            //     showReviewChanges: false,
            //     reviewDisplay: 'original',
            //     trackChanges: true,
            //     hoverMode: false,
            //   },
            //   submitForm: true,
            //   toolbarHideFileName: false,
            //   toolbarNoTabs: false,
            //   unit: 'cm',
            //   zoom: 100,
            // },
            // embedded: {
            //   embedUrl: 'https://example.com/embedded?doc=exampledocument1.docx',
            //   fullscreenUrl: 'https://example.com/embedded?doc=exampledocument1.docx#fullscreen',
            //   saveUrl: 'https://example.com/download?doc=exampledocument1.docx',
            //   shareUrl: 'https://example.com/view?doc=exampledocument1.docx',
            //   toolbarDocked: 'top',
            // },
            // lang: 'en',
            // location: 'us',
            // mode: 'edit',
            // region: 'en-US',
            // user: {
            //   group: 'Group1',
            //   id: '78e1e841',
            //   image: 'https://example.com/url-to-user-avatar.png',
            //   name: 'John Smith',
            // },
          },
          events: {
            onDocumentStateChange: onDocumentStateChange,
          },
        }}
        events_onDocumentReady={onDocumentReady}
        onLoadComponentError={onLoadComponentError}
      />
    </div>
  )
}

export default AdminEditor
