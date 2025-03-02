import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://fakestoreapi.in/api/products";

export const fetchProducts = createAsyncThunk("products/fetch", async ({ id = null, page = 1,category=null }) => {
  // console.log(category)
  let fetchUrl = API_URL;
  if (id) {
    fetchUrl = `${API_URL}/${id}`;
  }else if(category){
    fetchUrl = `${API_URL}/category?type=${category}`;
  }else {
    fetchUrl = `${API_URL}?page=${page}`;
  }

  const response = await fetch(fetchUrl);
  const obj = await response.json();
  // console.log(obj)

  return id ? obj.product : { products: obj.products, page }; 
});

const ProductSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    selectedItem: null,
    status: "idle",
    error: null,
    currentPage: 1,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.products) {
          state.items = action.payload.products;
          state.selectedItem = null;
          state.currentPage = action.payload.page;
        } else {
          state.selectedItem = action.payload;
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setPage } = ProductSlice.actions;
export default ProductSlice.reducer;