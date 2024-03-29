import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [Play,] = useState(true);

  // Trie les données en fonction des index des dates de manière décroissante
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  useEffect(() => {
    let timeout;
    const nextCard = () => setTimeout(
      () =>
        // eslint-disable-next-line no-unsafe-optional-chaining
        index < byDateDesc?.length - 1 ? setIndex(index + 1) : setIndex(0),
      5000
    );

    if (Play) {
      timeout = nextCard();
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [Play, byDateDesc, index]);
  
  return (
    <div className="SlideCardList">
  
      <div>
        {byDateDesc?.map((event, idx) => (
          <div
            key={event.id}
            className={
              Play
                ? `  play-animation   SlideCard SlideCard--${
                    index === idx ? "display" : "hide"
                  }
                    `
                : ` pause-animation   SlideCard SlideCard--${
                    index === idx ? "display" : "hide"
                  }`
            }
          >
            <img src={event.cover} alt="forum" key={event.id} />
            <div key={event.title} className="SlideCard__descriptionContainer ">
              <div className="SlideCard__description" key={event.title}>
                <h3 key={event.cover}>{event.title} </h3>
                <p key={event.description}>{event.description}</p>
                <div key={event.title}>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        ))}
        <div className="SlideCard__paginationContainer">
          <div className="SlideCard__pagination" />

          {byDateDesc?.map((_, radioIdx) => (
            <input
              key={`${_.date}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
