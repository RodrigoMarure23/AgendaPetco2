import jwtDecode from "jwt-decode"

const isValidToken=(token)=>{
    if(!token){
        return false
    }
    const {exp} =jwtDecode(token)
    console.log("exp ",exp)
    // const currentTime=Date.now()/1000
    // return exp>currentTime
}

const setSession=(token)=>{
    if(token){
        window.localStorage.token=token;
    }else{
        window.localStorage.removeItem("token")
    }
}

const setUserDatatoLS=(data)=>{
    if(data){
        window.localStorage.setItem("data",JSON.stringify(data))
    }else{
        window.localStorage.removeItem("data")
    }
}
export {isValidToken,setSession,setUserDatatoLS}
// 