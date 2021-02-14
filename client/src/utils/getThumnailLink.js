function getParameterByName(url, name) {
  var match = RegExp("[?&]" + name + "=([^&]*)").exec(url);
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}
export default function (vidLink) {
  return `https://img.youtube.com/vi/${getParameterByName(
    vidLink,
    "v"
  )}/sddefault.jpg`;
}
