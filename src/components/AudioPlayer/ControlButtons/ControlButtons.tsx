import cnBind from 'classnames/bind';
import { Button } from '@nextui-org/button';
import { useState, type DetailedHTMLProps, type HTMLAttributes } from 'react';

import { PlayPauseIcon } from '@/components/PlayPauseIcon';
import { useAudioPlayerView } from '@/contexts/AudioPlayerViewProvider';
import { useAudioPlayer } from '@/hooks/context/useAudioPlayer';

import styles from './ControlButtons.module.scss';

const cx = cnBind.bind(styles);

export type ControlButtonsProps = Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'ref' | 'children'
>;

export const ControlButtons = ({
    className,
    ...props
}: ControlButtonsProps) => {
    const [clickedSkip, setClickedSkip] = useState<'prev' | 'next' | ''>('');
    const { handlePrevTrack, handleTogglePlaying, isPlaying, handleNextTrack } =
        useAudioPlayer();

    const { view } = useAudioPlayerView();

    const buttonSize = view === 'mobile' ? 'sm' : 'lg';

    return (
        <div {...props} className={cx('control-buttons', className)}>
            <Button
                onPress={() => {
                    setClickedSkip('prev');
                    void handlePrevTrack();
                }}
                isIconOnly
                variant="light"
                radius="full"
                size={buttonSize}
                className={cx('button', 'prev')}
            >
                <span
                    aria-hidden
                    className={cx('material-symbols-outlined', 'prev-first', {
                        transition: clickedSkip === 'prev',
                    })}
                >
                    skip_previous
                </span>
                <span
                    aria-hidden
                    onTransitionEnd={() => {
                        setClickedSkip('');
                    }}
                    className={cx('material-symbols-outlined', 'prev-last', {
                        transition: clickedSkip === 'prev',
                    })}
                >
                    skip_previous
                </span>
            </Button>
            <Button
                onPress={() => {
                    void handleTogglePlaying();
                }}
                isIconOnly
                role="switch"
                aria-checked={isPlaying}
                variant="light"
                radius="full"
                size={buttonSize}
            >
                <PlayPauseIcon isPlaying={isPlaying} />
            </Button>
            <Button
                onPress={() => {
                    setClickedSkip('next');
                    void handleNextTrack();
                }}
                type="button"
                role="button"
                tabIndex={0}
                isIconOnly
                variant="light"
                radius="full"
                size={buttonSize}
                className={cx('button')}
            >
                <span
                    className={cx('material-symbols-outlined', 'next-first', {
                        transition: clickedSkip === 'next',
                        'no-transition ': clickedSkip !== 'next',
                    })}
                    aria-hidden
                >
                    skip_next
                </span>
                <span
                    className={cx('material-symbols-outlined', 'next-last', {
                        transition: clickedSkip === 'next',
                    })}
                    onTransitionEnd={() => {
                        setClickedSkip('');
                    }}
                    aria-hidden
                >
                    skip_next
                </span>
            </Button>
        </div>
    );
};
