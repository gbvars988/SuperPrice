import React from "react";
import { describe, test, expect } from 'vitest'
import { render, screen, fireEvent } from "@testing-library/react";
import CartDrawer from './CartDrawer'; // Path to your component file
import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import { LABEL, PATH } from "../../language/index";