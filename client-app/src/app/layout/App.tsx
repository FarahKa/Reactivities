import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";

//changed app from function to class
//Component gets P: property, S: State, ...
const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  
  //selection of activities for details, and edit form
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id : string) => {
    setSelectedActivity(activities.filter(a=>a.id === id)[0])
    setEditMode(false);
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity  = (activity : IActivity) => {
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity])
      setSelectedActivity(activity);
      setEditMode(false);
    })
  }

  const handleEditActivity = (activity : IActivity) => {
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(a => a.id !== activity.id), activity])
      setSelectedActivity(activity);
      setEditMode(false);
    })

  }

  const handleDeleteActivity = (id : string) => {
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(a=> a.id !== id)])
    })
  }
  
  useEffect(() => {
    //<> is return type
    agent.Activities.list()
    .then((response) => {
        let activities : IActivity[] = [];
        response.forEach(activity => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        })
        setActivities(activities);
      });
  }, []);

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
        setSelectedActivity={setSelectedActivity} 
        activities={activities} 
        selectActivity={handleSelectActivity}
        selectedActivity={selectedActivity}
        editMode={editMode}
        setEditMode={setEditMode}
        createActivity={handleCreateActivity}
        editActivity={handleEditActivity}
        deleteActivity={handleDeleteActivity}
        />
      </Container>

      <ul></ul>
    </Fragment>
  );
};

export default App;
