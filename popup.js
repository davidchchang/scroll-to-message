function renderStatus(statusText) {
    document.getElementById('status').textContent = statusText;
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "hello")
            sendResponse({farewell: "goodbye"});
    });


chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {eventType: "scrollToMessage"}, function (response) {
        if (response.result == "scrolling") {
            window.close();
        } else {
            renderStatus(response.result);
        }
    });
});