const getRandomNumber = (max: number = 10) => {
    return Math.floor(Math.random() * max) + 1;
}

export { getRandomNumber }
