export interface Event{

    // id: string;
    event_date: string;
    event_img: string;

}
export interface Club{
  id: string;
  name:string;
  club_img:string;
  about:string;
}
export interface Home {
  id: string;
  name:string;
 events:Event[];
 club:Club[];
}

