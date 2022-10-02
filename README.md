# tab-shortcuts
Chrome extension that adds keyboard shortcuts for moving around tabs.

## Features
This extension supports adding keybindings for the following actions:

*   `move-tabs-left`: Moves all selected tabs one position to the left.
*   `move-tabs-right`: Moves all selected tabs one position to the right.
*   `undock-tabs-to-new-window`: Moves all selected tabs into a new window.
*   `undock-tab-to-popup-window`: Moves the active tab into a new pop-up window.
*   `move-tabs-between-windows`: Moves all the selected tabs into the next window,
    as defined by the order that the windows were created.  This skips over
    other pop-up type windows. If the active tab is itself in a pop-up type
    window then it is moved into a regular tab in the next window.
*   `toggle-pinned`: Toggles the pinned state of all the selected windows.

You can select multiple tabs by holding down Shift or Ctrl while clicking on tabs.

A pop-up window does not have the tab or URL bars, and can only hold one tab.

To update the keybindings, visit the chrome://extensions/shortcuts page and look for the tab-shortcuts extension.

## TODO list

*   Prevent moving tabs to windows that are off-screen (e.g., in a different workspace).
*   Move tabs to next window, but keep focus on current window.
*   Support selecting tabs to left or right.
*   Move to left/right tab, but keep existing selection.
*   New tab to the right.
*   Support Tab Group operations:
    *   Move tab into new Tab Group.
    *   Move Tab Group left/right/new window.
    *   Move Tab Group to beginning/end of window.
    *   Move tab into next/previous Tab Group.
    *   Remove tab from group.
    *   Select next/previous Tab Group.

For consideration:

*   Keep track of tab position before move and allow for undo motion.

## Developing

The source code is in the `tab-shortcuts` subdirectory, including the manifest
and javascript files.  To make a release, run `bash make-release.sh` in the
top-level directory.  This will put a new zip file into a `releases`
subdirectory, including the version extracted from the manifest.

To update the version number, edit the `version` field in `manifest.json`.
This is required before uploading a new version to the Chrome Web Store.

Note that `make-release.sh` requires that the `jq` command be installed (which
is used for parsing the JSON-based manifest file).

## Acknowledgements

Thanks to Kenneth LU for making the
[QuickShift Redux](https://github.com/luyangkenneth/quickshift-redux)
Chrome Extension that I used as the starting point for this extension.
