export const verifyEmail = (email)=>{
    // console.log(email);
    
    const emailPattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailPattern.test(email);
}
const verifyPassword = (password)=>{
    if( password.length < 8 ) return {msg:'Password Length less than 8',success:false};
    // const uppeReg = /[A-Z]/,owerCase,;
    if( ! (/[A-Z]/.test(password)) ){
        return {msg:'No UpperCase Letter',success:false};
    }
    if( !(/[a-z]/.test(password)) ){
        return {msg:'No LowerCase Letter',success:false};
    }
    if( !(/[0-9]/.test(password)) ){
        return {msg:'No Digit',success:false};
    }
    if( !(/[@#$%^&*]/.test(password)) ){
        return {msg:'No Special Character like @ # $ % ^ & *',success:false};
    }
        return {msg:'Password validation successfull',success:true};
}
export default function verifyRegisterDetails(props){
    const {email,userName,password,confirmPassword,login} = props;
    // console.log(props);
    if( !login && userName === '' ) return { msg: "Provide User Name", success: false };
    if( !verifyEmail(email) ){
        return {msg:"Not a Valid Email",success:false};
    }
    let result = verifyPassword(password);
    if( !result.success ){
        return result;
    }
    if(!login &&  confirmPassword !== password ){
        return { msg: "Confirm Password Not Matching ", success: false };
    }
    return { msg: "Initial Validation Complete", success:true};
}