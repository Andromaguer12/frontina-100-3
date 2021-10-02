import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { autoSelect } from "../autoSelect";

export const useGoogleUser = createDraftSafeSelector(
    autoSelect,
    (state) => state.userWithGoogle
)