import { useState, useEffect } from 'react';
import iconMenu from '../../assets/img/icon-menu.svg';
import iconReturn from '../../assets/img/icon-return.svg';
import './konverter.css';
import currencies from '../../data/currencies';

const axios = require('axios').default;

function Konverter() {
  const [isLoading, setIsLoading] = useState(false);

  const [currenciesPannelIsOpen, setCurrenciesPannelIsOpen] = useState(false);
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const [newInput, setNewInput] = useState(false);

  const [rates, setRates] = useState([]);
  const [symbols, setSymbols] = useState([]);
  const [inputValue1, setInputValue1] = useState('1.00');
  const [rate, setRate] = useState(1.09);
  const [currency, setCurrency] = useState('United States Dollar');
  

  const handleOpenKeyboard = () => {
    setKeyboardIsOpen(true);
    setNewInput(true);
    setCurrenciesPannelIsOpen(false);
  };

  const handleOpenCurrenciesPannel = () => {
    setCurrenciesPannelIsOpen(!currenciesPannelIsOpen);
    setKeyboardIsOpen(false);
  };

  const handleCurrencySelect = (symbols: {description: any, code: any}) => {
    setCurrency(symbols.description);
    setRate(rates[symbols.code]);
  };

  const fetchData = () => {
    setIsLoading(true);
    let symbols: string = 'https://api.exchangerate.host/symbols/';
    let rates: string = 'https://api.exchangerate.host/latest';
    const requestsymbols = axios.get(symbols);
    const requestrates = axios.get(rates);

    axios.all([requestsymbols, requestrates]).then(axios.spread((...responses: any[]) => {
      const responseSymbols = responses[0];   
      const responseRates = responses[1];   
      setSymbols(Object.values(responseSymbols.data.symbols));
      setRates(responseRates.data.rates);   
    }))
    .catch((error: any) => {
      throw new Error(error.message);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  },[]);


  /**
   * Keyboard logic
   * @param {number|'c'|'.'} value - a digit (0 to 9), a 'c' (clean input), ',' (coma), Enter & Backspace.
   */
  const handleKeyValue = (value: number|'c'|'.'|'Enter'|'Backspace') => {
    // if 'Enter' => Close keyboard
    if (value === 'Enter') {
      setKeyboardIsOpen(false);
      return;
    }
    // if 'c' => set value to 0 then exit
    if (value === 'c' || value === 'Backspace') {
      setInputValue1('0');
      return;
    }
    // if new opening and '.' => replace current value for '0.'
    if (newInput && value === '.') {
      setInputValue1('0.');
      setNewInput(false);
      return;
    }
    // if new opening => replace current value
    if (newInput) {
      setInputValue1('' + value);
      setNewInput(false);
      return;
    }
    // if ',' => check if its not already in string
    if (value === '.' && inputValue1.includes('.')) {
      return;
    }
    // if ',' => check if there are digital before (the fisrt char shouldnt be ,)
    if (value === '.' && inputValue1.charAt(0) === '0') {
      setInputValue1('0' + value)
      return;
    }
    // if 0 => replace it
    if (inputValue1 === '0') {
      setInputValue1('' + value);
      return;
    }
    // if string < 11 characters => concat
    if (inputValue1.length <= 11 ) {
      setInputValue1((inputValue1 + value));
    }
  };

  useEffect(() => {
    function handleGetKey(e: any) {
      let key: any = e.key;
      if (keyboardIsOpen) {
        if ( ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'c', '.', 'Enter', 'Backspace'].includes(key)) {
          handleKeyValue(key);
          console.log(key);
        }
      }
    }
    document.addEventListener('keydown', handleGetKey);
    return function cleanup() {
      document.removeEventListener('keydown', handleGetKey);
    }
  });

  return (
    <div className="konverter">

      <div className="container">
        <div className="currency currency-1" onClick={() => handleOpenKeyboard()}>
          <div className="currency-value">{inputValue1}</div>
          <div className="currency-name">Euro</div>
        </div>
        <div className="currency currency-2">
          <div className="currency-value">{(Number(inputValue1) * rate).toFixed(2)}</div>
          <div className="currency-name">{currency}</div>
        </div>
      </div>

      <button
        className={currenciesPannelIsOpen ? "currency-selector-btn open" : "currency-selector-btn"}
        onClick={() => handleOpenCurrenciesPannel()}
      >
        <img src={iconMenu} alt="Menu Icon" />
      </button>

      <div className={currenciesPannelIsOpen ? "currency-selector open" : "currency-selector"}>
        <div className="currency-scroll-zone">
          <div className="currency-search-input">
            <input
              type="search"
              placeholder="Search for currencies..."
            />
          </div>
          <ul className="currency-list">
            { symbols.map((symbol: {code: any, description: string}) => (
                  <li
                    key={symbol.code}
                    className="currency-item"
                    onClick={() => handleCurrencySelect(symbol)}
                  >
                    <span className="currency-code">{symbol.code}</span>
                    <span className="currency-description">{symbol.description}</span>
                  </li>
                )
              )
            }
          </ul>
        </div>
      </div>

      <div className={keyboardIsOpen ? "keyboard open" : "keyboard"}>
        <button className="key number-key" onClick={() => handleKeyValue(7)}>7</button>
        <button className="key number-key" onClick={() => handleKeyValue(8)}>8</button>
        <button className="key number-key" onClick={() => handleKeyValue(9)}>9</button>
        <button className="key number-key" onClick={() => handleKeyValue(4)}>4</button>
        <button className="key number-key" onClick={() => handleKeyValue(5)}>5</button>
        <button className="key number-key" onClick={() => handleKeyValue(6)}>6</button>
        <button className="key number-key" onClick={() => handleKeyValue(1)}>1</button>
        <button className="key number-key" onClick={() => handleKeyValue(2)}>2</button>
        <button className="key number-key" onClick={() => handleKeyValue(3)}>3</button>
        <button className="key number-key zero" onClick={() => handleKeyValue(0)}>0</button>
        <button className="key number-key comma" onClick={() => handleKeyValue('.')}>,</button>
        <button className="key action-key correction" onClick={() => handleKeyValue('c')}>c</button>
        <button className="key action-key return" onClick={() => setKeyboardIsOpen(false)}><img src={iconReturn} alt="Menu Icon" /></button>
      </div>

    </div>
  );
}

export default Konverter;
