import type { Metadata } from 'next';

import { FullScreenPage } from '@/_pages/FullScreenPage/FullScreenPage';
import type { SearchParams } from '@/types/SearchParams.types';
import { generateAlbumMetadata } from '@/utils';

export function generateMetadata(props: SearchParams): Promise<Metadata> {
    return generateAlbumMetadata(props);
}

const Page = () => <FullScreenPage />;

export default Page;
