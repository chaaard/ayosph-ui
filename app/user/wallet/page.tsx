"use client";

import { useState } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { walletData } from "@/lib/mockData";

export default function WalletPage() {
  const [balance, setBalance] = useState(walletData.balance);
  const [transactions, setTransactions] = useState(
    walletData.transactions
  );
  const [amount, setAmount] = useState("");

  const handleReload = () => {
    const value = Number(amount);

    if (!value || value <= 0) return;

    const newTransaction = {
      id: Date.now(),
      type: "reload",
      amount: value,
      date: new Date().toISOString().split("T")[0],
    };

    setBalance((prev) => prev + value);
    setTransactions((prev) => [newTransaction, ...prev]);
    setAmount("");
  };

  return (
    <>
      <Sidebar />
      <Topbar />

      <Box>
        <Typography variant="h4">
          Wallet
        </Typography>

        <Grid container spacing={3}>
          {/* BALANCE CARD */}
          <Grid>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6">Current Balance</Typography>
              <Typography variant="h3" color="primary">
                ₱ {balance.toLocaleString()}
              </Typography>
            </Card>
          </Grid>

          {/* RELOAD */}
          <Grid>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6">
                Reload Wallet
              </Typography>

              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Button fullWidth variant="contained" onClick={handleReload}>
                Add Funds
              </Button>
            </Card>
          </Grid>

          {/* TRANSACTIONS */}
          <Grid>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6">
                Transaction History
              </Typography>

              <List>
                {transactions.map((tx, index) => (
                  <Box key={tx.id}>
                    <ListItem>
                      <ListItemText
                        primary={
                          tx.type === "reload"
                            ? "Wallet Reload"
                            : "Service Booking"
                        }
                        secondary={tx.date}
                      />

                      <Typography
                        color={
                          tx.amount > 0 ? "green" : "error"
                        }
                      >
                        {tx.amount > 0 ? "+" : ""}₱
                        {Math.abs(tx.amount)}
                      </Typography>
                    </ListItem>

                    {index !== transactions.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}