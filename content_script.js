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

        // add the data-scroll attribute to smooth scroll to this element
        document.getElementById(this.sticky_id).setAttribute("data-scroll", true);
    },

    scrollToTarget: function() {
        if (this.sticky_id) {
            // location.hash = "#" + this.sticky_id;
            document.getElementById(this.sticky_id).scrollIntoView();
        }
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
        } else if (request.eventType == "scrollToMessage") {
            if (window.scroll2message.sticky_id) {
                window.scroll2message.scrollToTarget();
                sendResponse({result: "scrolling"});
            } else {
                sendResponse({result: "targetNotSet"});
            }
        }
    }
);

// smoothScroll.init();