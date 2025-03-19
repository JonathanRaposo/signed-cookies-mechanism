
module.exports = () => {
    return (req, res, next) => {

        const contentType = req.headers['content-type'];
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {

            try {
                if (body) {
                    if (contentType === 'application/x-www-form-urlencoded') {
                        const urlParams = new URLSearchParams(body);
                        req.body = Object.fromEntries(urlParams);
                    } else if (contentType === 'application/json') {
                        req.body = JSON.parse(body);
                    }
                } else {
                    req.body = {};
                }
                next()
            } catch {
                console.log('Error parsing form data:', err)
            }

        });
    }
}