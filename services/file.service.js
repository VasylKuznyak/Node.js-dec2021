const fs = require("fs/promises");
const path = require("path");

module.exports = {
    read: async () => {
        try {
            const data = await fs.readFile(path.join(process.cwd(), 'dataBases', 'users.json'));
            data.toString() ? JSON.parse(data.toString()) : [];
        } catch (e) {
            console.log(e);
        }
    },
    write: async (data) => {
        try {
            await fs.writeFile(path.join(process.cwd(), 'dataBases', 'users.json'), JSON.stringify(data));
        } catch (e) {
            console.log(e);
        }
    }
}
