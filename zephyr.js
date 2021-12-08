// Dark mode
var dark = true
var darkcolor = "#4a94fa"
var lightcolor = "#990099"
var darkbgcolor = "#000000"
var lightbgcolor = "#ffffff"
if (localStorage.getItem("current_theme") == "light") dark = false
else localStorage.setItem("current_theme", dark ? "dark" : "light")

var i = 0

//Loop
setInterval(() => {
    //360deg reset
    if (i == 360) i = 0

    document.querySelectorAll("za").forEach(navlink => {
        console.log(window.location.pathname.split("/").pop())
        if (window.location.pathname.split("/").pop() == "")
            if (navlink.getAttribute("href") == "index.html") return navlink.className = "active"
        if (navlink.getAttribute("href") == window.location.pathname.split("/").pop()) return navlink.className = "active"
        navlink.style.color = dark ? shadeColor(darkcolor, 2) : shadeColor(lightcolor, 2)
    })

    document.querySelector("zdark").innerText = dark ? "Light Mode" : "Dark Mode"

    // Apply site wide color scheme
    document.querySelector("*").style.setProperty("--color", dark ? darkcolor : lightcolor)
    document.querySelector("*").style.setProperty("--bgColor", dark ? darkbgcolor : lightbgcolor)

    //Rotate gradient
    document.querySelectorAll("zh1").forEach(e => {
        e.style.background = dark ? `linear-gradient(${i}deg, rgba(2, 0, 36, 1) 25%, rgba(2, 0, 36, 1) 50%, #4a94fa 75%, #4a94fa 100%)` : `linear-gradient(${i}deg, rgb(117, 22, 117) 25%, rgb(82, 41, 82) 50%, rgb(75, 23, 75) 75%, rgb(82, 41, 82) 100%)`
        e.style.webkitBackgroundClip = "text"
    })
    i++
}, 10)

document.addEventListener("DOMContentLoaded", () => document.querySelectorAll("zloader").forEach(loader => { if (loader.getAttribute("waitFor") == "windowLoad") loader.remove() }))

HTMLElement.prototype.attributeToCSS = function() {
    Array.prototype.slice.call(this.attributes).forEach(a => {
        if (a.name == "href") {
            this.addEventListener("click", (() => window.location.href = a.value))
            return this.style.cursor = "pointer"
        }
        this.style[a.name] = a.value
    })
}

document.querySelector("zdark").addEventListener("click", () => {
    if (localStorage.getItem("current_theme") == "dark") localStorage.setItem("current_theme", "light")
    else if (localStorage.getItem("current_theme") == "light") localStorage.setItem("current_theme", "dark")
    dark = !dark
})

Array.prototype.slice.call(document.querySelector("zconfig").attributes).forEach(a => {
    if (a.name.startsWith("--")) return document.querySelector("*").style.setProperty(a.name.split("--").pop(), a.value)
    if (a.name.startsWith("$")) return window[a.name.split("$").pop()] = a.value
    document.querySelector("*").style[a.name] = a.value
})

document.querySelectorAll("zloader, znav, zl, za, zh1, zdark, zbody").forEach(custom => custom.attributeToCSS())

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