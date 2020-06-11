import React, { Fragment } from "react";
import { Grid, List } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { ActivityList } from "./ActivityList";
import { ActivityDetails } from "../details/ActivityDetails";

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
        </Grid.Column>
        <Grid.Column width={6}>
            <ActivityDetails/>
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};
