import '../img/icon-128.png'
import '../img/icon-34.png'
import '../img/rwi-128-d.png'
import '../img/rwi-128-r.png'
import '../img/rwi-128-b.png'
import '../img/rwi-128-y.png'
import '../img/rwi-128-g.png'

const statuses = {}

/*
chrome.browserAction.onClicked.addListener((a) => {
  console.log(a)
})
*/

chrome.tabs.onActiveChanged.addListener((tab, a) => {
  console.log(tab)
  console.log(a)
})