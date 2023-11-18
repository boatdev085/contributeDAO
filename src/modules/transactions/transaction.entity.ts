import { TransactionResponse } from "alchemy-sdk";
import { BaseEntity } from "src/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: "transaction" })
export abstract class Transaction extends BaseEntity {
  @Column({ type: "varchar", nullable: false })
  txHash?: string;

  @Column({ type: "json", nullable: true })
  tx_detail?: TransactionResponse;
}

// export interface TransactionTypo {
//   hash: string;
//   type: number;
//   accessList: {
//     address: string;
//     storageKeys: string[];
//   }[];
//   blockHash: string;
//   blockNumber: number;
//   transactionIndex: number;
//   confirmations: number;
//   from: string;
//   gasPrice: {
//     type: string;
//     hex: string;
//   };
//   maxPriorityFeePerGas: {
//     type: string;
//     hex: string;
//   };
//   maxFeePerGas: {
//     type: string;
//     hex: string;
//   };
//   gasLimit: {
//     type: string;
//     hex: string;
//   };
//   to: string;
//   value: {
//     type: string;
//     hex: string;
//   };
//   nonce: number;
//   data: string;
//   r: string;
//   s: string;
//   v: number;
//   creates?: null;
//   chainId: number;
// }
