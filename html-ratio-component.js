"use strict";

/* global document */

var htmlRatioResizeTimeout = null;
var htmlRatioComponentHelper = {
    initialize: function initialize(domElement) {
        domElement.initialized = true;

        var ratioValue = domElement.getAttribute("ratio").split("x");
        var ratioWidth = parseInt(ratioValue[0], 10);
        var ratioHeight = parseInt(ratioValue[1], 10);

        var width = domElement.clientWidth;
        var height = width / ratioWidth * ratioHeight;
        domElement.style.height = height + "px";
    },
    documentResize: function documentResize() {
        if (htmlRatioResizeTimeout) {
            clearTimeout(htmlRatioResizeTimeout);
        }
        htmlRatioResizeTimeout = setTimeout(htmlRatioComponentHelper.initializeAll, 0);
    },
    initializeAll: function initializeAll() {
        var domElements = document.querySelectorAll("[ratio]");

        if (domElements.length > 0) {
            for (var i = 0; i < domElements.length; i++) {
                htmlRatioComponentHelper.initialize(domElements[i]);
            }
        }
    },
    nodeInserted: function nodeInserted(event) {
        if (event.animationName !== "htmlRatioComponentNodeInserted") {
            return;
        }

        if (!event.target.initialized) {
            htmlRatioComponentHelper.initialize(event.target);
        }
    }
};
/* global window, document, htmlRatioComponentHelper */
document.addEventListener("animationstart", htmlRatioComponentHelper.nodeInserted, false);
document.addEventListener("MSAnimationStart", htmlRatioComponentHelper.nodeInserted, false);
document.addEventListener("webkitAnimationStart", htmlRatioComponentHelper.nodeInserted, false);

document.addEventListener("DOMContentLoaded", htmlRatioComponentHelper.initializeAll, false);

window.addEventListener("resize", htmlRatioComponentHelper.documentResize);