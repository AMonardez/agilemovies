export default async function apilogin(username, password) {
    let ok=false;
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
       };
       let bodyContent = JSON.stringify({
           "username": username,
           "password": password
       });
       const resp = await fetch("http://161.35.140.236:9005/api/auth/login", { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       })
       .then((response) => response.json())
       .then( (res)=>{
        //console.log("response",res);
        window.localStorage.clear();
        if(res.data!==undefined) ok=true;
            window.localStorage.setItem('firstName', res.data.user.firstName);
            window.localStorage.setItem('lastName', res.data.user.lastName);
            window.localStorage.setItem('email', res.data.user.email);
            window.localStorage.setItem('token', res.data.payload.token);
            window.localStorage.setItem('refreshToken', res.data.payload.refresh_token);
       })
       .catch(
           (e)=>{console.log("catch e");}
       );
       return ok;
       
}