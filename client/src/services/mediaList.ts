import axios, { AxiosResponse } from 'axios'
import {
  CheckListResponse,
  GetListResponse,
  ListItem,
  ListResponse,
  MediaListType
} from '@/types/mediaList'
import { apiBase } from '@/lib/exports'

export const apiAddToList = (
  userId: string,
  item: ListItem
): Promise<AxiosResponse<ListResponse>> => {
  return axios.post<ListResponse>(`${apiBase}/list/add`, {
    userId,
    item
  })
}

export const apiDeleteFromList = (
  userId: string,
  contentId: number
): Promise<AxiosResponse<ListResponse>> => {
  return axios.delete<ListResponse>(
    `${apiBase}/list/remove/${userId}/${contentId}`
  )
}

export const apiEditListItem = (
  userId: string,
  contentId: number,
  updatedItem: ListItem
): Promise<AxiosResponse<ListResponse>> => {
  return axios.put<ListResponse>(
    `${apiBase}/list/edit/${userId}/${contentId}`,
    updatedItem
  )
}

export const apiCheckListItem = (
  userId: string,
  contentId: number
): Promise<AxiosResponse<CheckListResponse>> => {
  return axios.get<CheckListResponse>(
    `${apiBase}/list/check/${userId}/${contentId}`
  )
}

export const apiGetList = (
  userId: string,
  page?: number,
  limit?: number,
  name?: string,
  status?: number[],
  types?: string[],
  rating?: number
): Promise<AxiosResponse<GetListResponse>> => {
  let pageParam = page ? page : 1
  let limitParam = limit ? limit : 10
  let queryParams = `?page=${pageParam}&limit=${limitParam}`

  if (name) {
    queryParams += `&name=${encodeURIComponent(name)}`
  }

  if (status) {
    status.forEach(statusItem => {
      queryParams += `&status=${encodeURIComponent(statusItem)}`
    })
  }
  if (types) {
    types.forEach(typeItem => {
      queryParams += `&types=${encodeURIComponent(typeItem)}`
    })
  }
  if (rating) {
    queryParams += `&rating=${encodeURIComponent(rating)}`
  }
  return axios.get<GetListResponse>(
    `${apiBase}/list/get/${userId}${queryParams}`
  )
}

