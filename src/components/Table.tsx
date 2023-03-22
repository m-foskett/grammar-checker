'use client'

import React from 'react'
import {DataGrid, GridColumnHeaderParams, type GridColDef} from '@mui/x-data-grid'
import { ApiRequest } from '@prisma/client'
import { useTheme } from 'next-themes'
import { createTheme, ThemeProvider } from '@mui/material'

const columnsDraft: GridColDef[] = [
    {
        field: 'col1',
        headerName: 'API Key used',
        width: 400,
        renderHeader(params) {
            return (
                <strong className='font-semibold'>{params.colDef.headerName} 🔑</strong>
            )
        },
    },
    {
        field: 'col2',
        headerName: 'Path',
        width: 250,
    },
    {
        field: 'col3',
        headerName: 'Recency',
        width: 250,
    },
    {
        field: 'col4',
        headerName: 'Duration',
        width: 150,
    },
    {
        field: 'col5',
        headerName: 'Status',
        width: 150,
    },
]

const columns = columnsDraft.map((col) => {
    // If first column, do nothing
    if(col.field === 'col1' ) {
        return col
    }
    // Otherwise
    return {
        ...col,
        renderHeader(params: GridColumnHeaderParams<any, any, any>) {
            return (
                <strong className='font-semibold'>{params.colDef.headerName}</strong>
            )
        },
    }
})

// The generic K takes all the properties of ApiRequest
// Omit<T, K> Construct a type with the properties of T except for those in type K.
type ModifiedRequestType<K extends keyof ApiRequest> = Omit<ApiRequest, K> & {
    timestamp: string
}

interface TableProps {
    userRequests: ModifiedRequestType<'timestamp'>[]
}

const Table = ({userRequests}: TableProps) => {
    const { theme: applicationTheme } = useTheme()

    const theme = createTheme({
        palette: {
            mode: applicationTheme === 'light' ? 'light' : 'dark',
        },
    })
    // Determine the table rows
    const rows = userRequests.map((request) => ({
        id: request.id,
        col1: request.usedApiKey,
        col2: request.path,
        col3: `${request.timestamp} ago`,
        col4: `${request.timestamp} ms`,
        col5: request.status,
    }))

    return (
        <ThemeProvider theme={theme}>
            <DataGrid
                style={{
                    backgroundColor: applicationTheme === 'light' ? 'white' : '#152238',
                    fontSize: '1rem',
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                autoHeight
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                columns={columns}
                rows={rows}
            />
        </ThemeProvider>
    )
}

export default Table