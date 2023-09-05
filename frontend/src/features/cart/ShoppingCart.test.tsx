import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';
import ShoppingCart from './ShoppingCart';
import {LABEL, PATH} from '../../language';
import {act} from "react-dom/test-utils";
