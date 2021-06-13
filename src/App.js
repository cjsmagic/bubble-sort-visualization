import classnames from 'classnames';
import React, { useState } from 'react';
import './style.css';

const delay = async () =>
  new Promise(resolve => setTimeout(() => resolve(), 1000));

const bubbleSort = async ({ nums, setNums, setSwapValues, setMoving }) => {
  const arr = [...nums];
  const n = nums.length;
  setMoving(() => arr[0]);
  for (let i = 0; i < n; i++) {
    console.log('iteration', i + 1);
    setSwapValues(() => ({ left: null, right: null }));
    // setMoving(() => arr[0]);
    await delay();
    for (let j = 0; j < n - (i - 1); j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        setMoving(() => arr[j]);
        setSwapValues(() => ({ left: arr[j], right: arr[j + 1] }));
      }
      await delay();
      console.log(arr);

      setNums(() => [...arr]);
      await delay();
    }
  }
};

const unsorted = [15, 64, 32, 82, 1];
export default function App() {
  const [nums, setNums] = useState([...unsorted]);
  const [swapValues, setSwapValues] = useState({
    left: null,
    right: null
  });
  const [moving, setMoving] = useState(null);

  return (
    <>
      <div className="bubbles">
        {nums.map((num, index) => {
          return (
            <div
              className="bubble"
              style={{ order: index }}
              key={num}
              className={classnames('bubble', {
                'bubble--moving bubble--current': moving === num,
                'bubble--right': swapValues.left === num,
                'bubble--left': swapValues.right === num
              })}
            >
              {num}
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          bubbleSort({ nums, setNums, setSwapValues, setMoving });
          setSwapValues(() => ({ left: null, right: null }));
        }}
      >
        sort
      </button>

      <button
        onClick={() => {
          setNums(unsorted);
          setSwapValues({
            left: null,
            right: null
          });
        }}
      >
        reset
      </button>
    </>
  );
}
