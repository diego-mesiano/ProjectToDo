//função que cria uma tela preta no fundo e na frente de tudo
function telaPreta() {
    //necessario setar no css *{z-index: 1;} 
    let div = document.createElement("div");
    document.body.appendChild(div);
    //div.style.zIndex = 100;
    document.querySelector("main").style.display = "none";
    div.style.minHeight = "100vh";
    div.style.minWidth = "100%";
    div.style.backgroundColor = "black";
    // div.style.display = "absolut";
    //div.style.top = "0";
}
//função para setar todos os elementos do array para 0
let zerarArray = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = 0;

    }
}

//função para mostrar usuarios cadastrados
let mostrarUsuarios = () => {
    let padrao = document.getElementById("padrao");

    cadastradosStr = localStorage.getItem("@CADASTRADOS");
    cadastradosJSON = JSON.parse(cadastradosStr);



    if (cadastradosJSON.logado.length == 0) {
        padrao.innerHTML = "Ainda não há usuarios Cadastrados"
    } else {
        padrao.innerHTML = "";
        for (let i = 0; i < cadastradosJSON.logado.length; i++) {
            padrao.innerHTML += `
                <div class="users" id="users${i}">
                    <div class="a">
                        <strong class="letra">${cadastradosJSON.nome[i][0].toUpperCase()}</strong><br>
                    </div>
                    <div class="b">
                        <strong class="nome">${cadastradosJSON.nome[i]}</strong>
                        <strong class="email">${cadastradosJSON.email[i]}</strong>
                    </div>
                    <button class="log" id="log${i}" onclick="clique=[${i},'l']; acoes(${i});">Logar</button>
                    <button class="del" id="del${i}" onclick="clique=[${i},'d']; acoes(${i});">Apagar</button>
                    
                </div>`
        }
    }
}

let mostrarLogin = () =>{
    document.getElementById("nome").style.display="none";
    document.getElementById("csenha").style.display="none";
    document.getElementById("enviar").style.display="none";
    document.getElementById("login").style.display="initial";
}

//variavel que armazena qual indice sera manipulado da lista de usuarios cadastrados ao clicar nos botoes
let clique = [];


export let cadastradosJSON = {
    nome: [],
    email: [],
    senha: [],
    logado: [],
    mantido: []
}
export let cadastradosStr = "";

//Ao carregar a pagina:
window.onload = () => {

    //variaveis dos inputs
    let nome = document.getElementById("nome");
    let email = document.getElementById("email");
    let pass = document.getElementById("senha");
    let passC = document.getElementById("csenha");
    let enviar = document.getElementById("enviar");

    //- verificar se tem algo no session storage
    if (!localStorage.getItem("@NOME") &&
        !localStorage.getItem("@EMAIL") &&
        !sessionStorage.getItem("@LOGADO") &&
        !localStorage.getItem("@CADASTRADOS") &&
        !localStorage.getItem("@MANTER")) {
        /*Se não:
        - criar variaveis no local storage:
        -nome
        -email
        *essas variaveis serão as variaveis que receberam o login da sessao
        -logado: (padrao:0) 1 sim 0 nao *CASO MANTER LOGIN SEJA ACIONADO
        -UsuariosCadastrados: {nome[],email[],senha[],logado:false}*/
        console.log("As variaveis locais não foram encontradas e foram criadas!");
        localStorage.setItem("@NOME", "");
        localStorage.setItem("@EMAIL", "");
        sessionStorage.setItem("@LOGADO", 0);
        localStorage.setItem("@MANTER", 0);
        localStorage.setItem("@CADASTRADOS", JSON.stringify(cadastradosJSON));
    }


    /* verificar se o logado é sim e
    abre a proxima pagina, se nao nem entra aqui*/
    if (sessionStorage.getItem("@LOGADO") == 1) {
        window.location.href = "./todo.html"
    }

    //mostra os usuarios cadastrados
    mostrarUsuarios();

    //evento de clique no link login
    let login = document.getElementById("lnkLogin");
    login.addEventListener("click",(clique)=>{
        clique.preventDefault();
        mostrarLogin();
    })

    //evento de clique no link Cadastre-se
    let c = document.getElementById("lnkCadastrar");
    c.addEventListener("click",(clique)=>{
        window.location.reload();
    })

    //evento de clique do botao enviar
    enviar.addEventListener("click", (event) => {
        //previne o default
        event.preventDefault();
    
        //- ao preencher o email deve verificar se o usuario ja tem cadastro e sumir com os campos de nome e confirmação de senha.

        //- validar os campos



        //armazenar os dados na session storage 
        localStorage.setItem("@NOME", nome.value);
        localStorage.setItem("@EMAIL", email.value);
        sessionStorage.setItem("@LOGADO", 1);
        cadastradosStr = localStorage.getItem("@CADASTRADOS");
        cadastradosJSON = JSON.parse(cadastradosStr);
        if (document.getElementById("manter").checked) {
            localStorage.setItem("@MANTER", 1);
            zerarArray(cadastradosJSON.mantido);
            cadastradosJSON.mantido.push(1);
        } else {
            cadastradosJSON.mantido.push(0);
        }
        cadastradosJSON.nome.push(nome.value);
        cadastradosJSON.email.push(email.value);
        cadastradosJSON.senha.push(senha.value);
        zerarArray(cadastradosJSON.logado);
        cadastradosJSON.logado.push(1);

        cadastradosStr = JSON.stringify(cadastradosJSON);
        localStorage.setItem("@CADASTRADOS", cadastradosStr);
        window.location.reload();







        //- mostrar a proxima pagina

    })
}











