# HTML Search and Record
Created by [Ben Pettis](https://benpettis.com)

<img src="https://user-images.githubusercontent.com/79371825/168384361-e216dabd-7db2-40c7-9e4e-2794f8562b51.png" data-canonical-src="https://user-images.githubusercontent.com/79371825/168384361-e216dabd-7db2-40c7-9e4e-2794f8562b51.png" height="250" />

This is the repository for the development of the "HTML Search and Record" Chrome extension. The name is certainly a work in progress...
## About
A chrome extension to support internet researchers interested in user interactions with specific Web elements. The extension searches for a specified HTML element and invites users to record their screens if it is detected. This is an adaptation of the development I've done for a project I am working on that is specifically interested in the Google reCAPTCHA and users' interaction with these challenges. I've spun off this side project so that other researchers can use this approach in their own projects. 

For my project, I am experimenting with enabling the extension to submit recorded videos to a cloud hosting solution, and thus will be specifically tailored to my own project. However, I hope that this work may still be useful for other projects, so I spun off this version without the uploading capabilities.

This iteration of the extension lets you customize the HTML element and attribute to search for. If detected, the user is invited to record their screen as they interact with the web page. Once the recording is finished, the video is saved locally to their Downloads folder.

## Intallation

## Usage

I've tried to make the extension as user-friendly as possible. But also I'm not a trained expert in UI/UX so I know I probably could have done a better job at that... In any case, here's some hopefully useful information.

### Config

The extension offers several options for how it will detect HTML elements and notify you when they are found. You can access the extension options by right-clicking on its icon and selecting "Options" or by going to the "Manage Extensions..." page in Chrome and choosing "Options" from there.

#### Specifying HTML Element to Search For

The extension will search the DOM of the currently loaded page for a specified HTML element with a specified `title`, `class`, or `id` attribute. 
Type the name of the element that you wnat to search for, making sure to _not_ include the HTMl angle brackets. For example, if I wanted to search for any `<iframe>` elements, I would just type `iframe` into the box

![Screen Shot 2022-05-13 at 3 18 44 PM](https://user-images.githubusercontent.com/79371825/168383822-20a9f8ff-8e54-4e07-83fc-32a9816e7082.png)

Next, choose `title`, `class`, or `id` from the drop-down menu and type the value of the attribute that you want to search for. In my own use of this extension, I am trying to detect the Google reCAPTCHA element, so I have my search configured to detect the `iframe` elements that have an attribute `title` with the value `reCAPTCHA`

#### Other Options

In the options panel, you can also decide what color the counter in the extension icon should display in. The badge displays the number of detected elements, and changing the color can help this stand out - depending on what other extensions you have installed in Chrome.

You can also choose whether you'd like a browser pop-up to be displayed whenever the element is detected. This can be useful if you want to be sure to not miss any of the elements, but it can be a bit intrusive so I've included an option to disable it.

![Screen Shot 2022-05-13 at 3 24 40 PM](https://user-images.githubusercontent.com/79371825/168384314-0bce270c-fc0e-4d3f-8c9e-e0782a7c0607.png)

#### Saving Your Options

Once you've set the options how you'd like, you can just close the options panel. You may need to refresh any browser pages before the changes apply there, however.

### Recording

## Support

## More Information

![Picture1](https://user-images.githubusercontent.com/79371825/168383263-3a47233f-3fee-426f-949c-9f8fbff9b678.png)

## Acknowledgements:

Screen recording is handled via MediaStreamRecorder - https://github.com/streamproc/MediaStreamRecorder

Makes heavy use of the demo code from Google's documentation & APIs - 

