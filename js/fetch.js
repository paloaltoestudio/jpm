async function fetchChcrime() {
    try {
        const response = await fetch('http://127.0.0.1:5500/info.json');
        const chrime = await response.json();
        return chrime;
    } catch (error) {
        return [null, error];
    }
}