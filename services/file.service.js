const fs = require("fs/promises");
const path = require("path");

const dbFilePath = path.join(process.cwd(), 'dataBase', 'cats.json');
module.exports = {
    reader: async () => {
        try {
            const data = (await fs.readFile(dbFilePath))
                .sort((a, b) => a.id - b.id);

            return data.toString() ? JSON.parse(data.toString()) : [];
        } catch (e) {
            console.log(e);
        }

    },
    writer: async (cats) => {
        try {
            await fs.writeFile(dbFilePath, JSON.stringify(cats));
        } catch (e) {
            console.log(e);
        }
    }
};