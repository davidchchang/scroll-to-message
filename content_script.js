window.scroll2message = {
    last_clicked_id: null,
    sticky_id: null,

    setLastClickedId: function (element) {
        // bubble upwards and try to find an element that contains an ID
        var target = element;
        while (!target.id && target.parentElement) {
            target = target.parentElement;
        }
        this.last_clicked_id = target.id ? target.id : null;
    },

    setStickyId: function () {
        this.sticky_id = this.last_clicked_id;
        console.log("scroll ID set to", this.sticky_id);
    }
};

document.addEventListener("contextmenu", function (event) {
    var targetElement = event.target || event.srcElement;
    window.scroll2message.setLastClickedId(targetElement);

    return false;
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.eventType == "setMessageToScrollTo") {
            window.scroll2message.setStickyId();
        }
    }
);
