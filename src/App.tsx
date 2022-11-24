/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-08-17 14:48:14
 * @LastEditors: Your Name
 * @LastEditTime: 2022-11-24 13:02:16
 */
import { Redirect, Route, HashRouter, Switch } from 'react-router-dom';
import Login from './views/login/index'
import Main from './views/main/index'
import Gis from './views/gis/index'
import NotFound from './redirect/404';
import Edit from './views/editpage/index'

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/main' component={Main} />
        <Route path='/gis' component={Gis} />
        <Route path='/edit' component={Edit} />
        <Redirect from='/' to="/edit"></Redirect>
        <Route component={NotFound} />
      </Switch>
    </HashRouter>
  )
}

export default App;
