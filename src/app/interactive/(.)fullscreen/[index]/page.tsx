import { FullScreenPage } from '@/_pages/FullScreenPage/FullScreenPage';

const Page = ({ params }: { params: { index?: string } }) => (
    <FullScreenPage index={params.index} />
);

export default Page;
