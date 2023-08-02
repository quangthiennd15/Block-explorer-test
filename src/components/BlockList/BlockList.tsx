import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Tooltip } from "@material-ui/core";
import * as React from "react";
import Link from "@material-ui/core/Link";
import {  hexToNumber} from "@etclabscore/eserialize";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const rightPaddingFix = {
  paddingRight: "24px",
};

function BlockList({ blocks }: any) {
  const { t } = useTranslation();
  if (!blocks) {
    return null;
  }
  const sortedBlocks = blocks.sort((a: { number: number }, b: { number: number }) => {
    return b.number - a.number;
  });
  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><Typography>{t("Author")}</Typography></TableCell>
            <TableCell><Typography>{t("Block Number")}</Typography></TableCell>
            <TableCell><Typography>{t("Timestamp")}</Typography></TableCell>
            <TableCell><Typography>{t("Transactions")}</Typography></TableCell>
            <TableCell><Typography>{t("Gas Usage")}</Typography></TableCell>
            <TableCell><Typography>{t("Gas Limit")}</Typography></TableCell>
            <TableCell><Typography>{t("Uncles")}</Typography></TableCell>
            <TableCell><Typography>{t("Hash")}</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedBlocks.map((b: any, index: number) => {
 
            // Shorten hash views by concatenating first and last 4 chars.
            const blockHashShort = b.hash;
            // .substring(2, 6) +
              // "—" + b.hash.substring(b.hash.length - 5, b.hash.length - 1);
            const authorHashShort = b.miner;
            // .substring(2, 6) + "—" +
            //   b.miner.substring(b.miner.length - 5, b.miner.length - 1);

            // // Colorize left border derived from author credit account.
            // const authorHashStyle = {
            //   borderLeft: `1em solid #${b.miner.substring(2, 8)}`,
            // };

            // Tally transactions which create contracts vs transactions with addresses.
            const txTypes = {
              create: 0,
              transact: 0,
            };

            b.transactions.forEach((tx: any) => {
              if (tx.to !== null) {
                txTypes.transact++;
              } else {
                txTypes.create++;
              }
            });


            const currentTimestamp = Math.floor(Date.now() / 1000);
            const diffInSeconds = currentTimestamp - b.timestamp;

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
            // Calculate difference of block timestamp from that of parent.
            // let tdfp;

            // if (index === sortedBlocks.length - 1) {
            //   tdfp = 0;
            // } else {
            //   tdfp = hexToNumber(b.timestamp) -
            //     hexToNumber(sortedBlocks[index + 1].timestamp);
            // }

            return (
              <TableRow key={b.number} >
                <TableCell >
                  <Typography>
                    <Link
                      component={({ className, children }: { children: any, className: string }) => (
                        <RouterLink className={className} to={`/address/${b.miner}`} >
                          {children}
                        </RouterLink>
                      )}>
                      {authorHashShort}
                    </Link>
       
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Link
                    component={({ className, children }: { children: any, className: string }) => (
                      <RouterLink className={className} to={`/block/${b.hash}`} >
                        {children}
                      </RouterLink>
                    )}>
                    {parseInt(b.number, 16)}
                  </Link>
                </TableCell>
                <TableCell style={rightPaddingFix}>
      
                    <Typography>
                    { diffInSeconds < minute ? `${diffInSeconds} seconds ago` : (diffInSeconds < hour && diffInSeconds >= minute) ? `${minutes} ${minutes > 1 ? 'minutes' : 'minute'} ago` : (diffInSeconds < day && diffInSeconds >= hour) ? `${hours} ${hours > 1 ? 'hours' : 'hour'} ago` : (diffInSeconds < month && diffInSeconds >= day) ? `${days} ${days > 1 ? 'days' : 'day'} ago` : (diffInSeconds < year && diffInSeconds >= month) ? `${months} ${months > 1 ? 'months' : 'month'} ago` : `${years} ${years > 1 ? 'years' : 'year'} ago`}
                    </Typography> 
                    
                </TableCell>
                <TableCell style={rightPaddingFix}>
                  <Tooltip
                    title={t("Create Transactions", {count: txTypes.create}) as string}
                    placement="top"
                  >
                    <Typography variant="caption" color="textSecondary">
                      {txTypes.create === 0 ? "" : txTypes.create}
                    </Typography>
                  </Tooltip>
                  <Typography>{txTypes.transact}</Typography>
                </TableCell>
                <TableCell style={rightPaddingFix}>
                <Typography>{hexToNumber(b.gasUsed)}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{hexToNumber(b.gasLimit)}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{b.uncles.length === 0 ? "" : b.uncles.length}</Typography>
                </TableCell>
                <TableCell style={rightPaddingFix}>
                  <Link
                    component={({ className, children }: { children: any, className: string }) => (
                      <RouterLink className={className} to={`/block/${b.hash}`} >
                        {children}
                      </RouterLink>
                    )}>
                    {blockHashShort}
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>

  );
}

export default BlockList;
