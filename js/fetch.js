async function fetchChcrime() {
    try {
        const response = await fetch('info3.json');
        const chrime = await response.json();
        return chrime;
    } catch (error) {
        return [null, error];
    }
}