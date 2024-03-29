import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  upper_bound: number,
  lower_bound: number,
  trigger_alert:number |undefined,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]):Row {
    const priceABC=(serverRespond[0].top_ask.price+serverRespond[0].top_bid.price)/2;
    const priceDEF=(serverRespond[1].top_ask.price+serverRespond[1].top_bid.price)/2;
    const ratio=priceABC/priceDEF;
    const upperBond=1+0.05;
    const lowerBond=1-0.05;  
    return {
        price_abc:priceABC,
        price_def:priceDEF,
        ratio,
        timestamp: serverRespond[0].timestamp>serverRespond[1].timestamp?
        serverRespond[0].timestamp : serverRespond[1].timestamp,
        upper_bound:upperBond,
        lower_bound:lowerBond,
        trigger_alert:(ratio>upperBond||ratio<lowerBond)?ratio:undefined,
      };
  }
}
