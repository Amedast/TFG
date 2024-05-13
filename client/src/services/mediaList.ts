import axios, { AxiosResponse } from 'axios'
import { CheckListResponse, ListItem, ListResponse } from '@/types/mediaList'
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
