import { type NextRequest, NextResponse } from 'next/server';

import {
    GITBOOK_API_URL,
    GITBOOK_APP_URL,
    GITBOOK_ASSETS_URL,
    GITBOOK_DISABLE_TRACKING,
    GITBOOK_INTEGRATIONS_HOST,
    GITBOOK_URL,
    GITBOOK_USER_AGENT,
} from '@v2/lib/env';

/**
 * Output the public environment variables for this deployment
 */
export async function GET(_req: NextRequest) {
    return NextResponse.json({
        GITBOOK_URL,
        GITBOOK_APP_URL,
        GITBOOK_API_URL,
        GITBOOK_ASSETS_URL,
        GITBOOK_USER_AGENT,
        GITBOOK_INTEGRATIONS_HOST,
        GITBOOK_DISABLE_TRACKING,
    });
}
