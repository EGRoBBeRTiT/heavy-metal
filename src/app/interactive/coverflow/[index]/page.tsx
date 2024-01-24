import { CoverFlowPage } from '@/_pages/CoverFlowPage';

const Page = ({ params }: { params: { index?: string } }) => (
    <CoverFlowPage albumId={params.index} />
);

export default Page;
