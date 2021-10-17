// content.js


var iframecount = 0
var captchacounter = 0

// Callback function to execute when mutations are observed
var callback = function(mutationsList) {
	var iframes = document.getElementsByTagName('iframe');
	
	iframecount = 0;
	captchacounter = 0;
	
	// console.log('Detected ' + iframes.length + ' iframe elements');
	
	

	for (let i = 0; i < iframes.length; i++) {
				// console.log('iframe #' + i + ' title: ' + iframes[i].getAttribute('title'));
				if (iframes[i].getAttribute('title') == 'reCAPTCHA' ){
					captchacounter++;
				}
			}
	iframecount = iframes.length;
	// console.log('Detected ' + captchacounter + ' reCAPTCHA elements');
};
// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
var targetNode = document.documentElement || document.body;;
observer.observe(targetNode, {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true
});



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
      iframes: iframecount,
      captchas: captchacounter,
    };

    // Directly respond to the sender (popup), 
    // through the specified callback.
    response(domInfo);
  }
});