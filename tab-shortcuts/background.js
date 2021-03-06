'use strict';

chrome.commands.onCommand.addListener(function(command) {
  let numTabsInCurrentWindow;
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    numTabsInCurrentWindow = tabs.length;
  });

  switch (command) {
    case 'move-tabs-left':
      processHighlightedTabs(function(tabs) {
        for (let i = 0; i < tabs.length; i++) {
          moveOneTabInDirection(tabs[i], -1);
        }
      });
      break;

    case 'move-tabs-right':
      processHighlightedTabs(function(tabs) {
        for (let i = tabs.length - 1; i >= 0; i--) {
          moveOneTabInDirection(tabs[i], 1);
        }
      });
      break;

    case 'undock-tabs-to-new-window':
      undockTabsToNewWindow();
      break;

    case 'undock-tab-to-popup-window':
      undockTabToPopupWindow();
      break;

    case 'move-tabs-between-windows':
      moveTabsBetweenWindows();
      break;

    case 'toggle-pinned':
      togglePinned();
      break;
  }

  function undockTabsToNewWindow() {
    let activeTab;
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
      activeTab = tabs[0];
    });

    processHighlightedTabs(function(tabs) {
      let firstTab = tabs[0];
      let properties = {tabId: firstTab.id};

      chrome.windows.create(properties, function(window) {
        chrome.tabs.update(firstTab.id, {pinned: firstTab.pinned});
        tabs.shift();
        if (tabs.length > 0) {
          chrome.tabs.move(
              tabs.map(tab => tab.id), {windowId: window.id, index: 1});
          // Re-pin previously pinned tabs.
          tabs.forEach(tab => chrome.tabs.update(tab.id, {pinned: tab.pinned}));
          chrome.tabs.update(activeTab.id, {active: true});
        }
      });
    });
  }

  function undockTabToPopupWindow() {
    // Call 'update' with an empty properties object to get access to the
    // current tab (given to us in the callback function).
    chrome.tabs.update({}, function(tab) {
      let properties = {tabId: tab.id, type: 'popup'};
      chrome.windows.create(properties, function(window) {});
    });
  }

  function moveTabsBetweenWindows() {
    chrome.windows.getAll({populate: true}, function(windows) {
      chrome.windows.getCurrent(function(currentWindow) {
        let nextWindow = getNextNormalWindow(windows, currentWindow);

        if (nextWindow.id == currentWindow.id) {
          undockTabsToNewWindow();
          return;
        }

        processHighlightedTabs(function(tabs) {
          chrome.tabs.query(
              {currentWindow: true, active: true}, function(activeTabs) {
                let activeTab = activeTabs[0];
                chrome.tabs.move(
                    tabs.map(tab => tab.id),
                    {windowId: nextWindow.id, index: nextWindow.tabs.length});
                // Re-pin previously pinned tabs.
                tabs.forEach(
                    tab => chrome.tabs.update(tab.id, {pinned: tab.pinned}));
                chrome.tabs.update(activeTab.id, {active: true});
                chrome.windows.update(nextWindow.id, {focused: true});
              });
        });
      });
    });
  }

  function getNextNormalWindow(windows, currentWindow) {
    let currentWindowIndex =
        windows.map(window => window.id).indexOf(currentWindow.id);
    let nextWindowIndex = currentWindowIndex;
    let nextWindow = null;

    do {
      nextWindowIndex++;
      if (nextWindowIndex >= windows.length) nextWindowIndex = 0;
      nextWindow = windows[nextWindowIndex];
    } while (nextWindow.type != 'normal' &&
             nextWindowIndex != currentWindowIndex);

    return nextWindow;
  }

  // Toggles the pinned state of the active tab, and makes all the
  // other highlighted tabs match this pinned state.
  function togglePinned() {
    processHighlightedTabs(function(tabs) {
      let activeIndex = tabs.findIndex((tab) => {
        return tab.active;
      });
      if (tabs[activeIndex].pinned) {
        // Need to go backwards to avoid reversing tab order.
        tabs.slice().reverse().forEach((tab) => {
          chrome.tabs.update(tab.id, {'pinned': false});
        })
      } else {
        tabs.forEach((tab) => {
          chrome.tabs.update(tab.id, {'pinned': true});
        })
      }
    });
  }

  function processHighlightedTabs(callback) {
    chrome.tabs.query({currentWindow: true, highlighted: true}, callback);
  }

  function moveOneTabInDirection(tab, direction) {
    let index = tab.index + direction;
    if (index >= numTabsInCurrentWindow) {
      index = numTabsInCurrentWindow - 1;
    } else if (index < 0) {
      index = 0;
    }

    chrome.tabs.move(tab.id, {index: index});
  }
});
