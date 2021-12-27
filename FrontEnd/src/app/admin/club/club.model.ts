import { Team } from "src/app/dash-respo/team/team.model";

export interface Club {
  //  target: HTMLInputElement;
    id?: string;
    _id?: string;
    title?:string;
    image?:string;
    description?:string;
    events?:Event[];
    team?:Team[];
  }