// Dark mode
let dark = true
if (localStorage.getItem("current_theme") == "light") dark = false
else localStorage.setItem("current_theme", dark ? "dark" : "light")

let i = 0

//Loop
setInterval(() => {
    //360deg reset
    if (i == 360) i = 0

    document.querySelectorAll("za").forEach(navlink => {
        console.log(window.location.pathname.split("/").pop())
        if (window.location.pathname.split("/").pop() == "")
            if (navlink.getAttribute("href") == "index.html") return navlink.className = "active"
        if (navlink.getAttribute("href") == window.location.pathname.split("/").pop()) return navlink.className = "active"
        navlink.style.color = dark ? "#0d5ca5" : "#600360"
    })

    document.querySelector("zdark").innerText = dark ? "Light Mode" : "Dark Mode"

    // Apply site wide color scheme
    document.querySelector(":root").style.setProperty("--color", dark ? "#4a94fa" : "#990099")
    document.querySelector(":root").style.setProperty("--bgColor", dark ? "#000000" : "#ffffff")

    //Rotate gradient
    document.querySelectorAll("zh1").forEach(e => {
        e.style.background = dark ? `linear-gradient(${i}deg, rgba(2, 0, 36, 1) 25%, rgba(2, 0, 36, 1) 50%, #4a94fa 75%, #4a94fa 100%)` : `linear-gradient(${i}deg, rgb(117, 22, 117) 25%, rgb(82, 41, 82) 50%, rgb(75, 23, 75) 75%, rgb(82, 41, 82) 100%)`
        e.style.webkitBackgroundClip = "text"
    })
    i++
}, 10)

document.addEventListener("DOMContentLoaded", () => document.querySelectorAll("zloader").forEach(loader => { if (loader.getAttribute("waitFor") == "windowLoad") loader.remove() }))

HTMLElement.prototype.attributeToCSS = function() {
    Array.prototype.slice.call(this.attributes).forEach(e => {
        if (e.name == "href") {
            this.addEventListener("click", (() => window.location.href = e.value))
            return this.style.cursor = "pointer"
        }
        this.style[e.name] = e.value
    })
}

document.querySelector("zdark").addEventListener("click", () => {
    if (localStorage.getItem("current_theme") == "dark") localStorage.setItem("current_theme", "light")
    else if (localStorage.getItem("current_theme") == "light") localStorage.setItem("current_theme", "dark")
    dark = !dark
})

document.querySelectorAll("zloader, znav, zl, za, zh1, zdark, zbody").forEach(custom => custom.attributeToCSS())