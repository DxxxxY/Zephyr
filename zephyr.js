var dark = false
var darkcolor = "#4a94fa"
var lightcolor = "#990099"
var darkbgcolor = "#000000"
var lightbgcolor = "#ffffff"

var i = 0

const darkSwitch = () => {
    if (localStorage.getItem("current_theme") == "dark") localStorage.setItem("current_theme", "light")
    else if (localStorage.getItem("current_theme") == "light") localStorage.setItem("current_theme", "dark")
    else localStorage.setItem("current_theme", dark ? "dark" : "light")
    dark = !dark

    document.querySelectorAll("za").forEach(navlink => {
        if (navlink.parentNode.nodeName.toLowerCase() != "zli") return
        if (window.location.pathname.split("/").pop() == "")
            if (navlink.getAttribute("href") == "index.html") return navlink.className = "active"
        if (navlink.getAttribute("href") == window.location.pathname.split("/").pop()) return navlink.className = "active"
        navlink.style.color = dark ? shadeColor(darkcolor, 2) : shadeColor(lightcolor, 2)
    })

    document.querySelector("zdark").innerText = dark ? "Light Mode" : "Dark Mode"

    document.querySelector("*").style.setProperty("--color", dark ? darkcolor : lightcolor)
    document.querySelector("*").style.setProperty("--bgColor", dark ? darkbgcolor : lightbgcolor)
}

const shadeColor = (color, decimal) => {
    const base = color.startsWith('#') ? 1 : 0;

    var r = parseInt(color.substring(base, 3), 16);
    var g = parseInt(color.substring(base + 2, 5), 16);
    var b = parseInt(color.substring(base + 4, 7), 16);

    r = Math.round(r / decimal);
    g = Math.round(g / decimal);
    b = Math.round(b / decimal);

    r = (r < 255) ? r : 255;
    g = (g < 255) ? g : 255;
    b = (b < 255) ? b : 255;

    const rr = ((r.toString(16).length === 1) ? `0${r.toString(16)}` : r.toString(16));
    const gg = ((g.toString(16).length === 1) ? `0${g.toString(16)}` : g.toString(16));
    const bb = ((b.toString(16).length === 1) ? `0${b.toString(16)}` : b.toString(16));

    return `#${rr}${gg}${bb}`;
}

HTMLElement.prototype.attributeToCSS = function() {
    Array.prototype.slice.call(this.attributes).forEach(a => {
        if (a.name == "href") {
            this.addEventListener("click", (() => window.location.href = a.value))
            return this.style.cursor = "pointer"
        }
        if (a.name == "src") {
            if (a.value.includes("http")) return this.style.backgroundImage = `url(${a.value})`
            return this.style.backgroundImage = `url(${a.value})`
        }
        this.style[a.name] = a.value
    })
}

window.post = function(url, data) {
    return fetch(url, { method: "POST", mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
}

window.get = function(url) {
    return fetch(url, { method: "GET", mode: 'no-cors', headers: { 'Content-Type': 'application/json' } });
}

setInterval(() => {
    if (i == 360) i = 0

    document.querySelectorAll("zh1").forEach(e => {
        e.style.background = dark ? `linear-gradient(${i}deg, rgba(2, 0, 36, 1) 25%, rgba(2, 0, 36, 1) 50%, #4a94fa 75%, #4a94fa 100%)` : `linear-gradient(${i}deg, rgb(117, 22, 117) 25%, rgb(82, 41, 82) 50%, rgb(75, 23, 75) 75%, rgb(82, 41, 82) 100%)`
        e.style.webkitBackgroundClip = "text"
    })
    i++
}, 10)

document.addEventListener("DOMContentLoaded", () => document.querySelectorAll("zloader").forEach(loader => {
    document.querySelector("zbody").style.opacity = 0
    if (loader.getAttribute("waitFor") == "windowLoad") {
        if (loader.hasAttribute("delay")) {
            return setTimeout(() => {
                loader.remove()
                document.querySelector("zbody").style.opacity = 1
            }, loader.getAttribute("delay"))
        }
        loader.remove()
        document.querySelector("zbody").style.opacity = 1
    }
}))

// document.querySelectorAll("zinput").forEach(e => {
//     e.addEventListener("keyup", key => {
//         console.log(key.code)
//     })
// })

document.querySelectorAll("zform").forEach(e => {
    let buffer = []
    Array.prototype.slice.call(e.children).forEach(child => {
        if (child.nodeName.toLowerCase() == "button") {
            child.addEventListener("click", () => { //what it does upon submitting
                Array.prototype.slice.call(e.children).forEach(input => { if (input.nodeName.toLowerCase() == "input" || input.nodeName.toLowerCase() == "textarea") buffer.push(input) })
                const event = new CustomEvent('zSubmit', { detail: buffer });
                let method, action
                Array.prototype.slice.call(e.attributes).forEach(attribute => {
                    if (attribute.name == "method") method = attribute.value.toLowerCase()
                    if (attribute.name == "action") action = attribute.value.toLowerCase()
                })
                if (method == "post") console.log(post(action, buffer))
                if (method == "get") console.log(get(action))
                buffer = [], method = "", action = ""
                e.dispatchEvent(event)
            })
        }
    })
})

// document.querySelector("zform").addEventListener("zSubmit", e => {
//     console.log(e.detail)
// })

document.querySelector("zdark").addEventListener("click", darkSwitch)

document.querySelectorAll('*').forEach(e => { if (e.nodeName.toLowerCase().startsWith("z")) e.attributeToCSS() })

Array.prototype.slice.call(document.querySelector("zconfig").attributes).forEach(a => { if (a.name.startsWith("$")) window[a.name.split("$").pop()] = a.value })

darkSwitch()