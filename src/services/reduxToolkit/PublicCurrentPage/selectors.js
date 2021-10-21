import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { autoSelect } from '../autoSelect'

export const currentTab = createDraftSafeSelector(
    autoSelect,
    (state) => state.PublicCurrentPages.TabValue
)