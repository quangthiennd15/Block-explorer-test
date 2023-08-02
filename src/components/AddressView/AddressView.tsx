import * as React from "react";
import { Typography, Card, CardContent } from "@material-ui/core";

export interface IAddressViewProps {
  address: string;
  balance: string;
  txCount: number;
  code: string;
}

function AddressView(props: IAddressViewProps) {
  const { address, balance, txCount} = props;
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{"Address"}: {address}</Typography>
        <Typography variant="h6">{"Balance"}: {balance} ETH</Typography>
        <Typography variant="h6">{"Transactions"}: {txCount}</Typography>
        <br />
        {/* <div>
          <div>{t("Code")}</div>
          <pre>
            <code>{code}</code>
          </pre>
        </div> */}
      </CardContent>
    </Card>
  );
}

export default AddressView;
