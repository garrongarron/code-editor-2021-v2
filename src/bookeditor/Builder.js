const build = function(tag, inner, className, parent) {
    let el = document.createElement(tag)
    if (inner) el.textContent = inner
    if (className) {
        if (typeof className == 'string') {
            el.classList.add(className)
        } else {
            console.error('class is not string');
        }
    }
    if (parent) parent.appendChild(el)
    return el
}
export default build