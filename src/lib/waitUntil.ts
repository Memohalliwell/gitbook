/**
 * Get a global context object for the current request.
 * This object can be used as a key to store request-specific data in a WeakMap.
 */
export async function getGlobalContext(): Promise<object> {
    if (process.env.NODE_ENV === 'test') {
        // Do not try loading the next-on-pages package in tests as it'll fail
        return globalThis;
    }

    // We lazy-load the next-on-pages package to avoid errors when running tests because of 'server-only'.
    const { getOptionalRequestContext } = await import('@cloudflare/next-on-pages');
    return getOptionalRequestContext()?.ctx ?? globalThis;
}

/**
 * Extend the lifetime of the event handler until the promise is resolved.
 * https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/#contextwaituntil
 */
export async function waitUntil(promise: Promise<unknown>) {
    // We lazy-load the next-on-pages package to avoid errors when running tests because of 'server-only'.
    const { getOptionalRequestContext } = await import('@cloudflare/next-on-pages');

    const cloudflare = getOptionalRequestContext();
    if (cloudflare) {
        cloudflare.ctx.waitUntil(promise);
    } else {
        await promise;
    }
}
