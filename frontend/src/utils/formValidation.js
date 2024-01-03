export const validation=(data)=> {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^[a-z,0-9]{3,5}$/;
    const error = {};
  
    if (data.name.trim() === "") error.name = `Name required`;
    if(data.email.trim()==="") error.email = 'Email required'
    else if (!emailRegex.test(data.email)) error.email = "Email not valid";
    if(data.password.trim() === '') error.password='Password required'
    else if (!passwordRegex.test(data.password)) error.password = "password too short";
    if(data.cPassword != data.password || data.cPassword.trim()==='') error.cPassword= 'Enter correct password'
  
    return error;
  }
  export const loginValidation=(data)=>{
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^[a-z,0-9]{3,5}$/;
    const error = {};
  
  
    if(data.email.trim()==="") error.email = 'Email required'
    else if (!emailRegex.test(data.email)) error.email = "Email not valid";
    if(data.password.trim() === '') error.password='Password required'
    else if (!passwordRegex.test(data.password)) error.password = "password too short";
  
    return error;
  }