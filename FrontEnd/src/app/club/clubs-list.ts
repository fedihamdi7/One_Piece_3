import { Club } from "./club.model";
export const clubs: Club[] = [
  {
    id:"1",
    name: 'IEEE',
    club_img:"ieee.jpeg",
    theme:"bleu",
    about:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda, at aperiam, dolorem consequuntur cupiditate, debitis facere dolore harum non natus quae saepe eveniet mollitia eligendi ullam labore velit reprehenderit vel.",
 
    events:[{
      id: "1",
      event_date: "2019-01-01",
      event_img :"4c(3).jpg"
    },
    {
      id: "2",
      event_date: "2020-05-13",
      event_img :"mcncom(1).jpg"
    },
    {
      id: "3",
      event_date: "2021-11-18",
      event_img :"tunivisions(1).jpg"
    }
  ],
  team:[{
    "id":"1",
    "team_name":"fedi",
    "team_titre":"president",
    "team_img":"4c.jpg",
    "team_fb":"aaaaaaa",
    "team_insta":"aaaaa",
    "team_linkedin":"aaaaa",
    "team_twitter":"aaaaaaaaa"
  },
  {
    "id":"2",
    "team_name":"eya",
    "team_titre":"RH",
    "team_img":"ieee.jpeg",
    "team_fb":"aaaaaaa",
    "team_insta":"aaaaa",
    "team_linkedin":"aaaaa",
    "team_twitter":"aaaaaaaaa"
  },{
    "id":"2",
    "team_name":"eya",
    "team_titre":"RH",
    "team_img":"ieee.jpeg",
    "team_fb":"aaaaaaa",
    "team_insta":"aaaaa",
    "team_linkedin":"aaaaa",
    "team_twitter":"aaaaaaaaa"
  }]

}
];
