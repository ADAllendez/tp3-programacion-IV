const APi_URL = 'http://localhost:3000/api/auth';

export async function registerUser(data) {
    try{
        const res = await fetch(`${APi_URL}/register`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    
    });
    const result = await res.json();
    return {ok: res.ok, ...result};
    }catch(error){
        console.error("Error al registrar usuario", error);
        return {ok:false, message: "Error de conexión con el servidor"};
    }
}

export async function loginUser(data) {
    try{
        const res = await fetch(`${APi_URL}/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    const result = await res.json();
    return {ok: res.ok, ...result};
    }catch(error){
        console.error("Error al iniciar sesion", error);
        return {ok:false, message: "Error de conexión con el servidor"};
    }
}