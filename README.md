## Библиотека с авторизацией и личным кабинетом пользователя

---

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

### Для того чтобы скачать этот пакет
Пишем в консоли в корне проекта
```dotenv
npm set registry http://nexus.lislab.tech/repository/lis-node-libs/
```
Добавляем в корень проекта файл `.npmrc` с кредами от нексуса. Файл должен быть вида:
```
   email=your_email@severstal.com
   always-auth=true
   //nexus.lislab.tech/repository/lis-node-libs/:_auth=a3MuZHViYXNvdjpyb2FPVWVxa0tyS3k0cEdVclk5cA==a
```
Ключ авторизации генерить вот так:
```dotenv
echo -n 'login:password' | openssl base64
```
где login это логин, а password - пароль.

Вводим в терминал
```dotenv
npm install @lis/auth-lib@0.0.1 --legacy-peer-deps
```

Потом импортируем компоненты типа такого (папку библы можно посмотреть в node_modules)
```js
import {Button} from "@lis/auth-lib";
```

---

## О самой библиотеке

* Все компоненты в папке `/lib`
* Экспорт основных компонент в файле `/lib/main.ts`
* Переменные в файле `.env`
* Креды нексуса в файле `.npmrc`
* Версия ноды для библы `.nvmrc`
* Зависимости `package.json`
* Конфиги `vite.config.js` `tsconfig-build.json` `tsconfig.node.json` `tsconfig.json`
* Линтер и притер `.eslintrc` `.prettierrc`
* в `package.json` в `publishConfig` ссылка того куда льем билд

---

* для того чтобы залить в nexus `npm publish`
* установить зависимости `npm i`

---

## Вот тут много полезного о там как сделать похожую штуку:
`https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma
`