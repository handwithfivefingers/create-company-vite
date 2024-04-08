import { FormOutlined } from '@ant-design/icons'
import { Button, Drawer, List } from 'antd'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useFileData } from '../../../store/reducer'
import OfficeEditor from './OfficeEditor'
import OfficeServices from '../../../service/OfficeService'
import { useParams } from 'react-router-dom'

const MODIFY_ENUM = {
  PREVIEW: 1,
  MODIFY: 2,
}
const AdminEditor = () => {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState(undefined)
  const [fileModify, setFileModify] = useState(undefined)
  const [availableFiles, setAvailableFiles] = useState({
    documentFiles: [],
    pdfFiles: [],
  })
  let { id } = useParams()
  const onClose = () => setOpen(false)

  const onOpen = (val) => {
    setOpen(true)
    setMode(val)
  }
  const getFilePath = fileModify?.path
    ? `${import.meta.env.VITE_BASEHOST_PROD}/${fileModify.path}`
    : ''

  const makeid = useCallback((length) => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let counter = 0
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
      counter += 1
    }
    return result
  }, [])

  useEffect(() => {
    getOfficesFiles()
  }, [])
  const getOfficesFiles = async () => {
    try {
      const resp = await OfficeServices.getListsFiles({ orderID: id })
      setAvailableFiles({
        ...resp.data.data,
      })
    } catch (error) {
      console.log(error)
    }
  }
  const OfficeCompoRender = useMemo(() => {
    if (fileModify?.path) {
      return <OfficeEditor url={getFilePath} fileKey={makeid(12)} documentType={fileModify?.documentType} />
    }
    return null
  }, [fileModify?.path])
  console.log('fileModify', fileModify)
  return (
    <div className="container">
      <div className="row">
        <Button onClick={() => onOpen(MODIFY_ENUM['PREVIEW'])}> Preview PDF</Button>
        <Button onClick={() => onOpen(MODIFY_ENUM['MODIFY'])}>Modify Document</Button>
      </div>

      {OfficeCompoRender}

      <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
        {/* Hell oworld */}
        {mode === MODIFY_ENUM['MODIFY'] ? (
          <List>
            {availableFiles.documentFiles.map((item) => {
              const fileName = item?.split('/')?.pop()
              return (
                <li className="list-group list-group-numbered" key={fileName}>
                  <Button
                    type="link"
                    onClick={() => setFileModify({ path: item, name: fileName, documentType: 'word' })}
                    icon={<FormOutlined />}
                    style={{ width: 40 }}
                  />
                  <span className="p-4"> {fileName}</span>
                </li>
              )
            })}
          </List>
        ) : (
          ''
        )}

        {mode === MODIFY_ENUM['PREVIEW'] ? (
          <List>
            {availableFiles.pdfFiles.map((item) => {
              const fileName = item?.split('/')?.pop()
              return (
                <li className="list-group list-group-numbered" key={fileName}>
                  <Button
                    type="link"
                    onClick={() => setFileModify({ path: item, name: fileName, documentType: 'pdf' })}
                    icon={<FormOutlined />}
                    style={{ width: 40 }}
                  />
                  <span className="p-4"> {fileName}</span>
                </li>
              )
            })}
          </List>
        ) : (
          ''
        )}
      </Drawer>
    </div>
  )
}

export default AdminEditor
