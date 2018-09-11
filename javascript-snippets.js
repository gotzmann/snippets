// Get parameter from URL

function getParam(k) {
    var p = {}
    location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, (s, k, v) => { p[k] = v })
    return k ? p[k] : p
}
