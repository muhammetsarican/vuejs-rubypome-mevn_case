# ⏰ MEVN Appointment Site
 I created an appointment site with vuejs, mongodb,expressjs and nodejs for job application. I started with creating a docker container for mongodb, then I started to server side. I have knowledge about how to create backed with express, so I created base routes, services, controllers, at this part I got help from my previous project. Then I created models and validations, by the way I installed necessary libs. Secondly, I started to create special routes for user and appointment collections. In this part, I was asked to write a method that prevents Race Condition, but I have only theoretical information about this, so I got help from chat gpt when working on but I didn't copy it. Later, I cloned fronted from case repository and I started working on. I created router structure, then created login and register views. When I was creating them I added vuex to app and configured it. Later, I activated the pages, I added axios for fetch queries, added lucide vue for icons, for styling added tailwindcss, added cryptojs for hashing and joi for validations. I deployed it on my vps host, I was forced at this part. 
 
 **At final, you can inspect the project on [this link](https://rubypome.farmrein.com/).**

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


## 🔢 Environment Variables

To run this project you will need to add variables to the environment files under the base directory and the server directory. If you check you will see '*.env.example*' files. After editing these files, don't forget to change the name to '*.env*'.

## 🚀 Run Locally

Clone the project

```bash
  git clone https://github.com/muhammetsarican/vuejs-rubypome-mevn_case.git
```

Go to the project directory

```bash
  cd vuejs-rubypome-mevn_case/
```

#### ***For run the whole up  with docker, use one these.***

```bash
  docker compose up -d
```

```bash
  docker compose up --fetch
```

```bash
  docker compose up --fetch -d
```

```bash
  docker compose up --build -d
```

#### Then, open your browser and visit the URL at below:
```bash
  http://localhost:8001
```
#### Congratulations 🎉

#### ***If you want to run app step by step, follow next steps.***
#### ***First: run db***
Run docker service
```bash
  docker compose up mongo
```
For hide logs
```bash
  docker compose up mongo -d
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

#### ***Lastly: run client.***

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

#### Now, you can visit the URL at below:
```bash
  http://localhost:5173
```

#### Congratulations 🎉

## 🌲 Folder Structure

```bash
Rubypome/
├─ client/
│  ├─ src/
│  │  ├─ assets/
│  │  │  └─ css/
│  │  ├─ store/
│  │  ├─ utils/
│  │  └─ views/
│  │     └─ auth/
├─ nginx/
└─ server/
   └─ src/
      ├─ config/
      ├─ controllers/
      │  ├─ auth/
      │  └─ main/
      ├─ helpers/
      ├─ loaders/
      ├─ middlewares/
      ├─ models/
      │  ├─ auth/
      │  └─ main/
      ├─ routes/
      │  ├─ auth/
      │  └─ main/
      ├─ services/
      │  ├─ auth/
      │  └─ main/
      ├─ utils/
      └─ validations/
         ├─ auth/
         └─ main/
```

## 🖋️ Authors

- [@muhammetsarican](https://www.github.com/muhammetsarican)