/* This project is based on this Youtube tutorials:
1. Webpack 5: https://www.youtube.com/watch?v=9c3dBhvtt6o
2: Webpack (in-depth coverage based on webpack 4 (necessitating numerous changes)): https://www.youtube.com/watch?v=MpGLUVbqoYQ
3: https://morioh.com/p/i01HVgTKTuRo */

// import style from './main.css'
import 'regenerator-runtime/runtime' // Solves an async problem with babel. See https://dev.to/hulyakarakaya/how-to-fix-regeneratorruntime-is-not-defined-doj
import './styles/main.css'
import './styles/style-responsive.css'
/* import component from './component.js'
document.body.append(component()) */
const axios = require('axios')
// Start of test
/************************************************************
 ************************  Selectors *************************
 ************************************************************/
const amountInput = document.getElementById('cash_count')
const incurrencyInput = document.getElementById('currency_at_hand')
const outCurrencyInput = document.getElementById('currency_desired')
const submitBtn = document.getElementById('currency-input')

const answerContainer = document.getElementById('results-in') /// ///// To check this out closely later

/************************************************************
 ************************  Event listeners *******************
 ************************************************************/
submitBtn.addEventListener('click', getToWork)

/************************************************************
 ***********************  Functions ************************
 ************************************************************/
function getToWork (event) {
  event.preventDefault() // Prevents default behavior, submitting the button
  answerContainer.classList.add('ans-cont-1')
  answerContainer.innerText = 'Waiting...'
  atWork()
}
const atWork = async () => {
  answerContainer.style.marginTop = '150px' // Push results down
  document.getElementById('main').style.minHeight = '60vh'
  try {
    const amount = amountInput.value // 10
    const inCurrency = incurrencyInput.value // KES
    const outCurrency = outCurrencyInput.value // USD
    /* This may be a good place to check for empy inputs and
    return an error message with red warning-type background */
    let soln = await convert(inCurrency, outCurrency, amount)
    console.log('Return value: ' + soln)
    answerContainer.innerHTML = soln
  } catch (error) {
    console.log('Results ni wewe!!!')
    answerContainer.innerText = error.message
  }
  createButton()
}
const createButton = () => {
  const btnContainer = document.createElement('div')
  const convertAgainBtn = document.createElement('button')
  convertAgainBtn.classList.add('convert-again-btn')
  convertAgainBtn.innerHTML = '<a href="index.html">Convert Again</a>'
  btnContainer.appendChild(convertAgainBtn)
  answerContainer.appendChild(btnContainer)
}
// End of test
// console.log('Hello there')
const getExchangeRate = async (fromCurrency, toCurrency) => {
  try {
    const sourceCurrency = `USD${fromCurrency}` // Example USDKES
    const finalCurrency = `USD${toCurrency}` // Example USDHRK
    const response = await axios.get(
      'http://api.currencylayer.com/live?access_key=af908b96fc9d56f13d11929909a54b1c'
    )
    console.log(response)
    const rate = response['data']['quotes'][sourceCurrency] // Example "USDKES":100.9445, which yield 100.9445
    const dollarRate = 1 / rate // 1 / 100.9445 = 0.0099064
    const conversionCurrencyRate = response['data']['quotes'][finalCurrency] // e.g. "USDHRK":6.594197
    return dollarRate * conversionCurrencyRate // 0.0099064 * 6.594197
  } catch (error) {
    throw new Error(
      `Unable to get currency data using ${fromCurrency} and ${toCurrency}. Please try again.\n If the problem persists, please contact us`
    )
  }
}

const getCountries = async (currencyCode) => {
  try {
    const response = await axios.get(
      `http://api.countrylayer.com/v2/currency/${currencyCode}?access_key=e2babe7843010bd817bf049122dcefa4`
    )
    const countries = response.data.map((country) => country.name)
    // console.log(countries)
    return countries
  } catch (error) {
    throw new Error(
      `Sorry. Our system was unable to find countries that use ${currencyCode}.`
    )
  }
}

const convert = async (fromCurrency, toCurrency, amount) => {
  const exchangeRate = await getExchangeRate(fromCurrency, toCurrency)
  const countries = await getCountries(toCurrency)
  const convertedAmount = (amount * exchangeRate).toFixed(2)
  // Test begins
  let temp = `<div class="list-cont-outer"><p>${amount} ${currencyChart[fromCurrency]} equals ${convertedAmount} ${currencyChart[toCurrency]}. You can use ${currencyChart[toCurrency]} in the following countries:</p></div>`
  temp += '<div class="list-cont-inner"><ol>'
  countries.forEach(country => {
    temp += `<li class="ctries-list-item">${country}</li>`
  })
  temp += '</ol></div>'
  console.log(temp)
  return temp
  // Test ends
  // Original return statement
  /* return `${amount} ${currencyChart[fromCurrency]} equals ${convertedAmount} ${currencyChart[toCurrency]}. You can use ${currencyChart[toCurrency]} in:\n${countries}` */
}

const currencyChart = {
  AFN: 'Afghan afghani',
  ALL: 'Albanian lek',
  DZD: 'Algerian dinar',
  AOA: 'Angolan Kwanza',
  ARS: 'Argentine Peso',
  AMD: 'Armenian Dram',
  AWG: 'Aruban Florin',
  AUD: 'Australian Dollar',
  AZN: 'Azerbaijanian Manat',
  BSD: 'Bahamian Dollar',
  BHD: 'Bahraini Dinar',
  BDT: 'Bangladeshi taka',
  BBD: 'Barbadian dollar',
  BYN: 'Belarusian ruble',
  BZD: 'Belize Dollar',
  BMD: 'Bermudian Dollar',
  BTN: 'Bhutanese ngultrum',
  BOB: 'Bolivian boliviano',
  BAM: 'Bosnia and Herzegovina convertible mark',
  BWP: 'Botswana pula',
  BRL: 'Brazilian Real',
  BND: 'Brunei Dollar',
  BGN: 'Bulgarian Lev',
  BIF: 'Burundi Franc',
  CVE: 'Cabo Verde Escudo',
  KHR: 'Cambodian riel',
  CAD: 'Canadian Dollar',
  KYD: 'Cayman Islands Dollar',
  XAF: 'Central African CFA franc',
  XPF: 'CFP Franc',
  CLP: 'Chilean Peso',
  CNY: 'Chinese Yuan Renminbi',
  COP: 'Colombian Peso',
  KMF: 'Comorian Franc',
  CDF: 'Congolese Franc',
  CRC: 'Costa Rican Colon',
  HRK: 'Croatian Kuna',
  CUP: 'Cuban Peso',
  CZK: 'Czech Koruna',
  DKK: 'Danish Krone',
  DJF: 'Djibouti Franc',
  DOP: 'Dominican Peso',
  XCD: 'East Caribbean Dollar',
  EGP: 'Egyptian Pound',
  SVC: 'El Salvador Colon',
  ERN: 'Eritrean nakfa',
  ETB: 'Ethiopian Birr',
  EUR: 'European euro',
  FKP: 'Falkland Islands Pound',
  FJD: 'Fijian Dollar',
  GMD: 'Gambian dalasi',
  GEL: 'Georgian lari',
  GHS: 'Ghanaian Cedi',
  GIP: 'Gibraltar Pound',
  GTQ: 'Guatemalan quetzal',
  GGP: 'Guernsey Pound',
  GNF: 'Guinean Franc',
  GYD: 'Guyanese Dollar',
  HTG: 'Haitian gourde',
  HNL: 'Honduran lempira',
  HKD: 'Hong Kong Dollar',
  HUF: 'Hungarian forint',
  ISK: 'Icelandic Krona',
  INR: 'Indian Rupee',
  IDR: 'Indonesian rupiah',
  IRR: 'Iranian Rial',
  IQD: 'Iraqi Dinar',
  ILS: 'Israeli new shekel',
  JMD: 'Jamaican Dollar',
  JPY: 'Japanese yen',
  JEP: 'Jersey pound',
  JOD: 'Jordanian Dinar',
  KZT: 'Kazakhstani tenge',
  KES: 'Kenyan Shilling',
  KWD: 'Kuwaiti Dinar',
  KGS: 'Kyrgyzstani som',
  LAK: 'Lao kip',
  'Lebanese Pound': 'Lebanese Pound',
  LSL: 'Lesotho loti',
  LRD: 'Liberian Dollar',
  LYD: 'Libyan Dinar',
  LTL: 'Lithuanian Litas',
  MOP: 'Macanese pataca',
  MKD: 'Macedonian denar',
  MGA: 'Malagasy ariary',
  MWK: 'Malawian kwacha',
  MYR: 'Malaysian Ringgit',
  MVR: 'Maldivian rufiyaa',
  MRO: 'Mauritanian ouguiya',
  MUR: 'Mauritian Rupee',
  MXN: 'Mexican Peso',
  MDL: 'Moldovan Leu',
  MNT: 'Mongolian tugrik',
  MAD: 'Moroccan Dirham',
  MZN: 'Mozambican metical',
  MMK: 'Myanmar kyat',
  NAD: 'Namibian Dollar',
  NPR: 'Nepalese Rupee',
  ANG: 'Netherlands Antillean guilder',
  NZD: 'New Zealand Dollar',
  NIO: 'Nicaraguan cordoba',
  NGN: 'Nigerian naira',
  KPW: 'North Korean Won',
  NOK: 'Norwegian Krone',
  OMR: 'Omani rial',
  PKR: 'Pakistan Rupee',
  PGK: 'Papua New Guinean kina',
  PYG: 'Paraguayan guarani',
  PEN: 'Peruvian sol',
  PHP: 'Philippine peso',
  PLN: 'Polish zloty',
  GBP: 'Pound sterling (GBP)',
  QAR: 'Qatari Rial',
  RON: 'Romanian Leu',
  RUB: 'Russian ruble',
  RWF: 'Rwandan franc',
  SHP: 'Saint Helena Pound',
  WST: 'Samoan tala',
  STD: 'Sao Tome and Principe dobra',
  SAR: 'Saudi Arabian riyal',
  RSD: 'Serbian dinar',
  SCR: 'Seychellois rupee',
  SLL: 'Sierra Leonean leone',
  SGD: 'Singapore Dollar',
  SBD: 'Solomon Islands dollar',
  SOS: 'Somali shilling',
  ZAR: 'South African rand',
  KRW: 'South Korean won',
  SSP: 'South Sudanese pound',
  LKR: 'Sri Lanka Rupee',
  SDG: 'Sudanese pound',
  SRD: 'Surinamese dollar',
  SZL: 'Swazi lilangeni',
  SEK: 'Swedish Krona',
  CHF: 'Swiss Franc',
  SYP: 'Syrian Pound',
  TWD: 'New Taiwan dollar',
  TJS: 'Tajikistani somoni',
  TZS: 'Tanzanian Shilling',
  THB: 'Thai baht',
  TOP: 'Tongan pa’anga',
  TTD: 'Trinidad and Tobago dollar',
  TND: 'Tunisian Dinar',
  TRY: 'Turkish lira',
  TMT: 'Turkmen manat',
  AED: 'UAE dirham',
  UGX: 'Ugandan shilling',
  UAH: 'Ukrainian hryvnia',
  USD: 'United States dollar',
  UYU: 'Uruguayan peso',
  UZS: 'Uzbekistani som',
  VUV: 'Vanuatu vatu',
  VEF: 'Venezuelan bolivar',
  VND: 'Vietnamese dong',
  XOF: 'West African CFA franc',
  YER: 'Yemeni rial',
  ZMW: 'Zambian kwacha'
}

// Test the program
/* convert('USD', 'HRK', 20)
  .then(message => console.log(message))
  .catch(error => console.log(error.message)) */
