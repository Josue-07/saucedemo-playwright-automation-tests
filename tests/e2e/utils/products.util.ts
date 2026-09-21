export class ProductUtils {

    static convertPrecosStringToDecimal(precos: string[]): number[] {
        return precos.map(preco => parseFloat(preco.replace('$', '').trim()))
    }
}