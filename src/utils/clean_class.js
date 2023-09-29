function cleanClass(classList){
    return classList.replaceAll(/\s\s+/g, ' ').trim()
}

export default cleanClass