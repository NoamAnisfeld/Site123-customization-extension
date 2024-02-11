import { createStorage, StorageType } from './storages/base'

interface TabInfo {
    location: Location | null,
}
const activeTabTracker = createStorage<TabInfo>(
    'activeTab',
    { 
        location: null 
    },
    {
        storageType: StorageType.Session,
        sessionAccessForContentScripts: true,
        liveUpdate: true,
    }
);

export async function updateActiveTabLocation(location: Location) {
    activeTabTracker.set({ location: {...location} });
}

export async function getActiveTabLocation(): Promise<Location | null> {
    return (await activeTabTracker.get()).location;
}