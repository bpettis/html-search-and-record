// content.js


var iframecount = 0
var captchacounter = 0

var alertShown = false;

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
	
	
	// Kludge solution to only display a alert but only one time
	if (captchacounter > 0 && alertShown == false) {
		alertShown = true;
		var x = confirm('It looks like there is a reCAPTCHA on this page! \nWould you like to record? ');
			
		console.log(x);
	}
	
	
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

// Listen for messages

chrome.runtime.onMessage.addListener(function(msg, sender, response) {
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
  };
  
  if ((msg.from === 'background') && (msg.subject === 'captchaCount')) {

    // Directly respond to the sender (background), 
    // through the specified callback.
    response({count: captchacounter});
  };
});

