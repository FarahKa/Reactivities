import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { List, Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";

//changed app from function to class
//Component gets P: property, S: State, ...
const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  
  //selection of activities for details, and edit form
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  
  const handleSelectActivity = (id : string) => {
    setSelectedActivity(activities.filter(a=>a.id === id)[0])
  }

  useEffect(() => {
    //<> is return type
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard activities={activities} 
        selectActivity={handleSelectActivity}
        selectedActivity={selectedActivity}
        />
      </Container>

      <ul></ul>
    </Fragment>
  );
};

export default App;
