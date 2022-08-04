import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { IconContext } from "react-icons";

const MAX_STARS: number = 5;

function StarView({ stars }: any) {
  let whole: number = Math.floor(stars);
  let decimal: number = stars - whole;
  let rest: number = MAX_STARS - (whole + Math.ceil(decimal));
  let rating: any[] = [];

  getStar(whole, getFullStar);

  if(decimal > 0)
    rating.push(getHalfStar());

  getStar(rest, getEmptyStar);
  
  function getStar(limit: number, callback: Function) {
    for(let i=0;i < limit;i++)
      rating.push(callback());
  }

  return (
    <div className="flex flex-row">
      <IconContext.Provider value={{ color: "#E3E751", className: "stroke-1 stroke-gray-600 dark:stroke-gray-500"}}>
        { rating }
      </IconContext.Provider>
    </div>
  );
}

function getFullStar() {
  return <div><BsStarFill /></div>
}

function getHalfStar() {
  return <div><BsStarHalf /></div>
}

function getEmptyStar() {
  return <div><BsStar /></div>
}

export default StarView;
