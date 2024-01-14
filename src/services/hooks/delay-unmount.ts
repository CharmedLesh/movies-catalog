import { useEffect, useState } from 'react';

export const useDelayUnmount = (isMounted: boolean, delayTime: number) => {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isMounted && !shouldRender) {
            setShouldRender(true);
        } else if (!isMounted && shouldRender) {
            timer = setTimeout(() => setShouldRender(false), delayTime);
        }

        return () => clearTimeout(timer);
    }, [isMounted, delayTime, shouldRender]);
    return shouldRender;
};
