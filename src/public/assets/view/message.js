export class Message{
    message(message){
        return `<div class="dialog">
        <h1 class="dialog__title">Epic Message</h1>
        <h2 class="dialog__text">${message}</h2>
        <button class="dialog__btn">Confirmar</button>
    </div>`
    }
    closeMessage(){
        const btnMessage = document.querySelector(".dialog__btn");
        btnMessage.addEventListener("click", ()=>{
            const dialog = document.querySelector(".dialog");
            dialog.outerHTML="";
        })
    }
    insertMessage(message){
        const main = document.querySelector("main")
        main.insertAdjacentHTML("afterend",  this.message(message));
       this.closeMessage();
    }
}