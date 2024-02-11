import type { Metadata } from 'next';

import { CoverFlowPage } from '@/_pages/CoverFlowPage';
import type { SearchParams } from '@/types/SearchParams.types';
import { generateAlbumMetadata } from '@/utils';

export function generateMetadata(props: SearchParams): Promise<Metadata> {
    return generateAlbumMetadata(props);
}

const Page = () => <CoverFlowPage />;

export default Page;
