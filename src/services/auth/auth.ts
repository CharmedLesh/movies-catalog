export class Auth {
    static createRequestToken = () => {
        const options = {
            method: 'POST',
            headers: { accept: 'application/json', 'content-type': 'application/json' }
        };

        fetch('https://api.themoviedb.org/4/auth/request_token', options)
            .then((response) => response.json())
            .then((response) => console.log(response))
            .catch((err) => console.error(err));
    };
}
