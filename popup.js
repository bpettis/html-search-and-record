// popup.js

// document.getElementById("iframecount").innerHTML = iframes.length;
// document.getElementById("captchacount").innerHTML = captchacounter;

// Update the relevant fields with the new data.

const setDOMInfo = info => {
  document.getElementById('iframecount').textContent = info.iframes;
  document.getElementById('captchacount').textContent = info.captchas;
};

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', () => {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
        // ...also specifying a callback to be called 
        //    from the receiving end (content script).
        setDOMInfo);
  });
});


// If we have any links in the popup, open them in a new tab:
document.addEventListener('DOMContentLoaded', function () {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
});