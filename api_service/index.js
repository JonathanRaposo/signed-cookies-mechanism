
const fs = require('fs');
const path = require('path');

let users;
try {
    users = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'db', 'users.json'), 'utf-8'));
} catch (err) {
    console.log('Error reading users:', err);
    users = [];

}

class ApiService {
    constructor() {
        this.data = users;
    }
    find(options = {}) {
        const { id, username, email } = options;

        if (!id && !username && !email) {
            return this.data;
        }
        const matchedUsers = [];
        for (let user of this.data) {
            let isMatch = false;
            if ((id && user.id === id) || (email && user.email === email) || (username && user.username === username)) {
                isMatch = true;
            }

            if (isMatch) {
                matchedUsers.push(user);
            }

        }
        return matchedUsers;
    }
    findOne(options = {}) {
        const { id, username, email } = options;

        if (!id && !username && !email) return this.data;

        for (let user of this.data) {
            if ((id && user.id === id) || (email && user.email === email) || (username && user.username === username)) {
                return user;
            }

        }
        return null;

    }

}
module.exports = ApiService;