import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL, DataType } from "../models/models"

export const dataApi = createApi({
  reducerPath: "data",
  tagTypes: ["Data"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    fetchData: builder.query<DataType[], string>({
      query: (path) => `${path}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Data", id } as const)),
              { type: "Data", id: "LIST" },
            ]
          : [{ type: "Data", id: "LIST" }],
    }),
    deleteData: builder.mutation<DataType, { path: string, id: string }>({
      query: ({ path, id }) => ({
        url: `${path}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Data", id: "LIST" }],
    }),
  }),
})

export const { useFetchDataQuery, useDeleteDataMutation } = dataApi