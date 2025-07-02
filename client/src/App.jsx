import { Route, Switch } from 'wouter'
import Login from './routes/Login'
import Register from './routes/Register'
import Home from './routes/Home'
import './index.css'
export default function App() {
  return (
    <div className="p-4">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route>404 - Page Not Found</Route>
      </Switch>
    </div>
  );
}
