import cn from 'classnames';

import { cloisterBlack } from '@/styles/fonts';

const Title = ({ className }: { className?: string }) => (
    <h1 className={cn(className, cloisterBlack.className)}>
        The Best Rock &apos;n&apos; Roll Albums
    </h1>
);

export default Title;
