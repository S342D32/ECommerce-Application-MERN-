import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//Async Thunk to fetch products by collections and optional filters

export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilters",
  async ({
    collection,
    size,
    color,
    gender,
    minPrice,
    maxPrice,
    sortBy,
    search,
    category,
    material,
    brand,
    limit,
  }) => {
    const query = new URLSearchParams();
    if (collection) query.append("collection", collection);
    if (size) query.append("size", size);
    if (color) query.append("color", color);
    if (gender) query.append("gender", gender);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (sortBy) query.append("sortBy", sortBy);
    if (search) query.append("search", search);
    if (category) query.append("category", category);
    if (material) query.append("material", material);
    if (brand) query.append("brand", brand);
    if (limit) query.append("limit", limit);

    const baseURL = import.meta.env.VITE_BACKEND_API || 'http://localhost:9000';
    const url = `${baseURL}/api/products?${query.toString()}`;
    console.log('Environment variable:', import.meta.env.VITE_BACKEND_API);
    console.log('Fetching products from:', url);
    
    const response = await axios.get(url);
    return response.data;
  }
);

//Async thunk to fetch products by ID

export const fetchProductDetails = createAsyncThunk(
  "products/fetchById",
  async (productId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/products/${productId}`
    );
    return response.data;
  }
);

//Async thunk fetch update products

export const updateProduct = createAsyncThunk(
  "products/updateProducts",
  async ({ id, productData }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/products/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return response.data;
  }
);

//Async thunk fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async (productId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/products/similar/${productId}`
    );
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null, //store the detail of single product
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
      category: null,
      material: null,
      brand: null,
      size: null,
      color: null,
      gender: null,
      minPrice: null,
      maxPrice: null,
      sortBy: null,
      search: null,
      limit: null,
      collection: null,
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: null,
        material: null,
        brand: null,
        size: null,
        color: null,
        gender: null,
        minPrice: null,
        maxPrice: null,
        sortBy: null,
        search: null,
        limit: null,
        collection: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProductsByFilters.rejected, (state, action) => {
state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.similarProducts = action.payload;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;