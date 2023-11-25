import { Editor } from '@tinymce/tinymce-react'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import styles from './styles.module.scss'

const CCEditor = forwardRef(({ value, onChange }, ref) => {
  const editorRef = useRef(null)
  useImperativeHandle(
    ref,
    () => ({
      getContent: (params) => editorRef.current?.getContent(params),
    }),
    [editorRef],
  )
  return (
    <div className={styles.editor}>
      <Editor
        id="editor-tinymce"
        tinymceScriptSrc={'/tinymce/tinymce.min.js'}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={value}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'preview',
            'help',
            'wordcount',
          ],
          toolbar:
            'table' +
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
        onChange={onChange}
      />
    </div>
  )
})

CCEditor.displayName = 'CCEditor'

export default CCEditor
