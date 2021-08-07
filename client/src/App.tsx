import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CreateGame from './components/CreateGame'
import JoinGame from './components/JoinGame'
import Game from './components/Game'
import { routes } from './utils/routes'
import { PlayerProvider } from './context/PlayerContext'

function App() {
  return (
    <div className="App">
      <PlayerProvider>
        <Router>
          <Switch>
            <Route path={routes.home} exact>
              <CreateGame />
            </Route>
            <PlayerProvider>
              <Route path={routes.joinRoom}>
                <JoinGame />
              </Route>
              <Route path={routes.game}>
                <Game />
              </Route>
            </PlayerProvider>
          </Switch>
        </Router>
      </PlayerProvider>
    </div>
  )
}

export default App
