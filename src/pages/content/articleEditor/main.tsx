export {}

function catchEditorIFrame(iFrames: HTMLIFrameElement[]) {

    for (const frame of iFrames) {

        frame.addEventListener('load', () => {
            try {
                if (frame.contentWindow.location.href.startsWith(
                    'https://app.site123.com/versions/2/wizard/modules/articles/addItem.php'
                )) {
                    frame.contentWindow.document.body.style.backgroundColor = 'lime';
                }
            } catch (e) {
                // probably cross-origin, just skip that frame
            }
        });
    }
}

const initialIFrames = document.querySelectorAll('iframe');
catchEditorIFrame([...initialIFrames]);


function detectNewIFrames(mutationList: Parameters<MutationCallback>[0]) {

    const iFrames: HTMLIFrameElement[] = [];

    for (const mutation of mutationList) {
        for (const node of mutation.addedNodes) {
            if (node instanceof HTMLIFrameElement) {
                iFrames.push(node);
            }
        }
    }

    return iFrames;
}

const mutationCallback: MutationCallback = (mutationList) => {

    const iFrames = detectNewIFrames(mutationList);
    catchEditorIFrame(iFrames);
}

const observer = new MutationObserver(mutationCallback);
observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
});