import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Shoes, SearchShoesParams } from './types';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';

export const fetchShoes = createAsyncThunk<Shoes[], SearchShoesParams>(
  'shoes/fetchShoesStatus',
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    console.log(params, 4444);
    const { data } = await axios.get<Shoes[]>(`https://668ab8c22c68eaf3211da11b.mockapi.io/items`, {
      params: pickBy(
        {
          page: currentPage,
          limit: 4,
          category,
          sortBy,
          order,
          search,
        },
        identity,
      ),
    });

    return data;
  },
);