// src/store/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from '../store';
import { AuthResponse, User } from '@/src/types';
import axiosHttp from '@/lib/axios_client';

// --- Interface for Profile Update Payload ---
export interface ProfileUpdatePayload {
    name?: string;
    email?: string;
    phone?: string;
    avatar?: File | null; // File object for upload
    remove_avatar?: '1'; // Flag to remove avatar
    // Add other updatable fields
  }
  
  // export Interface for Password Change Payload
  export interface PasswordChangePayload {
      current_password: string;
      password: string; // New password
      password_confirmation: string;
  }

// --- Helper Functions for localStorage ---
const getTokenFromStorage = (): string | null => {
  try {
    return typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  } catch (e) {
    console.error("Failed to get token from localStorage", e);
    return null;
  }
};

const setTokenInStorage = (token: string | null): void => {
  try {
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('authToken', token);
      } else {
        localStorage.removeItem('authToken');
      }
    }
  } catch (e) {
    console.error("Failed to set token in localStorage", e);
  }
};

// --- Thunks for Async Actions ---

// Login Thunk
export const loginUser = createAsyncThunk<
  AuthResponse, // Return type on success
  { email: string; password: string }, // Argument type
  { rejectValue: string } // Type for rejection payload
>(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosHttp.post<AuthResponse>('/auth/customer/login', credentials); // Adjust URL
      // Assuming API returns { user: {...}, token: "..." }
      console.log(response.data);
      
      
      setTokenInStorage(response.data.token); // Persist token
      localStorage.setItem('customer', JSON.stringify(response.data.customer)); // Persist token
      return response.data;
    } catch (err) {
        console.log(err);
        
      const error = err as AxiosError<{ message?: string }>;
      const message = error.response?.data?.message || error.message || 'Login failed';
      return rejectWithValue(message);
    }
  }
);

// Fetch User Thunk (to verify token on app load)
export const fetchUser = createAsyncThunk<
    User, // Return type on success
    void, // No arguments needed (token comes from state/storage)
    { rejectValue: string, state: { auth: AuthState } } // Type for rejection and state access
>(
    'auth/fetchUser',
    async (_, { getState, rejectWithValue }) => {
        const token = getState().auth.token; // Get token from current state
        if (!token) {
            return rejectWithValue('No token found');
        }
        try {
            // Use the same axios instance which should have interceptors to add the token
            const response = await axiosHttp.get<User>('/user'); // Your API endpoint to get user details
            return response.data;
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            const message = error.response?.data?.message || error.message || 'Failed to fetch user';
             setTokenInStorage(null); // Clear invalid token
            return rejectWithValue(message);
        }
    }
);

// Logout Thunk (optional if API logout needed)
export const logoutUser = createAsyncThunk<
    void, // No return value needed
    void, // No arguments
    { rejectValue: string }
>(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            // Call API logout endpoint if necessary
            // await axiosHttp.post('/logout');
            setTokenInStorage(null); // Clear persisted token
            return;
        } catch (err) {
             const error = err as AxiosError<{ message?: string }>;
             const message = error.response?.data?.message || error.message || 'Logout failed';
             // Even if API fails, clear local token
             setTokenInStorage(null);
             return rejectWithValue(message);
        }
    }
);


export const updateProfile = createAsyncThunk<
    { message: string; customer: User }, // Success return type (message + updated user)
    ProfileUpdatePayload,                // Arguments: FormData or object
    { rejectValue: { message: string; errors?: Record<string, string[]> } } // Rejection payload
>(
    'auth/updateProfile',
    async (profileData, { rejectWithValue }) => {
        try {
            // --- Prepare FormData for potential file upload ---
            const formData = new FormData();
            Object.entries(profileData).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    // Check if value is a File object
                    if (value instanceof File) {
                        formData.append(key, value);
                    } else {
                         formData.append(key, String(value)); // Append other fields as strings
                    }
                }
            });

            // --- Use POST for update if sending FormData ---
            const response = await axiosHttp.post<{ message: string; customer: User }>('/profile', formData, {
                 headers: {
                    // Axios sets Content-Type to multipart/form-data automatically for FormData
                    'Content-Type': 'multipart/form-data',
                     // Add _method if your backend expects PUT but needs POST for FormData
                     // '_method': 'PUT', // Example if backend uses method spoofing
                 }
            });

            console.log(response.data);
            

            // --- Or use PUT if ONLY sending JSON data (no file upload) ---
            // const response = await axiosHttp.put<{ message: string; customer: User }>('/profile', profileData);

            // toast.success(response.data.message || "Profile updated successfully!");
            return response.data;

        } catch (err) {
            const error = err as AxiosError<{ message?: string; errors?: Record<string, string[]> }>;
            const message = error.response?.data?.message || 'Profile update failed.';
            const validationErrors = error.response?.data?.errors;
            // toast.error(message);
            return rejectWithValue({ message, errors: validationErrors });
        }
    }
);

// --- NEW: Change Password Thunk ---
export const changePassword = createAsyncThunk<
    { message: string }, // Success return type
    PasswordChangePayload, // Arguments
    { rejectValue: { message: string; errors?: Record<string, string[]> } } // Rejection payload
>(
    'auth/changePassword',
    async (passwordData, { rejectWithValue }) => {
        try {
            const response = await axiosHttp.put<{ message: string }>('/profile/password', passwordData);
            // toast.success(response.data.message || "Password changed successfully!");
            return response.data;
        } catch (err) {
             const error = err as AxiosError<{ message?: string; errors?: Record<string, string[]> }>;
             const message = error.response?.data?.message || 'Password change failed.';
             const validationErrors = error.response?.data?.errors;
            //  toast.error(message);
             return rejectWithValue({ message, errors: validationErrors });
        }
    }
);


// --- Slice Definition ---

interface AuthState {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  profileUpdateStatus: 'idle' | 'loading' | 'succeeded' | 'failed'; // Specific status for profile update
  passwordChangeStatus: 'idle' | 'loading' | 'succeeded' | 'failed'; // Specific status for password change
  profileUpdateError: Record<string, string[]> | null; // Specific validation errors for profile update
  passwordChangeError: Record<string, string[]> | null; // Specific validation errors for password change
}

const initialState: AuthState = {
    user: null,
    token: null,
    status: 'idle',
    profileUpdateStatus: 'idle',
    passwordChangeStatus: 'idle',
    error: null,
    profileUpdateError: null,
    passwordChangeError: null,
  };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Synchronous logout action (can be dispatched directly)
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      setTokenInStorage(null); // Clear from storage too
    },

    resetProfileUpdateStatus: (state) => {
        state.profileUpdateStatus = 'idle';
        state.profileUpdateError = null;
    },
    // Reset password change status/error
    resetPasswordChangeStatus: (state) => {
        state.passwordChangeStatus = 'idle';
        state.passwordChangeError = null;
    }
    // You might add other synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder
      // Login Cases
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.status = 'succeeded';
        state.user = action.payload.customer;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.user = null;
        state.token = null;
        state.error = action.payload || 'Unknown login error';
      })
      // Fetch User Cases
       .addCase(fetchUser.pending, (state) => {
           // Optionally set loading only if token exists?
           if (state.token) state.status = 'loading';
           state.error = null; // Clear error on retry
       })
       .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
           state.status = 'succeeded';
           state.user = action.payload;
           state.error = null;
           // Token remains the same (already in state)
       })
       .addCase(fetchUser.rejected, (state, action) => {
           state.status = 'failed';
           state.user = null;
           state.token = null; // Token was invalid, clear it
           state.error = action.payload || 'Failed to validate session';
           // No need to clear storage here, already done in thunk
       })
       // Logout Cases
       .addCase(logoutUser.pending, (state) => {
           state.status = 'loading'; // Indicate logout in progress
       })
       .addCase(logoutUser.fulfilled, (state) => {
           state.user = null;
           state.token = null;
           state.status = 'idle';
           state.error = null;
       })
       .addCase(logoutUser.rejected, (state, action) => {
           // Still log out locally even if API fails
           state.user = null;
           state.token = null;
           state.status = 'failed'; // Mark as failed though
           state.error = action.payload || 'Logout failed';
       });


       builder.addCase(updateProfile.pending, (state) => {
        state.profileUpdateStatus = 'loading';
        state.profileUpdateError = null;
    })
    .addCase(updateProfile.fulfilled, (state, action: PayloadAction<{ message: string; customer: User }>) => {
        state.profileUpdateStatus = 'succeeded';
        state.user = { ...state.user, ...action.payload.customer }; // Merge updated user data
        state.profileUpdateError = null;
    })
    .addCase(updateProfile.rejected, (state, action) => {
        state.profileUpdateStatus = 'failed';
        // action.payload structure defined in thunk's rejectValue
        state.profileUpdateError = action.payload?.errors || { _error: [action.payload?.message || 'Update failed'] };
    })

    // --- NEW: Change Password Cases ---
    .addCase(changePassword.pending, (state) => {
        state.passwordChangeStatus = 'loading';
        state.passwordChangeError = null;
    })
    .addCase(changePassword.fulfilled, (state) => {
        state.passwordChangeStatus = 'succeeded';
        state.passwordChangeError = null;
         // Password hash changed on backend, no state update needed here
    })
    .addCase(changePassword.rejected, (state, action) => {
        state.passwordChangeStatus = 'failed';
        state.passwordChangeError = action.payload?.errors || { _error: [action.payload?.message || 'Password change failed'] };
    });
  },
});
// Export NEW actions and existing ones + reducer
export const { logout, resetProfileUpdateStatus, resetPasswordChangeStatus } = authSlice.actions;
export default authSlice.reducer;


export const selectAuth = (state: RootState) => state.auth;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) => !!state.auth.token && !!state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;

// NEW Selectors
export const selectProfileUpdateStatus = (state: RootState) => state.auth.profileUpdateStatus;
export const selectProfileUpdateError = (state: RootState) => state.auth.profileUpdateError;
export const selectPasswordChangeStatus = (state: RootState) => state.auth.passwordChangeStatus;
export const selectPasswordChangeError = (state: RootState) => state.auth.passwordChangeError;