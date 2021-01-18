interface Asset {
  readonly ticker: string;
  readonly balance: number;
  readonly targetAllocation: number;
}

export default Asset;
