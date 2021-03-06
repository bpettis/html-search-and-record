# HTML Search and Record
Created by [Ben Pettis](https://benpettis.com)

<img src="https://user-images.githubusercontent.com/79371825/168384361-e216dabd-7db2-40c7-9e4e-2794f8562b51.png" data-canonical-src="https://user-images.githubusercontent.com/79371825/168384361-e216dabd-7db2-40c7-9e4e-2794f8562b51.png" height="250" />

This is the repository for the development of the "HTML Search and Record" Chrome extension. The name is certainly a work in progress...
## About
A chrome extension to support internet researchers interested in user interactions with specific Web elements. The extension searches for a specified HTML element and invites users to record their screens if it is detected. This is an adaptation of the development I've done for a project I am working on that is specifically interested in the Google reCAPTCHA and users' interaction with these challenges. I've spun off this side project so that other researchers can use this approach in their own projects. 

For my project, I am experimenting with enabling the extension to submit recorded videos to a cloud hosting solution, and thus will be specifically tailored to my own project. However, I hope that this work may still be useful for other projects, so I spun off this version without the uploading capabilities.

This iteration of the extension lets you customize the HTML element and attribute to search for. If detected, the user is invited to record their screen as they interact with the web page. Once the recording is finished, the video is saved locally to their Downloads folder.

## Intallation

1. Head to the [Releases Page](https://github.com/bpettis/html-search-and-record/releases) and download the most recent release (or whichever version you'd like, really)
2. This will download a .CRX file that contains all the necessary elements of the chrome extension in a neat little package
3. Open the Chrome Extensions manager page
4. Drag the .CRX file from your file browser onto the Chrome page
5. Read through the requested permissions and click "Add" - you will see a warning that the extension does not come from the Chrome App Store.

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

1. Click on the extension icon to view the count of detected HTML elements. Click the "Recording Controls" button if you want to start recording
![Screen Shot 2022-05-13 at 3 43 28 PM](https://user-images.githubusercontent.com/79371825/168386921-2c5ef2ab-d075-47d1-839b-098fb6c7f569.png)
2. Click "Select Source" to give permission for the extension to view and record your screen. You can select a window, or just the specfic chrome Tab. You should see a preview of the selection in the pop-up window ![Screen Shot 2022-05-13 at 3 44 29 PM](https://user-images.githubusercontent.com/79371825/168386999-ed069663-ab67-4dd8-8e42-3f3b48c2faf7.png)
3. Once you're ready, click "Start" - optionally, you can pause/resume the recording. This could be good if you want to hide some parts of the recording, such as typing in private information
4. After you've finished whatever action you want to record, go back to the pop-up and click "Stop"
5. Finally, click "save" to keep a copy of the video file. Otherwise, the video _*will be lost*_ if you close the window without saving.
![Screen Shot 2022-05-13 at 3 44 51 PM](https://user-images.githubusercontent.com/79371825/168387308-d3bf99d2-a82f-4938-ab25-fd5f7db1bc9a.png)



## Support

Unfortunately, I am not able to provide dedicated support or troubleshooting for the extension. I'm providing the code for you to use or remix for your own purposes, but this is not the same as a polished software release. If you do encounter problems, you are welcome to add an Issue to this GitHub repo, but I cannot guarantee if/when I will be able to directly respond.

## More Information

![Picture1](https://user-images.githubusercontent.com/79371825/168383263-3a47233f-3fee-426f-949c-9f8fbff9b678.png)

## Acknowledgements:

Screen recording is handled via MediaStreamRecorder - https://github.com/streamproc/MediaStreamRecorder

Makes heavy use of the demo code from Google's documentation & APIs - 

