const fs = require("fs/promises");
const path = require("path");

const dbFilePath = path.join(process.cwd(), 'dataBase', 'users.json');

module.exports = {
    read: async () => {
        try {
            const data = await fs.readFile(dbFilePath);
            return data.toString() ? JSON.parse(data.toString()).sort((a, b) => a.id - b.id) : [];
        } catch (e) {
            console.log(e);
        }
    },
    write: async (data) => {
        try {
            await fs.writeFile(dbFilePath, JSON.stringify(data));
        } catch (e) {
            console.log(e);
        }
    }
}
