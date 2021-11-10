/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Remote } from '@core'
import {
  CollectionData,
  NftAsset,
  NftAssetsType,
  NftOrdersType
} from '@core/network/api/nfts/types'

import { NftOrderStepEnum, NftsStateType } from './types'

const initialState: NftsStateType = {
  assets: {
    atBound: false,
    collection: 'all',
    isFailure: false,
    isLoading: true,
    list: [],
    page: 0
  },
  marketplace: { page: 0, token_ids_queried: [] },
  orderFlow: { activeOrder: null, asset: Remote.NotAsked, step: NftOrderStepEnum.SHOW_ASSET },
  orders: { isFailure: false, isLoading: true, list: [] }
}

const nftsSlice = createSlice({
  initialState,
  name: 'nfts',
  reducers: {
    cancelListings: (state, action: PayloadAction<{ asset: NftAssetsType['assets'][0] }>) => {},
    createBuyOrder: (state, action: PayloadAction<{ order: NftOrdersType['orders'][0] }>) => {},
    createSellOrder: (state, action: PayloadAction<{ asset: NftAssetsType['assets'][0] }>) => {},
    fetchNftAssets: () => {},
    fetchNftAssetsFailure: (state, action: PayloadAction<string>) => {
      state.assets.isFailure = true
    },
    fetchNftAssetsLoading: (state) => {
      state.assets.isLoading = true
    },
    fetchNftAssetsSuccess: (state, action: PayloadAction<NftAssetsType['assets']>) => {
      state.assets.isFailure = false
      state.assets.isLoading = false
      state.assets.list = [...state.assets.list, ...action.payload]
    },
    fetchNftOrderAsset: () => {},
    fetchNftOrderAssetFailure: (state, action: PayloadAction<string>) => {
      state.orderFlow.asset = Remote.Failure(action.payload)
    },
    fetchNftOrderAssetLoading: (state) => {
      state.orderFlow.asset = Remote.Loading
    },
    fetchNftOrderAssetSuccess: (state, action: PayloadAction<NftAsset>) => {
      state.orderFlow.asset = Remote.Success(action.payload)
    },
    fetchNftOrders: () => {},
    fetchNftOrdersFailure: (state, action: PayloadAction<string>) => {
      state.orders.isFailure = true
    },
    fetchNftOrdersLoading: (state) => {
      state.orders.isLoading = true
    },
    fetchNftOrdersSuccess: (state, action: PayloadAction<NftOrdersType['orders']>) => {
      state.orders.isFailure = false
      state.orders.isLoading = false
      state.orders.list = [...state.orders.list, ...action.payload]
    },
    nftOrderFlowClose: (state) => {
      state.orderFlow.activeOrder = null
      state.orderFlow.asset = Remote.NotAsked
      state.orderFlow.step = NftOrderStepEnum.SHOW_ASSET
    },
    nftOrderFlowOpen: (state, action: PayloadAction<{ order: NftOrdersType['orders'][0] }>) => {
      state.orderFlow.asset = Remote.Loading
      state.orderFlow.activeOrder = action.payload.order
      state.orderFlow.step = NftOrderStepEnum.SHOW_ASSET
    },
    resetNftOrders: (state) => {
      state.orders.isFailure = false
      state.orders.isLoading = true
      state.orders.list = []
    },
    setAssetsState: (state, action: PayloadAction<{ atBound?: boolean; page?: number }>) => {
      if (action.payload.atBound) state.assets.atBound = action.payload.atBound
      if (action.payload.page) state.assets.page = action.payload.page
    },
    setMarketplaceBounds: (state, action: PayloadAction<{ atBound: boolean }>) => {
      state.marketplace.atBound = action.payload.atBound
    },
    setMarketplaceData: (
      state,
      action: PayloadAction<{
        atBound?: boolean
        collection?: CollectionData
        page?: number
        token_ids_queried?: string[]
      }>
    ) => {
      if (action.payload.page) state.marketplace.page = action.payload.page
      if (action.payload.atBound) state.marketplace.atBound = action.payload.atBound
      if (action.payload.collection) state.marketplace.collection = action.payload.collection
      if (action.payload.token_ids_queried)
        state.marketplace.token_ids_queried = action.payload.token_ids_queried
    }
  }
})

const { actions } = nftsSlice
const nftsReducer = nftsSlice.reducer
export { actions, nftsReducer }
