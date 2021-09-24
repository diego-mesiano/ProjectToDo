//Função para baixar o session storage e trazer para as variaveis do JS
export function baixarStorage() {
    cadastradosStr = localStorage.getItem("@CADASTRADOS");
    cadastradosJSON = JSON.parse(cadastradosStr);
}

//Função para subir as variaveis para o session storage
function subirStorage() {
    cadastradosStr = JSON.stringify(cadastradosJSON);
    localStorage.setItem("@CADASTRADOS", cadastradosStr);
}

//função para setar todos os elementos do array para 0
let zerarArray = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = 0;

    }
}

//função para mostrar usuarios cadastrados no sistema
let mostrarUsuarios = () => {
    let padrao = document.getElementById("padrao");

    cadastradosStr = localStorage.getItem("@CADASTRADOS");
    cadastradosJSON = JSON.parse(cadastradosStr);

    if (cadastradosJSON.logado.length == 0) {
        //se não tem usuarios cadastrados
        padrao.innerHTML = "Não há usuarios Cadastrados"
    } else {
        //se encontrou usarios cadastrados
        padrao.innerHTML = "";
        for (let i = 0; i < cadastradosJSON.logado.length; i++) {
            padrao.innerHTML += `
            <div class="users" id="users${i}">
                <div class="a">
                    <a href="#" class= "inicial" id="inicial${i}" onclick="clique=[${i},'l']; acoes(${i});">
                        <strong class="letra">${cadastradosJSON.nome[i][0].toUpperCase()}</strong><br>
                    </a>
                </div>
                <div class="b">
                    <div class="c">
                        <strong class="nome">${cadastradosJSON.nome[i]}</strong>
                        <button class="log" id="log${i}" onclick="clique=[${i},'l']; acoes(${i});">Logar</button>
                        <button class="del" id="del${i}" onclick="clique=[${i},'d']; acoes(${i});">Apagar</button>
                    </div>
                    <strong class="email">${cadastradosJSON.email[i]}</strong>
                </div>`
        }
    }
}
//função responsavel por mostrar apenas os imputs de login
function mostrarLogin(){
    document.getElementById("nome").style.display = "none";
    document.getElementById("csenha").style.display = "none";
    document.getElementById("enviar").style.display = "none";
    document.getElementById("login").style.display = "initial";
}

//variavel que armazena qual indice sera manipulado da lista de usuarios cadastrados ao clicar nos botoes excluir ou logar
let clique = [];

//variavel para armazenzar o Local Storage em formado js
export let cadastradosJSON = {
    nome: [],
    email: [],
    senha: [],
    logado: [],
    mantido: []
}
//variavel para armazenzar o Local Storage puro (stringficado)
export let cadastradosStr = "";

//Ao carregar a pagina:
window.onload = function(){

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
            console.log("As variaveis locais não foram encontradas e foram criadas!");
            localStorage.setItem("@NOME", "");
            localStorage.setItem("@EMAIL", "");
            sessionStorage.setItem("@LOGADO", 0);
            localStorage.setItem("@MANTER", 0);
            localStorage.setItem("@CADASTRADOS", JSON.stringify(cadastradosJSON));
    }


    //verifica se o usuário esta logado na sessão ou se o usuario manteve a sessão
    if (sessionStorage.getItem("@LOGADO") == 1 || localStorage.getItem("@MANTER") == 1) {
        window.location.href = "./todo.html"
    }

    //se o usuario não esta logado ou mantido continua abaixo

    //mostra os usuarios cadastrados
    mostrarUsuarios();

    //evento de clique no link login
    let login = document.getElementById("lnkLogin");
    login.addEventListener("click", (clique) => {
        clique.preventDefault();
        mostrarLogin();
    })

    //evento de clique no link Cadastre-se
    let c = document.getElementById("lnkCadastrar");
    c.addEventListener("click", (clique) => {
        window.location.reload();
    })

    //evento de clique do botao Criar conta
    enviar.addEventListener("click", (event) => {
        event.preventDefault();
        baixarStorage();
        //verifica se esse email ja foi cadastrado
        function verificarEmailIgual(){
            for(let i = 0;i<cadastradosJSON.email.length;i++){
                if (cadastradosJSON.email[i]==email.value)
                    return true;
                else
                    return false;
            }
        }
        //- valida os campos
        if(verificarEmailIgual()){
            alert("Usuario já cadastrado, que tal fazer login?");
            mostrarLogin();
            senha.focus();
        }else if (pass.value != passC.value) {
            alert("Senhas não conferem!");
            pass.value = "";
            passC.value = "";
            pass.focus();

        } else if (pass.value.length < 6) {
            alert("Senhas devem ter no minimo 6 caracteres!")
            passC.value = "";
            pass.focus();
        } else if (nome.value == "" || nome.value.length < 2) {
            alert("Digite um nome válido, deve ser maior que 2 caracteres");
            nome.focus();
        } else if (email.value == "" || email.value.length < 5) {
            alert("Digite um e-mail válido, deve ser maior que 5 caracteres");
            email.focus();
        }
        else{
            //aqui ja esta tudo validado
            //retirando os espaços no inicio e no final antes de aramzenar no local Storage
            nome.value = nome.value.trim();
            email.value = email.value.trim();
            //armazenar os dados na session storage 
            localStorage.setItem("@NOME", nome.value);
            localStorage.setItem("@EMAIL", email.value);
            sessionStorage.setItem("@LOGADO", 1);
            cadastradosStr = localStorage.getItem("@CADASTRADOS");
            cadastradosJSON = JSON.parse(cadastradosStr);
            //checa se o checkbox manter sessão foi checado
            if (document.getElementById("manter").checked) {
                localStorage.setItem("@MANTER", 1);
                zerarArray(cadastradosJSON.mantido);
                cadastradosJSON.mantido.push(1);
            } else {
                cadastradosJSON.mantido.push(0);
            }

            //adiciona o usuário na array js
            cadastradosJSON.nome.push(nome.value);
            cadastradosJSON.email.push(email.value);
            cadastradosJSON.senha.push(senha.value);
            zerarArray(cadastradosJSON.logado);
            cadastradosJSON.logado.push(1);

            subirStorage();

            //- mostrar a proxima pagina
            window.location.reload();
        }
    })

    //Evento do clique do botão de login
    document.getElementById("login").addEventListener("click", function (logou) {
        logou.preventDefault();
        baixarStorage();
        console.log(cadastradosJSON)
        //verifica se encontra o email cadastrado
        var e = "";
        for (let i = 0; i < cadastradosJSON.email.length; i++) {
            if (cadastradosJSON.email[i] == email.value) {
                //se encontrar armazena os dados que serao usados
                e = cadastradosJSON.email[i];
                var s = cadastradosJSON.senha[i];
                var p = i;

            }
        }
        if (e == "") {
            //verifica se o email foi encontrado
            alert('Email não encontrado, que tal se cadastrar?');
            email.focus();
        } else if (cadastradosJSON.senha[p] != senha.value) {
            //verifica se as senhas batem
            alert('Senha inválida');
            senha.value = "";
            senha.focus();
        } else {
            //se entrou aqui é porque a senha e o usuario estao corretos
            //armazenar os dados no storage 
            localStorage.setItem("@NOME", cadastradosJSON.nome[p]);
            localStorage.setItem("@EMAIL", cadastradosJSON.email[p]);
            sessionStorage.setItem("@LOGADO", 1);
            //verifica se o botao manter sessao foi checado
            if (document.getElementById("manter").checked) {
                localStorage.setItem("@MANTER", 1);
                zerarArray(cadastradosJSON.mantido);
                cadastradosJSON.mantido.push(1);
            } else {
                cadastradosJSON.mantido.push(0);
            }
            window.location.reload();
        }
    })

}











