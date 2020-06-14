import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";

configure({enforceActions:'always'});

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  @observable activity: IActivity | null = null;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = '';

  @computed get activitiesByDate(){
    return Array.from(this.activityRegistry.values())
    .sort((a,b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action createActivity = async (activity : IActivity) => {
    this.submitting=true;
    try{
      await agent.Activities.create(activity);
      runInAction('creating activity', () => {
        this.activityRegistry.set(activity.id, activity);
        this.editMode = false;
        this.submitting = false;
      })

    } catch (error) {
      runInAction('creating activity error', () => {
        this.submitting = false;
        console.log(error);
      })

    }

  };

  @action editActivity = async (activity : IActivity) => {
    this.submitting=true;
    try{
      await agent.Activities.update(activity);
      runInAction('editing activity', () => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.editMode = false;
        this.submitting = false;
      })


    } catch(error){
      runInAction('editing activity error', () => {
        this.submitting = false;
        console.log(error);
      })

    }
  }

  @action cancelSelectedActivity = () => {
    console.log('yes??');
    this.activity= null;
  }

  @action cancelFormOpen = () => {
    console.log('yes?');
    this.editMode=false;
  }

  @action openEditForm = (id:string) => {
    this.activity = this.activityRegistry.get(id);
    this.editMode=true;
  }

  @action openCreateForm = () => {
    this.editMode= true;
    this.activity = null;
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try{
      const activities= await agent.Activities.list();
      runInAction('loading activities', () => {
        activities.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      })

    } catch(error){
      runInAction('load activities error', ()=> {
        console.log(error);
        this.loadingInitial = false;
      })

    } 
    //promise chain
    // agent.Activities.list()
    //   .then((activities) => {
    //     activities.forEach((activity) => {
    //       activity.date = activity.date.split(".")[0];
    //       this.activities.push(activity);
    //     });
    //   })
    //   .finally(() => this.loadingInitial = false);
  };

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if(activity) {
      this.activity = activity;
    } else {
      this.loadingInitial = true;
      try {
          activity = await agent.Activities.details(id);
          runInAction('getting activity', () => {
            this.activity=activity;
            this.loadingInitial = false;
          })
      } catch (error) {
        runInAction('get Activity error', () => {
          this.loadingInitial=false;
        })
        console.log(error);
      }
    }

      
  }

  @action clearActivity = () => {
    this.activity = null;
  }
//accomodating if a user saves an activity in their bookmark or refreshes the page
  getActivity = (id : string) => {
    return  this.activityRegistry.get(id);
  }

  @action deleteActivity = async (event : SyntheticEvent<HTMLButtonElement>, id:string) => {
    this.submitting= true;
    this.target=event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction('deleting activity', () => {
        this.activityRegistry.delete(id);
        this.submitting=false;
        this.target='';
      })

    }catch(error){
      runInAction('delete activity error', () => {
        this.submitting=false;
        this.target='';

      })
      console.log(error);
    }



  }

  @action selectActivity = (id:string) => {
      this.activity = this.activityRegistry.get(id);
      this.editMode = false;
  }
}

export default createContext(new ActivityStore());
