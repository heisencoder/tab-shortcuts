# tab-shortcuts
Chrome extension that adds keyboard shortcuts for moving around tabs.

## Features 
This extension supports adding keybindings for the following actions:

*   `move-tabs-left`: Moves all selected tabs one position to the left.
*   `move-tabs-right`: Moves all selected tabs one position to the right.
*   `undock-tabs-to-new-window`: Moves all selected tabs into a new window.
    If there is only one selected tab, then the new window will be a pop-up
    type without a tab bar or URL bar.
*   `move-tabs-between-windows`: Moves all the selected tabs into the next window,
    as defined by the order that the windows were created.  This skips over
    other pop-up type windows. If the active tab is itself in a pop-up type
    window then it is moved into a regular tab in the next window.
*   `toggle-pinned`: Toggles the pinned state of all the selected windows.:w

You can select multiple tabs by holding down Shift or Ctrl while clicking on tabs.

To update the keybindings, visit the chrome://extensions/shortcuts page and look for the tab-shortcuts extension.

## Acknowledgements

Thanks to Kenneth LU for making the
[QuickShift Redux](https://github.com/luyangkenneth/quickshift-redux)
Chrome Extension that I used as the starting point for this extension.
