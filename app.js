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
  const initialWords = ["apple", "banana", "cherry", "grape", "orange", "pear", "peach", "melon", "plum", "mango"];
  const [words, setWords] = useState(initialWords); 
  const [originalWord, setOriginalWord] = useState(words[0]);
  const [currentWord, setCurrentWord] = useState(shuffle(words[0])); 
  const [playerGuess, setPlayerGuess] = useState(""); 
  const [feedback, setFeedback] = useState("");

  const handleInputChange = (e) => {
    setPlayerGuess(e.target.value);
  };

  const handleGuessSubmit = (e) => {
    e.preventDefault();

    if (playerGuess.toLowerCase() === originalWord.toLowerCase()) {
      setFeedback("Correct! 🎉");

      const remainingWords = words.filter((word) => word !== originalWord);

      if (remainingWords.length > 0) {
        const nextWord = remainingWords[0];
        setOriginalWord(nextWord);
        setCurrentWord(shuffle(nextWord)); 
        setWords(remainingWords);
      } else {
        setFeedback("Game Over! You've guessed all the words. 🎉");
        setOriginalWord(""); 
        setCurrentWord(""); 
      }
    } else {
      setFeedback("Incorrect, try again! ❌");
    }

    setPlayerGuess(""); 
  };

  return (
    <div>
      <h1>Scramble Game</h1>
      <p>Guess the word:</p>
      <h2>{currentWord || "No more words!"}</h2>
      <form onSubmit={handleGuessSubmit}>
        <input
          type="text"
          value={playerGuess}
          onChange={handleInputChange}
          placeholder="Type your guess here"
          disabled={!currentWord} 
        />
        <button type="submit" disabled={!currentWord}>Submit</button> 
      </form>
      <p>{feedback}</p>
    </div>
  );
}

ReactDOM.render(<App />, document.body);
