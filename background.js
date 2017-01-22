function sendMessageToSetScroll() {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {eventType: "setMessageToScrollTo"}, function (response) {
            // noop
        });
    });
}

var id = chrome.contextMenus.create({
    "title": "Set Message to Scroll to",
    "onclick": sendMessageToSetScroll
});
