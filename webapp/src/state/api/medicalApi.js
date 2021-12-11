import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const medicalApiSlice = createApi({
  reducerPath: "medicalApi",
  baseQuery: fetchBaseQuery({
<<<<<<< HEAD
    baseUrl: "https://ssl-portal-node-backend.client.zivost.com/api",
=======
    baseUrl: "https://ssl-portal-node-backend.client.zivost.com/api/",
>>>>>>> 075ab2e6e9f9f202cb7c1373b6aa1da46abf5594
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authState.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["projects", "invite", "lastTask", "response"],
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: (body) => ({
        url: "get_user_information",
        method: "POST",
        body: body,
      }),
<<<<<<< HEAD
    }),
    getUserOrganization: builder.query({
=======
      providesTags: ["projects", "invite"],
    }),
    getUserOrganzation: builder.query({
>>>>>>> 075ab2e6e9f9f202cb7c1373b6aa1da46abf5594
      query: (body) => {
        return {
          url: "get_user_organization",
          method: "POST",
          body: body,
        };
      },
    }),
    getProjectInfo: builder.query({
      query: (body) => ({
        url: "get_project_information",
        method: "POST",
        body: body,
      }),
      providesTags: ["response"],
    }),
    addNewUser: builder.mutation({
      query: (body) => ({
        url: "add_new_user",
        method: "POST",
        body: body,
      }),
    }),
    createProject: builder.mutation({
      query: (body) => ({
        url: "create_project",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["projects"],
    }),
    addMultipleMembersToProject: builder.mutation({
      query: (body) => ({
        url: "add_multiple_members_to_project",
        method: "POST",
        body: body,
      }),
    }),
    createOrganization: builder.mutation({
      query: (body) => ({
        url: "create_organization",
        method: "POST",
        body: body,
      }),
    }),
    updateLastViewed: builder.mutation({
      query: (body) => ({
        url: "update_last_viewed",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["projects"],
    }),
    getLastTask: builder.query({
      query: (body) => ({
        url: "get_user_last_case",
        method: "POST",
        body: body,
      }),
      providesTags: ["lastTask"],
    }),
    updateLastTask: builder.mutation({
      query: (body) => ({
        url: "update_last_worked_case",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["lastTask"],
    }),
    getCaseInfo: builder.query({
      query: (body) => ({
        url: "get_case_info",
        method: "POST",
        body: body,
      }),
    }),
    respondToProjectInvitation: builder.mutation({
      query: (body) => ({
        url: "respond_to_project_invitation",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["invite"],
    }),
    saveQuestionnaire: builder.mutation({
      query: (body) => ({
        url: "save_questionnaire_response",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["response"],
    }),
    getQuestionnaireResponse: builder.query({
      query: (body) => ({
        url: "get_questionnaire_response",
        method: "POST",
        body: body,
      }),
      providesTags: ["response"],
    }),
<<<<<<< HEAD
    getUserInvitations: builder.query({
      query: (body) => ({
        url: "get_user_invitations",
        method: "POST",
        body: body,
      }),
      providesTags: ["invite"],
    }),
    addMultipleMembersToProjectByEmail: builder.mutation({
      query: (body) => ({
        url: "add_multiple_members_to_project_by_email",
        method: "POST",
        body: body,
      }),
    }),
    searchUser: builder.mutation({
      query: (body) => ({
        url: "search_user",
        method: "POST",
        body: body,
      }),
    }),
    getUserOwnedProjects: builder.query({
      query: (body) => ({
        url: "get_user_owned_projects",
        method: "POST",
        body: body,
      }),
      providesTags: ["projects"],
    }),
    getUserProjects: builder.query({
      query: (body) => ({
        url: "get_user_projects",
        method: "POST",
        body: body,
      }),
      providesTags: ["invite"],
    }),
=======
>>>>>>> 075ab2e6e9f9f202cb7c1373b6aa1da46abf5594
  }),
});

export const {
<<<<<<< HEAD
  useGetUserInfoQuery,
  useGetUserOrganizationQuery,
=======
  useTestApiQuery,
  useGetUserInfoQuery,
  useGetUserOrganzationQuery,
>>>>>>> 075ab2e6e9f9f202cb7c1373b6aa1da46abf5594
  useAddNewUserMutation,
  useCreateProjectMutation,
  useAddMultipleMembersToProjectMutation,
  useCreateOrganizationMutation,
  useGetProjectInfoQuery,
  useUpdateLastViewedMutation,
  useGetLastTaskQuery,
  useGetCaseInfoQuery,
  useRespondToProjectInvitationMutation,
  useSaveQuestionnaireMutation,
  useUpdateLastTaskMutation,
  useGetQuestionnaireResponseQuery,
<<<<<<< HEAD
  useGetUserInvitationsQuery,
  useSearchUserMutation,
  useAddMultipleMembersToProjectByEmailMutation,
  useGetUserOwnedProjectsQuery,
  useGetUserProjectsQuery,
=======
>>>>>>> 075ab2e6e9f9f202cb7c1373b6aa1da46abf5594
} = medicalApiSlice;

export default medicalApiSlice;
