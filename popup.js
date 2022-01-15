// popup.js

// document.getElementById("iframecount").innerHTML = iframes.length;
// document.getElementById("captchacount").innerHTML = captchacounter;




// Update the relevant fields with the new data.
const setDOMInfo = info => {
  document.getElementById('recordingOptions').style.visibility='hidden';
  

  
  document.getElementById('iframecount').textContent = info.iframes;
  document.getElementById('captchacount').textContent = info.captchas;
  
  if (info.captchas > 0) {
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
	chrome.windows.create({url: "index.html", type: "popup", height: 500, width: 500});

	
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
