import { createApi } from '@reduxjs/toolkit/query/react'
import axios from 'axios';

export const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: '' }) =>
        async ({ url, method, data, params }) => {
            try {
                const result = await axios({ url: baseUrl + url, method, data, params })
                return { data: result.data }
            } catch (axiosError) {
                let err = axiosError
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                }
            }
        }

const contactsApi = createApi({
    reducerPath: 'contactsApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Contacts'],
    endpoints: (builder) => ({
        fetchContacts: builder.query({
            query: () => ({
                url: "/contacts",
                method: 'GET',
            }),

            providesTags: (result) => (result
                ? [...result.map(({ id }) => ({ type: 'Contacts', id })), { type: 'Contacts', id: 'LIST' }]
                : [{ type: 'Contacts', id: 'LIST' }]),
        }),
        addContact: builder.mutation({
            query: (data) => ({
                url: "/contacts",
                method: 'POST',
                data,
            })
            ,
            invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
        }),
        editContact: builder.mutation({
            query: ([id, data]) => ({
                url: `/contacts/${id}`,
                method: 'PATCH',
                data,
            })
            ,
            invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
        }),
        deleteContact: builder.mutation({
            query: (id) => ({
                url: `/contacts/${id}`,
                method: 'DELETE',
            })
            ,
            invalidatesTags: [{ type: 'Contacts', id: 'LIST' }]
        })
    }),
})

export default contactsApi;
export const { useFetchContactsQuery, useAddContactMutation, useDeleteContactMutation, useEditContactMutation } = contactsApi