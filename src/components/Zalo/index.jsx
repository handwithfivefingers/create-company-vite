import React, { memo, useState, useEffect } from 'react'

export default function ZaloPlugin() {
  return (
    <div>
      <div
        className="zalo-chat-widget"
        data-oaid="4133099479344249266"
        data-welcomeMessage="Chúng tôi có thể giúp gì cho bạn?"
        data-autopopup="0"
        data-width="300px"
        data-height=""
      />
      <ZaloScript />
    </div>
  )
}
let mounted = false
const ZaloScript = memo(() => {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (!mounted) {
      loadScript()
    }
    mounted = true
  }, [])
  const loadScript = () => {
    console.log('coming')
    if (!window.ZA && !window.ZaloSocialSDK && !ready) {
      let zaloScript = document.createElement('script')
      zaloScript.src = `//sp.zalo.me/plugins/sdk.js`
      document.body.appendChild(zaloScript)
      zaloScript.onload = zaloScript.onreadystatechange = function () {
        if (!ready && (!this.readyState || this.readyState == 'complete')) {
          setReady(true)
        }
      }
    }
  }
  return null
})
