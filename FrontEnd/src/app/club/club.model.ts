interface Event{
  
    id: string;
    event_date: string;
    event_img: string;
   
}
interface Team{
  id:string;
  team_name:string;
  team_img:string;
  team_titre:string;
  team_fb:string;
  team_insta:string;
  team_linkedin:string;
  team_twitter:string;
}
export interface Club {
  id: string;
  name:string;
  club_img:string;
  theme:string;
  about:string;
 events:Event[];
 team:Team[];
}

