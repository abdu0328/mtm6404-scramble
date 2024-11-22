/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle(src) {
  const copy = [...src];

  const length = copy.length;
  for (let i = 0; i < length; i++) {
    const x = copy[i];
    const y = Math.floor(Math.random() * length);
    const z = copy[y];
    copy[i] = z;
    copy[y] = x;
  }

  if (typeof src === 'string') {
    return copy.join('');
  }

  return copy;
}

/**********************************************
 * MY CODE BELOW
 **********************************************/

const { useState, useEffect } = React;

function App() {
  const savedState = JSON.parse(localStorage.getItem('gameState'));
  const initialWords = ["apple", "banana", "cherry", "grape", "orange", "pear", "peach", "melon", "plum", "mango"];

  const [words, setWords] = useState(savedState?.words || initialWords); 
  const [originalWord, setOriginalWord] = useState(savedState?.originalWord || words[0]);
  const [currentWord, setCurrentWord] = useState(savedState?.currentWord || shuffle(words[0]));
  const [playerGuess, setPlayerGuess] = useState(savedState?.playerGuess || ""); 
  const [feedback, setFeedback] = useState(savedState?.feedback || ""); 
  const [points, setPoints] = useState(savedState?.points || 0); 
  const [strikes, setStrikes] = useState(savedState?.strikes || 0);
  const [passes, setPasses] = useState(savedState?.passes || 3);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const gameState = {
      words,
      originalWord,
      currentWord,
      playerGuess,
      feedback,
      points,
      strikes,
      passes,
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }, [words, originalWord, currentWord, playerGuess, feedback, points, strikes, passes]);

  const handleInputChange = (e) => {
    setPlayerGuess(e.target.value);
  };

  const handleGuessSubmit = (e) => {
    e.preventDefault();

    if (playerGuess.toLowerCase() === originalWord.toLowerCase()) {
      setFeedback("Correct! 🎉");
      setPoints(points + 1);

      const remainingWords = words.filter((word) => word !== originalWord);

      if (remainingWords.length > 0) {
        const nextWord = remainingWords[0];
        setOriginalWord(nextWord);
        setCurrentWord(shuffle(nextWord));
        setWords(remainingWords);
      } else {
        setFeedback("You win! You've guessed all the words. 🎉");
        setGameOver(true);
        setOriginalWord("");
        setCurrentWord("");
      }
    } else {
      setFeedback("Incorrect, try again! ❌");
      setStrikes(strikes + 1);
      if (strikes + 1 >= 3) {
        setGameOver(true);
        setFeedback("Game Over! You've reached 3 strikes. ❌");
      }
    }

    setPlayerGuess("");
  };

  const handlePass = () => {
    if (passes > 0) {
      setPasses(passes - 1);
      const remainingWords = words.filter((word) => word !== originalWord);

      if (remainingWords.length > 0) {
        const nextWord = remainingWords[0];
        setOriginalWord(nextWord);
        setCurrentWord(shuffle(nextWord));
        setWords(remainingWords);
      } else {
        setFeedback("You win! You've passed all the words. 🎉");
        setGameOver(true);
        setOriginalWord("");
        setCurrentWord("");
      }
    }
  };

  const resetGame = () => {
    setWords(initialWords);
    setOriginalWord(initialWords[0]);
    setCurrentWord(shuffle(initialWords[0]));
    setPlayerGuess("");
    setFeedback("");
    setPoints(0);
    setStrikes(0);
    setPasses(3);
    setGameOver(false);
  };

  return (
    <div>
      <h1>Scramble Game</h1>
      <p>Guess the 10 words:</p>
      <h2>{currentWord || "No more words!"}</h2> 
      <form onSubmit={handleGuessSubmit}>
        <input
          type="text"
          value={playerGuess}
          onChange={handleInputChange}
          placeholder="Type your guess here"
          disabled={gameOver} 
        />
        <button type="submit" disabled={gameOver}>Submit</button>
      </form>

      {passes > 0 ? (
        <button onClick={handlePass} disabled={gameOver}>Pass</button>
      ) : (
        <button disabled>Pass</button>
      )}
      
      <p>{feedback}</p>
      <p>Passes remaining: {passes}</p>

      <div>
        <p>Points: {points}</p>
        <p>Strikes: {strikes}</p>
      </div>

      {gameOver && (
        <button onClick={resetGame}>Reset Game</button>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
