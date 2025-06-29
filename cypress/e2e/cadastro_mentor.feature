Funcionalidade: Cadastro de Usuário como Mentor

Cenário: Usuário cadastra-se como mentor com sucesso
Dado que estou logado no sistema com o email e senha cadastrados anteriormente
E acesso a página de cadastro de mentor
Quando preencho o campo preço com "100"
E preencho o campo minutos com "30"
E preencho o campo quantidade com "5"
E preencho o campo biografia com um texto válido
E preencho o campo currículo com um texto válido
E clico no botão "Cadastrar"
Então devo ver uma mensagem de sucesso
E devo ser redirecionado para a página de busca de mentores
