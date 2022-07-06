export default async function refreshToken() {
    let reftoken = window.localStorage.getItem('refreshToken');
    if(!reftoken) console.log("No token to refresh.");
    else{
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
           };
           let bodyContent = JSON.stringify({
               "refresh_token": reftoken,
           });
           const resp = fetch("http://161.35.140.236:9005/api/auth/refresh", { 
             method: "POST",
             body: bodyContent,
             headers: headersList
           })
           .then((response) => response.json())
           .then( (res)=>{
            console.log("refresh ok");
            window.localStorage.setItem('firstName', res.data.user.firstName);
            window.localStorage.setItem('lastName', res.data.user.lastName);
            window.localStorage.setItem('email', res.data.user.email);
            window.localStorage.setItem('token', res.data.payload.token);
           })
           .catch(
               (e)=>{console.log("catch e");}
           );
    }  
}