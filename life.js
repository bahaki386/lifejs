let gen = 1
let pixin
let canvas = document.getElementById('LIFE')
let t
let life
let s
let mouseX, mouseY

let next = function () {
  getNext()
  draw()
}

let resetByZero = function () {
  let pix = window.prompt('フィールドのサイズを入力してください(1~128)', '')
  pixin = Number(pix)
  while ((!(pixin > 0)) || pixin < 0 || pixin > 128) {
    pix = window.prompt('フィールドのサイズを入力してください(1~128)', '')
    pixin = Number(pix)
  }
  life = new Array(pixin)
  let i = 0
  let j = 0
  for (i = 0; i < pixin; i++) {
    life[i] = new Array(pixin)
  }
  i = 0
  for (i = 0; i < pixin; i++) {
    for (j = 0; j < pixin; j++) {
      life[i][j] = 0
    }
  }
  gen = 1
  draw()
}
let reset = function () {
  let pix
  pix = window.prompt('フィールドのサイズを入力してください(1~128)', '')
  pixin = Number(pix)
  while ((!(pixin > 0)) || pixin < 0 || pixin > 128) {
    pix = window.prompt('フィールドのサイズを入力してください(1~128)', '')
    pixin = Number(pix)
  }
  life = new Array(pixin)
  let i = 0
  let j = 0
  for (i = 0; i < pixin; i++) {
    life[i] = new Array(pixin)
  }
  i = 0
  for (i = 0; i < pixin; i++) {
    for (j = 0; j < pixin; j++) {
      life[i][j] = 0
    }
  }
  let x = 0
  let y = 0
  for (i = 0; i < (Math.ceil((pixin * pixin) / 2.5)); i++) {
    x = Math.round(Math.random() * (pixin - 1))
    y = Math.round(Math.random() * (pixin - 1))
    life[x][y] = 1
  }
  gen = 1
  draw()
}
window.onload = function () {
  canvas = document.getElementById('LIFE')
  /* canvas要素の存在チェックとCanvas未対応ブラウザの対処 */
  if (!canvas || !canvas.getContext) {
    return false
  }
  let hbn = document.getElementById('next')
  let hbr = document.getElementById('zero')
  let hbrz = document.getElementById('reset')
  let hbs = document.getElementById('start')
  let hbst = document.getElementById('stop')
  hbr.addEventListener('click', function (evt) { resetByZero() })
  hbn.addEventListener('click', function (evt) { next() })
  hbrz.addEventListener('click', function (evt) { reset() })
  hbs.addEventListener('click', function (evt) { hbst.disabled = false; t = setInterval(next, 100); hbs.disabled = true })
  hbst.addEventListener('click', function (evt) { hbst.disabled = true; clearInterval(t); t = null; hbs.disabled = false })
  hbst.addEventListener('click', function (evt) { hbst.disabled = true; clearInterval(t); t = null; hbs.disabled = false })
  hbn.addEventListener('click', function (evt) { hbst.disabled = true; clearInterval(t); t = null; hbs.disabled = false })
  hbr.addEventListener('click', function (evt) { hbst.disabled = true; clearInterval(t); t = null; hbs.disabled = false })
  hbrz.addEventListener('click', function (evt) { hbst.disabled = true; clearInterval(t); t = null; hbs.disabled = false })
  document.getElementById('exit').addEventListener('click', function (evt) { document.location = 'index.html' })
  reset()
}

canvas.onmousedown = HndMouse
function HndMouse (e) {
  adjustXY(e)
  if (mouseY < 640) {
    let posX = Math.floor(mouseX / s)
    let posY = Math.floor(mouseY / s)
    if (life[posX][posY] === 1) {
      life[posX][posY] = 0
    } else {
      life[posX][posY] = 1
    }
  }
  draw(pixin)
}

function adjustXY (e) {
  let rect = e.target.getBoundingClientRect()
  mouseX = e.clientX - rect.left
  mouseY = e.clientY - rect.top
}

function getNext () {
  let nLife = new Array(pixin)
  let i = 0
  let j = 0
  for (i = 0; i < pixin; i++) {
    nLife[i] = new Array(pixin)
    for (j = 0; j < pixin; j++) {
      nLife[i][j] = life[i][j]
    }
  }
  let tmp = 0
  for (j = 0; j < pixin; j++) {
    for (i = 0; i < pixin; i++) {
      if (j === 0) {
        if (i === 0) {
          tmp = life[i + 1][j] + life[i][j + 1] + life[i + 1][j + 1] + life[pixin - 1][pixin - 1] + life[pixin - 1][j] + life[pixin - 1][j + 1] + life[i][pixin - 1] + life[i + 1][pixin - 1]
        } else if (i === (pixin - 1)) {
          tmp = life[i - 1][j] + life[i - 1][j + 1] + life[i][j + 1] + life[0][pixin - 1] + life[0][j] + life[0][j + 1] + life[i - 1][pixin - 1] + life[i][pixin - 1]
        } else {
          tmp = life[i - 1][j] + life[i + 1][j] + life[i - 1][j + 1] + life[i][j + 1] + life[i + 1][j + 1] + life[i - 1][pixin - 1] + life[i + 1][pixin - 1] + life[i][pixin - 1]
        }
      } else if (j === (pixin - 1)) {
        if (i === 0) {
          tmp = life[i][j - 1] + life[i + 1][j - 1] + life[i + 1][j] + life[i][0] + life[i + 1][0] + life[pixin - 1][j - 1] + life[pixin - 1][0] + life[pixin - 1][j]
        } else if (i === (pixin - 1)) {
          tmp = life[i - 1][j - 1] + life[i][j - 1] + life[i - 1][j] + life[0][0] + life[0][j - 1] + life[0][j] + life[i - 1][0] + life[i][0]
        } else {
          tmp = life[i - 1][j - 1] + life[i][j - 1] + life[i + 1][j - 1] + life[i - 1][j] + life[i + 1][j] + life[i - 1][0] + life[i][0] + life[i + 1][0]
        }
      } else {
        if (i === 0) {
          tmp = life[i][j - 1] + life[i + 1][j - 1] + life[i + 1][j] + life[i][j + 1] + life[i + 1][j + 1] + life[pixin - 1][j - 1] + life[pixin - 1][j] + life[pixin - 1][j + 1]
        } else if (i === (pixin - 1)) {
          tmp = life[i - 1][j - 1] + life[i][j - 1] + life[i - 1][j] + life[i - 1][j + 1] + life[i][j + 1] + life[0][j] + life[0][j - 1] + life[0][j + 1]
        } else {
          tmp = life[i - 1][j - 1] + life[i][j - 1] + life[i + 1][j - 1] + life[i - 1][j] + life[i + 1][j] + life[i - 1][j + 1] + life[i][j + 1] + life[i + 1][j + 1]
        }
      }
      if (tmp < 2) {
        nLife[i][j] = 0
      } else if (tmp > 3) {
        nLife[i][j] = 0
      } else if (tmp === 3) {
        nLife[i][j] = 1
      }
    }
  }
  for (j = 0; j < pixin; j++) {
    for (i = 0; i < pixin; i++) {
      if (nLife[i][j] === 0) {
        life[i][j] = 0
      } else {
        life[i][j] = 1
      }
    }
  }
  gen++
}

function draw () {
  s = 640 / pixin
  let ctx = canvas.getContext('2d')
  /* セルを描く */
  ctx.fillStyle = 'rgb(0,0,0)'
  ctx.fillRect(0, 0, 640, 670)
  ctx.strokeStyle = 'rgb(0,255,0)'
  ctx.fillStyle = 'rgb(0,255,0)'
  let i = 0
  let j = 0
  for (j = 0; j < pixin; j++) {
    for (i = 0; i < pixin; i++) {
      if (life[i][j] === 1) {
        ctx.fillRect(i * s, j * s, s, s)
      } else {
        ctx.strokeRect(i * s, j * s, s, s)
      }
    }
  }
  ctx.font = 'bold 25px mplus-1mn-regular'
  ctx.fillText('世代:' + gen, 525, 665)
}
