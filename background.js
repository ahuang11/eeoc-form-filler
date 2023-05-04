chrome.action.onClicked.addListener(function (tab) {
    if (tab) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['fill-form.js']
        }, function () {
            console.log('Script executed successfully.');
        });
    }
});