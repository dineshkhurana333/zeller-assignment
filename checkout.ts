const products: PricingRule[] = [
    {
        sku: 'ipd',
        name: 'Super iPad',
        price: '$549.99',
        discountPrice: '$499.99',
        discountQuantity: 5
    },
    {
        sku: 'mbp',
        name: 'MacBook Pro',
        price: '$1399.99',
    },
    {
        sku: 'atv',
        name: 'Apple TV',
        price: '$109.50',
        discountQuantity: 3
    },
    {
        sku: 'vga',
        name: 'VGA adapter',
        price: '$30.00',
    }
]

interface PricingRule {
    sku: string;
    name: string;
    price: string;
    discountQuantity?: number;
    discountPrice?: string;
}

class Checkout {
    cart: any = {}
    pricingRules: PricingRule[]

    constructor(pricingRules: PricingRule[]) {
        this.pricingRules = pricingRules
    }

    // t = {
    //     'atv': {
    //         count: 1
    //     }
    // }

    scan(product: string) {
        if (this.cart[product]) {
            this.cart[product]['count'] += 1
        } else {
            this.cart[product] = {
                ['count']: 1
            }
        }
    }

    getBulkDiscount(pricingRule: PricingRule, quantity: number) { // 5
        console.log('quantity::::: ', quantity)
        let price = 0
        if (pricingRule.discountPrice) {
            price = parseInt(pricingRule.discountPrice!.replace('$', '')) * quantity
        } else {
            price = parseInt(pricingRule.price.replace('$', '')) * (quantity - 1)

        }
        return price
    }

    total() {
        if (!this.cart) {
            throw new Error('Cart is empty')
        }

        let grandTotal = 0

        for (let product in this.cart) {
            const pricingRule = this.pricingRules.find(ele => ele.sku === product) as any
            const quantity = this.cart[product].count

            if (pricingRule.discountQuantity && quantity >= pricingRule.discountQuantity) {
                grandTotal += this.getBulkDiscount(pricingRule, quantity);
            } else {
                grandTotal += pricingRule.price ? +pricingRule.price.replace('$', '') * quantity : 0;
            }
        }

        return grandTotal

    }
}

const co = new Checkout(products);
co.scan('atv');
co.scan('ipd');
co.scan('ipd');
co.scan('atv');
co.scan('ipd');
co.scan('ipd');
co.scan('ipd');
const result = co.total();

console.log(result)

// NOTE:::: a minor calculation is different, may be due to some decimals

