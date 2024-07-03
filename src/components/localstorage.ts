const saveDataToLocalStorage = (keyname: string, data: any, json: boolean = false) => {
    localStorage.setItem(keyname, json ? JSON.stringify(data) : data);
}

const removeDataFromLocalStorage = (keyname: string) => {
    localStorage.removeItem(keyname);
}

const getDataFromLocalStorage = (keyname: string) => {
    const data: any = localStorage.getItem(keyname);
    try {
        const parsedJson = JSON.parse(data);
        return parsedJson;
    } catch (error) {
        return data;
    }
}

const clearLocalStorage = () => {
    localStorage.clear();
}

export {
    saveDataToLocalStorage,
    removeDataFromLocalStorage,
    getDataFromLocalStorage,
    clearLocalStorage
}