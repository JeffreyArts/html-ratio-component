/* global window, document, htmlRatioComponentHelper */
document.addEventListener("animationstart", htmlRatioComponentHelper.nodeInserted, false);
document.addEventListener("MSAnimationStart", htmlRatioComponentHelper.nodeInserted, false);
document.addEventListener("webkitAnimationStart", htmlRatioComponentHelper.nodeInserted, false);

document.addEventListener("DOMContentLoaded", htmlRatioComponentHelper.initializeAll, false);

window.addEventListener("resize", htmlRatioComponentHelper.documentResize);
