const events = {
    listeners: {},
    addListener: function(t, e) {
        this.listeners[t] = this.listeners[t] || [],
        this.listeners[t].push(e)
    },
    fire: function(t, ...e) {
        if (this.listeners[t])
            for (let n of this.listeners[t])
                n(...e)
    }
}
  , rand = (t, e) => Math.random() * (e - t) + t
  , tot = sectors.length
  , spinEl = document.querySelector("#spin")
  , ctx = document.querySelector("#wheel").getContext("2d")
  , dia = ctx.canvas.width
  , rad = dia / 2
  , PI = Math.PI
  , TAU = 2 * PI
  , arc = TAU / sectors.length
  , friction = .995;
let angVel = 0
  , ang = 0
  , spinButtonClicked = !1;
const getIndex = () => Math.floor(tot - ang / TAU * tot) % tot;
function drawSector(t, e) {
    const n = arc * e;
    ctx.save(),
    ctx.beginPath(),
    ctx.lineWidth = 3,
    ctx.strokeStyle = t.border,
    ctx.moveTo(rad, rad),
    ctx.arc(rad, rad, rad - 1, n, n + arc),
    ctx.lineTo(rad, rad),
    ctx.stroke(),
    ctx.translate(rad, rad),
    ctx.rotate(n + arc / 2),
    ctx.textAlign = "right",
    ctx.fillStyle = t.text,
    ctx.font = "bold 28px sans-serif",
    ctx.lineWidth = 2,
    ctx.strokeStyle = "white",
    ctx.strokeText(t.label, rad - 10, 10),
    ctx.fillText(t.label, rad - 10, 10),
    ctx.restore()
}
function rotate() {
    const t = sectors[getIndex()];
    ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`,
    spinEl.textContent = "SPIN",
    spinEl.style.background = t.border,
    spinEl.style.color = t.text
}
function frame() {
    if (!angVel && spinButtonClicked) {
        const t = sectors[getIndex()];
        return events.fire("spinEnd", t),
        void (spinButtonClicked = !1)
    }
    angVel *= friction,
    angVel < .002 && (angVel = 0),
    ang += angVel,
    ang %= TAU,
    rotate()
}
function engine() {
    frame(),
    requestAnimationFrame(engine)
}
function init() {
    sectors.forEach(drawSector),
    rotate(),
    engine(),
    spinEl.addEventListener("click", ( () => {
        var t, e;
        angVel || (t = .25,
        e = .45,
        angVel = Math.random() * (e - t) + t),
        spinButtonClicked = !0
    }
    ))
}
init(),
window.addEventListener("load", (function() {
    const t = document.querySelector("#spin");
    t.style.display = "none",
    t.offsetHeight,
    t.style.display = "flex"
}
));
const modal = document.getElementById("resultModal")
  , closeModalButton = document.getElementById("closeModal")
  , resultText = document.getElementById("resultText");
events.addListener("spinEnd", (t => {
    if (console.log(`Woop! You won ${t.fullText}`),
    resultText.textContent = t.fullText,
    "A" === resultText.parentNode.tagName) {
        const t = resultText.parentNode;
        t.parentNode.replaceChild(resultText, t)
    }
    if (t.webLink) {
        const e = document.createElement("a");
        e.href = t.webLink,
        e.target = "_blank",
        e.className = "button-link",
        resultText.parentNode.replaceChild(e, resultText),
        e.appendChild(resultText)
    }
    modal.style.display = "block"
}
)),
closeModalButton.onclick = function() {
    modal.style.display = "none"
}
;