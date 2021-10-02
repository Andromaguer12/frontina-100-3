import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { autoSelect } from "../autoSelect";

export const useAdminUser = createDraftSafeSelector(
    autoSelect,
    (state) => state.adminUser.currentUser
) 