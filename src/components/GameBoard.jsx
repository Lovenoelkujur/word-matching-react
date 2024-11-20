/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

function GameBoard({ config }) {
  // Destructure config and validate inputs
  let { groupSize, itemCount, columns } = config;

  // Enforce `groupSize` constraint
  if (![2, 3, 4].includes(groupSize)) groupSize = 2;

  // `itemCount` is <= 10
  if (itemCount > 10) itemCount = 10;

  // Enforce `columns` constraint
  if (![2, 3, 4].includes(columns)) columns = 3;

  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matches, setMatches] = useState([]);
  const [attempts, setAttempts] = useState(0);

  // Define related word groups (groups of 2, 3, and 4)
  const relatedWords = [
    // Group of 2
    ["apple", "fruit"],
    ["dog", "animal"],
    ["car", "vehicle"],
    ["rose", "flower"],
    ["blue", "color"],
    ["table", "furniture"],
    ["milk", "drink"],
    ["bread", "food"],
    ["fish", "seafood"],
    ["chair", "seat"],
    ["doctor", "hospital"],
    ["teacher", "school"],
  
    // Group of 3
    ["sun", "star", "light"],
    ["book", "read", "library"],
    ["water", "river", "ocean"],
    ["pizza", "cheese", "crust"],
    ["train", "railway", "travel"],
    ["camera", "photo", "lens"],
    ["bread", "butter", "toast"],
    ["movie", "actor", "screen"],
    ["school", "student", "teacher"],
    ["cat", "meow", "animal"],
    ["ball", "play", "game"],
    ["forest", "trees", "nature"],
  
    // Group of 4
    ["earth", "planet", "world", "nature"],
    ["pen", "write", "ink", "paper"],
    ["train", "track", "station", "engine"],
    ["computer", "keyboard", "mouse", "screen"],
    ["house", "roof", "door", "window"],
    ["family", "parents", "siblings", "home"],
    ["music", "guitar", "drums", "piano"],
    ["moon", "night", "stars", "sky"],
    ["coffee", "cup", "hot", "drink"],
    ["bird", "fly", "sky", "wing"],
    ["cloud", "rain", "storm", "weather"],
    ["pen", "write", "ink", "paper"],
    ["mountain", "rock", "climb", "summit"]
  ];
  

  useEffect(() => {
    const generateItems = () => {
      // Filter groups that match the selected group size
      const validGroups = relatedWords.filter((group) => group.length === groupSize);

      // Calculate how many full groups to select based on itemCount
      const groupCount = itemCount;

      // Select groups based on the itemCount
      const selectedGroups = validGroups.slice(0, groupCount);

      // Flatten the selected groups and shuffle them
      const pairs = selectedGroups.flat();
      return pairs.sort(() => Math.random() - 0.5);
    };

    setItems(generateItems());
    setSelected([]);
    setMatches([]);
    setAttempts(0);
  }, [groupSize, itemCount]);

  const isMatch = (indices) => {
    if (indices.length !== groupSize) return false;

    const selectedWords = indices.map((i) => items[i]);
    return relatedWords.some(
      (group) =>
        group.length === groupSize && group.every((word) => selectedWords.includes(word))
    );
  };

  const handleItemClick = (index) => {
    if (selected.includes(index)) return;

    const newSelected = [...selected, index];
    setSelected(newSelected);

    if (newSelected.length === groupSize) {
      if (isMatch(newSelected)) {
        setMatches((prevMatches) => [...prevMatches, ...newSelected]);

        // Remove matched items after delay
        setTimeout(() => {
          setItems((prevItems) =>
            prevItems.filter((i) => !newSelected.includes(i))
          );
          setSelected([]);
        }, 500); // Delay for green effect
      } else {
        setTimeout(() => setSelected([]), 500);
      }
      setAttempts((prev) => prev + 1);
    }
  };

  return (
    <div>
      <div className="attempts">Attempts: {attempts}</div>
      <div
        className="game-board"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={`game-item ${
              matches.includes(index)
                ? "matched"
                : selected.includes(index)
                ? isMatch(selected.concat(index))
                  ? "matched-preview"
                  : "wrong-match"
                : ""
            }`}
            onClick={() => handleItemClick(index)}
          >
            {!matches.includes(index) ? item : ""}
          </div>
        ))}
      </div>
      <button onClick={() => window.location.reload()}>Reset</button>
    </div>
  );
}

export default GameBoard;
