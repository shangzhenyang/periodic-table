# periodic-table

It contains the entire periodic table and has handy functions that return information about elements and compounds. It supports both Node.js and browsers.

## Installation

```bash
npm install @shangzhen/periodic-table
```

## Usage

```javascript
import {
    elements,
    getElement,
    getCompound,
    isErrorResult
} from "@shangzhen/periodic-table";

// Get all elements
console.log(elements);

// Get element
getElement("8"); // by atomic number
getElement("o"); // by symbol
getElement("oxygen"); // by name
getElement("氧"); // by Chinese name
getElement("15.999"); // by atomic mass

// Get compound
getCompound("carbon dioxide"); // by name
getCompound("CO2"); // by formula with proper case
getCompound("c o2"); // by formula with space
getCompound("二氧化碳"); // by Chinese name
getCompound("Fe2(SO4)3"); // by formula with parentheses

// Check if the result is an error
isErrorResult(getElement("abc")); // true
```

## Returned Data
```javascript
// ElementResult
{
    "mass": 15.999,
    "mole": 1,
    "name": "Oxygen",
    "name_chs": "氧",
    "name_cht": "氧",
    "number": 8,
    "symbol": "O"
}

// CompoundResult
{
    "mass": 44.009,
    "symbol": "CO2"
}

// ErrorResult
{
    "error": "notFound",
    "message": "Element not found."
}
```

`getElement` returns either an `ElementResult` or an `ErrorResult`.

`getCompound` returns either a `CompoundResult`, an `ElementResult`, or an `ErrorResult`.

## License

[MIT](LICENSE).
