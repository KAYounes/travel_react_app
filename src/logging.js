export function consoleLog(value, {color, fontSize, fontWeight, backgroundColor} = {}){
    // let options = '';
    console.log(`\n%c${value}\n`, `color: ${color}; font-size: ${fontSize}px; font-weight: ${fontWeight}; background-color: ${backgroundColor}`)
}