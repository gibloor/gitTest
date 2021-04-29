import React, { useState } from 'react';
import './SpellMix.css';

import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import earth from './spellPictures/Earth.png';
import water from './spellPictures/Water.png';

const Spellmix = () => {

  const [activeSpells, setActiveSpells] = useState([
    {
      picture: earth,
      spell: 'Earth',
      recipe: 'Earth'
    },
    {
      picture: water,
      spell: 'Water',
      recipe: 'Water'
    },
    {
      picture: earth,
      spell: 'Earth',
      recipe: 'Earth'
    }
  ])

  const [spellList, setSpellList] = useState([
    {
      picture: earth,
      spell: 'Earth',
      recipe: 'Earth',
      active: true,
    },
    {
      picture: water,
      spell: 'Water',
      recipe: 'Water',
      active: true,
    }
  ])

  const [spellOne, setSpellOne] = useState('Первый spell');
  const [spellTwo, setSpellTwo] = useState('Второй spell');

  function Card({ imag, spell }) {
    const [{ isDragging }, dragRef] = useDrag({
      item: {
        type: "card",
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    return (
      <div className="card" ref={dragRef}  style={{ backgroundColor: isDragging ? 'blue' : 'orange' }}>
        <div><img className='imgBox' src={imag}/></div>
        <div>{spell}</div>
      </div>
    );
  }
  
  function Box({ moveCard, picture, spellName }) {
    const [{ isOver }, dropRef] = useDrop({
      accept: "card",
      drop: () => moveCard(),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });
    isOver ? setSpellTwo(spellName):console.log(1)
    return (
      <div className="box" ref={dropRef} style={{ backgroundColor: isOver ? 'green' : 'red' }} >
        <Card spell={spellName} imag={picture} /> 
      </div>
    );
  }

return (
  <DndProvider backend={HTML5Backend}>
    <div className='scrollSpells'>
      {activeSpells.map((item, indexSpell) =>
        <div className='blockSpell'>
          <Box spellName={item.spell} picture={item.picture} moveCard={() => setSpellOne(activeSpells[indexSpell].spell)}/>
        </div>
      )}
      <div>{spellOne} X {spellTwo}</div>
    </div>
  </DndProvider>
  
)}

export default Spellmix;