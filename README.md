# Desafio 2 - Gestão de Cadastros

## Entregáveis

* Os dados de clientes, endereços e produtos devem estar devidamente estruturados;
* Dados no localStorage;
* Código fonte no GitHub com arquivo README detalhando as funcionalidades da programação.
---
## Projeto
### Ferramentas utilizadas

* ReactJS (create-react-app);
    * styled-components;
    * react-icons;
    * react-input-mask;
    * uuid;
    * localStorage.
---
### Estrutura de dados
Os dados estão sendo salvos no localStorage nas seguintes estruturas:

Clientes (key **'clientes'**):
```
[
    { 
        "id": "...", 
        "nome": "...",
        "CPF: "...",
        "endereco": "...",
        "cidade": "...",
        "bairro": "...",
        "CEP": "..."
    }
]
```
Produtos (key **'produtos'**):
```
[
    { 
        "id": "...", 
        "nome": "...",
        "categoria: "...",
        "descricao": "...",
        "preco": "...",
        "estoque": "..."
    }
]
```
---
### O App

É um sistema simples, onde na página inicial são listados os clientes e produtos, com seus respectivos links *Gerenciar*, que redirecionam à página de cadastro/edição/remoção.

Na página **/clientes** há um formulário simples de cadastro dos clientes e logo abaixo uma lista dos clientes cadastrados, que clicando em cima, popula o formulário para a edição do item. E, logo na direita do item, há um ícone de lixeira que simplesmente o remove do cadastro.

A página **/produtos** tem as mesmas funcionalidades acima.