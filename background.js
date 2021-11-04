// backround.js



chrome.runtime.onMessage.addListener((msg, sender) => {
  // First, validate the message's structure.
  if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
    // Enable the page-action for the requesting tab.
    chrome.pageAction.show(sender.tab.id);
  }
});

var count;

const setBadgeCount = count => {
	if (count.captchas > 0 ) {
		chrome.browserAction.setBadgeBackgroundColor( {color: "red" });
		

		
		//alert("Test");
		
	} else {
		chrome.browserAction.setBadgeBackgroundColor( {color: "gray"} );
		chrome.browserAction.setBadgeText( {text: ''} );
	};
	
	chrome.browserAction.setBadgeText( {text: count.captchas.toString() } );
};

var alertShown = false;

const createAlert = count => {
	if (count.captchas > 0 && alertShown == false ) {
		alertShown = true;
		var x = confirm("A reCAPTCHA element was detected on this page!");
		console.log(x);
		
		
		// Could use this to create a system notification, but it's clunky right now...
		//chrome.notifications.create('test', {
		//	type: 'basic',
		//	iconUrl: 'icon.png',
		//	title: 'reCAPTCHA Detector',
		//	message: 'reCAPTCHA element detected on an open tab!',
		//	priority: 2
		//});
		
	};
};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	alertShown = false;
	chrome.tabs.query({
		active: true,
    	currentWindow: true
  	}, tabs => {
  	// ...and send a request for the captcha info...
	chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'background', subject: 'captchaCount'},
        // ...also specifying a callback to be called 
        //    from the receiving end (content script).
        setBadgeCount);
	

    // chrome.browserAction.setBadgeText({"text": tabId.toString(), "tabId":tabId});
	});
});

chrome.webNavigation.onCompleted.addListener( function() {
	alertShown = false;
	chrome.tabs.query({
		active: true,
    	currentWindow: true
  	}, tabs => {
  	// ...and send a request for the captcha info...
	chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'background', subject: 'captchaCount'},
        // ...also specifying a callback to be called 
        //    from the receiving end (content script).
        createAlert);
	

    // chrome.browserAction.setBadgeText({"text": tabId.toString(), "tabId":tabId});
	});
});