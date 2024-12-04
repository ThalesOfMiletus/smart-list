# Documentação do Projeto: SmartList

## 1. Visão Geral

### Descrição

O **SmartList** é um aplicativo de gerenciamento de tarefas com integração de inteligência artificial para gerar tarefas com base em relatos. Ele permite criar, listar, editar, excluir e marcar tarefas como concluídas, além de oferecer funcionalidades de login e logout.

### Principais Funcionalidades

- **Cadastro de usuários e autenticação com login e logout.**
- **Gerenciamento de tarefas:**
  - Criar tarefas manualmente ou com base em relatos.
  - Listar tarefas pendentes e concluídas.
  - Editar e excluir tarefas.
  - Marcar tarefas como concluídas.
  - Visualizar detalhes das tarefas em um modal.
- **Interface responsiva e intuitiva.**
- **Persistência de dados no backend com Django.**

---

## 2. Tecnologias Utilizadas

### Frontend

- React Native com Expo
- TypeScript
- AsyncStorage (para persistência local)
- `react-native-vector-icons` (ícones)
- `react-navigation` (navegação)

### Backend

- Django Rest Framework
- Python 3
- SQLite (banco de dados)

### Integrações Futuras

- Biblioteca `react-native-document-picker` para anexar arquivos.
- `react-native-audio-recorder-player` para gravação de áudio.

---

## 3. Estrutura do Projeto

### Frontend

- **AppNavigator.tsx**: Configuração de navegação entre as telas.
- **screens/**:
  - `LoginScreen.tsx`: Tela de login.
  - `RegisterScreen.tsx`: Tela de cadastro.
  - `HomeScreen.tsx`: Tela principal com a lista de tarefas.
  - `CreateTaskScreen.tsx`: Tela para criar tarefas manualmente ou por relato.
- **services/**:
  - `authService.ts`: Funções relacionadas à autenticação (login, registro, logout).
  - `taskService.ts`: Funções para interação com a API de tarefas (criar, listar, editar, excluir, marcar como concluída).

### Backend

- **models.py**:
  - Modelo `Task` para representar tarefas.
  - Modelo `User` para autenticação.
- **serializers.py**:
  - Serialização dos modelos para interações API.
- **views.py**:
  - Visualizações para manipular tarefas e usuários.
  - Integração de IA para criar tarefas baseadas em relatos.
- **urls.py**:
  - Rotas de API.

---

## 4. Endpoints da API

### Autenticação

- **POST** `/auth/register/`: Registra um novo usuário.
- **POST** `/auth/login/`: Faz login e retorna o token de autenticação.

### Tarefas

- **GET** `/tasks/`: Lista todas as tarefas do usuário autenticado.
- **POST** `/tasks/`: Cria uma nova tarefa.
- **POST** `/tasks/create-from-relato/`: Cria uma tarefa com base em um relato.
- **PATCH** `/tasks/<id>/`: Atualiza uma tarefa (marcar como concluída, editar título/descrição).
- **DELETE** `/tasks/<id>/`: Exclui uma tarefa.

---

## 5. Fluxo de Usuário

### 1. Login e Registro

- O usuário inicia na tela de login.
- Caso não tenha uma conta, pode acessar a tela de registro para criar uma nova conta.

### 2. Tela Inicial

- Após o login, o usuário é direcionado à tela inicial que lista todas as tarefas.
- A tela é dividida em:
  - **Lista de tarefas pendentes.**
  - **Lista de tarefas concluídas.**

### 3. Gerenciamento de Tarefas

- O usuário pode:
  - Criar uma nova tarefa manualmente ou com base em um relato (IA).
  - Editar ou excluir tarefas existentes.
  - Marcar tarefas como concluídas ou reabri-las.
  - Visualizar os detalhes de uma tarefa em um modal.

---

## 6. Como Rodar o Projeto

### Frontend

1. Certifique-se de ter o **Node.js** e o **Expo CLI** instalados.
2. Clone o repositório:
   ```bash
   git clone <repositorio>
   cd frontend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o projeto:
   ```bash
   npx expo start
   ```

### Backend

1. Certifique-se de ter o Python 3 instalado.
2. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
3. Aplique as migrações:
   ```bash
   python manage.py migrate
   ```
4. Inicie o servidor:
   ```bash
   python manage.py runserver
   ```

---

## 7. Estrutura de Dados

### Modelo de Usuário

- `username`: Nome de usuário.
- `password`: Senha (hash).

### Modelo de Tarefa

- `titulo`: Título da tarefa.
- `descricao`: Descrição detalhada.
- `relato`: Texto base para criação da tarefa.
- `concluida`: Status da tarefa (concluída ou não).
- `criada_em`: Data de criação.
- `data_conclusao`: Data de conclusão.

