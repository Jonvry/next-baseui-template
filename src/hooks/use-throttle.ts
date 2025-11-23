import { useEffect, useState } from "react";

/**
 * Throttles a value change by the specified delay.
 * @param value The value to throttle
 * @param delay Delay in milliseconds
 */
export function useThrottle<T>(value: T, delay = 500): T {
    const [throttledValue, setThrottledValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setThrottledValue(value);
        }, delay);

        // Cancel the timeout if value changes before delay is over
        return () => clearTimeout(handler);
    }, [value, delay]);

    return throttledValue;
}
