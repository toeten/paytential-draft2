import { fetchHandler, getPostOptions } from "../utils/fetchingUtils";

const profileUrl = '/api/profile';

export const createProfile = async ({ is_admin, organization }) => {
  return fetchHandler(profileUrl, getPostOptions({ is_admin, organization }));
};