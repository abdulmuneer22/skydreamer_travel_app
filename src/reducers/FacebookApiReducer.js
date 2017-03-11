/**
 * @Class:             FacebookApiReducer.js
 * @Description:       Reducer file for Facebook API Actions
 * @Author:            Alberto Schiabel            @Date: 09/03/2017
 * @Notes:
 * @Revision History:
 * @Name:              @Date:      @Description:
 */
import {
  SHARE_FB_LINK_WITH_COMMENT_DEFINED_BY_THE_USER,
  SHARE_FB_LINK_WITH_COMMENT_DEFINED_BY_THE_USER_SUCCESS,
  SHARE_FB_LINK_WITH_COMMENT_DEFINED_BY_THE_USER_FAIL,
  SHARE_FB_LINK_WITH_COMMENT_DEFINED_BY_THE_USER_CANCELLED,
  SHARE_FB_LINK_WITH_PREDEFINED_COMMENT,
  SHARE_FB_LINK_WITH_PREDEFINED_COMMENT_SUCCESS,
  SHARE_FB_LINK_WITH_PREDEFINED_COMMENT_FAIL,
  SEND_FB_APP_INVITE,
  SEND_FB_APP_INVITE_SUCCESS,
  SEND_FB_APP_INVITE_FAIL,
  SEND_FB_APP_INVITE_CANCELLED,
} from '../actions/types';

const INITIAL_STATE = {
  shareFbLinkWithCommentDefinedByTheUserResult: null,
  shareFbLinkWithPredefinedCommentResult: null,
  sendFbAppInviteResult: null,
  isShareFbLinkWithCommentDefinedByTheUserLoading: false,
  wasShareFbLinkWithCommentDefinedByTheUserCancelled: false,
  isShareFbLinkWithPredefinedCommentLoading: false,
  isSendFbAppInviteLoading: false,
  wasSendFbAppInviteCancelled: false,
  fbError: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHARE_FB_LINK_WITH_COMMENT_DEFINED_BY_THE_USER:
      return {
        ...state,
        isShareFbLinkWithCommentDefinedByTheUserLoading: true,
        wasShareFbLinkWithCommentDefinedByTheUserCancelled: false,
      };
    case SHARE_FB_LINK_WITH_COMMENT_DEFINED_BY_THE_USER_SUCCESS:
      return {
        ...state,
        isShareFbLinkWithCommentDefinedByTheUserLoading: false,
        wasShareFbLinkWithCommentDefinedByTheUserCancelled: false,
        shareFbLinkWithCommentDefinedByTheUserResult: action.result,
      };
    case SHARE_FB_LINK_WITH_COMMENT_DEFINED_BY_THE_USER_FAIL:
      return {
        ...state,
        isShareFbLinkWithCommentDefinedByTheUserLoading: false,
        wasShareFbLinkWithCommentDefinedByTheUserCancelled: false,
        fbError: action.error,
      };
    case SHARE_FB_LINK_WITH_COMMENT_DEFINED_BY_THE_USER_CANCELLED:
      return {
        ...state,
        wasShareFbLinkWithCommentDefinedByTheUserCancelled: true,
      };
    case SHARE_FB_LINK_WITH_PREDEFINED_COMMENT:
      return {
        ...state,
        isShareFbLinkWithPredefinedCommentLoading: true,
      };
    case SHARE_FB_LINK_WITH_PREDEFINED_COMMENT_SUCCESS:
      return {
        ...state,
        isShareFbLinkWithPredefinedCommentLoading: false,
        shareFbLinkWithPredefinedCommentResult: action.result,
      };
    case SHARE_FB_LINK_WITH_PREDEFINED_COMMENT_FAIL:
      return {
        ...state,
        isShareFbLinkWithPredefinedCommentLoading: false,
        fbError: action.error,
      };
    case SEND_FB_APP_INVITE:
      return {
        ...state,
        isSendFbAppInviteLoading: true,
        wasSendFbAppInviteCancelled: false,
      };
    case SEND_FB_APP_INVITE_SUCCESS:
      return {
        ...state,
        isSendFbAppInviteLoading: false,
        wasSendFbAppInviteCancelled: false,
        sendFbAppInviteResult: action.result,
      };
    case SEND_FB_APP_INVITE_FAIL:
      return {
        ...state,
        isSendFbAppInviteLoading: false,
        wasSendFbAppInviteCancelled: false,
        fbError: action.error,
      };
    case SEND_FB_APP_INVITE_CANCELLED:
      return {
        ...state,
        wasSendFbAppInviteCancelled: true,
      };
    default:
      return state;
  }
};
