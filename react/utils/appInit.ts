
import { type AppDispatch } from '@/contexts/store';
import { fetchBeds } from '@/contexts/thunks/bedsThunks';
import { fetchBookings, type FetchByDatePayload } from '@/contexts/thunks/queueThunk';
import { fetchCustomers } from '@/contexts/thunks/customersThunk';
import { fetchProducts } from '@/contexts/thunks/productsThunk';
 
export const initializeAppState = (dispatch: AppDispatch, payload: FetchByDatePayload) => {
  dispatch(fetchCustomers())
  dispatch(fetchBookings(payload));
  dispatch(fetchBeds());
  dispatch(fetchProducts());
};