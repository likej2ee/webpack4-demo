import { cube, square } from '../utils/math'
// import printMe from './print'
import './style.css'
// import iconUrl from './images/icon.jpg'

function component() {
  var element = document.createElement('pre')
  element.innerHTML = ['Hello webpack!', '5 cubed is equal to ' + cube(5), 'square ' + square(6)].join('\n\n')

  // element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  element.classList.add('hello')

  // 将图像添加到我们现有的 div

  // var myIcon = new Image()
  // myIcon.src = iconUrl

  // element.appendChild(myIcon)

  // var btn = document.createElement('button')
  // btn.innerHTML = 'Click me and check the console!'
  // btn.onclick = printMe

  // element.appendChild(btn)

  return element
}

let element = component()
document.body.appendChild(element)

if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!')

    document.body.removeChild(element)
    element = component()
    document.body.appendChild(element)
  })
}
