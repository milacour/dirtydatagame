function setLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Fejl ved lagring af data i local storage:", error);
    }
}

function getLocalStorage(key) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error("Fejl ved hentning af data fra local storage:", error);
        return null;
    }
}

export{ setLocalStorage, getLocalStorage}
