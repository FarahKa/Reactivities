import React, {useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { LoadingComponent } from "./LoadingComponent";
import ActivityStore from '../stores/activityStore';
import {observer} from 'mobx-react-lite';

//changed app from function to class
//Component gets P: property, S: State, ...
const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();   
  }, [activityStore]);

  if(activityStore.loadingInitial) return <LoadingComponent content = 'Loading activities ...'/>

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard/>
      </Container>

      <ul></ul>
    </Fragment>
  );
};

export default observer(App);
