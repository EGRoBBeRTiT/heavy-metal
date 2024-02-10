import type { Metadata } from 'next';

import { generateMetadata as generateCoverflowMetadata } from '@/app/interactive/coverflow/page';
import { CoverFlowPage } from '@/_pages/CoverFlowPage';
import type { SearchParams } from '@/types/SearchParams.types';

export function generateMetadata(props: SearchParams): Promise<Metadata> {
    return generateCoverflowMetadata(props);
}

const Page = () => <CoverFlowPage />;

export default Page;
