/**
 * Author: Alberto Schiabel
 * Purpose: Centralization of every metric used in the app (in padding, margin, fontSize, ...)
 * Date: 07 March 2017
 *
 * The same metric patterns may differ slightly from platform to platform.
 * Therefore, it's useful having separated files for Android and iOS
 */

const dims = {
  headerFontSize: 25,
  titleFontSize: 20,
  subtitleFontSize: 16,
  chatFontSize: 15,
  mainContainerPadding: 20,
  mainContainerMargin: 5,
  cardPadding: 15,
  chatUserPadding: 5,
  chatFriendMargin: 10,
};

export default dims;
