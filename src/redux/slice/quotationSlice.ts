// redux/quotationSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface QuotationState {
    enquiries: any[];
    loading: boolean;
    error: string | null;
}

const initialState: QuotationState = {
    enquiries: [],
    loading: false,
    error: null,
};

// Async thunk to fetch enquiry data
export const fetchEnquiries = createAsyncThunk(
    'quotation/fetchEnquiries',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/enquiry');
            if (!res.ok) throw new Error('Failed to fetch enquiries');
            const data = await res.json();
            return data.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const quotationSlice = createSlice({
    name: 'quotation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchEnquiries.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchEnquiries.fulfilled, (state, action) => {
            state.loading = false;
            state.enquiries = action.payload;
        })
        .addCase(fetchEnquiries.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default quotationSlice.reducer;
