import { CoverFlowPage } from '@/_pages/CoverFlowPage';

const Page = ({ params }: { params: { index?: string } }) => (
    <CoverFlowPage index={params.index} />
);

export default Page;
