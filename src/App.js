import { useEffect, useState } from "react";

function App() {
  const [currentCard, setCurrentCard] = useState(null);
  const [cardList, setCardList] = useState([
    { id: 1, order: 5, text: 'Карточка 1' },
    { id: 2, order: 3, text: 'Карточка 2' },
    { id: 3, order: 4, text: 'Карточка 3' },
    { id: 4, order: 2, text: 'Карточка 4' },
    { id: 5, order: 1, text: 'Карточка 5' },
  ]);

  const dragStartHandler = (e, card) => {
    setCurrentCard(card);
  }
  const dragLeaveHandler = (e) => {
    e.target.style.background = 'rgb(210, 213, 238)';
  }
  const dragEndHandler = (e) => {
    e.target.style.background = 'teal';
    setTimeout(() => e.target.style.background = 'rgb(210, 213, 238)', 500);
  }
  const dragOverHandler = (e) => {
    e.preventDefault();
    e.target.style.background = 'lightgray';
  }
  const onDropHandler = (e, card) => {
    e.preventDefault();
    setCardList(cardList.map(c => {
      if (c.id === card.id) {
        return { ...c, order: currentCard.order }
      }
      if (c.id === currentCard.id) {
        return { ...c, order: card.order }
      }
      return c;
    }
    ))
    e.target.style.background = 'rgb(210, 213, 238)';
  }

  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  }


  return (
    <div className="content-wrapper">
      <div className="no-mobile">
        <h1>Drag-n-drop list is only available on desktop.</h1>
      </div>
      <h1 className="title">Drag-n-drop list </h1>
      <div className="cardlist">
        {cardList.sort(sortCards).map(card =>
          <div
            key={card.text + card.id}
            draggable={true}
            onDragStart={(e) => dragStartHandler(e, card)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => onDropHandler(e, card)}
            className="card">
            {card.text}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
