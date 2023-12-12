export const getRequestTokenFromUrl = (): string | null => {
    const url = window.location.href;
    const urlSearchParams = new URLSearchParams(new URL(url).search);
    const requestToken = urlSearchParams.get('request_token');

    return requestToken;
};
