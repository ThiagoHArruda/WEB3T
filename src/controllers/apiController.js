// importar modelo
const PI = require('../models/PImodel');
const DT = require('../models/DTmodels');
 
//-----------NEW ACCOUNT------------------------
  exports.newAccount = function(req, res, next){
    res.render('newAccount');
  };
  exports.newAccountRegister = function(req,res,next){
    const {email, password} = req.body;
    let erro = [];

    if(!email || !password){
      erro.push({Message: "Preencha todos os campos"})
    }
    if(password && password.length<3){
      erro.push({Message: "Senha curta demais"})
    }
    if(erro.length>0){
      console.log(erro[0]);
      res.render('newAccount', {erro})

    }
    else{
      PI.findOne({user: email})
        .then((user)=>{
          if(user){
            erro.push({Message:"Conta já existente"})
            res.render('newAccount', {erro})

          }
          else{
            let newUser = {
              user: email,
              password: password
            }
            console.log(newUser);
            PI.create(newUser).then((pi)=>{
              let message = "Cadastrado com sucesso"
              res.render('index', {message})
            })
          }
        })
    }
  }
  

///-----------END NEW ACCOUNT------------------

///----------LOGIN----------------------------
exports.login = function (req, res) {
  if(req.cookies && req.cookies.user){
    res.render('main');
  }
  res.render('index');
};

exports.loginAcess = function (req,res,next){
    const {email, password} = req.body;
  
    if(!email || !password){
      erro = "Preencha todos os campos";
      res.render("index", {erro});
    }
    
    else{
      
      PI.findOne({user: email})
        .then((user)=>{
          if(password == user.password){
            message = "Login Feito com Sucesso";
            if(user.user=="1@1"){
              let admin = true;
              res.cookie('user', user.user)
              res.render('main', {admin, message})
            }
            else{
              let admin = false;
              res.cookie('user', user.user)
              res.render('main', {admin, message})
            }
            
          }
          else{
            erro = "Dados errados";
            res.render("index", {erro})
          }
        })
    }
}
// LOGOUT
exports.logout = function(req, res, next){
  const logout = "Logout feito com sucesso";
  res.clearCookie('user')

  res.render('index', {logout})
}
//-----------------FIM LOGIN------------------
//----------------MAIN------------------------
exports.main = function(req,res,next){
  DT.find({}).then(function (dt){
    res.render("main", {dts: dt})
  })
}
//===========fim do main------------------

//------------CONTENT---------------------
exports.content = function(req,res,next){
    DT.find({}).then(function (dt){
      res.render("content", {dts: dt})
    })
  }
  exports.newContent = function(req, res, next){
    const{title, image} = req.body;
    let erro;
  
  
    if(!title || !image){
      erro ="Preencha todos os campos"
    }
    if(erro){
      console.log(erro);
      res.render('content', {erro})
    }
    else{
      let create = {
        title: title,
        image: image
      }
      DT.create(create).then((content)=>{
        let message = {
          message: "Conteúdo criado com sucesso",
          url: '/api/content'
        }
      
        res.render('message', {message});
      })
    }
  }
  exports.deleteContent = function(req,res,next){
   DT.findOneAndDelete({_id: req.params.id}).then((content)=>{
    let message = {
      message: "Conteúdo deletado com sucesso",
      url: '/api/content'
    }
  
    res.render('message', {message});
   }).catch(next)
  }
  exports.updateContentPage = function(req,res,next){
    DT.findOne({_id: req.params.id}).then((content)=>{
    let update = true
    let dts = {
      id: content._id,
      title: content.title,
      url: content.url
    }
    res.render('message', {update, dts});
    }).catch(next)
   }
   exports.updateContent = function(req,res,next){
    DT.findByIdAndUpdate({_id: req.params.id}, req.body).then((content)=>{
      let update = false;
      let message = {
        message: "Conteúdo atualizado com sucesso",
        url: '/api/content'
      }
    
    res.render('message', {update, message});
    }).catch(next)
   }
  //----------------FIM CONTENT---------------------