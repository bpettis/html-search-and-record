// In-page cache of the user's options
const options = {};


// Set defaults and Initialize the form with the user's saved option settings
chrome.storage.sync.get('options', (data) => {
  Object.assign(options, data.options);
  
  if (typeof options.alerts == "undefined") {
  	options.alerts = True;
  }
  if (typeof options.color == "undefined") {
  	options.color = "red";
  }
  if (typeof options.mime == "undefined") {
  	options.mime = "video/mp4";
  }
  if (typeof options.elementName == "undefined") {
  	options.elementName = "iframe";
  }
  if (typeof options.attributeType == "undefined") {
  	options.attributeType = "title";
  }
  if (typeof options.attributeName == "undefined") {
  	options.attributeName = "reCAPTCHA";
  }
  
  alertOptions.alerts.checked = Boolean(options.alerts);
  alertOptions.color.value = String(options.color);
  videoOptions.mime.value = String(options.mime);
  htmlOptions.elementName.value = String(options.elementName);
  htmlOptions.attributeType.value = String(options.attributeType);
  htmlOptions.attributeName.value = String(options.attributeName);
});

// Immediately persist options changes
alertOptions.alerts.addEventListener('change', (event) => {
  options.alerts = event.target.checked;
  chrome.storage.sync.set({options});
});

alertOptions.color.addEventListener('change', (event) => {
  options.color = event.target.value;
  chrome.storage.sync.set({options});
});

videoOptions.mime.addEventListener('change', (event) => {
  options.mime = event.target.value;
  chrome.storage.sync.set({options});
});

htmlOptions.elementName.addEventListener('change', (event) => {
  options.elementName = event.target.value;
  chrome.storage.sync.set({options});
});

htmlOptions.attributeType.addEventListener('change', (event) => {
  options.attributeType = event.target.value;
  chrome.storage.sync.set({options});
});

htmlOptions.attributeName.addEventListener('change', (event) => {
  options.attributeName = event.target.value;
  chrome.storage.sync.set({options});
});