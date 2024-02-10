import type { Metadata } from 'next';

import { generateMetadata as generateFullscreenMetadata } from '@/app/interactive/fullscreen/page';
import { FullScreenPage } from '@/_pages/FullScreenPage/FullScreenPage';
import type { SearchParams } from '@/types/SearchParams.types';

export function generateMetadata(props: SearchParams): Promise<Metadata> {
    return generateFullscreenMetadata(props);
}

const Page = () => <FullScreenPage />;

export default Page;
