import React, { useState, useEffect } from 'react';
import Card from './Card';
import Overlay from './Overlay';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const Gameboard = (props) => {

  const choose = (e) => {
    props.selectCard(e);
    const shuffledArray = shuffle(pokemonIds);
    renderCards(shuffledArray);
  }

  const renderCards = (array) => {
    let pokemon = [];
    for (let i of array) {
      pokemon.push(<Card img={images[`${i}.png`]} num={i} click={choose} name={pokemonNames[i - 1]} />)
    }
    setPokemonArray(pokemon);
  }

  const [pokemonIds, setPokemonIds] = useState(shuffle(Array.from(Array(152).keys()).slice(1)))
  const [pokemonNames, setPokemonNames] = useState([]);
  const [pokemonArray, setPokemonArray] = useState([]);
  const [loadingDone, setLoadingDone] = useState(false); // Show/hide end screen

  /* Set up API calls for pokemon names only on mount */

  useEffect(() => {
    async function getNames() {
      let names = [];
      for (let i = 1; i <= 151; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        const response = await fetch(url);
        const info = await response.json();
        names.push(info['forms'][0]['name']);
      }
        setPokemonNames(names);
        setLoadingDone(true);
    }
    getNames();
  }, [])

  /* Only after pokemon names have been created, then build the cards */
  
  useEffect(() => {
    renderCards(pokemonIds);
  }, [pokemonNames])

  const loading = <div className='loading'>LOADING...</div>

  return (
    <div className="gameboard">
      <Overlay hide={loadingDone} content={loading} />
      {pokemonArray}
    </div>
  )
}

export default Gameboard;