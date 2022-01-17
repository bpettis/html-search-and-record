// Copyright 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const DESKTOP_MEDIA = ['window', 'tab'];
const options = {};


var pending_request_id = null;
var pc1 = null;
var pc2 = null;

var mediaStream;
var mediaRecorder;
var mimeType;

chrome.storage.sync.get('options', (data) => {
  Object.assign(options, data.options);
  
  mimeType = String(options.mime);
  
});


// Launch the chooseDesktopMedia().
document.querySelector('#start').addEventListener('click', function(event) {
  pending_request_id = chrome.desktopCapture.chooseDesktopMedia(
      DESKTOP_MEDIA, onAccessApproved);
});

document.querySelector('#cancel').addEventListener('click', function(event) {

  if (pending_request_id != null) {
    chrome.desktopCapture.cancelChooseDesktopMedia(pending_request_id);
  };
  
  // kludge solution to close the window
  window.open('','_self').close()
});


// Launch webkitGetUserMedia() based on selected media id.
function onAccessApproved(id, options) {
  if (!id) {
    console.log('Access rejected.');
    return;
  }

  var audioConstraint = {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: id
      }
  };

  console.log(options.canRequestAudioTrack);
  if (!options.canRequestAudioTrack)
    audioConstraint = false;

  navigator.webkitGetUserMedia({
    audio: audioConstraint,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: id,
        maxWidth:screen.width,
        maxHeight:screen.height} }
  }, gotStream, getUserMediaError);
}

function getUserMediaError(error) {
  console.log('navigator.webkitGetUserMedia() errot: ', error);
}

// Capture video/audio of media and initialize RTC communication.
function gotStream(stream) {
  console.log('Received local stream', stream);
  mediaStream = stream;
  
  document.querySelector('#start-recording').disabled = false;
  
  
  var video = document.querySelector('video');
  try {
    video.srcObject = stream;
    console.log(URL.createObjectURL(stream));
  } catch (error) {
    video.src = URL.createObjectURL(stream);
  }
  stream.onended = function() {
  	mediaRecorder.stop();
  	console.log('Ended');
  };


  pc1 = new RTCPeerConnection();
  pc1.onicecandidate = function(event) {
    onIceCandidate(pc1, event);
  };
  pc2 = new RTCPeerConnection();
  pc2.onicecandidate = function(event) {
    onIceCandidate(pc2, event);
  };
  pc1.oniceconnectionstatechange = function(event) {
    onIceStateChange(pc1, event);
  };
  pc2.oniceconnectionstatechange = function(event) {
    onIceStateChange(pc2, event);
  };
  pc2.onaddstream = gotRemoteStream;

  pc1.addStream(stream);

  pc1.createOffer(onCreateOfferSuccess, function() {});
}

function onCreateOfferSuccess(desc) {
  pc1.setLocalDescription(desc);
  pc2.setRemoteDescription(desc);
  // Since the 'remote' side has no media stream we need
  // to pass in the right constraints in order for it to
  // accept the incoming offer of audio and video.
  var sdpConstraints = {
    'mandatory': {
      'OfferToReceiveAudio': true,
      'OfferToReceiveVideo': true
    }
  };
  pc2.createAnswer(onCreateAnswerSuccess, function(){}, sdpConstraints);
}

function gotRemoteStream(event) {
  // Call the polyfill wrapper to attach the media stream to this element.
  console.log('hitting this code');
  try {
    remoteVideo.srcObject = event.stream;
  } catch (error) {
    remoteVideo.src = URL.createObjectURL(event.stream);
  }
}

function onCreateAnswerSuccess(desc) {
  pc2.setLocalDescription(desc);
  pc1.setRemoteDescription(desc);
}

function onIceCandidate(pc, event) {
  if (event.candidate) {
    var remotePC = (pc === pc1) ? pc2 : pc1;
    remotePC.addIceCandidate(new RTCIceCandidate(event.candidate));
  }
}

function onIceStateChange(pc, event) {
  if (pc) {
    console.log('ICE state change event: ', event);
  }
}



document.querySelector('#start-recording').addEventListener('click', function(event) {
	this.disabled = true;
	
	
	mediaRecorder = new MediaStreamRecorder(mediaStream);
	mediaRecorder.stream = mediaStream;
	
	
	mediaRecorder.mimeType = mimeType;
	
	
	mediaRecorder.ondataavailable = function (blob) {
		// POST/PUT "Blob" using FormData/XHR2
		var blobURL = URL.createObjectURL(blob);
		//document.write('<a href="' + blobURL + '">' + blobURL + '</a>');
	  };
  mediaRecorder.start(30000);
	
	
	console.warn('Just started the recording');
	
	document.querySelector('#stop-recording').disabled = false;
    document.querySelector('#pause-recording').disabled = false;
   
	
});


document.querySelector('#stop-recording').addEventListener('click', function(event) {
	this.disabled = true;
	console.warn('Just stopped the recording');

	mediaRecorder.stop();
	
	
    document.querySelector('#save-recording').disabled = false;
	document.querySelector('#pause-recording').disabled = true;
	//document.querySelector('#start-recording').disabled = false;
	
});

document.querySelector('#pause-recording').addEventListener('click', function(event) {
	this.disabled = true;
	mediaRecorder.pause();

	document.querySelector('#resume-recording').disabled = false;
});

document.querySelector('#resume-recording').addEventListener('click', function(event)  {
	this.disabled = true;
	mediaRecorder.resume();

	document.querySelector('#pause-recording').disabled = false;
});

document.querySelector('#save-recording').addEventListener('click', function(event)  {
	this.disabled = true;
	
	mediaRecorder.save();
	
	

	// alert('Drop WebM file on Chrome or Firefox. Both can play entire file. VLC player or other players may not work.');
});