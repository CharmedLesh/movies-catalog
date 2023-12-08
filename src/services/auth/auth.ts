export class Auth {
    static createRequestToken = () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMGVkNmRkZTYxYTU5NThjYjhhMTEyYTYxOWJiYjY4NCIsInN1YiI6IjY1NzMxMjBkNTViYzM1MDBhZDQ1YWRlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EVPIU1Y8LCDvdNnrZBvaX1M4OzK4UtnQqtFSN21Tx8o'
            }
        };

        fetch('https://api.themoviedb.org/3/authentication/token/new', options)
            .then((response) => response.json())
            .then((response) => console.log(response))
            .catch((err) => console.error(err));
    };
}
