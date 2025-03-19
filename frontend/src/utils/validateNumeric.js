const validateReal = (number)=>{
    if( number === "" )return false;
    if( number[0] === "0" && number.length > 1 && number[1] === "0" ) return false;
    const regexp = /^\d+(\.\d+)?$/;
    return regexp.test(number);
}
const validateInteger = (number) =>{
    if (number === "") return "Enter A Value";
    if (number[0] === "0" && number.length > 1 ) return false;
    // final validate
    const regexp = /^\d+$/;
    return regexp.test(number);
}

export {validateInteger,validateReal};