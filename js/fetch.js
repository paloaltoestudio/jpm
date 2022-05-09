async function fetchChcrime() {
    try {
        const response = await fetch('info4.json');
        let chrime = await response.json();
        return chrime.PreguntasAndRespuestasList;
    } catch (error) {
        return [null, error];
    }
}