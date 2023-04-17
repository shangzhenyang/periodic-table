/**
 * periodic-table
 *
 * @author Shangzhen Yang
 * https://github.com/shangzhenyang/periodic-table
 */

import elements from "./elements.json";

interface ErrorResult {
    error: string;
    message: string;
}

interface ElementResult {
    mass: number;
    mole: number;
    name: string;
    name_chs: string;
    name_cht: string;
    number: number;
    symbol: string;
}

interface CompoundResult {
    mass: number;
    symbol: string;
}

type AllResult = ErrorResult | ElementResult | CompoundResult;

function getElement(searchTerm: string): ElementResult | ErrorResult {
    searchTerm = searchTerm.toLowerCase().trim();
    let mole = 1;
    for (let i = 0; i < elements.length; i++) {
        if (searchTerm.substring(0, 4) === "mono") {
            mole = 1;
            searchTerm = searchTerm.replace("mono", "");
        } else if (searchTerm.substring(0, 2) === "di") {
            mole = 2;
            searchTerm = searchTerm.replace("di", "");
        } else if (searchTerm.substring(0, 3) === "tri") {
            mole = 3;
            searchTerm = searchTerm.replace("tri", "");
        } else if (searchTerm.substring(0, 5) === "tetra") {
            mole = 4;
            searchTerm = searchTerm.replace("tetra", "");
        } else if (searchTerm.substring(0, 5) === "penta") {
            mole = 5;
            searchTerm = searchTerm.replace("penta", "");
        } else if (searchTerm.substring(0, 4) === "hexa") {
            mole = 6;
            searchTerm = searchTerm.replace("hexa", "");
        } else if (searchTerm.substring(0, 5) === "hepta") {
            mole = 7;
            searchTerm = searchTerm.replace("hepta", "");
        } else if (searchTerm.substring(0, 4) === "octa") {
            mole = 8;
            searchTerm = searchTerm.replace("octa", "");
        } else if (searchTerm.substring(0, 4) === "nona") {
            mole = 9;
            searchTerm = searchTerm.replace("nona", "");
        } else if (searchTerm.substring(0, 4) === "deca") {
            mole = 10;
            searchTerm = searchTerm.replace("deca", "");
        } else if (searchTerm.substring(0, 6) === "undeca") {
            mole = 11;
            searchTerm = searchTerm.replace("undeca", "");
        } else if (searchTerm.substring(0, 6) === "dodeca") {
            mole = 12;
            searchTerm = searchTerm.replace("dodeca", "");
        } else if (searchTerm[0] === "一") {
            mole = 1;
            searchTerm = searchTerm.replace("一", "");
        } else if (searchTerm[0] === "二") {
            mole = 2;
            searchTerm = searchTerm.replace("二", "");
        } else if (searchTerm[0] === "三") {
            mole = 3;
            searchTerm = searchTerm.replace("三", "");
        } else if (searchTerm[0] === "四") {
            mole = 4;
            searchTerm = searchTerm.replace("四", "");
        } else if (searchTerm[0] === "五") {
            mole = 5;
            searchTerm = searchTerm.replace("五", "");
        } else if (searchTerm[0] === "六") {
            mole = 6;
            searchTerm = searchTerm.replace("六", "");
        } else if (searchTerm[0] === "七") {
            mole = 7;
            searchTerm = searchTerm.replace("七", "");
        } else if (searchTerm[0] === "八") {
            mole = 8;
            searchTerm = searchTerm.replace("八", "");
        } else if (searchTerm[0] === "九") {
            mole = 9;
            searchTerm = searchTerm.replace("九", "");
        } else if (searchTerm[0] === "十") {
            mole = 10;
            searchTerm = searchTerm.replace("十", "");
        }
        const numRegExp = /\d+/;
        if (numRegExp.test(searchTerm)) {
            const num = parseInt(numRegExp.exec(searchTerm)?.[0] || "0");
            if (num !== parseInt(searchTerm)) {
                mole = num;
                searchTerm = searchTerm.replace(mole.toString(), "");
            }
        }
        if (
            (searchTerm.length <= 2 &&
                elements[i].symbol.toLowerCase() === searchTerm) ||
            (searchTerm.length > 2 &&
                elements[i].name.toLowerCase().includes(searchTerm)) ||
            elements[i].name_chs === searchTerm ||
            elements[i].name_cht === searchTerm ||
            i + 1 === parseInt(searchTerm) ||
            Math.round(elements[i].mass) === Math.round(parseInt(searchTerm))
        ) {
            return {
                mass: elements[i].mass * mole,
                mole: mole,
                name: elements[i].name,
                name_chs: elements[i].name_chs,
                name_cht: elements[i].name_cht,
                number: i + 1,
                symbol: elements[i].symbol
            } as ElementResult;
        }
    }
    return {
        error: "notFound",
        message: "Element not found."
    } as ErrorResult;
}

function getCompound(searchTerm: string, multipler = 1): AllResult {
    const records = [];
    if (searchTerm) {
        searchTerm = searchTerm
            .replaceAll("（", "(")
            .replaceAll("）", ")")
            .trim();
        if (searchTerm.split("(").length > 2) {
            return {
                error: "tooManyParentheses",
                message: "Only one pair of parentheses is allowed."
            } as ErrorResult;
        }
        if (searchTerm.includes("(")) {
            const inParenthesisResults = /\(.*\)/.exec(searchTerm);
            let inParenthesis;
            if (inParenthesisResults?.[0]) {
                inParenthesis = inParenthesisResults[0]
                    .substring(1, inParenthesisResults[0].length - 1);
            } else {
                return {
                    error: "parenthesesError",
                    message: "Errors encountered when parsing parentheses."
                } as ErrorResult;
            }
            const parenthesisNumResults = /\)\d+/.exec(searchTerm);
            let parenthesisNum;
            if (parenthesisNumResults?.[0]) {
                parenthesisNum = parseInt(
                    parenthesisNumResults[0].substring(1)
                );
            } else {
                parenthesisNum = 1;
            }
            const expanded = getCompound(inParenthesis, parenthesisNum);
            if (!isErrorResult(expanded)) {
                searchTerm = searchTerm.replace(/\(.*\)\d+/, expanded.symbol);
            }
        }
        const letters = searchTerm.split("");
        const uppercaseRegExp = /[A-Z]+/;
        if (searchTerm.includes(" ") || uppercaseRegExp.test(searchTerm)) {
            let elementName = "";
            const tempRecords = [];
            for (let i = 0; i < letters.length; i++) {
                elementName += letters[i];
                const result = getElement(elementName.toLowerCase());
                if (!isErrorResult(result)) {
                    tempRecords.push([
                        {
                            symbol: result.symbol,
                            mole: result.mole * multipler,
                            mass: result.mass * multipler
                        }
                    ]);
                }
                if (
                    letters[i] === " " ||
                    uppercaseRegExp.test(letters[i + 1])
                ) {
                    records.push(tempRecords.at(-1));
                    tempRecords.length = 0;
                    elementName = "";
                }
            }
            records.push(tempRecords.at(-1));
        } else if (searchTerm.includes("化")) {
            const characters = searchTerm.split("化");
            const resultA = getElement(characters[1]);
            if (!isErrorResult(resultA)) {
                records.push([
                    {
                        symbol: resultA.symbol,
                        mole: resultA.mole,
                        mass: resultA.mass
                    }
                ]);
            }
            const resultB = getElement(characters[0]);
            if (!isErrorResult(resultB)) {
                records.push([
                    {
                        symbol: resultB.symbol,
                        mole: resultB.mole,
                        mass: resultB.mass
                    }
                ]);
            }
        } else {
            const result = getElement(searchTerm);
            if (isErrorResult(result)) {
                const zhRegExp = /[\u4e00-\u9fa5]+/;
                if (zhRegExp.test(searchTerm)) {
                    return {
                        error: "incorrectFormat",
                        message: "Please follow the format of \"几啥化几啥\"."
                    } as ErrorResult;
                } else {
                    return {
                        error: "notFount",
                        message: "The queried compound was not found."
                    } as ErrorResult;
                }
            }
            return result as ElementResult;
        }
        let mass = 0;
        let symbol = "";
        for (const record of records) {
            if (record) {
                symbol += record[0].symbol;
                if (record[0].mole > 1) {
                    symbol += record[0].mole;
                }
                mass += record[0].mass;
            }
        }
        return {
            mass: mass,
            symbol: symbol
        } as CompoundResult;
    }
    return {
        error: "notFound",
        message: "Compound not found."
    } as ErrorResult;
}

export function isErrorResult(result: AllResult): result is ErrorResult {
    return !!(result as ErrorResult).error;
}

export { elements, getCompound, getElement };
