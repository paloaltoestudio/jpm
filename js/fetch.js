async function fetchChcrime() {
    try {
        const response = await fetch('info4.json');
        const chrime = await response.json();
        return chrime;
    } catch (error) {
        return [null, error];
    }
}