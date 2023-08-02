import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import TxList from "../TxList";
import { hexToNumber } from "@etclabscore/eserialize";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { Table, TableBody, TableCell, TableRow, Button, LinearProgress, Typography } from "@material-ui/core";

import BlockGasPrice from "./BlockGasPrice";

function BlockView(props: any) {
  const { block } = props;
  const history = useHistory();
  const { t } = useTranslation();

  if (!block) {
    return (<div>Loading...</div>);
  }

  const {
    timestamp, hash, parentHash, miner, nonce, difficulty, transactions,
    gasUsed, gasLimit, size,
  } = block;

  const filledPercent = (hexToNumber(gasUsed) / hexToNumber(gasLimit)) * 100;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const diffInSeconds = currentTimestamp - timestamp;

  // Define time units in seconds
  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;
  const minutes = Math.floor(diffInSeconds / minute);
  const hours = Math.floor(diffInSeconds / hour);
  const days = Math.floor(diffInSeconds / day);
  const months = Math.floor(diffInSeconds / month);
  const years = Math.floor(diffInSeconds / year);
  return (
    <div>
      <Button
        onClick={() => { history.push(`/block/${block.hash}/raw`); }}
        style={{ position: "absolute", right: "10px", top: "75px" }}
      >
        View Raw
      </Button>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>{t("Number")}</TableCell>
            <TableCell>{hexToNumber(block.number)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t("Gas Usage")}</TableCell>
            <TableCell>
              <Typography variant="caption">
                {hexToNumber(gasUsed)}/{hexToNumber(gasLimit)}
              </Typography>
              <LinearProgress
                style={{width: "150px"}}
                value={filledPercent}
                variant="determinate"
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t("Timestamp")}</TableCell>
            <TableCell>
            <Typography>
                    { diffInSeconds < minute ? `${diffInSeconds} seconds ago` : (diffInSeconds < hour && diffInSeconds >= minute) ? `${minutes} ${minutes > 1 ? 'minutes' : 'minute'} ago` : (diffInSeconds < day && diffInSeconds >= hour) ? `${hours} ${hours > 1 ? 'hours' : 'hour'} ago` : (diffInSeconds < month && diffInSeconds >= day) ? `${days} ${days > 1 ? 'days' : 'day'} ago` : (diffInSeconds < year && diffInSeconds >= month) ? `${months} ${months > 1 ? 'months' : 'month'} ago` : `${years} ${years > 1 ? 'years' : 'year'} ago`}
            </Typography> 
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t("Hash")}</TableCell>
            <TableCell>{hash}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t("ParentHash")}</TableCell>
            <TableCell>
              <Link
                component={({ className, children }: { children: any, className: string }) => (
                  <RouterLink className={className} to={`/block/${parentHash}`}>
                    {children}
                  </RouterLink>
                )}>
                {parentHash}
              </Link>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t("Miner")}</TableCell>
            <TableCell>
              <Link
                component={({ className, children }: { children: any, className: string }) => (
                  <RouterLink className={className} to={`/address/${miner}`}>
                    {children}
                  </RouterLink>
                )}>
                {miner}
              </Link>
            </TableCell>
          </TableRow>

          <BlockGasPrice block={block} />

          <TableRow>
            <TableCell>{t("Gas Limit")}</TableCell>
            <TableCell>{hexToNumber(gasLimit)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t("Size")}</TableCell>
            <TableCell>{hexToNumber(size)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t("Nonce")}</TableCell>
            <TableCell>{hexToNumber(nonce)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t("Difficulty")}</TableCell>
            <TableCell>{hexToNumber(difficulty)}</TableCell>
          </TableRow>

          {/* <TableRow>
            <TableCell>{t("Extra Data")}</TableCell>
            <TableCell>
              {extraData}
              
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t("State Root")}</TableCell>
            <TableCell>{stateRoot}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t("Transaction Root")}</TableCell>
            <TableCell>{transactionsRoot}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t("Receipts Root")}</TableCell>
            <TableCell>{receiptsRoot}</TableCell>
          </TableRow> */}
        </TableBody>
      </Table>

      <TxList transactions={transactions} />
    </div>
  );
}

export default BlockView;
