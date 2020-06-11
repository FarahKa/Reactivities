import React, { Fragment } from "react";
import { Grid, List } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { ActivityList } from "./ActivityList";

//to pass down activities from the app component
interface IProps{
    activities: IActivity[]
}

export const ActivityDashboard : React.FC<IProps> = ({activities}) => {
  return (
    <Fragment>
      <Grid>
        <Grid.Column width={10}>
            <ActivityList activities={activities}/>
          {/* <List>
            {activities.map((activity) => (
              <List.Item key={activity.id}>{activity.title}</List.Item>
            ))}
          </List> */}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};
