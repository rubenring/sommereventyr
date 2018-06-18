import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';
import { InfoPage } from './InfoPage';
import { PageOne } from "../page-one/PageOne";
import { PageTwo } from "../page-two/PageTwo";
import { PageThree } from "../page-three/PageThree";
import { PageFour } from "../page-four/PageFour";
import { PageFive } from "../page-five/PageFive";
import { Header } from '../commen/Header';



export const AppRouter = (props) => {
  return (
    <Router>
      <Fragment>
      <Header username={props.username} updateName={props.updateName} logo={props.logo} {...props}/>      
      <Switch>
        <Route exact path='/' {...props} component={InfoPage}/>
        <Route path='/page-one' {...props} component={PageOne}/>
        <Route path='/page-two' {...props} component={PageTwo}/>
        <Route path='/page-three' {...props} component={PageThree}/>
        <Route path='/page-four' {...props} component={PageFour}/>
        <Route path='/page-five' {...props} component={PageFive}/>

        <Route {...props} component={NotFoundPage} />
      </Switch>
      </Fragment>
    </Router>
  )
};