const MOBILE_REGEXP =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

export const isMobileAgent = () =>
    'userAgent' in navigator && MOBILE_REGEXP.test(navigator.userAgent);
