export function selectStageBadge(stage:number){
  switch(stage){
    case 1 :
      return '/calendar/badge-1.png'
    case 2 : 
      return '/calendar/badge-2.png'
    case 3 : 
      return '/calendar/badge-3.png'   
    case 4 : 
      return '/calendar/badge-4.png'
    default : 
      return '/calendar/badge-4.png'
  }
}