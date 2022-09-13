import { useState } from 'react';
import iconMenu from '../../assets/img/icon-menu.svg';
import './konverter.css';


function Konverter() {
  const [currenciesPannelIsOpen, setCurrenciesPannelIsOpen] = useState(false);
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);


  return (
    <div className="konverter">

      <div className="container">
        <div className="currency currency-1">
          <div className="currency-value">1.00</div>
          <div className="currency-name">Euro</div>
        </div>
        <div className="currency currency-2">
          <div className="currency-value">1.09</div>
          <div className="currency-name">United States Dollar</div>
        </div>
      </div>

      <button
        className={currenciesPannelIsOpen ? "currency-selector-btn open" : "currency-selector-btn"}
        onClick={() => setCurrenciesPannelIsOpen(!currenciesPannelIsOpen)}
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

    </div>
  );
}

export default Konverter;
