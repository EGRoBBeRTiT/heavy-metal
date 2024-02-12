export const getBase64FromSrc = (src: string) => {
    const image = document.createElement('img');

    image.loading = 'eager';
    image.decoding = 'sync';
    image.src = src;

    const canvas = document.createElement('canvas');

    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(image, 0, 0);
    const dataURL = canvas.toDataURL('image/webp');

    image.remove();
    canvas.remove();

    return dataURL;
};
