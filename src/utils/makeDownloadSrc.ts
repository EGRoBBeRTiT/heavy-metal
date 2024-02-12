export const makeDownloadSrc = (href: string) => {
    const a = document.createElement('a');

    a.href = href;
    a.download = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';

    a.click();
    a.remove();
};
