// popup.js

// document.getElementById("iframecount").innerHTML = iframes.length;
// document.getElementById("captchacount").innerHTML = captchacounter;


// In-page cache of the user's options
const options = {};

// Get the names of tags/attributes we're searching for
chrome.storage.sync.get('options', (data) => {
	Object.assign(options, data.options);
	
	if (typeof options.elementName == "undefined") {
		options.elementName = "iframe";
	  }
	  if (typeof options.attributeType == "undefined") {
		options.attributeType = "title";
	  }
	  if (typeof options.attributeName == "undefined") {
		options.attributeName = "reCAPTCHA";
	  }

	document.getElementById('elementname').textContent = String(options.elementName);
	document.getElementById('attributeType').textContent = String(options.attributeType);
	document.getElementById('attributeName').textContent = String(options.attributeName);
});


// Update the relevant fields with the new data.
const setDOMInfo = info => {
  document.getElementById('recordingOptions').style.visibility='hidden';
    
  document.getElementById('elementcount').textContent = info.elements;
  document.getElementById('attributecount').textContent = info.attributes;
  
  if (info.attributes > 0) {
  	document.getElementById('recordingOptions').style.visibility='visible';
  }
  

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

// Listen for if the button is clicked
document.querySelector('button').addEventListener('click', triggerRecording);

function triggerRecording() {
// ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'toggleRecording'},
        // ...also specifying a callback to be called 
        //    from the receiving end (content script).
        doStuff);
  });
}

function doStuff(response) {
	console.log('Doing stuff');
	console.log(response);
	
	
	//open a window for stuff to happen in?
	chrome.windows.create({url: "index.html", type: "popup", height: 700, width: 700});

	
}

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



// Check if the go-to-options button is clicked, and if so open the extension options
document.querySelector('#go-to-options').addEventListener('click', function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});
