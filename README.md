# ⏰ MEVN Appointment Site

## 🔥 Used Techs:
- **General**:
    - ***docker** for prod*
    - ***express** for server*
    - ***vue** for client*
- **Server**:
    - ***mongoose** for db*
    - ***joi** for validations*
    - ***dotenv** for env vars*
    - ***crypto-js** for hashing vars*
    - ***jsonwebtoken** for authentication*
    - ***cors** for managing requests*
- **Client**:
    - ***vue-router** for routing*
    - ***axios** for fetching api*
    - ***vuex** for store*
    - ***lucide-vue-next** for icons*
    - ***tailwindcss** for styling*
    - ***crypto-js** for hashing vars*
    - ***joi** for validations*

## 🛸 Features
- Auto login
- Jwt keeps at http only cookies
- Mongo db and mongoose used for db operations
- Hashing password both client and server side
- Race condition prevented at creating appointment
- All inline styles replaced with tailwindcss classes
- Bad var names updated
- Users can show only own appointments 
- Client and server side both has validations

## 🚀 Run Locally

Clone the project

```bash
  git clone https://github.com/muhammetsarican/vuejs-rubypome-mevn_case.git
```

Go to the project directory

```bash
  cd vuejs-rubypome-mevn_case/
```

#### ***Firstly: convert all .env.example files to .env files under client and server folders, fill them your own choices.***
#### ***Now: run db with docker.***

For run the db you can use one of these

```bash
  docker-compose up -d
```

```bash
  docker-compose up --fetch
```

```bash
  docker-compose up --fetch -d
```

```bash
  docker-compose up --build -d
```

#### ***Then: run server.***

Go to server directory

```bash
  cd server/
```

Then install the libs

```bash
  npm install
```

Run server

```bash
  npm run dev
```

Go to client directory

```bash
  cd client/
```

Then install the libs

```bash
  npm install
```

Run server

```bash
  npm run dev
```

#### Now, you can send requests to 4040 port and you can show ui from 5173 port, Congratulations 🎉

## 🌲 File Structure

```bash
Rubypome/
├─ .gitignore
├─ README.md
├─ client/
│  ├─ .env.example
│  ├─ .gitignore
│  ├─ README.md
│  ├─ index.html
│  ├─ jsconfig.json
│  ├─ package.json
│  ├─ src/
│  │  ├─ App.vue
│  │  ├─ assets/
│  │  ├─ main.js
│  │  ├─ router.js
│  │  ├─ store/
│  │  ├─ utils/
│  │  └─ views/
│  └─ vite.config.js
├─ compose.yml
└─ server/
   ├─ .env.example
   ├─ package.json
   └─ src/
      ├─ app.js
      ├─ config/
      ├─ controllers/
      ├─ helpers/
      ├─ loaders/
      ├─ middlewares/
      ├─ models/
      ├─ routes/
      ├─ services/
      ├─ utils/
      └─ validations/
```

## 🖋️ Authors

- [@muhammetsarican](https://www.github.com/muhammetsarican)

<!-- 
    edit compose.yml as it can run the whole application
    edit readme with your final thaughts
 -->