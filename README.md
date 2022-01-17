# HTML Search and Record
## Read Me

Ben Pettis

This is the repository for the development of the "HTML Search and Record" Chrome extension. The name is certainly a work in progress...

A chrome extension to support internet researchers interested in user interactions with specific Web elements. The extension searches for a specified HTML element and invites users to record their screens if it is detected.
This is an adaptation of the development I've done for a project I am working on that is specifically interested in the Google reCAPTCHA and users' interaction with these challenges. I've spun off this side project so that other researchers can use this approach in their own projects. 

For my project, I am experimenting with enabling the extension to submit recorded videos to a cloud hosting solution, and thus will be specifically tailored to my own project. However, I hope that this work may still be useful for other projects, so I spun off this version without the uploading capabilities.

This iteration of the extension lets you customize the HTML element and attribute to search for. If detected, the user is invited to record their screen as they interact with the web page. Once the recording is finished, the video is saved locally to their Downloads folder.




Screen recording is handled via MediaStreamRecorder - https://github.com/streamproc/MediaStreamRecorder

Makes heavy use of the demo code from Google's documentation & APIs