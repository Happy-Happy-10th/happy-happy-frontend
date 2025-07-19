export default function selectStageBadge(stage:number){
  switch(stage){
    case 1 :
      return '/badge-1.png'
    case 2 : 
      return '/badge-2.png'
    case 3 : 
      return '/badge-3.png'   
    case 4 : 
      return '/badge-4.png'
    default : 
      return '/badge-4.png'
  }
}