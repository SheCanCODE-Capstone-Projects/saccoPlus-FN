import apiClient from './client';
import type { RegisterGroupRequest } from '@/types';

export const groupsApi = {
  register: (data: RegisterGroupRequest) => apiClient.post<string>('/api/v1/groups/register', data),
};
