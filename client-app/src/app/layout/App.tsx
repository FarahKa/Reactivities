import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";
import { IActivity } from "../models/activity";

//changed app from function to class
//Component gets P: property, S: State, ...
const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    //<> is return type
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data)
      });
  }, []);


  return (
    <div>
      <Header as="h2">
        <Icon name="users" />
        <Header.Content>Reactivities</Header.Content>
      </Header>
      <List>
        {activities.map((activity) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
      <ul></ul>
    </div>
  );
};

export default App;
