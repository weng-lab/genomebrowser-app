"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import Link from "next/link";
import { useTheme } from "../providers/ThemeProvider";

export const Navbar = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            gap: 2,
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" alignContent={"center"}>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              Genome Browser
            </Link>
          </Typography>

          <IconButton color="inherit" onClick={toggleTheme}>
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
