import Link from '@tiptap/extension-link'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import clsx from 'clsx'
import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import {
  RiAlignVertically,
  RiArrowGoBackFill,
  RiArrowGoForwardFill,
  RiBold,
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiH5,
  RiH6,
  RiItalic,
  RiLink,
  RiLinkUnlink,
  RiListCheck,
  RiParagraph,
  RiSeparator,
} from 'react-icons/ri'
import { setLink } from '@/helper/Common'
import styles from './styles.module.scss'

export default forwardRef(function CCEditor(props, ref) {
  const { content } = props
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: content,
  })
  useEffect(() => {
    return () => editor?.destroy()
  }, [])
  useEffect(() => {
    editor?.commands?.setContent(content)
  }, [content])

  useImperativeHandle(ref, () => ({
    getContent() {
      return editor.getHTML()
    },
  }))

  return (
    <div className={styles.editor}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className={styles.editorContent} />
    </div>
  )
})

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }
  const isCursorOverLink = editor.getAttributes('link').href
  return (
    <div className={styles.heading}>
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? styles.active : ''}>
        <RiBold />
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? styles.active : ''}>
        <RiItalic />
      </button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? styles.active : ''}>
        <RiAlignVertically />
      </button>
      <button className="icon" onClick={() => setLink(editor)}>
        <RiLink />
      </button>
      <button
        className={clsx({
          [styles.disabled]: !isCursorOverLink,
        })}
        onClick={() => setLink(editor)}
      >
        <RiLinkUnlink />
      </button>
      {/* <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? styles.active : ""}
      >
        Code
      </button> */}

      {/* <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>clear marks</button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>clear nodes</button> */}
      <button onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? styles.active : ''}>
        <RiParagraph />
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? styles.active : ''}>
        <RiH1 />
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? styles.active : ''}>
        <RiH2 />
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? styles.active : ''}>
        <RiH3 />
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} className={editor.isActive('heading', { level: 4 }) ? styles.active : ''}>
        <RiH4 />
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()} className={editor.isActive('heading', { level: 5 }) ? styles.active : ''}>
        <RiH5 />
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()} className={editor.isActive('heading', { level: 6 }) ? styles.active : ''}>
        <RiH6 />
      </button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? styles.active : ''}>
        <RiListCheck />
      </button>
      {/* <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? styles.active : ""}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? styles.active : ""}
      >
        code block
      </button> */}
      {/* <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? styles.active : ""}
      >
        blockquote
      </button> */}
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <RiSeparator />
      </button>
      {/* <button onClick={() => editor.chain().focus().setHardBreak().run()}>hard break</button> */}
      <button onClick={() => editor.chain().focus().undo().run()}>
        <RiArrowGoBackFill />
      </button>
      <button onClick={() => editor.chain().focus().redo().run()}>
        <RiArrowGoForwardFill />
      </button>
    </div>
  )
}
