function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function getRandom(num) {
    return (Math.floor(Math.random() * num))
}

const helpers = {
    wait,
    getRandom
}

export default helpers