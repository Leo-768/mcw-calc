import { postMessageParent } from './utils/iframe'
import { theme as themeRef } from './utils/theme'
import './common.css'
import './common.less'

function sendHeightChange() {
  return () => {
    postMessageParent('mcw-calc-height-change', { height: document.body.scrollHeight + 10 })
  }
}

// use ResizeObserver to detect change of height and postMessage to parent
const observer = new ResizeObserver(sendHeightChange())

// listen to fullscreen
document.addEventListener('fullscreenchange', sendHeightChange)

for (const child of document.body.children) {
  observer.observe(child)
}

window.addEventListener('message', (event) => {
  if (event.data.type === 'mcw-calc-theme-change') {
    const { theme } = event.data.data
    const { classList } = document.body

    if (theme === 'dark') {
      classList.add('dark')
      themeRef.value = 'dark'
    } else {
      classList.remove('dark')
      themeRef.value = 'light'
    }
  }
})

const locale =
  new URLSearchParams(window.location.hash.substring(2)).get('locale') ??
  window.navigator.language.split('-')[0]
document.body.lang = locale
