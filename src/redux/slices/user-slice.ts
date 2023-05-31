import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User } from 'firebase/auth';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StorageReference, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Status } from '../../enums/enums';
import { auth, storage } from '../../firebase-config';

type RegisterUserProps = {
  email: string;
  password: string;
  selectedFile: File | null;
  login: string;
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, password, selectedFile, login }: RegisterUserProps) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    if (selectedFile) {
      const storageRef = ref(storage, login);
      await uploadBytes(storageRef, selectedFile);
      getDownloadURL(storageRef).then(async (downloadUrl) => {
        if (user) {
          await updateProfile(user, {
            photoURL: downloadUrl,
          });
        }
      });
    }
    if (user) {
      await updateProfile(user, {
        displayName: login,
      });
    }
  }
);

export const uploadFile = createAsyncThunk(
  'user/uploadFile',
  async ({ storageRef, selectedFile }: { storageRef: StorageReference; selectedFile: File }) => {
    await uploadBytes(storageRef, selectedFile);
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({
    currentUser,
    displayName,
    photoURL,
  }: {
    currentUser: User;
    displayName: string | null;
    photoURL: string | null;
  }) => {
    await updateProfile(currentUser, {
      displayName,
      photoURL,
    });
  }
);
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: { email: string; password: string }) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return { email: user.email, login: user.displayName, photoUrl: user.photoURL, id: user.uid };
  }
);
export const editProfile = createAsyncThunk(
  'user/editProfile',
  async ({ selectedFile, newLogin }: { selectedFile: File | null; newLogin: string }) => {
    if (selectedFile && auth.currentUser?.displayName) {
      const storageRef = ref(storage, auth.currentUser.displayName);
      const zhopa = await uploadBytes(storageRef, selectedFile);
      getDownloadURL(zhopa.ref).then(async (downloadUrl) => {
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
            photoURL: downloadUrl,
          });
        }
      });
    }
    if (auth.currentUser && newLogin) {
      await updateProfile(auth.currentUser, {
        displayName: newLogin,
      });
    }
  }
);
export type UserState = {
  email: string | null;
  error?: string | null;
  id: string | null;
  login: string | null;
  photoUrl: string | null;
  status: Status;
  registerStatus: Status;
  editProfileStatus: Status;
};

const initialState: UserState = {
  login: null,
  error: null,
  email: null,
  id: null,
  photoUrl: null,
  status: Status.INIT,
  registerStatus: Status.INIT,
  editProfileStatus: Status.INIT,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeUser(state) {
      state.email = null;
      state.id = null;
      state.login = null;
      state.photoUrl = null;
    },
    clearError(state) {
      state.error = null;
    },
    resetStatus(state, action: PayloadAction<keyof UserState>) {
      state[action.payload] = Status.INIT;
    },
    updateUserData(state, action) {
      state.login = action.payload.login;
      state.photoUrl = action.payload.photoUrl;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.login = action.payload.login;
      state.photoUrl = action.payload.photoUrl;
    });
    builder.addCase(loginUser.rejected, (state, error) => {
      state.error = error.error.code;
      state.status = Status.ERROR;
      state.email = null;
      state.id = null;
      state.login = null;
      state.photoUrl = null;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.registerStatus = Status.LOADING;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.registerStatus = Status.SUCCESS;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.registerStatus = Status.ERROR;
    });
    builder.addCase(editProfile.pending, (state) => {
      state.editProfileStatus = Status.LOADING;
    });
    builder.addCase(editProfile.fulfilled, (state) => {
      state.editProfileStatus = Status.SUCCESS;
    });
    builder.addCase(editProfile.rejected, (state) => {
      state.editProfileStatus = Status.ERROR;
    });
  },
});

export const { reducer: UserReducer, actions: userActions } = userSlice;
