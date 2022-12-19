export class LoginAPI{
    constructor(user,password){
        this.item = { email: user, password: password };
    }
    async login() {
        return new Promise((req,res)=>{
            this.loginAPI(this.item).then((data) => {
                if (data) {
                    const lista = localStorage.getItem('token')
                    if (lista) {
                        req(lista)
                    }
    
                } else {
                    console.log(data);
                }
    
            }).catch((err) => res(err))
        })
    }
     loginAPI(item) {
        return new Promise(req => {
            this.conectaAPI(item).then((data) => {
                if (data.status ==200) {
                     data = data.json()
                    data.then((result) => {
                        localStorage.setItem("token", JSON.stringify(result));
                        req(result);                      
                    })
                }
            }).catch(() => console.log("Falha ao conectar a API"))

        })

    }
    async conectaAPI(item) {
        let result = await fetch("https://reqres.in/api/login", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify(item)
            
        });
        if(result.status==400){
            const mensagem = new Message()
            mensagem.insertMessage("Erro no Login")
        }

        return result
    }
    
}