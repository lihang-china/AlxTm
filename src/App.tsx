/*
 * @Descriptin:
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-08-17 14:48:14
 * @LastEditors: Your Name
 * @LastEditTime: 2023-01-04 16:54:41
 */
import { Redirect, Route, HashRouter, Switch } from 'react-router-dom';
import Login from './views/login/index'
import Main from './views/main/index'
import NotFound from './redirect/404';
import Edit from './views/editpage/index'
import VisuaLization from './views/visualization';
function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/main' component={Main} />
        <Route path='/edit' component={Edit} />
        <Route path='/visual' component={VisuaLization} />
        <Redirect from='/' to="/edit"></Redirect>
        <Route component={NotFound} />
      </Switch>
    </HashRouter>
  )
}

export default App;
