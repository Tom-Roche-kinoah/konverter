import { useState } from 'react';
import iconMenu from '../../assets/img/icon-menu.svg';
import iconReturn from '../../assets/img/icon-return.svg';
import './konverter.css';


function Konverter() {
  const [currenciesPannelIsOpen, setCurrenciesPannelIsOpen] = useState(false);
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const [inputValue1, setInputValue1] = useState('1.00');
  const [newInput, setNewInput] = useState(false);

  const handleOpenKeyboard = () => {
    setKeyboardIsOpen(true);
    setNewInput(true);
    setCurrenciesPannelIsOpen(false);
  }

  const handleOpenCurrenciesPannel = () => {
    setCurrenciesPannelIsOpen(!currenciesPannelIsOpen);
    setKeyboardIsOpen(false);
  }

  const handleKeyValue = (value: number|'c'|'.') => {
    // if 'c' => set value to 0 then exit
    if (value === 'c') {
      setInputValue1('0');
      return;
    }
    // if ',' => check if its not already in string
    if (value === '.' && inputValue1.includes('.')) {
      return;
    }
    // if 0 => replace it
    if (inputValue1 === '0') {
      setInputValue1('' + value);
      return;
    }
    // if new opening => replace current value
    if (newInput) {
      setInputValue1('' + value);
      setNewInput(false);
      return;
    }
    // if string < 11 characters => concat
    if (inputValue1.length <= 11 ) {
      setInputValue1((inputValue1 + value));
    }
  };

  return (
    <div className="konverter">

      <div className="container">
        <div className="currency currency-1" onClick={() => handleOpenKeyboard()}>
          <div className="currency-value">{inputValue1}</div>
          <div className="currency-name">Euro</div>
        </div>
        <div className="currency currency-2">
          <div className="currency-value">{(Number(inputValue1) * 1.09).toFixed(2)}</div>
          <div className="currency-name">United States Dollar</div>
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
            <li className="currency-item">Australian Dollar</li>
            <li className="currency-item">Brazilian Real</li>
            <li className="currency-item">British Pound</li>
            <li className="currency-item">Bulgarian Lev</li>
            <li className="currency-item">Canadian Dollar</li>
            <li className="currency-item">Chinese Renminbi Yuan</li>
            <li className="currency-item">Croatian Kuna</li>
            <li className="currency-item">Czech Koruna</li>
            <li className="currency-item">Danish Krone</li>
            <li className="currency-item">Hong Kong Dollar</li>
            <li className="currency-item">Hungarian Forint</li>
            <li className="currency-item">Icelandic Króna</li>
            <li className="currency-item">Indian Rupee</li>
            <li className="currency-item">Indonesian Rupiah</li>
            <li className="currency-item">Israeli New Sheqel</li>
            <li className="currency-item">Japanese Yen</li>
            <li className="currency-item">Malaysian Ringgit</li>
            <li className="currency-item">Mexican Peso</li>
            <li className="currency-item">New Zealand Dollar</li>
            <li className="currency-item">Norwegian Krone</li>
            <li className="currency-item">Philippine Peso</li>
            <li className="currency-item">Polish Złoty</li>
            <li className="currency-item">Romanian Leu</li>
            <li className="currency-item">Russian Ruble</li>
            <li className="currency-item">Singapore Dollar</li>
            <li className="currency-item">South African Rand</li>
            <li className="currency-item">South Korean Won</li>
            <li className="currency-item">Swedish Krona</li>
            <li className="currency-item">Swiss Franc</li>
            <li className="currency-item">Thai Baht</li>
            <li className="currency-item">Turkish Lira</li>
            <li className="currency-item">United States Dollar</li>
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
