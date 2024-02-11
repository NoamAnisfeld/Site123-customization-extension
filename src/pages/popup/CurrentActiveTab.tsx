import { getActiveTabLocation } from "@root/src/shared/activeTabTracker";
import { useEffect } from "react";
import { useState } from "react";

export default function CurrentActiveTab() {

    const [activeTabLocation, setActiveTabLocation] = useState<Location>();
    
    useEffect(() => {
        getActiveTabLocation().then(location => {
            if (location && location.href !== activeTabLocation?.href) {
                setActiveTabLocation(location);
            }
        }
        );
    });

    return (
        <p>
            <strong>Current active tab is: </strong>{activeTabLocation?.href || 'unknown'}
        </p>
    );
}