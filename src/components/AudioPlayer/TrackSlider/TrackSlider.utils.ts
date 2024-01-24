export const convertNumberToTimeString = (time: number) => {
    const minuteString = `0${Math.floor(time / 60)}`.slice(-2);
    const secondsString = `0${Math.round(time % 60)}`.slice(-2);

    return `${minuteString}:${secondsString}`;
};
