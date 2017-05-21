/* global document */

let htmlRatioResizeTimeout = null;
const htmlRatioComponentHelper = {
    initialize: domElement => {
        domElement.initialized = true;

        const ratioValue = domElement.getAttribute("ratio").split("x");
        const ratioWidth = parseInt(ratioValue[0], 10);
        const ratioHeight = parseInt(ratioValue[1], 10);

        const width = domElement.clientWidth;
        const height = width / ratioWidth * ratioHeight;
        domElement.style.height = `${height}px`;
    },
    documentResize: () => {
        if (htmlRatioResizeTimeout) {
            clearTimeout(htmlRatioResizeTimeout);
        }
        htmlRatioResizeTimeout = setTimeout(htmlRatioComponentHelper.initializeAll, 0);
    },
    initializeAll: () => {
        const domElements = document.querySelectorAll("[ratio]");

        if (domElements.length > 0) {
            for (let i = 0; i < domElements.length; i++) {
                htmlRatioComponentHelper.initialize(domElements[i]);
            }
        }
    },
    nodeInserted: event => {
        if (event.animationName !== "htmlRatioComponentNodeInserted") {
            return;
        }

        if (!event.target.initialized) {
            htmlRatioComponentHelper.initialize(event.target);
        }
    }
}