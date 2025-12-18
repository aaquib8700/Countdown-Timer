
import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';

const CounterTimer = () => {
  const [time, setTime] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const intervalRef = useRef(null);

  const handleInput = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setTime(parseInt(value * 60));
  };

  const formatTime = () => {
    const min = String(Math.floor(time / 60)).padStart(2, '0');
    const secs = String(Math.floor(time % 60)).padStart(2, '0');
    return `${min} : ${secs}`;
  };

  const handleStart = () => {
    if (time > 0) {
      setIsStart(true);
      setIsPause(false);
    }
  };

  useEffect(() => {
    if (isStart && !isPause) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsStart(false);
            alert('Time is Up');
            setInputValue('');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isStart, isPause]);

  const handlePause = () => {
    setIsPause(!isPause);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsStart(false);
    setIsPause(false);
    setTime(0);
    setInputValue('');
  };

  const progress = inputValue ? ((parseInt(inputValue * 60) - time) / (parseInt(inputValue * 60))) * 100 : 0;

  return (
    <div className='w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-8'>
      <div className='text-center space-y-2'>
        <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4'>
          <Clock className='w-8 h-8 text-white' />
        </div>
        <h1 className='text-3xl font-bold text-slate-900'>Countdown Timer</h1>
        <p className='text-slate-500 text-sm'>Set your timer and stay focused</p>
      </div>

      <div className='space-y-6'>
        <div className='space-y-3'>
          <label className='block text-sm font-medium text-slate-700'>
            Duration (minutes)
          </label>
          <input
            type="number"
            value={inputValue}
            onChange={handleInput}
            placeholder="Enter minutes"
            disabled={isStart}
            className='w-full px-4 py-3 text-lg border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all disabled:bg-slate-100 disabled:cursor-not-allowed'
          />
        </div>

        <div className='relative'>
          <div className='bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border-2 border-slate-200'>
            <div className='text-center'>
              <div className='text-6xl font-bold tracking-wider text-slate-900 font-mono'>
                {formatTime()}
              </div>
            </div>
          </div>
          {inputValue && (
            <div className='absolute bottom-0 left-0 right-0 h-2 bg-slate-200 rounded-b-2xl overflow-hidden'>
              <div
                className='h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-1000 ease-linear'
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        <div className='flex gap-3'>
          <button
            onClick={handleStart}
            disabled={isStart}
            className='flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0'
          >
            <Play className='w-5 h-5' />
            Start
          </button>

          <button
            onClick={handlePause}
            disabled={!isStart}
            className='flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5 active:translate-y-0'
          >
            <Pause className='w-5 h-5' />
            {isPause ? 'Resume' : 'Pause'}
          </button>

          <button
            onClick={handleReset}
            className='flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-300 transition-all hover:-translate-y-0.5 active:translate-y-0'
          >
            <RotateCcw className='w-5 h-5' />
            Reset
          </button>
        </div>
      </div>

      {isStart && (
        <div className='text-center'>
          <span className='inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium'>
            <span className='w-2 h-2 bg-blue-500 rounded-full animate-pulse'></span>
            {isPause ? 'Paused' : 'Running'}
          </span>
        </div>
      )}
    </div>
  );
};

export default CounterTimer;
