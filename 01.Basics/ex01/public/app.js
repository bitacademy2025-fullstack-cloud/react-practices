function App() {
    const App = document.createElement('div');
    App.textContent = 'hello, world';

    return App;
}

document
    .getElementById("root")
    .appendChild(App());