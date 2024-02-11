import { updateActiveTabLocation } from "@root/src/shared/activeTabTracker";

window.addEventListener('load', () => {
    updateActiveTabLocation(location);
});

window.addEventListener('focus', () => {
    updateActiveTabLocation(location);
});