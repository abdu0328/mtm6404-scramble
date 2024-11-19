/***********************************************
 * STARTER CODE
 ***********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/***********************************************
 * YOUR CODE BELOW
 ***********************************************/

const { useState } = React;

function App() {
  const words = ["apple", "banana", "cherry", "grape", "orange", "pear", "peach", "melon", "plum", "mango"];
  const [currentWord, setCurrentWord] = useState(shuffle(words[0])); // Scrambled word
  const [playerGuess, setPlayerGuess] = useState(""); // Player's current guess

  const handleInputChange = (e) => {
    setPlayerGuess(e.target.value);
  };

  const handleGuessSubmit = (e) => {
    e.preventDefault(); 
    console.log(`Player guessed: ${playerGuess}`); 
    setPlayerGuess("");
  };

  return (
    <div>
      <h1>Scramble Game</h1>
      <p>Guess the word:</p>
      <h2>{currentWord}</h2>
      <form onSubmit={handleGuessSubmit}>
        <input
          type="text"
          value={playerGuess}
          onChange={handleInputChange}
          placeholder="Type your guess here"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

ReactDOM.render(<App />, document.body);

