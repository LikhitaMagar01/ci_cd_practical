## Getting Started

First, run the development server:

npm run dev
# or
yarn dev
# or
pnpm dev

First of all we integrate toggle from dark mode to light mode using "react-themes":
1. install npm i react-themes
2. make providers.tsx file
3. wrap layouts.tsx with providers.tsx import
4. have icons to toggle according to theme in navbar with useTheme() of "react-themes"
5. delete other styles from globals.tsx

shadcn ui
It is used for component and styling
1. install npx shadcn-ui@latest init
2. make styles folder inside src/ and choose styles/globals.css
3. change ./globals.css to @/styles/globals.css in layout.tsx
4. change src/style/globals.css to @/styles/globals.css

we have created signup and signin form using shadcn which provides zod validation in form.

prisma orm:
install:
npm install prisma --save-dev
1. prisma generate
npx prisma init

2. change your user, password and db name in path of env file
3. migrate
prisma db push / prisma migrate dev
npx prisma migrate dev --name init
4. install prisma/client

get bcrypt to hash password
npm i bcrypt

get prisma-adapter for next-auth:
npm i @next-auth/prisma-adapter