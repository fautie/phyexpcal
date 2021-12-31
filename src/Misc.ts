import { data } from "./data";
import { get } from "svelte/store";
import nerdamer from "nerdamer/all.min";
const Calculator = {
    /**
     * 创建一个数据并插入数据列
     */
    createSingleItem() {
        let item: SINGLE = { symbol: '', unit: '', value: 0, grad: 0 };
        let pointer = 0;
        data.update(state => {
            pointer = state.SINGLE.push(item) - 1;
            return state;
        });
        return pointer;
    },
    removeSingleItem(pointer: number) {
        data.update(state => {
            state.SINGLE.splice(pointer, 1);
            return state;
        })
    },
    calculateSingle(pointer: number, d?: DATA) {
        if (!d) d = get(data);
        let ori = d.SINGLE[pointer];
        let res = {
            symbol: ori.symbol,
            unit: ori.unit,
            value: ori.value,
            uncertaintyA: 0,
            uncertaintyB: ori.grad / (2 * 3 ** .5),
            uncertainty: null,
            relativeUncertainty: null,
            latexForm: null,
            fullLatexForm: null
        };
        res.uncertainty = res.uncertaintyB;
        res.relativeUncertainty = (res.uncertainty / res.value * 100).toFixed(1);
        res.latexForm = `${res.symbol} = (${res.value} \\pm ${res.uncertainty})~\\mathrm{${res.unit}} \\ E_{${res.symbol}} = ${res.relativeUncertainty} \\%`;
        res.fullLatexForm = `\\overline{${res.symbol}} = ${res.value}~\\mathrm{${res.unit}} 
        \\\\ \\sigma_{A, ${res.symbol}}=${res.uncertaintyA}~\\mathrm{${res.unit}}, \\sigma_{B, ${res.symbol}}=\\frac{\\mathrm{minGrad}}{2\\sqrt3}=${res.uncertaintyB}~\\mathrm{${res.unit}}
        \\\\ \\sigma_{${res.symbol}}=\\sqrt{\\sigma_{A, ${res.symbol}}^2+\\sigma_{B, ${res.symbol}}^2}=${res.uncertainty}~\\mathrm{${res.unit}}
        \\\\ E_{${res.symbol}}=\\frac{\\sigma_{${res.symbol}}}{${res.symbol}}=${res.relativeUncertainty}\\%\\\\`+res.latexForm;
        return res;
    },
    createMultiItem() {
        let item: MULTI = { symbol: '', unit: '', values: [], grad: 0, len: 0 };
        let pointer = 0;
        data.update(state => {
            pointer = state.MULTI.push(item) - 1;
            return state;
        });
        return pointer;
    },
    removeMultiItem(pointer: number) {
        data.update(state => {
            state.MULTI.splice(pointer, 1);
            return state;
        })
    },
    calculateMulti(pointer: number, d?: DATA) {
        if (!d) d = get(data);
        let ori = d.MULTI[pointer];
        let res = {
            symbol: ori.symbol,
            unit: ori.unit,
            value: ((values) => values.reduce((a, b) => a + b) / values.length)(ori.values),
            uncertaintyA: ((values) => {
                let n = values.length;
                let average = values.reduce((a, b) => a + b) / n;
                let ua = (values.reduce((a, b) => a + (b - average) ** 2, 0) / (n * (n - 1))) ** .5;
                return ua;
            })(ori.values),
            uncertaintyB: ori.grad / (2 * 3 ** .5),
            uncertainty: null,
            relativeUncertainty: null,
            latexForm: null,
            fullLatexForm: null
        };
        res.uncertainty = (res.uncertaintyA ** 2 + res.uncertaintyB ** 2) ** .5;
        res.relativeUncertainty = (res.uncertainty / res.value * 100).toFixed(1);
        res.latexForm = `${res.symbol} = (${res.value} \\pm ${res.uncertainty})~\\mathrm{${res.unit}} \\ E_{${res.symbol}} = ${res.relativeUncertainty} \\%`;
        res.fullLatexForm = `\\overline{${res.symbol}} =\\frac{\\sum_{i=1}^{${ori.len}}{${res.symbol}_i}}{${ori.len}}= ${res.value}~\\mathrm{${res.unit}} 
        \\\\ \\sigma_{A, ${res.symbol}}=\\sqrt{
            \\frac{
                \\sum_{i=1}^{${ori.len}}{
                    (${res.symbol}_i-\\overline{${res.symbol}})^2
                }
            }{${ori.len}*${ori.len-1}}
        }
        =${res.uncertaintyA}~\\mathrm{${res.unit}}, \\sigma_{B, ${res.symbol}}=\\frac{\\mathrm{minGrad}}{2\\sqrt3}=${res.uncertaintyB}~\\mathrm{${res.unit}}
        \\\\ \\sigma_{${res.symbol}}=\\sqrt{\\sigma_{A, ${res.symbol}}^2+\\sigma_{B, ${res.symbol}}^2}=${res.uncertainty}~\\mathrm{${res.unit}}
        \\\\ E_{${res.symbol}}=\\frac{\\sigma_{${res.symbol}}}{${res.symbol}}=${res.relativeUncertainty}\\%\\\\`+res.latexForm;
        return res;
    },
    createConstantItem() {
        let item: CONSTANT = { symbol: '', unit: '', value: 0 };
        let pointer = 0;
        data.update(state => {
            pointer = state.CONSTANT.push(item) - 1;
            return state;
        });
        return pointer;
    },
    removeConstantItem(pointer: number) {
        data.update(state => {
            state.CONSTANT.splice(pointer, 1);
            return state;
        })
    },
    calculateConstant(pointer: number, d?: DATA) {
        if (!d) d = get(data);
        let ori = d.CONSTANT[pointer];
        let res = {
            symbol: ori.symbol,
            unit: ori.unit,
            value: ori.value,
            latexForm: null,
        };
        res.latexForm = `${res.symbol} = ${res.value}~\\mathrm{${res.unit}}`;
        return res;
    },
    createFormulaItem() {
        let item: FORMULA = { value: '' };
        let pointer = 0;
        data.update(state => {
            pointer = state.FORMULA.push(item) - 1;
            return state;
        });
        return pointer;
    },
    removeFormulaItem(pointer: number) {
        data.update(state => {
            state.FORMULA.splice(pointer, 1);
            return state;
        })
    },
    calculateFormula(pointer: number, d?: DATA) {
        if (!d) d = get(data);
        let ori = d.FORMULA[pointer];
        let known = {};
        let uncer = {};
        let unito = {};
        let res = {
            symbol: null,
            unit: null,
            value: null,
            uncertainty: null,
            relativeUncertainty: null,
            latexForm: null,
            fullLatexForm: null
        }
        let calform = null;
        [res.symbol, calform] = ori.value.split("=").map(a=>a.trim());
        for (let i = 0; i < d.SINGLE.length; i++) {
            let cal = Calculator.calculateSingle(i,d);
            known[d.SINGLE[i].symbol] = cal.value;
            uncer[d.SINGLE[i].symbol] = cal.uncertainty;
            unito[d.SINGLE[i].symbol] = cal.unit;
        }
        for (let i = 0; i < d.MULTI.length; i++) {
            let cal = Calculator.calculateMulti(i,d);
            known[d.MULTI[i].symbol] = cal.value;
            uncer[d.MULTI[i].symbol] = cal.uncertainty;
            unito[d.MULTI[i].symbol] = cal.unit;
        }
        for (let i = 0; i < d.CONSTANT.length; i++) {
            let cal = Calculator.calculateConstant(i,d);
            known[d.CONSTANT[i].symbol] = cal.value;
            unito[d.CONSTANT[i].symbol] = cal.unit;
        }
        for (let i = 0; i < pointer; i++) {
            let cal = Calculator.calculateFormula(i,d);
            known[d.FORMULA[i].value.split("=")[0].trim()] = cal.value;
            uncer[d.FORMULA[i].value.split("=")[0].trim()] = cal.uncertainty;
            unito[d.FORMULA[i].value.split("=")[0].trim()] = cal.unit;
        }
        calform = nerdamer(calform);
        res.value = nerdamer(calform,known).evaluate().text();
        res.unit = nerdamer.convertToLaTeX(nerdamer(calform,unito).evaluate().text());
        let u = nerdamer("0");
        for(let key of Object.keys(uncer)){
            u = u.add(nerdamer(nerdamer.diff(calform,key), known).evaluate().multiply(uncer[key]).pow(2));
        }
        res.uncertainty = u.pow(0.5).evaluate().text();
        res.relativeUncertainty = (parseFloat(res.uncertainty)/parseFloat(res.value)*100).toFixed(1);
        res.latexForm = `${res.symbol} = (${res.value} \\pm ${res.uncertainty})~\\mathrm{${res.unit}} \\ E_{${res.symbol}} = ${res.relativeUncertainty} \\%`;
        res.fullLatexForm = `${ori.value} = ${res.value}~\\mathrm{${res.unit}} \\\\
        \\sigma_{${res.symbol}}=\\sqrt{${Object.keys(uncer).map(val=>"(\\frac{\\partial("+res.symbol+")}{\\partial("+val+")}\\sigma_{"+val+"})^2").join("+")}}=${res.uncertainty})~\\mathrm{${res.unit}}
        \\\\E_{${res.symbol}}=\\frac{\\sigma_{${res.symbol}}}{${res.symbol}}=${res.relativeUncertainty}\\%\\\\`+res.latexForm;
        return res;
    }
};
export default Calculator;