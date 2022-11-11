## "Книжная База Данных" - react-приложение, созданное для демонстрации и тестирования разных подходов из React в реализации одной задачи.

Приложение предоставляет функционал для аутентификации пользователя (начало пользовательской сессии с использованием логина/пароля, завершение сессии), создания новой или редактирования существующей книги, получения и вывода списка книг текущего пользователя и удаления ранее созданных книг. 

### Структура приложения:

`App` (/src/App.js) - главный родительский компонент; \
`Authentication` (/src/Component/Authentication.js) - компонент, отвечающий за аутентификацию пользователя; \
`Header` (/src/Component/Header.js) выводит навигационную панель для перемещения по разделам приложения (с использованием Link из react-router); \
`BookList` (/src/Component/BookList.js) выводит список книг пользователя, каждая отдельная книга в списке - это компонент `BookCard` (/src/Component/BookCard.js); \
`BookEditFormContainer` (/src/Component/BookEditFormContainer.js) - компонент, предоставляющий функционал для создания новой книги, либо получения и редактирования (и удаления) существующей книги. За рендеринг формы редактирования отвечает дочерний компонент `BookEditFormComponent` (/src/Component/BookEditFormComponent.js)

### Разные подходы реализованы в отдельных ветках: 
В ветке `class-components` применяется устаревший подход с использованием классовых компонентов для управления состоянием. Состояние пользователя, текущий активный раздел хранятся в state ключевого компонента App.js, который содержит в себе методы аутентификации и взаимодействия с бэкэндом. Параметры и методы передаются через props в дочерние компоненты. \
В ветке `hooks` классовые компоненты замещены на функциональные, для управления состоянием используется хук useState. Навигация между разделами реализуется при помощи react-router. Состояние пользователя и метод взаимодействия с бэкэндом также хранятся в компоненте App.js. \
В ветке `hooks_context` используется контекст (bookDataBaseContext.js), который хранит общие для всего приложения данные пользователя и метод взаимодействия с бэкэндом, которые при помощи хука useContext используются в отдельных компонентах приложения. \
В ветке `hooks_redux` для управления состоянием приложения используется redux. Reducer разделён на 4 части (объединённые при помощи combineReducers): api предоставляет  функционал взаимодействия с бэкэндом (для реализации асинхронных экшенов используется middleware библиотека thunk); user отвечает за хранение данных пользователя аутентификацию; bookList предоставляет методы для получения списка книг пользователя и исключения элемента из списка; bookEditForm реализует функционал создания новой книги и редактирования существующей. \
В ветке `typescript` версия с использованием redux переведена на typescript. Ветка master слита с typescript.


### Примеры интерфейса

[Список](https://drive.google.com/file/d/1jX-vpCUVp0fNeCTxSxwiFNfT6uMEaVeL/view?usp=sharing) \
[Форма редактирования](https://drive.google.com/file/d/1j_5b0LTEif_vD7Zlp9kBOGlywv0PcoK5/view?usp=sharing)


## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
