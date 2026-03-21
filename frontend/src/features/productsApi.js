import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Newspapers"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "api/products/newspapers",
      providesTags: ["Newspapers"]
    })
  })
});

export const { useGetAllProductsQuery } = productsApi;
