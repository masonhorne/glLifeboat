'use strict';

/**
 * Sleeps for a given period of time
 * @param {number} seconds to sleep for 
 * @returns a preomise to resolve in the provided number of seconds
 */
export async function sleep(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}