import filesystem from 'fs';

const guardarJson = async (filename, data) => {
    const file = `./data/${filename}.json`
    try {
        await filesystem.promises.writeFile(file, JSON.stringify(data, null, 2));
        console.log(`Data saved to ${filename}`);
    } catch (error) {
        console.error(`Error saving data to ${filename}:`, error);
    }
};

export default guardarJson