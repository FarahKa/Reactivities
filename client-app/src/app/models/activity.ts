//helps to strongly type, isn't transpiled into js code later
export interface IActivity {
    id: string;
    title: string;
    description:string;
    category:string;
    date: string;
    city: string;
    venue: string;
}