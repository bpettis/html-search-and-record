// content.js



//Initialize some variables:
var elementcount = 0
var attributecounter = 0


//In-page cache of the user options for us to load data from chrome.storage into:
const options = {};


var elementName
var attributeType
var attributeName

chrome.storage.sync.get('options', (data) => {
		Object.assign(options, data.options);
		elementName = String(options.elementName);
		attributeType = String(options.attributeType);
		attributeName = String(options.attributeName);
	});

var alertShown = false;
var alertsEnabled = false;



var recording = false;


// Callback function to execute when mutations are observed
var callback = function(mutationsList) {
	var iframes = document.getElementsByTagName(elementName);
	
	elementcount = 0;
	attributecounter = 0;
	
	// console.log('Detected ' + iframes.length + ' iframe elements');
	
	
	

	for (let i = 0; i < iframes.length; i++) {
				// console.log('iframe #' + i + ' title: ' + iframes[i].getAttribute('title'));
				if (iframes[i].getAttribute(attributeType) == attributeName ){
					attributecounter++;
				}
			}
	elementcount = iframes.length;
	
	
	// check if alerts are enabled or nah
	chrome.storage.sync.get('options', (data) => {
		Object.assign(options, data.options);
		alertsEnabled = Boolean(options.alerts);
	});
	
	
	if (alertsEnabled == true) {
		// Kludge solution to only display a alert but only one time
		if (attributecounter > 0 && alertShown == false) {
			alertShown = true;
			alert('It looks like there is a reCAPTCHA on this page! \nOpen up the reCAPTCHA Detector extension for more information and to start a recording if you would like');
		};
	};
	
	
	// console.log('Detected ' + attributecounter + ' reCAPTCHA elements');
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


//Handle the video:
function toggleRecording() {
	console.log('toggleRecording function ran');
	
	if (!recording) {
		recording = true;
	} else {
		recording = false;
	}
	
	return recording;
}



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
      elements: elementcount,
      attributes: attributecounter,
      // While we're responding to this message, we need to make sure the popup script knows the current recording status so we stash that in the response object here too
      status: recording,
    };

    // Directly respond to the sender (popup), 
    // through the specified callback.
    response(domInfo);
  };
  
  if ((msg.from === 'background') && (msg.subject === 'captchaCount')) {

    // Directly respond to the sender (background), 
    // through the specified callback.
    response({count: attributecounter});
  };
  
  if ((msg.from === 'popup' && msg.subject === 'toggleRecording')){
  	toggleRecording();
  	
  	response({status: recording});
  }
});

