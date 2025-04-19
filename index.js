const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
  
const Aluno = require("./Aluno");
const aluno1 = new Aluno( 1, "Rafael", "Licenciatura");
const aluno2 = new Aluno( 2, "Rafaela", "Matemática");
const aluno3 = new Aluno( 3, "Rafaely", "ciencia");

 
//isso é um vetor
const alunos = [aluno1, aluno2, aluno3];

//mostra uma  mensagem de cadastrado com sucesso s=1
app.get('/alunos/', function(req,res){
    const status = req.query.s;
    res.render('aluno/relatorio', {alunos, status});
});

//metodo post
app.post('/alunos', function(req,res){
    const{matricula, nome, curso}=req.body;
    alunos.push(new Aluno(matricula, nome, curso));
    res.redirect('/alunos?s=1'); 
});


//metodo cadastrar alunos
app.get("/alunos/cadastrar", function(req, res){
    res.render('aluno/cadastrar')
    });

//serve para exibir os alunos 
app.get('/alunos/:matricula?',function(req, res){
    const matricula = req.params.matricula;
    if (matricula == undefined) {
        //renderizar todos os alunos
            res.render('aluno/relatorio',{alunos});
                                // esse alunos da chave é o nome do vetor
    }else{
       //renderizar os alunos respectivos
        const aluno = alunos.find(aluno=> aluno.matricula == matricula);
        res.render('aluno/detalhe', {aluno});
                        // mudou pois agora está dentro de uma pasta -a rota não é o mesmo que o  nome do arquivo
    }
});



//para carregar  os dados de um aluno especifico



//passagem de dados do back-end para o front-end
app.get("/", function (req, res){
    const pessoa = {
        nome:"Rafael",
        curso: "Computação"
    };
    res.render("index", {pessoa});
});



//para quando acessar uma página errada ele ser direcionado para outra (pagina 404)
app.use(function(req,res){
    res.status(404).render("404");
});

// listen sepre deve ficarpor ultimo
app.listen('999', function(){
    console.log('Rodando...')
});



