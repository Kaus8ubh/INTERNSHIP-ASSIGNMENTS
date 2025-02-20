// this file will consist code to perform CRUD operations on books.json file
const fs = require("fs").promises;
const e = require("express");
const path = require("path");

const USERS_FILE = path.join(__dirname, "../data/users.json");

async function loadData() {
    try {
        const data = await fs.readFile(USERS_FILE, "utf8");
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // If file doesn't exist, create it with empty array
            await fs.writeFile(USERS_FILE, '[]');
            return [];
         }
        throw error;
    }
}

async function saveData(data) {
    await fs.writeFile(USERS_FILE, JSON.stringify(data, null, 4));
    console.log(data);
}

class UserDao {
    async getUsers() {
        return await loadData();
    }

    async getUserById(userId) {
        const users = await loadData();
        return users.find(user => user.id === userId);
    }

    async addUser(user) {
        const users = await loadData();
        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            name: user.name,
            possetion:[]
        };
        users.push(newUser);
        await saveData(users);
        return newUser;
    }

    async deleteUser(userId) {
        const users = await loadData();
        const updatedUsers = users.filter(user => user.id !== userId);
        await saveData(updatedUsers);
    }
}

module.exports = new UserDao();