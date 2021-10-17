// content.js

var iframes = document.getElementsByTagName('iframe');

console.log('Detected ' + iframes.length + ' iframe elements');

var captchacounter = 0

for (let i = 0; i < iframes.length; i++) {
            console.log('iframe #' + i + ' title: ' + iframes[i].getAttribute('title'));
            if (iframes[i].getAttribute('title') == 'reCAPTCHA' ){
            	captchacounter++;
            }
        }

console.log('Detected ' + captchacounter + ' reCAPTCHA elements');

// document.getElementById("iframecount").innerHTML = iframes.length;
// document.getElementById("captchacount").innerHTML = captchacounter;

// Inform the background page that 
// this tab should have a page-action.
chrome.runtime.sendMessage({
  from: 'content',
  subject: 'showPageAction',
});

// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  // First, validate the message's structure.
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    // Collect the necessary data. 
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`.)
    var domInfo = {
      iframes: iframes.length,
      captchas: captchacounter,
    };

    // Directly respond to the sender (popup), 
    // through the specified callback.
    response(domInfo);
  }
});