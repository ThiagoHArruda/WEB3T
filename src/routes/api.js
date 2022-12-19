const express = require ('express');
const router = express.Router();


// importa controlador 'apiController.js' da pasta: 
// ‘../controllers/apiController’
const apiController = require('../controllers/apiController');
// url do index será: http://localhost:5000/api/login
router.get('/login', apiController.login);
//TODO: Acesso ao login
router.post('/login/acess', apiController.loginAcess)
//TODO: Logout
router.get('/logout', apiController.logout)

//TODO: Render novo usuário
router.get('/newAccount', apiController.newAccount)

//TODO: Adicionar novo usuário
router.post('/newAccount/register', apiController.newAccountRegister)

//TODO: Entrando na main
router.get('/main', apiController.main)

//CONTENT: Pagina criar conteudo
router.get('/content', apiController.content)
//CONTENT: Criando conteúdo no banco
router.post('/content/newContent', apiController.newContent)
//CONTENT: Deletar conteúdo do banco
router.get('/delete/:id', apiController.deleteContent)
//CONTENT: Update do conteúdo selecionado
router.post('/update/:id', apiController.updateContent)
router.get('/updatePage/:id', apiController.updateContentPage)


module.exports = router;