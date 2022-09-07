/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-08-17 14:48:14
 * @LastEditors: Your Name
 * @LastEditTime: 2022-09-07 18:23:02
 */
import { Redirect, Route, HashRouter, Switch } from 'react-router-dom';
import Login from './views/login/index'
import Main from './views/main/index'
import Gis from './views/gis/index'
import NotFound from './redirect/404';


function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/main' component={Main} />
        <Route path='/gis' component={Gis} />
        <Redirect from='/' to="/login"></Redirect>
        <Route component={NotFound} />
      </Switch>
    </HashRouter>
  )
}

export default App;
