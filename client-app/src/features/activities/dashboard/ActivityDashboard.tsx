import React, { Fragment } from "react";
import { Grid, List } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { ActivityList } from "./ActivityList";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";

//to pass down activities from the app component
interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  selectedActivity: IActivity | null;
  setSelectedActivity: (activity: IActivity | null) => void;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  createActivity : (activity: IActivity) =>void;
  editActivity : (activity:IActivity) =>void;
}

export const ActivityDashboard: React.FC<IProps> = ({
  activities,
  selectActivity,
  selectedActivity,
  editMode,
  setEditMode,
  setSelectedActivity,
  createActivity,
  editActivity,
}) => {
  return (
    <Fragment>
      <Grid>
        <Grid.Column width={10}>
          <ActivityList
            activities={activities}
            selectActivity={selectActivity}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          {selectedActivity && !editMode && (
            <ActivityDetails
              setSelectedActivity={setSelectedActivity}
              activity={selectedActivity}
              setEditMode={setEditMode}
            />
          )}
          {editMode && (
            <ActivityForm
              key={selectedActivity && selectedActivity.id || 0}
              activity={selectedActivity}
              setEditMode={setEditMode}
              createActivity={createActivity}
              editActivity={editActivity}
            />
          )}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};
